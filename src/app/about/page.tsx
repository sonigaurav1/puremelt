import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Leaf, Award, Users, Target, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Penowa | Premium Healthy Peanut Butter Brand India</title>
        <meta
          name='description'
          content="Learn about Penowa, India's premium healthy peanut butter and nuts butter brand. Discover our story, mission, and commitment to quality, health, and taste."
        />
        <meta
          name='keywords'
          content='about penowa, peanut butter brand, healthy peanut butter, premium nuts butter, organic peanut butter, penowa story, penowa mission'
        />
        <link
          rel='canonical'
          href={
            (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') + '/about'
          }
        />
        {/* About Page Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              name: 'About Penowa',
              description:
                "Learn about Penowa, India's premium healthy peanut butter and nuts butter brand. Discover our story, mission, and commitment to quality, health, and taste.",
              url:
                (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                '/about',
              publisher: {
                '@type': 'Organization',
                name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'
              }
            })
          }}
        />
      </Head>

      <div className='min-h-screen !bg-black !text-white'>
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className='px-4 pt-28'>
          <div className='container mx-auto text-center'>
            <h1 className='mb-6 font-playfair text-5xl font-bold text-white'>
              About{' '}
              <span className='text-primary-color'>
                {process.env.NEXT_PUBLIC_BRAND_NAME}
              </span>
            </h1>
            <p className='mx-auto max-w-3xl text-xl leading-relaxed text-white'>
              Welcome to{' '}
              <span className='text-primary-color'>
                {process.env.NEXT_PUBLIC_BRAND_NAME}
              </span>
              , where we believe that the simplest ideas often make the boldest
              impact. In a world full of generic peanut butters, we dared to
              ask—what if one spoon could offer more?
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className='bg-black pt-20'>
          <div className='container mx-auto px-4'>
            <div className='grid items-center gap-12 md:items-start lg:grid-cols-2'>
              <div className='md:pt-2'>
                <h2 className='mb-6 font-playfair text-4xl font-bold text-primary-color'>
                  Our Story
                </h2>
                <div className='space-y-4 leading-relaxed text-[#f8d87d]'>
                  <p>
                    That question led to the creation of our signature and only
                    product: a premium nuts butter unlike anything else on the
                    market. We carefully blend peanuts, almonds, cashews,
                    pistachios, dates and honey into one balanced, nutrient-rich
                    spread.
                  </p>
                  <p>
                    This unique mix delivers indulgent taste with natural
                    goodness—no preservatives, no unnecessary additives, just
                    real ingredients. Our mission is focused and deliberate:
                    create one exceptional product, and do it better than anyone
                    else.
                  </p>
                  <p>
                    Designed for those who value both health and taste,{' '}
                    <span className='font-semibold text-primary-color'>
                      {process.env.NEXT_PUBLIC_BRAND_NAME}
                    </span>{' '}
                    is perfect for gym-goers, parents, foodies, or anyone
                    craving honest nourishment with a premium touch.
                  </p>
                </div>
              </div>
              <div className='relative'>
                <Image
                  src='/penowa.png'
                  alt={`${process.env.NEXT_PUBLIC_BRAND_NAME} Story`}
                  width={400}
                  height={400}
                  className='h-auto w-full rounded-2xl'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className='bg-black pt-24'>
          <div className='container mx-auto px-4'>
            <div className='grid gap-12 md:grid-cols-2'>
              {[
                {
                  icon: Target,
                  title: 'Our Mission',
                  description:
                    'To elevate everyday nutrition with a thoughtfully crafted nuts butter that blends premium ingredients, health, and indulgence—all in a single, standout variant.'
                },
                {
                  icon: Eye,
                  title: 'Our Vision',
                  description:
                    'To be the most trusted single-variant nuts butter brand in India, known for innovation, purity, and an uncompromising commitment to taste and quality.'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={idx}
                    className='border-[2.5px] border-[#f8d87d] bg-white p-8'
                  >
                    <CardContent className='text-center'>
                      <Icon className='mx-auto mb-6 h-16 w-16 text-primary-color' />
                      <h3 className='mb-4 text-2xl font-bold text-primary-color'>
                        {item.title}
                      </h3>
                      <p className='leading-relaxed text-[#f8d87d]'>
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className='bg-black pt-24'>
          <div className='container mx-auto px-4'>
            <div className='mb-16 text-center'>
              <h2 className='mb-4 text-4xl font-bold text-white'>Our Values</h2>
              <p className='text-xl text-[#f8d87d]'>What drives us every day</p>
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
              {[
                {
                  icon: Heart,
                  title: 'Premium Quality',
                  description:
                    'We use only the finest ingredients, sourced responsibly and crafted with care.'
                },
                {
                  icon: Leaf,
                  title: 'Natural & Organic',
                  description:
                    '100% natural ingredients with no preservatives, additives, or artificial flavors.'
                },
                {
                  icon: Award,
                  title: 'Innovation',
                  description:
                    'Constantly pushing boundaries to create unique, exceptional products.'
                },
                {
                  icon: Users,
                  title: 'Customer First',
                  description:
                    "Every decision we make is centered around our customers' health and satisfaction."
                }
              ].map((value, index) => (
                <Card
                  key={index}
                  className='border-[2.5px] border-[#f8d87d] bg-white transition-shadow hover:shadow-lg'
                >
                  <CardContent className='p-6 text-center'>
                    <value.icon className='mx-auto mb-4 h-12 w-12 text-primary-color' />
                    <h3 className='mb-2 font-bold text-primary-color'>
                      {value.title}
                    </h3>
                    <p className='text-sm text-[#f8d87d]'>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why One Product */}
        <section className='bg-black pt-24'>
          <div className='container mx-auto px-4'>
            <div className='mb-16 text-center'>
              <h2 className='mb-4 text-4xl font-bold text-white'>
                Why Just One Product?
              </h2>
              <p className='mx-auto max-w-3xl text-xl text-[#f8d87d]'>
                In a world of endless choices, we believe in the power of
                perfection through focus.
              </p>
            </div>

            <div className='mx-auto max-w-4xl'>
              <div className='grid gap-8 md:grid-cols-3'>
                <div className='text-center'>
                  <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-color'>
                    <span className='text-2xl font-bold text-white'>1</span>
                  </div>
                  <h3 className='mb-2 font-bold text-primary-color'>
                    Focused Excellence
                  </h3>
                  <p className='text-[#f8d87d]'>
                    By focusing on one product, we can perfect every aspect of
                    taste, nutrition, and quality.
                  </p>
                </div>

                <div className='text-center'>
                  <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-color'>
                    <span className='text-2xl font-bold text-white'>2</span>
                  </div>
                  <h3 className='mb-2 font-bold text-primary-color'>
                    No Compromise
                  </h3>
                  <p className='text-[#f8d87d]'>
                    Every jar represents our unwavering commitment to premium
                    ingredients and exceptional taste.
                  </p>
                </div>

                <div className='text-center'>
                  <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-color'>
                    <span className='text-2xl font-bold text-white'>3</span>
                  </div>
                  <h3 className='mb-2 font-bold text-primary-color'>
                    Simple Choice
                  </h3>
                  <p className='text-[#f8d87d]'>
                    No confusion, no overwhelming options. Just one perfect
                    product that delivers everything you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='mt-24 bg-[#181818] pb-20 pt-20 text-white'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>
              Experience the {process.env.NEXT_PUBLIC_BRAND_NAME} Difference
            </h2>
            <p className='mb-8 text-xl opacity-90'>
              Whether it's breakfast, a midday snack, or a post-workout boost,{' '}
              {process.env.NEXT_PUBLIC_BRAND_NAME} turns an everyday habit into
              a delicious ritual.
            </p>
            <p className='mb-8 text-2xl font-bold'>
              One variant. One jar. Infinite love.
            </p>
            <Link href='/products'>
              <Button
                size='lg'
                className='bg-primary-color px-8 py-3 text-lg text-white'
              >
                Try {process.env.NEXT_PUBLIC_BRAND_NAME} Today
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
