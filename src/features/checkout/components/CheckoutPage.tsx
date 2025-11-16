'use client';
import React, { useEffect, useMemo, useState } from 'react';

// Minimal address type reflecting Convex address documents we consume
interface AddressDoc {
  _id: string; // Convex id serialized by framework
  label?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  phone?: string;
  isDefault?: boolean;
}
import { GoogleOneTap, useClerk, useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { STATE_PINCODE_PREFIXES } from '../../../constant';
import {
  ShoppingBag,
  ChevronRight,
  Lock,
  MapPin,
  CreditCard,
  Truck,
  ShoppingBagIcon,
  ChevronsUpDown,
  Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { INDIAN_STATES } from '@/constant';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchShippingQuote } from '@/lib/shipping';
import { useCart } from '@/app/components/cart-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AddressFormModal,
  type Address as AccountAddress
} from '@/features/account/components/AddressForm';

export default function Checkout() {
  // Prevent SSR/CSR markup mismatches by deferring cart-driven UI until mount
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // Mark as mounted so client-only state (like localStorage cart) can render safely
    setHydrated(true);
  }, []);
  const [stateOpen, setStateOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'phonepe'
  });
  const [pincodeError, setPincodeError] = useState('');
  // Saved addresses UX
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  // Billing address UX
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billing, setBilling] = useState({
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [billingPincodeError, setBillingPincodeError] = useState('');

  const router = useRouter();

  // Use the cart context so checkout reflects live cart state
  const { cartItems, clearCart, getTotalPrice } = useCart();

  // On the server, cart is empty. To avoid hydration mismatch, render
  // placeholders until we've mounted and read client-side cart.
  const orderItems = hydrated ? cartItems : [];

  const subtotal = hydrated ? getTotalPrice() : 0;
  // Compute cart total weight (kg) for shipping
  const totalWeightKg = useMemo(() => {
    if (!hydrated) return 0;
    try {
      // Narrow cart item type minimally for weight calc
      interface CartItemForWeight {
        weight?: number;
        quantity?: number;
      }
      return orderItems.reduce((sum: number, it: CartItemForWeight) => {
        const w = Number(it?.weight ?? 0);
        const q = Number(it?.quantity ?? 1);
        return (
          sum + (Number.isFinite(w) ? w : 0) * (Number.isFinite(q) ? q : 1)
        );
      }, 0);
    } catch {
      return 0;
    }
  }, [hydrated, orderItems]);

  const [standardAmount, setStandardAmount] = useState<number | null>(null);
  const [expressAmount, setExpressAmount] = useState<number | null>(null);
  const [standardEta, setStandardEta] = useState<number | null>(null);
  const [expressEta, setExpressEta] = useState<number | null>(null);
  const [shippingAmount, setShippingAmount] = useState<number>(0);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);

  // Choose shipping amount with free-shipping threshold fallback
  const shipping = useMemo(() => {
    if (subtotal >= 600) return 0; // free shipping threshold
    return shippingAmount;
  }, [shippingAmount, subtotal]);

  // If cart is empty, keep UX consistent by sending users back to cart
  useEffect(() => {
    // Only consider redirect after hydration to avoid false redirects
    if (!hydrated) return;
    if (Array.isArray(cartItems) && cartItems.length === 0) {
      // Small delay to avoid flashing on hydration
      const t = setTimeout(() => router.push('/cart'), 0);
      return () => clearTimeout(t);
    }
  }, [hydrated, cartItems, router]);

  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  type ClerkAuthState = {
    isLoaded: boolean;
    isSignedIn: boolean;
    user: { id?: string } | null;
  };
  const { isLoaded, isSignedIn, user } = (
    hasClerk
      ? useUser()
      : ({ isLoaded: true, isSignedIn: false, user: null } as ClerkAuthState)
  ) as ClerkAuthState;
  const showOneTap = hasClerk && isLoaded && !isSignedIn;
  const { signOut } = useClerk();
  type MaybeClerkUser = {
    primaryEmailAddress?: { emailAddress?: string } | null;
    emailAddresses?: Array<{ emailAddress?: string } | null> | null;
  } | null;
  const emailDisplay = React.useMemo(() => {
    const u = user as MaybeClerkUser;
    const primary = u?.primaryEmailAddress?.emailAddress;
    const first = u?.emailAddresses?.[0]?.emailAddress;
    return primary || first || '';
  }, [user]);

  // Fetch Delhivery quotes when pincode/weight/address change
  React.useEffect(() => {
    if (!hydrated) return;
    const snap = getCurrentShippingFields();
    const pin = String(snap.pincode || '').trim();
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      setShippingError(null);
      setStandardAmount(null);
      setExpressAmount(null);
      setStandardEta(null);
      setExpressEta(null);
      return;
    }
    let active = true;
    (async () => {
      setShippingLoading(true);
      setShippingError(null);
      try {
        const quote = await fetchShippingQuote({
          toPincode: pin,
          weightKg: totalWeightKg,
          orderValue: subtotal
        });
        if (process.env.NODE_ENV !== 'production') {
          console.log('[checkout] quote params', {
            toPincode: pin,
            weightKg: totalWeightKg,
            orderValue: subtotal
          });
          console.log('[checkout] quote response', quote);
          const breakdownAny = quote as unknown as {
            breakdown?: { _request?: { payload?: unknown } };
          };
          if (breakdownAny?.breakdown?._request?.payload) {
            console.log(
              '[checkout] server request payload used',
              breakdownAny.breakdown._request.payload
            );
          }
        }
        if (!active) return;
        if (!quote.serviceable) {
          setShippingError(quote.error || 'Address not serviceable');
          setStandardAmount(null);
          setExpressAmount(null);
          setStandardEta(null);
          setExpressEta(null);
          setShippingAmount(0);
          return;
        }
        const stdAmt = quote.standard?.amount ?? null;
        const expAmt = quote.express?.amount ?? null;
        setStandardAmount(stdAmt);
        setExpressAmount(expAmt);
        setStandardEta(quote.standard?.etaDays ?? null);
        setExpressEta(quote.express?.etaDays ?? null);
        // Set current active amount by selected method
        const chosen =
          formData.shippingMethod === 'express'
            ? (expAmt ?? stdAmt)
            : (stdAmt ?? expAmt);
        setShippingAmount(Number(chosen ?? 0));
      } catch (err) {
        if (!active) return;
        if (process.env.NODE_ENV !== 'production') {
          console.log('[checkout] quote error', err);
        }
        setShippingError('Could not fetch shipping rates.');
        setStandardAmount(null);
        setExpressAmount(null);
        setStandardEta(null);
        setExpressEta(null);
        setShippingAmount(0);
      } finally {
        if (active) setShippingLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [
    hydrated,
    formData.pincode,
    formData.state,
    selectedAddressId,
    totalWeightKg,
    subtotal,
    formData.shippingMethod
  ]);

  // State autofill sync (separate effect to avoid nesting bugs)
  React.useEffect(() => {
    try {
      const el = document.querySelector(
        'input[name="state"][autocomplete="address-level1"]'
      ) as HTMLInputElement | null;
      if (el && el.value && el.value !== formData.state) {
        setFormData((prev) => ({ ...prev, state: el.value }));
      }
      const t = setTimeout(() => {
        const el2 = document.querySelector(
          'input[name="state"][autocomplete="address-level1"]'
        ) as HTMLInputElement | null;
        if (el2 && el2.value && el2.value !== formData.state) {
          setFormData((prev) => ({ ...prev, state: el2.value }));
        }
      }, 300);
      return () => clearTimeout(t);
    } catch {
      // ignore autofill errors
    }
  }, [formData.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Helper to get current shipping values from selected saved address or form
  const getCurrentShippingFields = () => {
    if (selectedAddressId && addressesTyped) {
      const addr = addressesTyped.find(
        (a) => String(a._id) === selectedAddressId
      );
      if (addr) {
        return {
          address: addr.addressLine1,
          apartment: addr.addressLine2 || '',
          city: addr.city,
          state: addr.state,
          pincode: addr.postalCode
        };
      }
    }
    return {
      address: formData.address,
      apartment: formData.apartment,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode
    };
  };

  // Basic validation: check 6 digits and whether prefix matches selected state
  const isValidPincodeForState = (state: string, pincode: string) => {
    const prefixes: string[] | undefined = STATE_PINCODE_PREFIXES[state];
    // If we have no mapping for this state, allow the pincode (can't validate)
    if (!prefixes || prefixes.length === 0) return true;
    // Match if the entered pincode starts with any known prefix (prefixes may be 2-3 digits)
    return prefixes.some((pref: string) => pincode.startsWith(pref));
  };

  // Validate pin code when user leaves the input (onBlur). Do not enforce length here;
  // just check against the known prefixes for the selected state.
  const handlePincodeBlur = () => {
    const { state, pincode } = formData;
    if (!pincode) {
      setPincodeError('');
      return;
    }

    if (state) {
      const ok = isValidPincodeForState(state, pincode);
      if (!ok) {
        setPincodeError(`Enter a valid postal code for ${state}.`);
        return;
      }
    }

    setPincodeError('');
  };

  // If user enters pincode first and then selects a state, re-validate the
  // already-entered pincode against the newly selected state.
  React.useEffect(() => {
    const { state, pincode } = formData;

    if (!pincode) return;

    if (state) {
      const ok = isValidPincodeForState(state, pincode);
      if (!ok) {
        setPincodeError(`Enter a valid postal code for ${state}.`);
        return;
      }
    }

    setPincodeError('');
  }, [formData.state]);

  // Prefill billing with shipping when toggled to different
  React.useEffect(() => {
    if (!billingSameAsShipping) {
      const snap = getCurrentShippingFields();
      setBilling({
        address: snap.address,
        apartment: snap.apartment,
        city: snap.city,
        state: snap.state,
        pincode: snap.pincode
      });
    }
  }, [billingSameAsShipping, selectedAddressId]);

  // Clerk auth data already initialized above (hasClerk, isLoaded, isSignedIn, user)

  const createOrder = useMutation(api.orders.orders.createOrder);
  const createPayment = useMutation(api.payments.payments.createPayment);
  // Use generated Convex api for addresses (codegen present)
  const createAddress = useMutation(api.addresses.addresses.createAddress);
  // Always pass the query function; it safely returns [] when unauthenticated.
  const existingAddresses = useQuery(
    api.addresses.addresses.getAddressesForUser,
    {}
  );
  const addressesTyped = existingAddresses as unknown as
    | AddressDoc[]
    | undefined;
  const hasAddresses = useMemo(
    () => Boolean(addressesTyped && addressesTyped.length > 0),
    [addressesTyped]
  );

  // Add new address via modal (using account page modal for consistency)
  const handleAddressModalSubmit = async (data: AccountAddress) => {
    try {
      const createdAt = Date.now();
      const newId = await createAddress({
        label: data.name || 'Address',
        addressLine1: data.street,
        addressLine2: undefined,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: 'India',
        phone: data.phone,
        isDefault: !hasAddresses,
        createdAt
      });
      if (newId) {
        setSelectedAddressId(String(newId));
      }
      // Sync local form copy too (for billing prefill etc.)
      setFormData((prev) => ({
        ...prev,
        address: data.street,
        apartment: '',
        city: data.city,
        state: data.state,
        pincode: data.postalCode,
        phone: data.phone
      }));
    } finally {
      setAddressModalOpen(false);
      setUseDifferentAddress(false);
    }
  };

  // Render modal for adding new address when requested
  // (Placed near return for clarity, but could be refactored)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final validation
    if (pincodeError) {
      alert(pincodeError);
      return;
    }

    // If using saved address, require a selection, else require manual fields
    if (hasAddresses && !useDifferentAddress) {
      if (!selectedAddressId) {
        alert('Please select a saved address or use a different address.');
        return;
      }
    } else {
      if (
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.pincode
      ) {
        alert('Please fill in all fields.');
        return;
      }
    }

    if (!selectedAddressId && formData.pincode && formData.state) {
      const ok = isValidPincodeForState(formData.state, formData.pincode);
      if (!ok) {
        setPincodeError(`Enter a valid postal code for ${formData.state}.`);
        alert(
          pincodeError || `Enter a valid postal code for ${formData.state}.`
        );
        return;
      }
    }

    // Require sign-in because Convex mutations expect authenticated user in this project
    if (!isSignedIn || !user) {
      // Professional workflow: user should sign in before checkout
      // Popup google login
      alert('Please sign in to continue with checkout.');
      // popup google login to sign-in where Clerk sign-in is available
      return;
    }

    try {
      // Prepare cart items in the shape expected by convex/orders.createOrder
      const cartItemsForConvex = orderItems.map((it) => ({
        id: String(it.id),
        name: it.name,
        price: Number(it.price),
        originalPrice: Number(it.originalPrice || it.price),
        quantity: Number(it.quantity),
        image: it.image || undefined,
        // Include variant info to avoid ambiguity in order history
        size: it.size,
        // Include weight if provided as a number
        ...(typeof it.weight === 'number' && !Number.isNaN(it.weight)
          ? { weight: Number(it.weight) }
          : {})
      }));

      const subtotalNumber = Number(subtotal);
      const shippingNumber = Number(shipping);
      const totalWeight = totalWeightKg; // computed from cart items
      const savings = 0;

      const createdAt = Date.now();

      // Prepare payment information. If integrating with PhonePe, call our
      // server route to create a PhonePe order and get a redirect URL.
      let phonepeOrderId: string | undefined = undefined;
      let phonepeRedirectUrl: string | undefined = undefined;

      if (formData.paymentMethod === 'phonepe') {
        try {
          const resp = await fetch('/api/phonepe/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: `local-${createdAt}`,
              amount: subtotalNumber + shippingNumber
            })
          });
          const data = await resp.json();
          if (resp.ok && (data.phonepeOrderId || data.orderId)) {
            phonepeOrderId = data.phonepeOrderId || data.orderId;
            phonepeRedirectUrl = data.redirectUrl;
          } else {
            console.warn('PhonePe create-order response:', data);
          }
        } catch (e) {
          console.warn('Failed to create PhonePe order:', String(e));
        }
      }

      // For demo flow if no phonepeOrderId generated, fallback to demo id so server accepts payload
      const demoTxnId = `demo_phonepe_txn_${createdAt}`;
      const paymentObj = {
        // For COD, store a synthetic transaction id so server schema accepts it
        phonepe_payment_id:
          formData.paymentMethod === 'cod'
            ? `cod_${createdAt}`
            : (phonepeOrderId ?? demoTxnId),
        phonepe_order_id: undefined,
        phonepe_signature: undefined
      };

      // Resolve address to use: either a selected saved address, or create new
      let addressIdToUse: string | undefined = undefined;
      try {
        if (hasAddresses && selectedAddressId && !useDifferentAddress) {
          addressIdToUse = selectedAddressId;
        } else if (formData.address) {
          const newAddrId = await createAddress({
            label: 'Home',
            addressLine1: formData.address,
            addressLine2: formData.apartment || undefined,
            city: formData.city,
            state: formData.state,
            postalCode: formData.pincode,
            country: 'India',
            phone: formData.phone,
            // If user doesn't have any address, set new one as default
            isDefault: !hasAddresses,
            createdAt
          });
          addressIdToUse = newAddrId ?? undefined;
        }
      } catch (err) {
        // non-fatal; continue without addressId
        console.warn('Failed to create address automatically', err);
      }

      // Call convex mutation to create order (server will use authenticated user id)
      const orderId = await createOrder({
        cartItems: cartItemsForConvex,
        total: subtotalNumber + shippingNumber,
        shipping: shippingNumber,
        subtotal: subtotalNumber,
        savings,
        pincode: formData.pincode || undefined,
        totalWeight,
        payment: paymentObj,
        addressId: addressIdToUse,
        user: {
          // optional extra user info included in the args (server pulls auth identity separately)
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`.trim()
        },
        createdAt
      });

      // Create a payment record (demo / pending details for PhonePe).
      // If we received a real phonepeOrderId above, include it so records are correlated.
      const paymentPayload = {
        orderId: orderId ?? '',
        userId: user.id ?? '',
        gateway: formData.paymentMethod === 'cod' ? 'cod' : 'phonepe',
        transactionId:
          formData.paymentMethod === 'cod'
            ? `cod_${createdAt}`
            : (phonepeOrderId ?? `demo_phonepe_txn_${createdAt}`),
        status: formData.paymentMethod === 'cod' ? 'pending' : 'pending',
        amount: subtotalNumber + shippingNumber,
        currency: 'INR',
        method: formData.paymentMethod || 'upi',
        details: {
          demo: phonepeOrderId ? false : true,
          pincode: formData.pincode,
          shippingMethod: formData.shippingMethod,
          cartItems: cartItemsForConvex,
          billing: billingSameAsShipping
            ? {
                sameAsShipping: true
              }
            : {
                sameAsShipping: false,
                address: billing.address,
                apartment: billing.apartment,
                city: billing.city,
                state: billing.state,
                pincode: billing.pincode
              }
        },
        createdAt
      };

      await createPayment(paymentPayload);

      // If we have a PhonePe redirect URL, send the customer to it.
      if (formData.paymentMethod === 'phonepe' && phonepeRedirectUrl) {
        try {
          // Persist minimal info for post-return UX
          if (typeof window !== 'undefined') {
            localStorage.setItem('lastOrderId', String(orderId));
          }
          window.location.href = phonepeRedirectUrl;
          return; // Stop further client navigation; redirecting away
        } catch (e) {
          console.warn('Failed to redirect to PhonePe:', String(e));
        }
      }

      // Save last order id for the thank-you page and clear client cart
      try {
        if (orderId) {
          // store minimal info for the thank-you page
          if (typeof window !== 'undefined') {
            localStorage.setItem('lastOrderId', String(orderId));
          }
        }
      } catch {
        // non-critical; continue
      }

      // Clear cart in UI
      try {
        clearCart();
      } catch {
        // ignore
      }

      // Success path: navigate to a thank-you/confirmation page
      alert('Order placed successfully!');
      router.push('/order/thank-you');
    } catch (err: unknown) {
      // Report friendly error and log for debugging
      console.error('Failed to place order', err);
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'Failed to place order. Please try again or contact support.';
      alert(message);
    }
  };

  // Note: PhonePe uses a redirect/intent flow. Checkout is handled by navigating to
  // a URL returned from the server. No client SDK init is required here.

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='border-b border-gray-200 bg-white'>
        <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between'>
            <div
              onClick={() => router.push('/')}
              className='flex cursor-pointer items-center space-x-2'
            >
              <ShoppingBag className='h-8 w-8 text-red-600' />
              <span className='text-2xl font-bold text-gray-900'>
                {process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'}
              </span>
            </div>
            <div className='flex items-center gap-4'>
              <div
                onClick={() => router.push('/cart')}
                className='flex cursor-pointer items-center space-x-2 text-sm text-gray-600'
              >
                <ShoppingBagIcon className='h-4 w-4' />
                <span>Cart</span>
              </div>
              {isSignedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className='rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50'>
                      {emailDisplay || 'Account'}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-48'>
                    <DropdownMenuItem
                      onClick={() => router.push('/account')}
                      className='cursor-pointer'
                    >
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut(() => router.push('/'))}
                      className='cursor-pointer text-red-600'
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className='border-b border-gray-200 bg-white'>
        <div className='mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between space-x-2 text-sm'>
            <div className='flex items-center gap-1'>
              <span
                onClick={() => router.push('/cart')}
                className='cursor-pointer text-gray-600'
              >
                Cart
              </span>
              <ChevronRight className='h-4 w-4 text-gray-400' />
              <span className='font-medium text-gray-900'>Billing</span>
            </div>
            {/* {!isSignedIn && (
              <Button
                variant='link'
                className='cursor-pointer p-0 text-blue-600 underline'
              >
                Sign in
              </Button>
            )} */}
            {showOneTap && (
              <div>
                <GoogleOneTap
                  signInForceRedirectUrl='/checkout'
                  signUpForceRedirectUrl='/checkout'
                  itpSupport
                  fedCmSupport
                  cancelOnTapOutside
                />
              </div>
            )}
            {/* <ChevronRight className='h-4 w-4 text-gray-400' />
            <span className='text-gray-400'>Shipping</span>
            <ChevronRight className='h-4 w-4 text-gray-400' />
            <span className='text-gray-400'>Payment</span> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Left Column - Form */}
          <div className='space-y-6'>
            {/* Address creation modal */}
            {useDifferentAddress && (
              <AddressFormModal
                open={addressModalOpen}
                onOpenChange={(open) => {
                  setAddressModalOpen(open);
                  if (!open) setUseDifferentAddress(false);
                }}
                onSubmit={handleAddressModalSubmit}
              />
            )}
            <form
              id='checkout-form'
              onSubmit={handleSubmit}
              className='space-y-6'
            >
              {/* Contact Information */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900'>
                  Contact Information
                </h2>
                {isSignedIn && emailDisplay ? (
                  <div className='flex items-center justify-between rounded-md border border-gray-200 px-4 py-3 text-sm'>
                    <span className='font-medium text-gray-900'>
                      {emailDisplay}
                    </span>
                    <span className='text-xs text-gray-500'>Signed in</span>
                  </div>
                ) : (
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      autoComplete='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                      placeholder='Email'
                      required
                    />
                  </div>
                )}
              </div>

              {/* Shipping Address */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h2 className='mb-4 flex items-center text-xl font-semibold text-gray-900'>
                  <MapPin className='mr-2 h-5 w-5 text-red-600' />
                  Shipping Address
                </h2>
                {/* Saved addresses selection */}
                {hasAddresses && !useDifferentAddress && (
                  <div className='mb-4 space-y-2'>
                    {addressesTyped!.map((addr) => (
                      <label
                        key={String(addr._id)}
                        className={`flex cursor-pointer items-start rounded-md border px-3 py-2 text-sm transition-colors ${
                          selectedAddressId === String(addr._id) ||
                          (!selectedAddressId && addr.isDefault)
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-red-400'
                        }`}
                      >
                        <input
                          type='radio'
                          name='selectedAddress'
                          value={String(addr._id)}
                          checked={
                            selectedAddressId === String(addr._id) ||
                            (!selectedAddressId && addr.isDefault)
                          }
                          onChange={(e) => setSelectedAddressId(e.target.value)}
                          className='mt-0.5 h-4 w-4 text-red-600 focus:ring-red-500'
                        />
                        <div className='ml-3 flex-1'>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium text-gray-900'>
                              {addr.label || 'Address'}
                            </span>
                            {addr.isDefault && (
                              <span className='rounded bg-gray-900 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white'>
                                Default
                              </span>
                            )}
                          </div>
                          <p className='truncate text-gray-700'>
                            {addr.addressLine1}
                            {addr.addressLine2
                              ? `, ${addr.addressLine2}`
                              : ''}, {addr.city}, {addr.state} {addr.postalCode}
                            , IN
                          </p>
                          {addr.phone && (
                            <p className='text-xs text-gray-500'>
                              Ph: {addr.phone}
                            </p>
                          )}
                        </div>
                      </label>
                    ))}
                    <button
                      type='button'
                      className='text-xs font-medium text-red-600 hover:underline'
                      onClick={() => {
                        setUseDifferentAddress(true);
                        setAddressModalOpen(true);
                      }}
                    >
                      + Use a different address
                    </button>
                  </div>
                )}
                {/* New address form */}
                <div className='space-y-4'>
                  {!hasAddresses && (
                    <>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <label className='mb-2 block text-sm font-medium text-gray-700'>
                            First Name
                          </label>
                          <input
                            type='text'
                            name='firstName'
                            autoComplete='given-name'
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder='First name'
                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                            required
                          />
                        </div>
                        <div>
                          <label className='mb-2 block text-sm font-medium text-gray-700'>
                            Last Name
                          </label>
                          <input
                            type='text'
                            name='lastName'
                            autoComplete='family-name'
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder='Last name'
                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                          Address
                        </label>
                        <input
                          type='text'
                          name='address'
                          autoComplete='address-line1'
                          value={formData.address}
                          onChange={handleInputChange}
                          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                          placeholder='Street address'
                          required
                        />
                      </div>
                      <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type='text'
                          name='apartment'
                          autoComplete='address-line2'
                          value={formData.apartment}
                          onChange={handleInputChange}
                          placeholder='Apartment, suite, etc.'
                          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                        />
                      </div>
                      <div className='grid grid-cols-3 gap-4'>
                        <div>
                          <label className='mb-2 block text-sm font-medium text-gray-700'>
                            City
                          </label>
                          <input
                            type='text'
                            name='city'
                            autoComplete='address-level2'
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder='City'
                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                            required
                          />
                        </div>
                        {/* State */}
                        <div>
                          <label className='mb-2 block text-sm font-medium text-gray-700'>
                            State
                          </label>
                          {/* A visually-hidden input to allow browser autofill for state (address-level1) and sync to our custom control */}
                          <input
                            type='text'
                            name='state'
                            autoComplete='address-level1'
                            value={formData.state}
                            onChange={handleInputChange}
                            // keep it in the DOM so the browser can autofill, but visually hidden
                            className='absolute left-[-9999px] top-auto h-px w-px opacity-0'
                            tabIndex={-1}
                            aria-hidden='true'
                          />
                          <Popover open={stateOpen} onOpenChange={setStateOpen}>
                            <PopoverTrigger asChild>
                              <button
                                type='button'
                                className='flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left focus:border-transparent focus:ring-2 focus:ring-red-500'
                              >
                                <span
                                  className={
                                    formData.state
                                      ? 'text-gray-900'
                                      : 'text-gray-500'
                                  }
                                >
                                  {formData.state || 'State'}
                                </span>
                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className='w-full p-0'
                              align='center'
                            >
                              <Command>
                                <CommandInput
                                  placeholder='Search state...'
                                  className='h-9'
                                />
                                <CommandList>
                                  <CommandEmpty>No state found.</CommandEmpty>
                                  <CommandGroup>
                                    {INDIAN_STATES.map((state) => (
                                      <CommandItem
                                        key={state}
                                        value={state}
                                        onSelect={() => {
                                          handleInputChange({
                                            target: {
                                              name: 'state',
                                              value: state
                                            }
                                          } as React.ChangeEvent<HTMLInputElement>);
                                          setStateOpen(false);
                                        }}
                                      >
                                        {state}
                                        <Check
                                          className={`ml-auto h-4 w-4 ${
                                            formData.state === state
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          }`}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <label className='mb-2 block text-sm font-medium text-gray-700'>
                            PIN Code
                          </label>
                          <input
                            type='text'
                            name='pincode'
                            autoComplete='postal-code'
                            value={formData.pincode}
                            onChange={(e) => {
                              handleInputChange(e);
                              // Clear any existing error while the user is editing
                              setPincodeError('');
                            }}
                            onBlur={handlePincodeBlur}
                            placeholder='PIN Code'
                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                            maxLength={6}
                            required
                          />
                          {pincodeError && (
                            <p className='mt-2 text-sm text-red-600'>
                              {pincodeError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                          Phone
                        </label>
                        <input
                          type='tel'
                          name='phone'
                          autoComplete='tel'
                          value={formData.phone}
                          onChange={handleInputChange}
                          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                          placeholder='Phone'
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Billing address */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900'>
                  Billing address
                </h2>
                <div className='space-y-3'>
                  <label className='flex cursor-pointer items-center justify-between rounded-lg border-2 border-gray-300 p-4 transition-colors hover:border-red-500'>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='billingSame'
                        value='same'
                        checked={billingSameAsShipping}
                        onChange={() => setBillingSameAsShipping(true)}
                        className='h-4 w-4 text-red-600 focus:ring-red-500'
                      />
                      <div className='ml-3'>
                        <p className='font-medium text-gray-900'>
                          Same as shipping address
                        </p>
                      </div>
                    </div>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-colors hover:border-red-500 ${formData.shippingMethod === 'standard' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  >
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='billingSame'
                        value='different'
                        checked={!billingSameAsShipping}
                        onChange={() => setBillingSameAsShipping(false)}
                        className='h-4 w-4 text-red-600 focus:ring-red-500'
                      />
                      <div className='ml-3'>
                        <p className='font-medium text-gray-900'>
                          Use a different billing address
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {!billingSameAsShipping && (
                  <div className='mt-4 space-y-4'>
                    <div>
                      <label className='mb-2 block text-sm font-medium text-gray-700'>
                        Address
                      </label>
                      <input
                        type='text'
                        value={billing.address}
                        onChange={(e) =>
                          setBilling((b) => ({ ...b, address: e.target.value }))
                        }
                        className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                        placeholder='Street address'
                        required
                      />
                    </div>
                    <div>
                      <label className='mb-2 block text-sm font-medium text-gray-700'>
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type='text'
                        value={billing.apartment}
                        onChange={(e) =>
                          setBilling((b) => ({
                            ...b,
                            apartment: e.target.value
                          }))
                        }
                        className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                        placeholder='Apartment, suite, etc.'
                      />
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                          City
                        </label>
                        <input
                          type='text'
                          value={billing.city}
                          onChange={(e) =>
                            setBilling((b) => ({ ...b, city: e.target.value }))
                          }
                          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                          placeholder='City'
                          required
                        />
                      </div>
                      <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                          State
                        </label>
                        <input
                          type='text'
                          value={billing.state}
                          onChange={(e) =>
                            setBilling((b) => ({ ...b, state: e.target.value }))
                          }
                          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                          placeholder='State'
                          required
                        />
                      </div>
                      <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                          PIN Code
                        </label>
                        <input
                          type='text'
                          value={billing.pincode}
                          onChange={(e) => {
                            setBilling((b) => ({
                              ...b,
                              pincode: e.target.value
                            }));
                            setBillingPincodeError('');
                          }}
                          onBlur={() => {
                            if (billing.state && billing.pincode) {
                              const ok = isValidPincodeForState(
                                billing.state,
                                billing.pincode
                              );
                              if (!ok) {
                                setBillingPincodeError(
                                  `Enter a valid postal code for ${billing.state}.`
                                );
                                return;
                              }
                            }
                            setBillingPincodeError('');
                          }}
                          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500'
                          placeholder='PIN Code'
                          maxLength={6}
                          required
                        />
                        {billingPincodeError && (
                          <p className='mt-2 text-sm text-red-600'>
                            {billingPincodeError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Method */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h2 className='mb-4 flex items-center text-xl font-semibold text-gray-900'>
                  <Truck className='mr-2 h-5 w-5 text-red-600' />
                  Shipping Method
                </h2>
                <div className='space-y-3'>
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-colors hover:border-red-500 ${formData.shippingMethod === 'standard' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  >
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='shippingMethod'
                        value='standard'
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleInputChange}
                        className='h-4 w-4 text-red-600 focus:ring-red-500'
                      />
                      <div className='ml-3'>
                        <p className='font-medium text-gray-900'>
                          Standard Shipping
                        </p>
                        <p className='text-xs text-gray-600'>
                          {shippingLoading
                            ? 'Fetching ETA…'
                            : standardEta != null
                              ? `${standardEta} day${standardEta > 1 ? 's' : ''} ETA`
                              : 'ETA pending'}
                        </p>
                      </div>
                    </div>
                    <span className='font-semibold text-gray-900'>
                      {subtotal >= 600
                        ? 'FREE'
                        : shippingLoading
                          ? '…'
                          : standardAmount != null
                            ? `₹${standardAmount}`
                            : '—'}
                    </span>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-colors hover:border-red-500 ${formData.shippingMethod === 'express' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  >
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='shippingMethod'
                        value='express'
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleInputChange}
                        className='h-4 w-4 text-red-600 focus:ring-red-500'
                      />
                      <div className='ml-3'>
                        <p className='font-medium text-gray-900'>
                          Express Shipping
                        </p>
                        <p className='text-xs text-gray-600'>
                          {shippingLoading
                            ? 'Fetching ETA…'
                            : expressEta != null
                              ? `${expressEta} day${expressEta > 1 ? 's' : ''} ETA`
                              : 'ETA pending'}
                        </p>
                      </div>
                    </div>
                    <span className='font-semibold text-gray-900'>
                      {subtotal >= 600
                        ? 'FREE'
                        : shippingLoading
                          ? '…'
                          : expressAmount != null
                            ? `₹${expressAmount}`
                            : '—'}
                    </span>
                  </label>
                  {shippingError && (
                    <p className='text-xs text-red-600'>{shippingError}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h2 className='mb-4 flex items-center text-xl font-semibold text-gray-900'>
                  <CreditCard className='mr-2 h-5 w-5 text-red-600' />
                  Payment Method
                </h2>
                <div className='space-y-3'>
                  <label className='flex items-center rounded-lg border-2 border-gray-300 p-4 transition-colors hover:border-red-500'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='cod'
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className='h-4 w-4 text-red-600 focus:ring-red-500'
                    />
                    <span className='ml-3 font-medium text-gray-900'>
                      Cash on Delivery (COD)
                    </span>
                  </label>
                  <label className='flex cursor-pointer items-center rounded-lg border-2 border-gray-300 p-4 transition-colors hover:border-red-500'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='phonepe'
                      checked={formData.paymentMethod === 'phonepe'}
                      onChange={handleInputChange}
                      className='h-4 w-4 text-red-600 focus:ring-red-500'
                    />
                    <span className='ml-3 font-medium text-gray-900'>
                      PhonePe
                    </span>
                  </label>
                </div>
              </div>

              <Button
                type='submit'
                className='hidden w-full rounded-lg bg-red-600 py-6 text-base font-semibold text-white shadow-lg transition-colors hover:bg-red-700 md:flex'
              >
                {formData.paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
              </Button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className='h-fit lg:sticky lg:top-8'>
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <h2 className='mb-6 text-xl font-semibold text-gray-900'>
                Order Summary
              </h2>

              {/* Order Items */}
              <div className='mb-6 space-y-4'>
                {!hydrated ? (
                  // Lightweight skeleton to keep SSR and first client render identical
                  <div className='animate-pulse space-y-3'>
                    <div className='h-6 w-1/3 rounded bg-gray-200' />
                    <div className='h-20 w-full rounded bg-gray-200' />
                    <div className='h-6 w-1/2 rounded bg-gray-200' />
                  </div>
                ) : (
                  orderItems.map((item) => {
                    const hasDiscount =
                      (item.originalPrice ?? item.price) > item.price;
                    const discountPct = hasDiscount
                      ? Math.round(
                          (((item.originalPrice ?? item.price) - item.price) /
                            (item.originalPrice ?? item.price)) *
                            100
                        )
                      : 0;
                    const imgSrc =
                      item.image ||
                      '/placeholder.svg?height=80&width=80&query=peanut butter jar';
                    const weightLabel =
                      typeof item.weight === 'number' &&
                      !Number.isNaN(item.weight)
                        ? `${item.weight} kg`
                        : '-';
                    return (
                      <div key={item.id} className='flex space-x-4'>
                        <div className='relative'>
                          <Image
                            src={imgSrc}
                            alt={item.name}
                            width={80}
                            height={80}
                            className='h-20 w-20 rounded-lg object-cover'
                          />
                          <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white'>
                            {item.quantity}
                          </span>
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-sm font-medium text-gray-900'>
                            {item.name}
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Weight: {weightLabel}
                          </p>
                          <div className='mt-1 flex flex-wrap items-center gap-2'>
                            <span className='font-semibold text-gray-900'>
                              ₹{item.price}
                            </span>
                            {item.originalPrice ? (
                              <span className='text-xs text-gray-500 line-through'>
                                ₹{item.originalPrice}
                              </span>
                            ) : null}
                            {hasDiscount ? (
                              <span className='text-xs font-medium text-green-600'>
                                {discountPct}% OFF
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Promo Code */}
              <div className='mb-6'>
                <div className='flex space-x-2'>
                  <Input
                    type='text'
                    placeholder='Discount code'
                    className='flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500'
                  />
                  <button className='rounded-lg bg-gray-900 px-6 py-2 font-medium text-white transition-colors hover:bg-gray-800'>
                    Apply
                  </button>
                </div>
              </div>

              {/* Order Totals */}
              <div className='space-y-3 border-t border-gray-200 pt-4'>
                {!hydrated ? (
                  <div className='animate-pulse space-y-3'>
                    <div className='flex justify-between'>
                      <span className='h-4 w-24 rounded bg-gray-200' />
                      <span className='h-4 w-16 rounded bg-gray-200' />
                    </div>
                    <div className='flex justify-between'>
                      <span className='h-4 w-24 rounded bg-gray-200' />
                      <span className='h-4 w-20 rounded bg-gray-200' />
                    </div>
                    <div className='flex justify-between border-t border-gray-200 pt-3'>
                      <span className='h-5 w-16 rounded bg-gray-200' />
                      <span className='h-5 w-24 rounded bg-gray-200' />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='flex justify-between text-gray-600'>
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className='flex justify-between text-gray-600'>
                      <span>
                        Shipping (
                        {formData.shippingMethod === 'express'
                          ? 'Express'
                          : 'Standard'}
                        )
                      </span>
                      <span>
                        {subtotal >= 600
                          ? 'FREE'
                          : shippingLoading
                            ? 'Calculating…'
                            : shippingError
                              ? '—'
                              : `₹${shippingAmount}`}
                      </span>
                    </div>
                    <div className='flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold text-gray-900'>
                      <span>Total</span>
                      <span>
                        ₹
                        {(
                          subtotal + (subtotal >= 600 ? 0 : shippingAmount)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Trust Badges */}
              <div className='mt-6 space-y-2 border-t border-gray-200 pt-6 text-sm text-gray-600'>
                <div className='flex items-center'>
                  <Lock className='mr-2 h-4 w-4 text-green-600' />
                  <span>Secure payment processing</span>
                </div>
                <div className='flex items-center'>
                  <Truck className='mr-2 h-4 w-4 text-green-600' />
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            type='submit'
            form='checkout-form'
            className='mb-10 w-full rounded-lg bg-red-600 py-6 text-base font-semibold text-white shadow-lg transition-colors hover:bg-red-700 md:hidden'
          >
            {formData.paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
          </Button>
        </div>
      </div>
    </div>
  );
}
