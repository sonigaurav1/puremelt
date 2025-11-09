'use client';

import type React from 'react';

import { useCart } from '@/app/components/cart-context';
import { useRouter } from 'next/navigation';
// Removed unused React state import (wishlist logic deleted)
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const ProductCard: React.FC<{
  weight: string;
  productName: string;
  original: number;
  price: number;
  description?: string;
  slug: string;
}> = ({ weight, productName, original, price, description, slug }) => {
  // Wishlist logic removed (unused state & handler eliminated to fix lint warnings)

  // const price =
  //   PRODUCT_PRICES[weight as keyof typeof PRODUCT_PRICES].discounted;
  // const original =
  //   PRODUCT_PRICES[weight as keyof typeof PRODUCT_PRICES].original;

  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddNow = () => {
    addToCart({
      // Use the actual productName prop instead of hardcoded label so different products
      // (e.g. Peanut & Dates Butter, Almond • Walnut • Cashew Butter) show correctly in cart.
      name: `${process.env.NEXT_PUBLIC_BRAND_NAME} ${productName} (${weight})`,
      size: weight,
      price,
      originalPrice: original,
      quantity: 1,
      image: '/product.webp',
      weight: Number(weight.replace('g', '')) / 1000
    });
    router.push('/cart');
  };

  // toggleWishlist removed

  return (
    <Card className='group relative flex flex-col overflow-hidden border border-amber-600 bg-white bg-gradient-to-b shadow-lg transition-all duration-300 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/10 md:min-w-80'>
      {/* Product Image Container */}
      <div className='relative overflow-hidden bg-zinc-800/50'>
        <div className='relative h-48 w-full sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96'>
          <Link href={`/products/${slug}`}>
            <Image
              src='/penowa.png'
              alt={`${process.env.NEXT_PUBLIC_BRAND_NAME} ${weight}`}
              fill
              className='object-fit transition-transform duration-300 group-hover:scale-105'
              loading='lazy'
            />
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className='flex flex-1 flex-col p-0'>
        {/* Brand & Title */}
        <div className='flex flex-col gap-2'>
          {/* <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            {process.env.NEXT_PUBLIC_BRAND_NAME}
          </h4> */}
          <Link href={`/products/${slug}`}>
            <h3 className='-mb-2 min-h-[50px] px-2 py-1 text-base font-semibold leading-[18px] text-amber-600 md:px-2 md:pt-3 md:text-lg'>
              {productName}
            </h3>
          </Link>
        </div>

        {/* Description */}
        <p className='mb-1 hidden text-sm leading-relaxed md:block md:px-2'>
          {description}
        </p>

        {/* Pricing Section */}
        <div className='flex items-baseline gap-3 px-2 pt-0 md:px-2'>
          <span className='bg-gradient-to-r from-[hsl(var(--honey))] to-[hsl(var(--amber-rich))] bg-clip-text text-lg font-bold text-transparent'>
            ₹{price}
          </span>
          <span className='text-sm text-slate-700 line-through'>
            ₹{original}
          </span>
          {/* <span className="ml-auto text-xs font-semibold uppercase text-emerald-400">
            Save {Math.round(((original - price) / original) * 100)}%
          </span> */}
          {/* Weight */}
          <p className='text-sm'>{weight}</p>
        </div>

        {/* Action Buttons */}
        <div className='mt-auto flex gap-3 pt-2'>
          <Button
            size='sm'
            className='flex-1 items-center gap-2 rounded-none bg-[#FFFF00] bg-gradient-to-r from-[hsl(var(--honey))] to-[hsl(var(--amber-rich))] font-semibold text-white transition-all duration-200 hover:bg-[#e6e600] hover:shadow-md'
            onClick={handleAddNow}
          >
            <ShoppingCart className='h-4 w-4' />
            Add to Cart
          </Button>

          {/* Wishlist button intentionally removed */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
