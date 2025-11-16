'use client';

import { useCart } from '../components/cart-context';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, ShoppingBag, Trash, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/layout/Header';

import { useRouter } from 'next/navigation';
import { fetchShippingQuote } from '@/lib/shipping';

export default function CartPage() {
  const router = useRouter();

  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Shipping inputs and results
  const [pincode, setPincode] = useState<string>('');
  const [shippingCharge, setShippingCharge] = useState<number | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);
  const inFlight = useRef<AbortController | null>(null);

  // Calculate total cart weight (assumes item.weight in kg)
  const totalWeight = cartItems.reduce(
    (sum: number, item: (typeof cartItems)[0]) =>
      sum + (item.weight || 0) * item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (sum: number, item: (typeof cartItems)[0]) =>
      sum + item.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum: number, item: (typeof cartItems)[0]) =>
      sum + item.originalPrice * item.quantity,
    0
  );
  const savings = originalTotal - subtotal;

  // Compute shipping with quote when available; otherwise fallback rule
  const shipping = useMemo(() => {
    if (shippingCharge !== null) return shippingCharge;
    // Fallback: free shipping on/above ₹600, else flat ₹50
    return subtotal >= 600 ? 0 : 50;
  }, [shippingCharge, subtotal]);
  const total = subtotal + shipping;

  // Load cached pincode (nice UX)
  useEffect(() => {
    try {
      const cached = localStorage.getItem('deliveryPincode');
      if (cached && /^[1-9][0-9]{5}$/.test(cached)) {
        setPincode(cached);
      }
    } catch (e) {
      // ignore localStorage access errors (private mode etc.)
      console.warn('Failed reading cached pincode', e);
    }
  }, []);

  // Debounced auto-quote when a valid 6-digit pincode is typed
  useEffect(() => {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) return;
    const t = setTimeout(async () => {
      await handleQuote();
    }, 350);
    return () => clearTimeout(t);
  }, [pincode, totalWeight]);

  async function handleQuote() {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setShippingError('Enter a valid 6-digit pincode');
      setShippingCharge(null);
      return;
    }
    setShippingError(null);
    setShippingLoading(true);
    // cancel previous
    inFlight.current?.abort();
    const ac = new AbortController();
    inFlight.current = ac;
    try {
      const quote = await fetchShippingQuote(
        { toPincode: pincode, weightKg: totalWeight, orderValue: subtotal },
        ac.signal
      );
      if (!quote.serviceable) {
        setShippingError(quote.error || 'Address not serviceable');
        setShippingCharge(null);
      } else {
        // Prefer standard amount when available
        const amt = quote.standard?.amount ?? quote.express?.amount ?? null;
        setShippingCharge(amt);
        try {
          localStorage.setItem('deliveryPincode', pincode);
        } catch (e) {
          console.warn('Failed caching pincode', e);
        }
      }
    } catch {
      setShippingError('Could not fetch shipping rates. Try again.');
      setShippingCharge(null);
    } finally {
      setShippingLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-black'>
      {/* Header */}
      <Header />

      {/* Cart Content */}
      <section className='px-4 pb-16 pt-20 md:px-14 md:pt-24'>
        <div className='mx-auto'>
          <div className='mb-8'>
            <h1 className='mb-2 text-4xl font-bold text-white'>
              Shopping Cart
            </h1>
            <div className='h-1 w-16 rounded bg-amber-400'></div>
          </div>

          {cartItems.length === 0 ? (
            <div className='rounded-2xl border border-white bg-black py-24 text-center shadow-lg'>
              <ShoppingBag className='mx-auto mb-6 h-20 w-20 text-amber-400' />
              <h2 className='mb-4 text-2xl font-bold text-white'>
                Your cart is empty
              </h2>
              <p className='mb-8 text-gray-400'>
                Add some delicious peanut butter to get started!
              </p>
              <Link href='/products'>
                <Button className='rounded-xl bg-amber-500 px-8 py-3 text-lg font-semibold text-white hover:bg-amber-600'>
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className='overflow-hidden rounded-2xl border border-white bg-black shadow-lg'>
              {/* Table Header */}
              <div className='hidden gap-4 border-b border-gray-700 bg-gray-800 p-6 md:grid md:grid-cols-12'>
                <div className='col-span-6 font-semibold text-amber-400'>
                  Products
                </div>
                <div className='col-span-2 text-center font-semibold text-amber-400'>
                  Price
                </div>
                <div className='col-span-2 text-center font-semibold text-amber-400'>
                  Quantity
                </div>
                <div className='col-span-2 text-center font-semibold text-amber-400'>
                  Total
                </div>
              </div>

              {/* Cart Items */}
              <div className='divide-y divide-gray-800'>
                {cartItems.map((item: (typeof cartItems)[0]) => (
                  <div key={item.id} className='p-4 md:p-6'>
                    <div className='md:grid md:grid-cols-12 md:items-center md:gap-4'>
                      {/* Mobile Layout */}
                      <div className='md:hidden'>
                        <div className='mb-4 flex gap-4'>
                          <div className='relative flex-shrink-0'>
                            <Image
                              src={
                                item.image ||
                                '/placeholder.svg?height=80&width=80&query=peanut butter jar'
                              }
                              alt={item.name}
                              width={80}
                              height={80}
                              className='rounded-lg border border-gray-700 bg-gray-800'
                            />
                          </div>
                          <div className='min-w-0 flex-1'>
                            <div className='relative'>
                              <h3 className='mb-1 mr-8 text-base font-semibold leading-tight text-primary-color'>
                                {item.name}
                              </h3>
                              <Trash
                                className='size-5.3 mt-.3 absolute right-0 top-0 cursor-pointer text-red-500 hover:text-red-600'
                                onClick={() => removeFromCart(item.id)}
                              />
                            </div>
                            {/* <p className="text-gray-400 text-sm mb-2">
                              Size: {item.size}
                            </p> */}
                            <p className='mb-2 text-sm text-gray-400'>
                              Weight: {item.weight ? `${item.weight} kg` : '-'}
                            </p>
                            <div className='mb-3 flex items-center gap-2'>
                              <span className='text-lg font-bold text-white'>
                                ₹{item.price}
                              </span>
                              <span className='text-sm text-gray-500 line-through'>
                                ₹{item.originalPrice}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center justify-between'>
                          <div className='flex items-center overflow-hidden rounded-lg border border-gray-600'>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className='flex h-10 w-10 items-center justify-center bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700'
                            >
                              <Minus className='h-4 w-4' />
                            </button>
                            <span className='flex h-10 w-12 items-center justify-center bg-gray-900 font-semibold text-white'>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className='flex h-10 w-10 items-center justify-center bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700'
                            >
                              <Plus className='h-4 w-4' />
                            </button>
                          </div>
                          <div className='text-right'>
                            <div className='mb-1 text-xs text-gray-400'>
                              Total
                            </div>
                            <span className='text-lg font-bold text-white'>
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      {/* Product Info */}
                      <div className='hidden items-center gap-4 md:col-span-6 md:flex md:items-start'>
                        <div className='relative'>
                          <Image
                            src={
                              item.image ||
                              '/placeholder.svg?height=80&width=80&query=peanut butter jar'
                            }
                            alt={item.name}
                            width={80}
                            height={80}
                            className='aspect-square rounded-lg border border-gray-700 bg-gray-800'
                          />
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white transition-colors hover:bg-red-600'
                          >
                            ×
                          </button>
                        </div>
                        <div className='md:pt-1'>
                          <h3 className='mb-1 text-lg font-semibold text-white'>
                            {item.name}
                          </h3>
                          {/* <p className="text-gray-400 text-sm">
                            Size: {item.size}
                          </p> */}
                          <p className='text-sm text-gray-400'>
                            Weight: {item.weight ? `${item.weight} kg` : '-'}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className='hidden text-center md:col-span-2 md:block'>
                        <div className='flex flex-col items-center'>
                          <span className='text-lg font-bold text-white'>
                            ₹{item.price}
                          </span>
                          <span className='text-sm text-gray-500 line-through'>
                            ₹{item.originalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className='hidden justify-center md:col-span-2 md:flex'>
                        <div className='flex items-center overflow-hidden rounded-lg border border-gray-600'>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className='flex h-10 w-10 items-center justify-center bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700'
                          >
                            <Minus className='h-4 w-4' />
                          </button>
                          <span className='flex h-10 w-12 items-center justify-center bg-gray-900 font-semibold text-white'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className='flex h-10 w-10 items-center justify-center bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700'
                          >
                            <Plus className='h-4 w-4' />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className='hidden text-center md:col-span-2 md:block'>
                        <span className='text-lg font-bold text-white'>
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className='border-t border-white bg-black p-4 md:p-6'>
                <div className='md:ml-auto md:max-w-md'>
                  <div className='mb-6 space-y-3'>
                    <div className='flex justify-between text-gray-300'>
                      <span>Subtotal:</span>
                      <span className='font-semibold text-white'>
                        ₹{subtotal}
                      </span>
                    </div>

                    <div className='flex justify-between text-gray-300'>
                      <span>Original Total:</span>
                      <span className='font-semibold text-white line-through'>
                        ₹{originalTotal}
                      </span>
                    </div>

                    {savings > 0 && (
                      <div className='flex justify-between text-green-400'>
                        <span>Total Savings:</span>
                        <span className='font-semibold'>₹{savings}</span>
                      </div>
                    )}

                    {/* Pincode input for shipping calculation */}
                    <div className='mb-2 flex flex-wrap items-center gap-2'>
                      <label
                        htmlFor='pincode'
                        className='text-sm text-gray-300'
                      >
                        Delivery Pincode:
                      </label>
                      <input
                        id='pincode'
                        inputMode='numeric'
                        pattern='[0-9]{6}'
                        maxLength={6}
                        value={pincode}
                        onChange={(e) =>
                          setPincode(e.target.value.replace(/\D/g, ''))
                        }
                        className='w-32 rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-white focus:outline-none'
                        placeholder='e.g. 560001'
                        aria-invalid={!!shippingError}
                        aria-describedby='pincode-help'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        className='rounded-lg border border-amber-400 px-4 py-2 text-sm text-amber-400 hover:bg-amber-400/10'
                        onClick={handleQuote}
                        disabled={shippingLoading}
                      >
                        {shippingLoading ? 'Calculating…' : 'Calculate'}
                      </Button>
                      <span id='pincode-help' className='text-xs text-gray-400'>
                        Accurate rates powered by Delhivery
                      </span>
                    </div>
                    {shippingError && (
                      <div className='-mt-1 mb-2 text-xs text-red-400'>
                        {shippingError}
                      </div>
                    )}

                    <div className='flex justify-between text-gray-300'>
                      <span>Total Weight:</span>
                      <span className='font-semibold text-white'>
                        {totalWeight.toFixed(2)} kg
                      </span>
                    </div>

                    <div className='flex justify-between text-gray-300'>
                      <span>Shipping:</span>
                      <span className='font-semibold text-white'>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                        <span className='ml-2 text-xs text-gray-400'>
                          {shippingCharge === null
                            ? '(Estimated; calculate for exact)'
                            : '(Delhivery Standard)'}
                        </span>
                      </span>
                    </div>

                    {subtotal < 600 && (
                      <p className='rounded-lg border border-amber-500/30 bg-gray-800 p-3 text-sm text-amber-300'>
                        Add ₹{600 - subtotal} more for free shipping!
                      </p>
                    )}

                    <Separator className='bg-gray-600' />

                    <div className='flex justify-between text-xl font-bold text-white'>
                      <span>Total:</span>
                      <span className='text-amber-400'>₹{total}</span>
                    </div>
                  </div>

                  {/* ReCAPTCHA Container */}
                  <div id='recaptcha-container'></div>
                  <div className=''>
                    <Button
                      onClick={() => router.push('/checkout')} // Implement payment logic using cartItems from context if needed
                      className='mb-4 w-full rounded-xl bg-gradient-to-r from-[hsl(var(--honey))] to-[hsl(var(--amber-rich))] py-4 text-lg font-semibold text-black hover:bg-[#EEFF00]/90'
                    >
                      🔒 Checkout
                    </Button>
                    <Link href='/products'>
                      <Button className='w-full rounded-xl bg-transparent py-4 text-lg font-semibold text-white'>
                        Continue Shopping
                        <ArrowRight className='ml-1 h-4 w-4' />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
