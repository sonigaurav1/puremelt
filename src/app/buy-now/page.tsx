'use client';

import { useCart } from '../components/cart-context';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Leaf
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import { PRODUCT_PRICES, PRODUCT_WEIGHTS } from '@/constant';

const BuyNowPage = () => {
  const searchParams = useSearchParams();
  const [selectedWeight, setSelectedWeight] = useState(
    searchParams?.get('weight') || '500g'
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const router = useRouter();

  const productImages = ['/product.webp', '/product.webp', '/product.webp'];

  const currentPrice =
    PRODUCT_PRICES[selectedWeight as keyof typeof PRODUCT_PRICES];
  const discount = Math.round(
    ((currentPrice.original - currentPrice.discounted) /
      currentPrice.original) *
      100
  );

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  const { addToCart } = useCart();

  const addToCartHandler = () => {
    // Parse weight from selectedWeight (supports "500g" and "1kg")
    let weight = 0;
    if (selectedWeight.endsWith('kg')) {
      weight = Number(selectedWeight.replace('kg', ''));
    } else if (selectedWeight.endsWith('g')) {
      weight = Number(selectedWeight.replace('g', '')) / 1000;
    }
    addToCart({
      name: `${process.env.NEXT_PUBLIC_BRAND_NAME} Premium All-in-One Nuts Butter (${selectedWeight})`,
      size: selectedWeight,
      price: currentPrice.discounted,
      originalPrice: currentPrice.original,
      quantity,
      image: '/product.webp',
      weight
    });
    router.push('/cart');
  };

  // Razorpay script loader
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingScript = document.getElementById('razorpay-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'razorpay-script';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Buy Healthy Peanut Butter Online | Penowa</title>
        <meta
          name='description'
          content='Buy Penowa premium healthy peanut butter and nuts butter online. 100% natural, organic, no preservatives, no palm oil, no refined sugar. Fast delivery in India.'
        />
        <meta
          name='keywords'
          content='buy peanut butter, buy healthy peanut butter, buy nuts butter, penowa online, order peanut butter India, premium peanut butter'
        />
        <link
          rel='canonical'
          href={
            (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
            '/buy-now'
          }
        />
        {/* Buy Now Page Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name:
                (process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa') +
                ' Premium Peanut Butter',
              image: [
                (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                  '/product.webp'
              ],
              description:
                'Buy Penowa premium healthy peanut butter and nuts butter online. 100% natural, organic, no preservatives, no palm oil, no refined sugar. Fast delivery in India.',
              brand: {
                '@type': 'Brand',
                name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'
              },
              offers: {
                '@type': 'Offer',
                url:
                  (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                  '/buy-now',
                priceCurrency: 'INR',
                price: '599',
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.5',
                reviewCount: '2500'
              }
            })
          }}
        />
      </Head>

      <div className='min-h-screen bg-black text-white'>
        {/* Header */}
        <Header />

        {/* Product Section */}
        <section className='bg-black pb-12 pt-[70px] text-white md:pt-24'>
          <div className='container mx-auto'>
            <div className='grid gap-6 lg:grid-cols-2'>
              {/* Left - Product Images */}
              <div className='space-y-4 px-4 py-4 md:max-h-max'>
                {/* Main Image */}
                <div className='relative overflow-hidden rounded-2xl border border-black/40 bg-white shadow-lg'>
                  <Image
                    src={
                      productImages[selectedImageIndex] || '/placeholder.svg'
                    }
                    alt={`${process.env.NEXT_PUBLIC_BRAND_NAME} Product`}
                    width={500}
                    height={500}
                    className='h-96 w-full object-cover'
                  />
                  <div className='absolute right-4 top-4'>
                    <Badge className='bg-green-500 text-white'>
                      100% Organic
                    </Badge>
                  </div>
                </div>

                {/* Thumbnail Images */}
                <div className='relative'>
                  <div className='flex space-x-2 overflow-hidden px-8'>
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                          selectedImageIndex === index
                            ? 'border-primary-color'
                            : 'border-black/20 opacity-60 hover:border-primary-color'
                        }`}
                      >
                        <Image
                          src={image || '/placeholder.svg'}
                          alt={`Product view ${index + 1}`}
                          width={80}
                          height={80}
                          className='h-full w-full object-cover'
                        />
                      </button>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className='absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 rounded-full border border-[#f8d87d] bg-white p-2 shadow-lg hover:bg-amber-50'
                  >
                    <ChevronLeft className='h-4 w-4 text-black' />
                  </button>
                  <button
                    onClick={nextImage}
                    className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 rounded-full border border-[#f8d87d] bg-white p-2 shadow-lg hover:bg-amber-50'
                  >
                    <ChevronRight className='h-4 w-4 text-black' />
                  </button>
                </div>
              </div>

              {/* Right - Product Details */}
              <div className='space-y-6 px-4 md:pt-3'>
                {/* Product Title and Rating */}
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold text-primary-color'>
                    {process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'} Premium
                    All-in-One Nuts Butter ({selectedWeight})
                  </h1>
                  <div className='flex items-center space-x-2'>
                    <div className='flex items-center'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className='h-4 w-4 fill-amber-400 text-amber-400'
                        />
                      ))}
                    </div>
                    <span className='text-sm'>(2,500+ reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className='space-y-2'>
                  <div className='flex items-center space-x-4'>
                    <span className='text-3xl font-bold'>
                      ₹{currentPrice.discounted}
                    </span>
                    <span className='text-xl text-[#f8d87d] line-through'>
                      ₹{currentPrice.original}
                    </span>
                    <Badge className='bg-green-100 text-green-800'>
                      {discount}% OFF
                    </Badge>
                  </div>
                  <p className='mt-1 text-sm'>(Inclusive all taxes)</p>
                </div>

                {/* Size Selection */}
                <div className='space-y-2'>
                  <label className='font-medium text-white'>Choose Size:</label>
                  <Select
                    value={selectedWeight}
                    onValueChange={setSelectedWeight}
                  >
                    <SelectTrigger className='w-full text-black'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_WEIGHTS.map((weight: string) => (
                        <SelectItem value={weight} key={weight}>
                          {weight} - ₹
                          {
                            PRODUCT_PRICES[
                              weight as keyof typeof PRODUCT_PRICES
                            ].discounted
                          }{' '}
                          (
                          <span className='line-through'>
                            ₹
                            {
                              PRODUCT_PRICES[
                                weight as keyof typeof PRODUCT_PRICES
                              ].original
                            }
                          </span>
                          )
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div className='space-y-2'>
                  <label className='font-medium text-white'>Quantity:</label>
                  <div className='flex items-center space-x-4'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className='border-[#f8d87d] text-black'
                    >
                      -
                    </Button>
                    <span className='min-w-[2rem] text-center text-xl font-medium text-white'>
                      {quantity}
                    </span>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setQuantity(quantity + 1)}
                      className='border-[#f8d87d] text-black'
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='space-y-3'>
                  <Button
                    size='lg'
                    className='w-full bg-[#EEFF00] font-bold text-black'
                    onClick={addToCartHandler}
                  >
                    <ShoppingCart className='mr-2 h-5 w-5' />
                    Add to Cart
                  </Button>
                </div>

                {/* Features */}
                <div className='grid grid-cols-3 gap-4 pt-4'>
                  {[
                    {
                      icon: (
                        <Star className='mx-auto mb-2 h-6 w-6 text-primary-color' />
                      ),
                      label: 'Top Rated Quality'
                    },
                    {
                      icon: (
                        <Shield className='mx-auto mb-2 h-6 w-6 text-primary-color' />
                      ),
                      label: 'Secure Payment'
                    },
                    {
                      icon: (
                        <Truck className='mx-auto mb-2 h-6 w-6 text-primary-color' />
                      ),
                      label: 'Fast Delivery'
                    }
                  ].map((feature, idx) => (
                    <div className='text-center' key={feature.label}>
                      {feature.icon}
                      <p className='text-xs text-primary-color'>
                        {feature.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Product Description */}
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold text-primary-color'>
                    Product Description
                  </h3>
                  <div className='space-y-3'>
                    <p>
                      {process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'} is not
                      just another nuts butter. It&apos;s a carefully crafted
                      blend of seven premium ingredients that creates a unique
                      taste experience unlike anything else in the market.
                    </p>
                    <p>
                      Our signature blend includes roasted peanuts for crunch,
                      smooth almonds for creaminess, rich cashews for
                      indulgence, premium pistachios for luxury, natural dates
                      for sweetness, and pure honey for golden flavor.
                    </p>
                  </div>

                  {/* Features with icons */}
                  <div className='grid w-full grid-cols-2 gap-4'>
                    {[
                      {
                        icon: (
                          <Star className='mx-auto mb-1 h-6 w-6 text-[#e3ef26]' />
                        ), // protein
                        title: 'Protein Rich',
                        description: '25g protein per 100g'
                      },
                      {
                        icon: (
                          <Leaf className='mx-auto mb-1 h-6 w-6 text-[#e3ef26]' />
                        ), // healthy fats
                        title: 'Healthy Fats',
                        description: 'Omega-3 & Omega-6'
                      },
                      {
                        icon: (
                          <Shield className='mx-auto mb-1 h-6 w-6 text-[#e3ef26]' />
                        ), // no preservatives
                        title: 'No Preservatives',
                        description: '100% Natural'
                      },
                      {
                        icon: (
                          <Heart className='mx-auto mb-1 h-6 w-6 text-[#e3ef26]' />
                        ), // fiber
                        title: 'Fiber Rich',
                        description: 'From dates & nuts'
                      }
                    ].map((item) => (
                      <div
                        key={item.title}
                        className='flex flex-col items-center rounded-xl border-[2.5px] border-[#f8d87d] bg-[#efefef] p-4 py-6 text-center shadow-sm'
                      >
                        <h4 className='mb-1 text-base font-bold text-primary-color'>
                          {item.title}
                        </h4>
                        <p className='text-xs text-black opacity-80'>
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BuyNowPage;
