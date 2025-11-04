'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import Header from '@/components/layout/Header';
import { EMAIL_ADDRESS, PHONE_NUMBER } from '@/constant';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      if (response.ok) {
        setSuccess("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(
          'Sorry, there was an error sending your message. Please try again later.'
        );
      }
    } catch (error) {
      setError(
        'Sorry, there was an error sending your message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='min-h-screen !bg-black !text-white'>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className='px-4 pt-28 md:px-8 md:pb-16'>
        <div className='container mx-auto text-center'>
          <h1 className='mb-6 font-playfair text-5xl font-bold text-white'>
            Get in <span className='text-primary-color'>Touch</span>
          </h1>
          <p className='mx-auto max-w-3xl text-xl leading-relaxed text-white'>
            Have questions about{' '}
            <span className='font-semibold text-primary-color'>
              {process.env.NEXT_PUBLIC_BRAND_NAME}
            </span>
            ? Want to share your experience? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className='bg-black py-10'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12'>
            {/* Contact Form */}
            <Card className='order-2 border-[.5px] border-[#f8d87d] bg-[#181818] md:max-h-max lg:order-2'>
              <CardContent className='p-8'>
                <h2 className='mb-6 text-2xl font-bold text-primary-color'>
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div>
                      <label className='mb-2 block text-base font-medium text-[#f8d87d]'>
                        Name *
                      </label>
                      <Input
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='border-[.5px] border-[#f8d87d] bg-black text-base text-white focus:border-primary-color'
                        placeholder='Your full name'
                      />
                    </div>
                    <div>
                      <label className='mb-2 block text-base font-medium text-[#f8d87d]'>
                        Email *
                      </label>
                      <Input
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='border-[.5px] border-[#f8d87d] bg-black text-base text-white focus:border-primary-color'
                        placeholder='your@email.com'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-base font-medium text-[#f8d87d]'>
                      Subject
                    </label>
                    <Input
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      className='border-[.5px] border-[#f8d87d] bg-black text-base text-white focus:border-primary-color'
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-base font-medium text-[#f8d87d]'>
                      Message *
                    </label>
                    <Textarea
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className='resize-none border-[.5px] border-[#f8d87d] bg-black text-base text-white focus:border-primary-color'
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className={`flex w-full items-center justify-center bg-[#EEFF00] py-3 text-lg text-black hover:bg-[#f8d87d] ${
                      isSubmitting ? 'cursor-not-allowed opacity-70' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className='flex items-center gap-2'>
                        <svg
                          className='h-5 w-5 animate-spin text-black'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                          ></path>
                        </svg>
                        <span className='animate-pulse font-semibold tracking-wide'>
                          Sending...
                        </span>
                      </span>
                    ) : error ? (
                      <span className='flex items-center text-red-600'>
                        <MessageCircle className='mr-2 h-5 w-5' />
                        {error}
                      </span>
                    ) : (
                      <>
                        <MessageCircle className='mr-2 h-5 w-5' />
                        Send Message
                      </>
                    )}
                  </Button>
                  {success && (
                    <AlertDialog
                      open={!!success}
                      onOpenChange={() => setSuccess(null)}
                    >
                      <AlertDialogContent className='border-[.5px] border-[#f8d87d] bg-[#181818] text-white md:max-w-max'>
                        <AlertDialogHeader>
                          <AlertDialogTitle className='text-primary-color'>
                            Message Sent!
                          </AlertDialogTitle>
                          <AlertDialogDescription className='text-[#EEFF00]'>
                            {success}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction
                            onClick={() => setSuccess(null)}
                            className='mx-auto border-none bg-[#EEFF00] text-black hover:bg-[#f8d87d]'
                          >
                            OK
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className='order-1 space-y-8 lg:order-2'>
              <Card className='border-[.5px] border-[#f8d87d] bg-[#181818]'>
                <CardContent className='p-8'>
                  <h3 className='mb-4 text-xl font-bold text-primary-color'>
                    Contact Information
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-start space-x-3'>
                      <Mail className='mt-1 h-5 w-5 flex-shrink-0 text-primary-color' />
                      <div className='min-w-0 flex-1'>
                        <p className='text-base font-medium text-[#f8d87d]'>
                          Email
                        </p>
                        <Link
                          href={EMAIL_ADDRESS}
                          className='break-all text-base text-[#EEFF00]'
                        >
                          {EMAIL_ADDRESS}
                        </Link>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                      <Phone className='mt-1 h-5 w-5 flex-shrink-0 text-primary-color' />
                      <div className='min-w-0 flex-1'>
                        <p className='text-base font-medium text-[#f8d87d]'>
                          Phone
                        </p>
                        <Link
                          href={`tel:${PHONE_NUMBER}`}
                          className='break-all text-base text-[#EEFF00]'
                        >
                          {PHONE_NUMBER}
                        </Link>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                      <MapPin className='mt-1 h-5 w-5 flex-shrink-0 text-primary-color' />
                      <div className='min-w-0 flex-1'>
                        <p className='text-base font-medium text-[#f8d87d]'>
                          Address
                        </p>
                        <Link
                          href='https://www.google.com/maps/search/?api=1&query=Humayunpur,+Safdarjung,+South+Delhi,+India,+110029'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-base text-[#EEFF00]'
                        >
                          Humayunpur, Safdarjung
                          <br />
                          South Delhi, India, 110029
                        </Link>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                      <Clock className='mt-1 h-5 w-5 flex-shrink-0 text-primary-color' />
                      <div className='min-w-0 flex-1'>
                        <p className='text-base font-medium text-[#f8d87d]'>
                          Business Hours
                        </p>
                        <p className='text-base text-[#EEFF00]'>
                          Mon-Fri: 9:00 AM - 6:00 PM IST
                          <br />
                          Sat: 10:00 AM - 4:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='border-[.5px] border-[#f8d87d] bg-[#181818]'>
                <CardContent className='p-8'>
                  <h3 className='mb-4 text-xl font-bold text-primary-color'>
                    Follow Us
                  </h3>
                  <div className='flex flex-col gap-4 sm:flex-row'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1 justify-start border-[.5px] border-[#f8d87d] bg-transparent px-4 py-2 text-base text-[#f8d87d] hover:bg-[#222] sm:flex-none sm:justify-center'
                    >
                      <Instagram className='mr-2 h-5 w-5 flex-shrink-0' />
                      <span>Instagram</span>
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1 justify-start border-[.5px] border-[#f8d87d] bg-transparent px-4 py-2 text-base text-[#f8d87d] hover:bg-[#222] sm:flex-none sm:justify-center'
                    >
                      <Facebook className='mr-2 h-5 w-5 flex-shrink-0' />
                      <span>Facebook</span>
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1 justify-start border-[.5px] border-[#f8d87d] bg-transparent px-4 py-2 text-base text-[#f8d87d] hover:bg-[#222] sm:flex-none sm:justify-center'
                    >
                      <Twitter className='mr-2 h-5 w-5 flex-shrink-0' />
                      <span>Twitter</span>
                    </Button>
                  </div>
                  <p className='mt-4 text-base text-primary-color'>
                    Follow us for recipes, health tips, and behind-the-scenes
                    content!
                  </p>
                </CardContent>
              </Card>

              <Card className='border-[.5px] border-[#f8d87d] bg-[#181818]'>
                <CardContent className='p-8'>
                  <h3 className='mb-4 text-xl font-bold text-primary-color'>
                    Frequently Asked Questions
                  </h3>
                  <div className='space-y-4'>
                    <div>
                      <p className='mb-1 text-base font-medium text-[#f8d87d]'>
                        How long does shipping take?
                      </p>
                      <p className='text-base text-[#EEFF00]'>
                        We ship within 2-3 business days. Delivery takes 3-7
                        days depending on location.
                      </p>
                    </div>
                    <div>
                      <p className='mb-1 text-base font-medium text-[#f8d87d]'>
                        What's the shelf life?
                      </p>
                      <p className='text-base text-[#EEFF00]'>
                        {process.env.NEXT_PUBLIC_BRAND_NAME} stays fresh for 12
                        months when stored properly in a cool, dry place.
                      </p>
                    </div>
                    <div>
                      <p className='mb-1 text-base font-medium text-[#f8d87d]'>
                        Do you offer bulk orders?
                      </p>
                      <p className='text-base text-[#EEFF00]'>
                        Yes! Contact us for special pricing on orders of 10+
                        jars.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-[#181818] py-16 text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='mb-4 font-playfair text-4xl font-bold'>
            Haven't Tried {process.env.NEXT_PUBLIC_BRAND_NAME} Yet?
          </h2>
          <p className='mb-8 text-xl opacity-90'>
            Experience the difference that premium ingredients make
          </p>
          <Link href='/buy-now'>
            <Button
              size='lg'
              className='bg-[#EEFF00] px-8 py-3 text-lg text-black'
            >
              Order Your First Jar
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
