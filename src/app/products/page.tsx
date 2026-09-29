'use client';

import ProductCard from '@/components/ProductCard';
import { PRODUCT_PRICES, PRODUCTS } from '@/constant';
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AllProducts = () => {
  // Newsletter subscription logic removed due to being unused (lint warning fix).

  return (
    <>
      <Header />

      <section className='bg-black px-4 pb-8 pt-20 md:px-8 md:py-24 lg:px-12 lg:pb-16 lg:pt-24 xl:pb-20'>
        <div className='container mx-auto max-w-7xl'>
          <h2 className='mb-1 text-2xl font-bold text-white md:mb-1'>
            Our All Products
          </h2>
          <span className='mb-5 block h-1 w-12 rounded bg-amber-400 md:mb-5' />

          {/* <div className='mb-10 flex flex-col items-center'>
                <h2 className='mb-2 text-center text-3xl font-bold'>
                  Our All product are perfectly blended for taste and nutrition.
                </h2>
              </div> */}

          <div className='grid grid-cols-2 items-center justify-center gap-2 md:grid-cols-2 lg:grid-cols-3 md:gap-6 '>
            {/* Map through all products and display them */}
            {[
              {
                weight: '350g',
                productName: PRODUCTS['premium-nuts-butter'].name,
                slug: 'premium-nuts-butter',
                description: PRODUCTS['premium-nuts-butter'].shortDescription,
                original:
                  PRODUCT_PRICES['premium-nuts-butter']['350g'].original,
                price: PRODUCT_PRICES['premium-nuts-butter']['350g'].discounted
              },
              {
                weight: '500g',
                productName: PRODUCTS['peanut-date-butter'].name,
                slug: 'peanut-date-butter',
                description: PRODUCTS['peanut-date-butter'].shortDescription,
                original: PRODUCT_PRICES['peanut-date-butter']['500g'].original,
                price: PRODUCT_PRICES['peanut-date-butter']['500g'].discounted
              },
              {
                weight: '250g',
                productName: PRODUCTS['almond-walnut-cashew-butter'].name,
                slug: 'almond-walnut-cashew-butter',
                description:
                  PRODUCTS['almond-walnut-cashew-butter'].shortDescription,
                original:
                  PRODUCT_PRICES['almond-walnut-cashew-butter']['250g']
                    .original,
                price:
                  PRODUCT_PRICES['almond-walnut-cashew-butter']['250g']
                    .discounted
              }
            ].map((product, idx) => (
              // Pass the entire product object so ProductCard receives all required props
              <ProductCard key={idx} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AllProducts;
