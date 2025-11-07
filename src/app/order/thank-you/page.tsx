'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('lastOrderId');
      if (id) setOrderId(id);
    }
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-6'>
      <div className='w-full max-w-xl rounded-lg bg-white p-8 shadow'>
        <h1 className='mb-4 text-2xl font-semibold'>
          Thank you for your order!
        </h1>
        {orderId ? (
          <p className='mb-4 text-gray-700'>
            Your order ID: <strong>{orderId}</strong>
          </p>
        ) : (
          <p className='mb-4 text-gray-700'>
            We received your order. Check your email for details.
          </p>
        )}
        <div className='space-x-2'>
          <Button
            onClick={() => router.push('/products')}
            className='bg-red-600 text-white'
          >
            Continue shopping
          </Button>
          <Button variant='outline' onClick={() => router.push('/account')}>
            View account
          </Button>
        </div>
      </div>
    </div>
  );
}
