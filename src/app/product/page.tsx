'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Leaf, Shield, Award, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import Head from 'next/head';
import Header from '@/components/layout/Header';
import {
  PRODUCT_INGREDIENTS_DETAILED_PRODUCT_PAGE,
  PRODUCT_PRICES,
  PRODUCT_WEIGHTS
} from '@/constant';
import { useState } from 'react';

export default function ProductPage() {
  const [selectedWeight, setSelectedWeight] = useState<
    (typeof PRODUCT_WEIGHTS)[number]
  >(PRODUCT_WEIGHTS[0]);

  return (
    <>
      <Head>
        <title>
          Premium Healthy Peanut Butter & Nuts Butter | Penowa Product
        </title>
        <meta
          name='description'
          content="Discover Penowa's premium healthy peanut butter and nuts butter. Made with peanuts, almonds, cashews, pistachios, dates, honey & . No preservatives, no palm oil, no refined sugar."
        />
        <meta
          name='keywords'
          content='peanut butter, healthy peanut butter, premium nuts butter, organic peanut butter, penowa product, best peanut butter India, protein peanut butter'
        />
        <link
          rel='canonical'
          href={
            (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
            '/product'
          }
        />
        {/* Product Page Structured Data */}
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
                  '/hero-butter.webp',
                (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                  '/cta.webp'
              ],
              description:
                'Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates, honey & . No preservatives, no palm oil, no refined sugar. Healthier, tastier, organic.',
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

        {/* Hero Section */}
        <section className='px-4 pt-28'>
          <div className='container mx-auto text-center'>
            <h1 className='mb-6 font-playfair text-5xl font-bold text-white'>
              <span className='text-primary-color'>
                {process.env.NEXT_PUBLIC_BRAND_NAME}{' '}
              </span>
              Premium Nuts Butter
            </h1>
            <p className='mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-white'>
              The only nuts butter you'll ever need. Seven premium ingredients
              blended to perfection in one signature variant.
            </p>
            <Link href='/buy-now'>
              <Button
                size='lg'
                className='bg-[#EEFF00] px-8 py-3 text-lg text-black'
              >
                Order Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Product Showcase */}
        <section className='bg-black pt-24'>
          <div className='container mx-auto px-4'>
            <div className='grid items-center gap-12 md:items-start lg:grid-cols-2'>
              <div className='relative'>
                <Image
                  src='/cta.webp'
                  alt={`${process.env.NEXT_PUBLIC_BRAND_NAME} Premium Nuts Butter`}
                  width={600}
                  height={600}
                  className='h-auto w-full rounded-2xl'
                />
                <div className='absolute -right-4 -top-4 rounded-full bg-[#8fd846] px-4 py-2 font-semibold text-black'>
                  100% Organic
                </div>
              </div>

              <div className='space-y-8'>
                <div>
                  <h2 className='mb-4 text-3xl font-bold text-primary-color'>
                    Your All-in-One Premium Nuts Butter
                  </h2>
                  <p className='mb-6 text-lg leading-relaxed text-white'>
                    In a market saturated with single-note spreads, we stand
                    apart by offering a one-of-a-kind, premium nuts butter that
                    blends peanuts, almonds, cashews, pistachios, dates and
                    honey all in one spoon.
                  </p>
                  <div className='mb-6 flex items-center space-x-2'>
                    <div className='flex items-center'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className='h-5 w-5 fill-amber-400 text-amber-400'
                        />
                      ))}
                    </div>
                    <span className='font-medium text-[#f8d87d]'>
                      4.5/5 (2,500+ reviews)
                    </span>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='rounded-lg border-[2.5px] border-[#f8d87d] bg-white p-4 text-center'>
                    <h3 className='mb-2 font-bold text-primary-color'>
                      High Protein
                    </h3>
                    <p className='text-black'>25g per 100g</p>
                  </div>
                  <div className='rounded-lg border-[2.5px] border-[#f8d87d] bg-white p-4 text-center'>
                    <h3 className='mb-2 font-bold text-primary-color'>
                      Rich in Fiber
                    </h3>
                    <p className='text-black'>From dates & nuts</p>
                  </div>
                  <div className='rounded-lg border-[2.5px] border-[#f8d87d] bg-white p-4 text-center'>
                    <h3 className='mb-2 font-bold text-primary-color'>
                      Healthy Fats
                    </h3>
                    <p className='text-black'>Omega-3 & 6</p>
                  </div>
                  <div className='rounded-lg border-[2.5px] border-[#f8d87d] bg-white p-4 text-center'>
                    <h3 className='mb-2 font-bold text-primary-color'>
                      No Preservatives
                    </h3>
                    <p className='text-black'>100% Natural</p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-2xl font-bold text-white'>
                    Available Sizes
                  </h3>

                  {/* Dynamic Product Cards */}
                  <div className='grid grid-cols-3 gap-4'>
                    {PRODUCT_WEIGHTS.map((weight) => {
                      const priceObj = PRODUCT_PRICES[weight];
                      const discount = priceObj
                        ? Math.round(
                            ((priceObj.original - priceObj.discounted) /
                              priceObj.original) *
                              100
                          )
                        : 0;
                      return (
                        <Card
                          key={weight}
                          className={`cursor-pointer border-[.5px] border-[#f8d87d] bg-[#181818] transition-shadow hover:shadow-lg ${
                            selectedWeight === weight
                              ? 'border-2 border-[#f8d87d]'
                              : ''
                          }`}
                          onClick={() => setSelectedWeight(weight)}
                        >
                          <CardContent className='p-4 text-center'>
                            <h4 className='mb-2 font-bold text-primary-color'>
                              {weight}
                            </h4>
                            <p className='mb-1 text-2xl font-bold text-white'>
                              ₹{priceObj?.discounted}
                            </p>
                            <p className='text-sm text-gray-500 line-through'>
                              ₹{priceObj?.original}
                            </p>
                            <Badge className='mt-2 bg-green-100 text-green-800'>
                              {discount}% OFF
                            </Badge>
                            {weight === '500g' && (
                              <Badge className='mt-2 bg-primary-color text-white'>
                                Most Popular
                              </Badge>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Order Button */}
                <Button
                  size='lg'
                  className='mt-6 w-full bg-[#EEFF00] text-lg text-black'
                  onClick={() => {
                    // Add selected item to cart and redirect
                    const priceObj = PRODUCT_PRICES[selectedWeight];
                    const cartItem = {
                      name: `${
                        process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'
                      } Premium All-in-One Nuts Butter (${selectedWeight})`,
                      weight: selectedWeight,
                      quantity: 1,
                      price: priceObj?.discounted || 0,
                      total: priceObj?.discounted || 0
                    };
                    let cart = [];
                    if (typeof window !== 'undefined') {
                      const storedCart = localStorage.getItem('cart');
                      if (storedCart) {
                        try {
                          cart = JSON.parse(storedCart);
                        } catch {
                          cart = [];
                        }
                      }
                      const existingIndex = cart.findIndex(
                        (item: { weight: string }) =>
                          item.weight === cartItem.weight
                      );
                      if (existingIndex !== -1) {
                        cart[existingIndex].quantity += cartItem.quantity;
                        cart[existingIndex].total += cartItem.total;
                      } else {
                        cart.push(cartItem);
                      }
                      localStorage.setItem('cart', JSON.stringify(cart));
                      window.location.href = '/cart';
                    }
                  }}
                >
                  Order Your {process.env.NEXT_PUBLIC_BRAND_NAME} Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients Detail */}
        <section className='bg-black pt-24'>
          <div className='container mx-auto px-4'>
            <div className='mb-8 text-center'>
              <h2 className='mb-4 text-4xl font-bold text-white'>
                <span className='text-primary-color'>
                  Seven Premium Ingredients
                </span>
              </h2>
              <p className='text-xl text-[#f8d87d]'>
                Each carefully selected for maximum nutrition and flavor
              </p>
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
              {PRODUCT_INGREDIENTS_DETAILED_PRODUCT_PAGE.map(
                (ingredient, idx) => (
                  <div
                    key={ingredient.name}
                    className='flex min-h-[140px] flex-col items-center rounded-xl border-[.5px] border-[#f8d87d] bg-[#efefef] p-4 text-center shadow-sm'
                  >
                    <div className='mb-2 flex size-20 items-center justify-center overflow-hidden rounded-full bg-black'>
                      <Image
                        src={ingredient.icon}
                        alt={`Ingredient: ${ingredient.name} for healthy peanut butter, organic peanut butter, best peanut butter in India`}
                        width={60}
                        height={60}
                        className='size-full object-cover'
                        loading='lazy'
                      />
                    </div>
                    <h3 className='mb-1 text-base font-bold text-primary-color'>
                      {ingredient.name}
                    </h3>
                    <p className='text-xs text-black opacity-80'>
                      {ingredient.description}
                    </p>
                    <div className='mt-2 text-xs text-primary-color'>
                      {ingredient.benefits}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className='bg-black pt-24'>
          <div className='container mx-auto px-4'>
            <div className='mb-16 text-center'>
              <h2 className='mb-4 text-4xl font-bold text-white'>
                Why {process.env.NEXT_PUBLIC_BRAND_NAME} Stands Apart
              </h2>
              <p className='text-xl text-[#f8d87d]'>
                We're not just another nuts butter. We're a revolution in a jar.
              </p>
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  icon: Shield,
                  title: 'No Preservatives',
                  description:
                    '100% natural ingredients with no artificial preservatives or chemicals',
                  color: 'text-green-600'
                },
                {
                  icon: Leaf,
                  title: 'No Palm Oil',
                  description:
                    'We use only the finest nuts oils for better health and sustainability',
                  color: 'text-green-600'
                },
                {
                  icon: Heart,
                  title: 'No Refined Sugar',
                  description:
                    'Sweetened naturally with dates and honey - no processed sugars',
                  color: 'text-red-500'
                },
                {
                  icon: Award,
                  title: 'Certified Organic',
                  description:
                    'All ingredients are certified organic and sourced responsibly',
                  color: 'text-amber-600'
                },
                {
                  icon: Star,
                  title: 'Unique Flavor Profile',
                  description:
                    'The only nuts butter with this exact blend - truly one of a kind',
                  color: 'text-amber-600'
                },
                {
                  icon: Leaf,
                  title: 'Single Focus',
                  description:
                    'One product perfected, not dozens of mediocre variants',
                  color: 'text-amber-600'
                }
              ].map((feature, index) => (
                <Card
                  key={index}
                  className='border-[2.5px] border-[#f8d87d] bg-[#efefef] transition-shadow hover:shadow-lg'
                >
                  <CardContent className='p-6 text-center'>
                    <feature.icon className='mx-auto mb-4 h-12 w-12 text-primary-color' />
                    <h3 className='mb-2 font-bold text-primary-color'>
                      {feature.title}
                    </h3>
                    <p className='text-black'>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nutrition Facts */}
        <section className='bg-black pt-24'>
          <div className='container mx-auto px-4'>
            <div className='mb-8 text-center'>
              <h2 className='mb-4 text-4xl font-bold text-white'>
                Nutrition Facts
              </h2>
              <p className='text-xl text-[#f8d87d]'>Per 100g serving</p>
            </div>

            <div className='mx-auto max-w-2xl'>
              <Card className='border-[2.5px] border-[#f8d87d] bg-[#efefef]'>
                <CardContent className='p-8'>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='text-center'>
                      <h3 className='mb-2 text-3xl font-bold text-primary-color'>
                        580
                      </h3>
                      <p className='text-black'>Calories</p>
                    </div>
                    <div className='text-center'>
                      <h3 className='mb-2 text-3xl font-bold text-primary-color'>
                        25g
                      </h3>
                      <p className='text-black'>Protein</p>
                    </div>
                    <div className='text-center'>
                      <h3 className='mb-2 text-3xl font-bold text-primary-color'>
                        45g
                      </h3>
                      <p className='text-black'>Healthy Fats</p>
                    </div>
                    <div className='text-center'>
                      <h3 className='mb-2 text-3xl font-bold text-primary-color'>
                        12g
                      </h3>
                      <p className='text-black'>Fiber</p>
                    </div>
                    <div className='text-center'>
                      <h3 className='mb-2 text-3xl font-bold text-primary-color'>
                        15g
                      </h3>
                      <p className='text-black'>Natural Sugars</p>
                    </div>
                    <div className='text-center'>
                      <h3 className='mb-2 text-3xl font-bold text-primary-color'>
                        0mg
                      </h3>
                      <p className='text-black'>Cholesterol</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='mt-24 bg-[#181818] pb-20 pt-20 text-white'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>
              Ready to Taste the Difference?
            </h2>
            <p className='mb-8 text-xl opacity-90'>
              Join thousands who've discovered the perfect nuts butter
            </p>
            <Link href='/buy-now'>
              <Button
                size='lg'
                className='bg-[#EEFF00] px-8 py-3 text-lg text-black'
              >
                Order {process.env.NEXT_PUBLIC_BRAND_NAME} Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
