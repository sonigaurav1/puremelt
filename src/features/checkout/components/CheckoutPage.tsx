'use client';
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
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
import { useCart } from '@/app/components/cart-context';

export default function Checkout() {
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

  const router = useRouter();

  // Use the cart context so checkout reflects live cart state
  const { cartItems, clearCart, getTotalPrice } = useCart();

  const orderItems = cartItems;

  const subtotal = getTotalPrice();
  const shipping = formData.shippingMethod === 'express' ? 200 : 0;
  const total = subtotal + shipping;

  // Sync potential browser autofill for the hidden state input on mount
  React.useEffect(() => {
    try {
      const el = document.querySelector(
        'input[name="state"][autocomplete="address-level1"]'
      ) as HTMLInputElement | null;
      if (el && el.value && el.value !== formData.state) {
        setFormData((prev) => ({ ...prev, state: el.value }));
      }
      // Check again shortly after mount as some browsers apply autofill asynchronously
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
      // ignore
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  // Guard Clerk hook usage so build can succeed even if Clerk env vars
  // aren't configured (e.g., preview builds). If publishable key missing,
  // treat user as unauthenticated without calling the hook.
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const clerkData = hasClerk
    ? useUser()
    : ({} as unknown as { user: undefined; isSignedIn: false });
  const { user, isSignedIn } = clerkData;

  const createOrder = useMutation(api.orders.orders.createOrder);
  const createPayment = useMutation(api.payments.payments.createPayment);
  // Use generated Convex api for addresses (codegen present)
  const createAddress = useMutation(api.addresses.addresses.createAddress);
  // Always pass the query function; it safely returns [] when unauthenticated.
  const existingAddresses = useQuery(
    api.addresses.addresses.getAddressesForUser,
    {}
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final validation
    if (pincodeError) {
      alert(pincodeError);
      return;
    }

    if (
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert('Please fill in all fields.');
      return;
    }

    if (formData.pincode && formData.state) {
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
        image: it.image || undefined
        // weight optional and expected as number in this project; omit if not numeric
      }));

      const subtotalNumber = Number(subtotal);
      const shippingNumber = Number(shipping);
      const totalWeight = 0; // compute if you have real weights
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
        razorpay_payment_id: phonepeOrderId ?? demoTxnId,
        razorpay_order_id: undefined,
        razorpay_signature: undefined
      };

      // If user has no saved addresses, create one and pass addressId to order
      let addressIdToUse: string | undefined = undefined;
      try {
        if (
          isSignedIn &&
          existingAddresses &&
          Array.isArray(existingAddresses) &&
          existingAddresses.length === 0 &&
          formData.address
        ) {
          const createdAt = Date.now();
          const addrId = await createAddress({
            label: 'Home',
            addressLine1: formData.address,
            addressLine2: formData.apartment || undefined,
            city: formData.city,
            state: formData.state,
            postalCode: formData.pincode,
            country: 'India',
            phone: formData.phone,
            isDefault: true,
            createdAt
          });
          addressIdToUse = addrId ?? undefined;
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
        gateway: 'phonepe',
        transactionId: phonepeOrderId ?? `demo_phonepe_txn_${createdAt}`,
        status: 'pending',
        amount: subtotalNumber + shippingNumber,
        currency: 'INR',
        method: formData.paymentMethod || 'upi',
        details: {
          demo: phonepeOrderId ? false : true,
          pincode: formData.pincode,
          shippingMethod: formData.shippingMethod,
          cartItems: cartItemsForConvex
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
            <div
              onClick={() => router.push('/cart')}
              className='flex cursor-pointer items-center space-x-2 text-sm text-gray-600'
            >
              <ShoppingBagIcon className='h-4 w-4' />
              <span>Cart</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className='border-b border-gray-200 bg-white'>
        <div className='mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8'>
          <div className='flex items-center space-x-2 text-sm'>
            <span
              onClick={() => router.push('/cart')}
              className='cursor-pointer text-gray-600'
            >
              Cart
            </span>
            <ChevronRight className='h-4 w-4 text-gray-400' />
            <span className='font-medium text-gray-900'>Billing</span>
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
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Contact Information */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900'>
                  Contact Information
                </h2>
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
                    placeholder='you@example.com'
                    required
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h2 className='mb-4 flex items-center text-xl font-semibold text-gray-900'>
                  <MapPin className='mr-2 h-5 w-5 text-red-600' />
                  Shipping Address
                </h2>
                <div className='space-y-4'>
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
                        <PopoverContent className='w-full p-0' align='center'>
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
                      placeholder='+91'
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h2 className='mb-4 flex items-center text-xl font-semibold text-gray-900'>
                  <Truck className='mr-2 h-5 w-5 text-red-600' />
                  Shipping Method
                </h2>
                <div className='space-y-3'>
                  <label className='flex cursor-pointer items-center justify-between rounded-lg border-2 border-gray-300 p-4 transition-colors hover:border-red-500'>
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
                        <p className='text-sm text-gray-600'>
                          5-7 business days
                        </p>
                      </div>
                    </div>
                    <span className='font-semibold text-green-600'>FREE</span>
                  </label>
                  <label className='flex cursor-pointer items-center justify-between rounded-lg border-2 border-gray-300 p-4 transition-colors hover:border-red-500'>
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
                        <p className='text-sm text-gray-600'>
                          2-3 business days
                        </p>
                      </div>
                    </div>
                    <span className='font-semibold text-gray-900'>₹200</span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h2 className='mb-4 flex items-center text-xl font-semibold text-gray-900'>
                  <CreditCard className='mr-2 h-5 w-5 text-red-600' />
                  Payment Method
                </h2>
                <div className='space-y-3'>
                  {/* <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-red-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-3 font-medium text-gray-900">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-red-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-3 font-medium text-gray-900">Credit/Debit Card</span>
                  </label> */}
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
                Pay Now
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
                {orderItems.map((item) => (
                  <div key={item.id} className='flex space-x-4'>
                    <div className='relative'>
                      <img
                        src={item.image}
                        alt={item.name}
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
                        Weight: {item.weight}
                      </p>
                      <div className='mt-1 flex items-center space-x-2'>
                        <span className='font-semibold text-gray-900'>
                          ₹{item.price}
                        </span>
                        <span className='text-xs text-gray-500 line-through'>
                          ₹{item.originalPrice}
                        </span>
                        {item.originalPrice > item.price ? (
                          <span className='text-xs font-medium text-green-600'>
                            {Math.round(
                              ((item.originalPrice - item.price) /
                                item.originalPrice) *
                                100
                            )}
                            % OFF
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
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
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className='flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold text-gray-900'>
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
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
            className='mb-10 w-full rounded-lg bg-red-600 py-6 text-base font-semibold text-white shadow-lg transition-colors hover:bg-red-700 md:hidden'
          >
            Complete Order
          </Button>
        </div>
      </div>
    </div>
  );
}
