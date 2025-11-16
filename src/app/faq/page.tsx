import FAQ from '@/components/FAQ';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React from 'react';

const FAQPage = () => {
  return (
    <div className='min-h-screen !bg-black !text-white'>
      <Header />

      {/* MAIN SECTION */}
      <main className='md:pt-[60px] pt-8'>
        <div className='container mx-auto px-4'>
          <FAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
