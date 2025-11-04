import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { EMAIL_ADDRESS, PHONE_NUMBER } from '@/constant';
import { PATH } from '@/constant/PATH';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setNewsletterStatus('Please enter your email.');
      return;
    }
    setNewsletterStatus('Processing...');
    try {
      // You should create a backend API route to avoid exposing your API key
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newsletterEmail })
      });
      if (response.ok) {
        setNewsletterStatus('Subscribed! Thank you.');
        setNewsletterEmail('');
      } else {
        const data = await response.json();
        setNewsletterStatus(
          data?.error || 'Subscription failed. Please try again later.'
        );
      }
    } catch (err) {
      setNewsletterStatus('Subscription failed. Please try again later.');
    }
  };

  return (
    <footer className='border-t md:border-t-2 border-gray-800 bg-black pb-6 pt-8 text-white md:px-12'>
      <div className='md:max-w-8xl container mx-auto px-4'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div>
            <Link href={PATH.HOME} className='mb-4 flex items-center space-x-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-amber-600'>
                <span className='font-bold text-white'>P</span>
              </div>
              <span className='text-xl font-bold text-primary-color'>
                {process.env.NEXT_PUBLIC_BRAND_NAME}
              </span>
            </Link>
            <p className='mb-4 text-white'>
              Premium nuts butter crafted for the health-conscious,
              flavor-seeking consumer.
            </p>
            <div className='flex space-x-4'>
              <Instagram className='h-5 w-5 cursor-pointer text-white hover:text-white' />
              <Facebook className='h-5 w-5 cursor-pointer text-white hover:text-white' />
              <Twitter className='h-5 w-5 cursor-pointer text-white hover:text-white' />
            </div>
          </div>

          <div className='md:hidden'>
            <h3 className='mb-4 font-bold'>Newsletter</h3>
            <p className='mb-4 text-sm text-white'>
              Get recipes, health tips, and exclusive offers!
            </p>
            <div className='space-y-2'>
              <form onSubmit={handleNewsletterSubmit} className='space-y-2'>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  className='border-amber-700 text-black placeholder:text-slate-400'
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <Button
                  className='w-full bg-amber-600 text-white hover:bg-amber-700'
                  type='submit'
                >
                  Subscribe
                </Button>
                {newsletterStatus && (
                  <div className='mt-2 text-sm text-[#EEFF00]'>
                    {newsletterStatus}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className='flex items-center justify-between md:hidden md:p-0'>
            <div>
              <h3 className='mb-4 font-bold'>Quick Links</h3>
              <ul className='space-y-2 text-white'>
                <li>
                  <Link href={PATH.ABOUT} className='hover:text-white'>
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href={PATH.PRODUCTS} className='hover:text-white'>
                    Our Product
                  </Link>
                </li>
                <li>
                  <Link href={PATH.RECIPES} className='hover:text-white'>
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link href={PATH.BLOG} className='hover:text-white'>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className='pr-10'>
              <h3 className='mb-4 font-bold'>Support</h3>
              <ul className='space-y-2 text-white'>
                <li>
                  <Link href={PATH.CONTACT} className='hover:text-white'>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href={PATH.FAQ} className='hover:text-white'>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href={PATH.SHIPPING} className='hover:text-white'>
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href={PATH.RETURNS} className='hover:text-white'>
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='hidden md:flex md:items-center md:justify-between md:p-0'>
            <div>
              <h3 className='mb-4 font-bold'>Quick Links</h3>
              <ul className='space-y-2 text-white'>
                <li>
                  <Link href={PATH.ABOUT} className='hover:text-white'>
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href={PATH.PRODUCTS} className='hover:text-white'>
                    Our Product
                  </Link>
                </li>
                <li>
                  <Link href={PATH.RECIPES} className='hover:text-white'>
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link href={PATH.BLOG} className='hover:text-white'>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className='pr-8'>
              <h3 className='mb-4 font-bold'>Support</h3>
              <ul className='space-y-2 text-white'>
                <li>
                  <Link href={PATH.CONTACT} className='hover:text-white'>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href={PATH.FAQ} className='hover:text-white'>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href={PATH.SHIPPING} className='hover:text-white'>
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href={PATH.RETURNS} className='hover:text-white'>
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='hidden md:block'>
            <h3 className='mb-4 font-bold'>Newsletter</h3>
            <p className='mb-4 text-sm text-white'>
              Get recipes, health tips, and exclusive offers!
            </p>
            <div className='space-y-2'>
              <form onSubmit={handleNewsletterSubmit} className='space-y-2'>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  className='border-amber-700 text-black placeholder:text-slate-400'
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <Button
                  className='w-full bg-amber-600 text-white hover:bg-amber-700'
                  type='submit'
                >
                  Subscribe
                </Button>
                {newsletterStatus && (
                  <div className='mt-2 text-sm text-[#EEFF00]'>
                    {newsletterStatus}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div>
            <h3 className='mb-4 font-bold'>We Accept</h3>
            <div className='mb-4 grid grid-cols-3 gap-2'>
              <div className='rounded text-center'>
                <Image
                  src='/upi.webp'
                  alt='UPI Payment for healthy peanut butter purchase, Penowa India'
                  width={100}
                  height={100}
                  className='h-auto w-full'
                  loading='lazy'
                />
              </div>
            </div>
            <div className='space-y-2 text-white'>
              <p className='text-sm'>
                Email:
                <Link
                  href={EMAIL_ADDRESS}
                  className='ml-1 hover:text-white'
                >
                  {EMAIL_ADDRESS}
                </Link>
              </p>
              <p className='text-sm'>Phone:
                <Link
                  href={`tel:${PHONE_NUMBER}`}
                  className='ml-1 hover:text-white'
                >
                  {PHONE_NUMBER}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className='mt-12 border-t border-amber-800 pt-8 text-center text-white'>
          <p>
            &#174; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_BRAND_NAME}. All rights
            reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
