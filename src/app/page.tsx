'use client';

import { useCart } from './components/cart-context';

import { Button } from '@/components/ui/button';
import HomeLoader from '@/components/HomeLoader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Star,
  ShoppingCart,
  Heart,
  Leaf,
  Shield,
  Award,
  Users,
  Instagram,
  Facebook,
  Twitter,
  Package
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import ImageSlider from '@/components/ImageSlider';
import {
  PRODUCT_INGREDIENTS,
  PRODUCT_INGREDIENTS_DETAILED,
  PRODUCT_PRICES,
  PRODUCT_WEIGHTS
} from '@/constant';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  // Show the HomeLoader once per browser session
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [checkedLoader, setCheckedLoader] = useState<boolean>(false);

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
  const [customerCount, setCustomerCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState('350g');
  const router = useRouter();

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // session check for showing loader only once per session
  useEffect(() => {
    try {
      const shown = sessionStorage.getItem('penova_loader_shown');
      if (!shown) {
        setShowLoader(true);
        const t = setTimeout(() => {
          try {
            sessionStorage.setItem('penova_loader_shown', '1');
          } catch (e) {
            // ignore session storage errors
          }
          setShowLoader(false);
          setCheckedLoader(true);
        }, 2000); // show loader for 2s (matches animation)
        return () => clearTimeout(t);
      }
    } catch (e) {
      // sessionStorage may be unavailable; continue without loader
    }
    setCheckedLoader(true);
  }, []);

  // Animate customer count only after client-side hydration
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCustomerCount((prev) => {
        if (prev >= 2500) {
          clearInterval(interval);
          return 2500;
        }
        return prev + 50;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isClient]);

  const handleOrderNow = () => {
    router.push(`/buy-now?weight=${selectedWeight}`);
  };

  const handleLearnMore = () => {
    router.push('/about');
  };

  const { addToCart } = useCart();
  const addToCartHandler = () => {
    addToCart({
      name: `${process.env.NEXT_PUBLIC_BRAND_NAME} Premium All-in-One Nuts Butter (${selectedWeight})`,
      size: selectedWeight,
      price:
        PRODUCT_PRICES[selectedWeight as keyof typeof PRODUCT_PRICES]
          .discounted,
      originalPrice:
        PRODUCT_PRICES[selectedWeight as keyof typeof PRODUCT_PRICES].original,
      quantity: 1,
      image: '/product.webp',
      weight: Number(selectedWeight.replace('g', '')) / 1000 // converts "500g" to 0.5
    });
    router.push('/cart');
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className='h-5 w-5 fill-amber-400 text-amber-400'
        />
      );
    }

    // Render half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key='half' className='relative'>
          <Star className='h-5 w-5 text-amber-400' />
          <div className='absolute inset-0 w-1/2 overflow-hidden'>
            <Star className='h-5 w-5 fill-amber-400 text-amber-400' />
          </div>
        </div>
      );
    }

    // Fill remaining stars up to 5 (empty stars)
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className='h-5 w-5 text-gray-400' />);
    }

    return stars;
  };

  // avoid flashing the page before we determine whether to show the loader
  if (!checkedLoader && !showLoader) return null;
  if (showLoader) return <HomeLoader />;

  return (
    <>
      <div className='min-h-screen !bg-black !text-white'>
        {/* MAIN SECTION */}
        <main>
          {/* Header */}
          <Header />

          <div className='md:pt-[76px]'>
            <ImageSlider />
          </div>

          {/* Hero Section */}
          <section
            id='home'
            className='bg-black px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:py-20'
          >
            <div className='container mx-auto max-w-7xl'>
              <div className='grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16'>
                {/* Content Column */}
                <div className='relative order-2 space-y-8 pt-5 lg:order-1'>
                  <div className='space-y-4 md:space-y-6'>
                    <Badge className='bg-gradient-to-r from-white via-[#90caf9] to-[#64b5f6] text-lg text-black'>
                      <Award size={20} className='mr-1' /> India's Finest Nuts
                      Butter
                    </Badge>
                    <h1 className='font-playfair text-[45px] font-bold leading-tight text-white lg:text-6xl'>
                      All-in-One
                      <span className='-mt-4 block text-primary-color md:-mt-2'>
                        Nuts Butter
                      </span>
                    </h1>
                    <h2 className='font-alex py-0 text-3xl font-bold tracking-wider text-white underline underline-offset-8'>
                      Our Signature Product
                    </h2>
                    <p className='leading-1 text-xl text-white'>
                      <span className='text-xl'>A premium blend of </span>
                      <b className='text-[21px] text-primary-color'>
                        {PRODUCT_INGREDIENTS.slice(0, -1).join(', ') +
                          ' & ' +
                          PRODUCT_INGREDIENTS.slice(-1).join(', ') +
                          ' '}
                      </b>
                      <span className='text-xl'>
                        - all crafted into one delicious spoonful.
                      </span>
                    </p>
                    <p className='font-ibm text-[24px] text-xl font-medium text-primary-color'>
                      Healthier. Tastier. Organic.
                    </p>

                    {/* Features with icons for desktop view */}
                    <div className='hidden w-full gap-4 py-6 md:grid-cols-2 lg:grid lg:grid-cols-2'>
                      {[
                        {
                          icon: (
                            <Star className='mx-auto mb-1 h-6 w-6 text-primary-color' />
                          ), // protein
                          title: 'Protein Rich',
                          description: '25g protein per 100g'
                        },
                        {
                          icon: (
                            <Leaf className='mx-auto mb-1 h-6 w-6 text-primary-color' />
                          ), // healthy fats
                          title: 'Healthy Fats',
                          description: 'Omega-3 & Omega-6'
                        },
                        {
                          icon: (
                            <Shield className='mx-auto mb-1 h-6 w-6 text-primary-color' />
                          ), // no preservatives
                          title: 'No Preservatives',
                          description: '100% Natural'
                        },
                        {
                          icon: (
                            <Heart className='mx-auto mb-1 h-6 w-6 text-primary-color' />
                          ), // fiber
                          title: 'Fiber Rich',
                          description: 'From dates & nuts'
                        }
                      ].map((item) => (
                        <div
                          key={item.title}
                          className='flex flex-col items-center rounded-xl border-[2.5px] border-[#f8d87d] bg-[#efefef] px-4 py-2 text-center shadow-sm'
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

                  <div className='relative lg:hidden'>
                    <Image
                      src='/cta.webp'
                      alt='Healthy peanut butter and nuts butter jar - Penowa premium blend, organic peanut butter India'
                      width={500}
                      height={500}
                      className='h-auto w-full rounded-2xl'
                      loading='lazy'
                    />
                  </div>

                  {/* <div className='flex items-center gap-3 md:gap-4'>
                    <label className='font-medium text-white'>
                      Choose Weight:
                    </label>
                    <Select
                      value={selectedWeight}
                      onValueChange={setSelectedWeight}
                    >
                      <SelectTrigger className='w-32 border-[.1px] border-primary-color font-bold text-primary-color focus:border-primary-color focus:ring-0'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className='border-primary-color text-primary-color'>
                        {PRODUCT_WEIGHTS.map((weight) => (
                          <SelectItem value={weight} key={weight}>
                            {weight}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div> */}

                  {/* <div className='flex flex-col gap-4 sm:flex-row md:gap-6'>
                    <Button
                      size='lg'
                      className='bg-[#EEFF00] px-8 py-3 text-lg text-black transition-colors md:px-10 md:py-4'
                      onClick={handleOrderNow}
                    >
                      Buy Now
                    </Button>
                    <Button
                      size='lg'
                      className='w-full border-[.1px] border-primary-color bg-white text-secondary-color hover:bg-slate-100 md:max-w-max'
                      onClick={addToCartHandler}
                    >
                      <ShoppingCart className='mr-2 h-5 w-5' />
                      Add to Cart - ₹
                      {
                        PRODUCT_PRICES[
                          selectedWeight as keyof typeof PRODUCT_PRICES
                        ].discounted
                      }
                    </Button>
                  </div> */}

                  {/* Trust badge & rating */}
                  {/* <div className='flex flex-col items-center space-y-2 pt-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 md:pt-2 lg:justify-start lg:gap-8'>
                    <div className='flex items-center justify-center space-x-1 sm:justify-start'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className='h-5 w-5 fill-amber-400 text-amber-400'
                        />
                      ))}
                      <span className='ml-2 font-medium'>4.5/5</span>
                    </div>
                    <div className='text-sm text-white opacity-80'>
                      <span className='font-semibold'>
                        {isClient ? customerCount.toLocaleString() : '2,500'}+
                      </span>{' '}
                      Happy Customers
                    </div>
                  </div> */}
                </div>

                {/* Image Column */}
                <div className='relative order-1 hidden lg:order-2 lg:block'>
                  <Image
                    src='/cta.webp'
                    alt='Healthy peanut butter and nuts butter jar - Penowa premium blend, organic peanut butter India'
                    width={500}
                    height={500}
                    className='h-auto w-full rounded-2xl'
                    loading='lazy'
                  />
                </div>
              </div>
            </div>

            {/* Features with icons for mobile view */}
            <div className='grid w-full grid-cols-2 gap-4 px-1 py-6 md:grid-cols-4 lg:hidden'>
              {[
                {
                  icon: (
                    <Star className='mx-auto mb-1 h-6 w-6 text-primary-color' />
                  ), // protein
                  title: 'Protein Rich',
                  description: '25g protein per 100g'
                },
                {
                  icon: (
                    <Leaf className='mx-auto mb-1 h-6 w-6 text-primary-color' />
                  ), // healthy fats
                  title: 'Healthy Fats',
                  description: 'Omega-3 & Omega-6'
                },
                {
                  icon: (
                    <Shield className='mx-auto mb-1 h-6 w-6 text-primary-color' />
                  ), // no preservatives
                  title: 'No Preservatives',
                  description: '100% Natural'
                },
                {
                  icon: (
                    <Heart className='mx-auto mb-1 h-6 w-6 text-primary-color' />
                  ), // fiber
                  title: 'Fiber Rich',
                  description: 'From dates & nuts'
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className='flex flex-col items-center rounded-xl border-[2.5px] border-[#f8d87d] bg-[#efefef] px-4 py-2 text-center shadow-sm'
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
          </section>

          {/* All Products */}
          <section className='bg-black px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:pb-16 xl:pb-20'>
            <div className='container mx-auto max-w-7xl'>
              <h2 className='mb-1 text-2xl font-bold text-white md:mb-1'>
                All Products
              </h2>
              <span className='mb-5 block h-1 w-12 rounded bg-amber-400 md:mb-5' />
              <div className='grid grid-cols-2 items-center justify-center gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
                {/* Map through all products and display them */}
                {[
                  {
                    weight: '350g',
                    productName: 'Premium Nuts Butter',
                    slug: 'premium-nuts-butter',
                    description: 'A delicious blend of premium nuts.',
                    original:
                      PRODUCT_PRICES['premium-nuts-butter']['350g'].original,
                    price:
                      PRODUCT_PRICES['premium-nuts-butter']['350g'].discounted
                  },
                  {
                    weight: '500g',
                    productName: 'Peanut Butter',
                    slug: 'peanut-butter',
                    description: 'A delicious blend of premium nuts.',
                    original: PRODUCT_PRICES['peanut-butter']['500g'].original,
                    price: PRODUCT_PRICES['peanut-butter']['500g'].discounted
                  },
                  {
                    weight: '250g',
                    productName: 'Almond Walnut Cashew Butter',
                    slug: 'almond-walnut-cashew-butter',
                    description: 'A delicious blend of premium nuts.',
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
        </main>

        {/* Product Spotlight */}
        {/* <section id='product' className='px-4 py-12 md:px-12'>
          <div className='container mx-auto md:max-w-7xl'>
            <div className='mx-auto flex flex-col items-center space-y-8'>
              // Tagline
              <div className='flex flex-col items-center space-y-2'>
                <h3 className='text-center text-3xl font-bold text-white'>
                  Premium Nuts Blend
                </h3>
                <p className='text-center text-lg leading-relaxed text-white md:max-w-3xl'>
                  <span className='text-primary-color'>
                    All-in-One Superfood Spread crafted from
                  </span>{' '}
                  <span className='text-xl font-bold text-primary-color'>
                    {PRODUCT_INGREDIENTS.slice(0, -1).join(', ') +
                      ' & ' +
                      PRODUCT_INGREDIENTS.slice(-1).join(', ') +
                      ' '}
                  </span>{' '}
                  <span className='font-bold text-[#d8d26f]'>
                    100% natural, no preservatives, no palm oil, no refined
                    sugar.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Ingredients Section */}
        <section className='px-4 py-12 md:px-12'>
          <div className='container mx-auto md:max-w-7xl'>
            <div className='mb-10 flex flex-col items-center'>
              <h2 className='mb-2 text-center text-3xl font-bold'>
                Nature's Finest, Blended to Perfection
              </h2>
              <p className='max-w-md text-center text-lg text-primary-color'>
                Each ingredient is handpicked for taste, nutrition, and quality.
              </p>
            </div>

            <div className='mx-auto grid grid-cols-2 gap-4 md:grid-cols-4'>
              {PRODUCT_INGREDIENTS_DETAILED.map((ingredient, idx) => (
                <div
                  key={ingredient.name}
                  className='flex min-h-[140px] flex-col items-center rounded-xl border-[2.5px] border-[#f8d87d] bg-[#efefef] p-4 text-center shadow-sm max-sm:last:col-span-2 max-sm:last:min-w-[200px] max-sm:last:justify-self-center'
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className='px-4 py-12 md:px-12'>
          <div className='container mx-auto md:max-w-7xl'>
            <div className='mb-10 flex flex-col items-center'>
              <h2 className='mb-3 px-4 py-1 text-3xl font-bold'>
                Why Choose Us?
              </h2>
              <p className='max-w-md text-center text-lg text-primary-color'>
                Not just another nuts butter - a revolution in a jar .<br />
                <span className='font-bold text-[#f8d87d]'>
                  Taste. Health. Purity.
                </span>
              </p>
            </div>

            <div className='mx-auto grid grid-cols-2 gap-4 md:grid-cols-3'>
              {[
                {
                  icon: (
                    <Shield className='mx-auto mb-1 h-7 w-7 text-primary-color' />
                  ),
                  title: 'No Preservatives',
                  description: '100% natural, no artificial junk'
                },
                {
                  icon: (
                    <Leaf className='mx-auto mb-1 h-7 w-7 text-primary-color' />
                  ),
                  title: 'No Palm Oil',
                  description: 'Only the finest nuts oils'
                },
                {
                  icon: (
                    <Heart className='mx-auto mb-1 h-7 w-7 text-primary-color' />
                  ),
                  title: 'No Refined Sugar',
                  description: 'Sweetened with dates & honey'
                },
                {
                  icon: (
                    <Award className='mx-auto mb-1 h-7 w-7 text-primary-color' />
                  ),
                  title: 'Organic Product',
                  description: 'Certified organic ingredients'
                },
                {
                  icon: (
                    <Star className='mx-auto mb-1 h-7 w-7 text-primary-color' />
                  ),
                  title: 'Unique Flavor',
                  description: 'One-of-a-kind taste profile'
                },
                {
                  icon: (
                    <Package className='mx-auto mb-1 h-7 w-7 text-primary-color' />
                  ),
                  title: 'All Nuts in One',
                  description: '7 premium ingredients in every spoon'
                }
              ].map((feature, idx) => (
                <div
                  key={feature.title}
                  className='flex min-h-[140px] flex-col items-center rounded-xl border-[2.5px] border-[#f8d87d] bg-[#efefef] p-4 text-center shadow-sm'
                >
                  {feature.icon}
                  <h3 className='mb-1 text-base font-bold text-primary-color'>
                    {feature.title}
                  </h3>
                  <p className='text-xs text-black opacity-80'>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Section */}
        <section className='px-4 py-12 md:px-12'>
          <div className='container mx-auto md:max-w-7xl'>
            <div className='mb-10 flex flex-col items-center'>
              <h2 className='mb-3 px-4 py-1 text-center text-3xl font-bold'>
                How to Enjoy our nuts butter?
              </h2>
              <p className='max-w-md text-center text-lg text-primary-color'>
                Versatile, delicious, and perfect for any time of day.
              </p>
            </div>

            <div className='mx-auto grid grid-cols-2 gap-4 md:grid-cols-4'>
              {[
                {
                  title: 'Spread on Bread',
                  description: 'Perfect for breakfast toast or sandwiches',
                  image: '🍞'
                },
                {
                  title: 'Add to Shakes',
                  description: 'Boost your protein smoothies',
                  image: '🥤'
                },
                {
                  title: 'Pair with Fruits',
                  description: 'Delicious with apples, bananas, or berries',
                  image: '🍎'
                },
                {
                  title: 'Drizzle on Desserts',
                  description: 'Elevate your desserts and treats',
                  image: '🧁'
                }
              ].map((usage, idx) => (
                <div
                  key={usage.title}
                  className='flex min-h-[120px] flex-col items-center rounded-xl border-[2.5px] border-[#f8d87d] bg-[#efefef] p-4 text-center shadow-sm'
                >
                  <div className='mb-2 text-4xl'>{usage.image}</div>
                  <h3 className='mb-1 text-base font-bold text-primary-color'>
                    {usage.title}
                  </h3>
                  <p className='text-xs text-black opacity-80'>
                    {usage.description}
                  </p>
                </div>
              ))}
            </div>

            <div className='mt-10 text-center'>
              <Link href='/recipes'>
                <Button
                  variant='outline'
                  className='border-primary-color bg-transparent text-white transition-colors duration-200 hover:bg-primary-color hover:text-black'
                >
                  View All Recipes
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className='px-4 py-12 md:px-12'>
          <div className='container mx-auto md:max-w-7xl'>
            <div className='mb-10 flex flex-col items-center'>
              <h2 className='mb-2 text-center text-3xl font-bold'>
                What Our Customers Say
              </h2>
              <p className='max-w-md text-center text-lg text-primary-color'>
                <span className='font-semibold'>
                  Join thousands of happy customers
                </span>{' '}
                who love Penowa.
              </p>
            </div>

            <div className='mx-auto grid grid-cols-1 gap-4 md:grid-cols-3'>
              {[
                {
                  name: 'Gaurav Soni',
                  location: 'Mumbai',
                  rating: 5,
                  text: 'Finally, a nuts butter that tastes amazing and is actually healthy! My kids love it too.'
                },
                {
                  name: 'Pradip Saroj',
                  location: 'Delhi',
                  rating: 4.5,
                  text: 'As a fitness enthusiast, this is perfect for my post-workout meals. The taste is incredible!'
                },
                {
                  name: 'Riya Sharma',
                  location: 'Bangalore',
                  rating: 4.5,
                  text: "The blend of flavors is unique. I've never tasted anything like this before. Highly recommended!"
                }
              ].map((testimonial, idx) => (
                <div
                  key={testimonial.name}
                  className='flex min-h-[140px] flex-col items-center rounded-xl border-[.5px] border-[#f8d87d] bg-[#181818] p-6 text-center shadow-sm'
                >
                  <div className='mb-2 flex items-center justify-center gap-1'>
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className='mb-3 text-base italic text-white'>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className='font-semibold text-[#f8d87d]'>
                      {testimonial.name}
                    </p>
                    <p className='text-xs text-white opacity-70'>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className='bg-white px-4 py-12 md:px-12' id='faq'>
          <div className='container mx-auto md:max-w-7xl'>
            <div className='mb-10 flex flex-col items-center'>
              <h2 className='mb-2 text-center text-4xl font-bold text-primary-color'>
                FAQ
              </h2>
              <p className='max-w-md text-center text-lg text-secondary-color'>
                Everything you want to know about{' '}
                <span className='font-semibold text-primary-color'>
                  healthy peanut butter
                </span>{' '}
                and our premium blend.
              </p>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {[
                {
                  question:
                    'What makes Penowa the best healthy nuts butter in India?',
                  answer:
                    'Penowa uses only premium, natural ingredients: peanuts, almonds, cashews, pistachios, dates and honey. No palm oil, no preservatives, and no refined sugar. Our nuts butter is protein-rich, organic, and delicious!'
                },
                {
                  question:
                    'Is your nuts butter suitable for fitness and weight loss?',
                  answer:
                    'Yes! Our healthy nuts butter is high in protein and healthy fats, making it perfect for fitness enthusiasts, athletes, and anyone looking for a nutritious snack or post-workout meal.'
                },
                {
                  question: 'Do you use palm oil or refined sugar?',
                  answer:
                    'Never. We use only natural sweeteners like dates and honey, and never add palm oil or refined sugar. This makes our nuts butter healthier and tastier.'
                },
                {
                  question: 'Is Penowa nuts butter organic?',
                  answer:
                    'Yes, we use certified organic ingredients wherever possible, ensuring a clean, healthy, and safe product for you and your family.'
                },
                {
                  question: 'How can I use your nuts butter?',
                  answer: (
                    <span>
                      Spread it on bread, add to shakes, pair with fruits, or
                      drizzle on desserts. Check out our{' '}
                      <Link
                        href='/recipes'
                        className='text-primary-color underline'
                      >
                        healthy nuts butter recipes
                      </Link>{' '}
                      for more ideas!
                    </span>
                  )
                }
              ].map((faq, idx) => (
                <div
                  key={faq.question}
                  className='rounded-xl bg-black p-5 shadow-sm md:last:col-span-2 md:last:max-w-xl md:last:justify-self-center'
                >
                  <h3 className='mb-2 flex items-center text-lg font-semibold text-primary-color'>
                    <span className='mr-2'>Q{idx + 1}.</span> {faq.question}
                  </h3>
                  <div className='pl-6 text-base text-white'>{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='bg-[#000] py-12 text-white md:px-12'>
          <div className='container mx-auto flex justify-center px-4'>
            <div className='flex w-full max-w-7xl flex-col items-center rounded-2xl border border-[#f8d87d] bg-[#181818] p-8 shadow-lg'>
              <Badge className='mb-4 border-none bg-[#f8d87d] px-4 py-1 text-base font-bold text-black'>
                Limited Time Offer
              </Badge>
              <h2 className='mb-3 text-center text-3xl font-bold text-primary-color sm:text-4xl'>
                Ready to Experience the Difference?
              </h2>
              <p className='mb-8 max-w-md text-center text-lg opacity-90 sm:text-xl'>
                Join <span className='font-bold'>thousands</span> of customers
                who've made the switch to{' '}
                <span className='font-semibold'>premium nutrition</span>.
              </p>
              <div className='flex w-full flex-col justify-center gap-4 sm:flex-row'>
                <Button
                  size='lg'
                  className='w-full rounded-xl bg-[#EEFF00] px-8 py-3 text-lg font-bold text-black shadow-md hover:bg-[#d4e000] sm:w-auto'
                  onClick={() =>
                    addToCart({
                      name: `${process.env.NEXT_PUBLIC_BRAND_NAME} Premium All-in-One Nuts Butter (500g)`,
                      size: '500g',
                      price: 599,
                      originalPrice: 649,
                      quantity: 1,
                      image: '/product.webp',
                      weight: Number(selectedWeight.replace('g', '')) / 1000 // converts "500g" to 0.5
                    })
                  }
                >
                  <ShoppingCart className='mr-2 h-5 w-5' />
                  Order Now - ₹599
                </Button>
                <Link href='/about' className='w-full sm:w-auto'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='w-full rounded-xl border-[#f8d87d] bg-black px-8 py-3 font-bold hover:bg-[#222] hover:text-[#e3ef26] sm:w-auto'
                  >
                    Try Risk-Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='bg-black pb-6 pt-16 text-white md:px-12'>
          <div className='md:max-w-8xl container mx-auto px-4'>
            <div className='grid gap-8 md:grid-cols-5'>
              <div>
                <Link href='/' className='mb-4 flex items-center space-x-2'>
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

              <div>
                <h3 className='mb-4 font-bold'>Quick Links</h3>
                <ul className='space-y-2 text-white'>
                  <li>
                    <Link href='/about' className='hover:text-white'>
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href='/product' className='hover:text-white'>
                      Our Product
                    </Link>
                  </li>
                  <li>
                    <Link href='/recipes' className='hover:text-white'>
                      Recipes
                    </Link>
                  </li>
                  <li>
                    <Link href='/blog' className='hover:text-white'>
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='mb-4 font-bold'>Support</h3>
                <ul className='space-y-2 text-white'>
                  <li>
                    <Link href='/contact' className='hover:text-white'>
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href='/faq' className='hover:text-white'>
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href='/shipping' className='hover:text-white'>
                      Shipping Info
                    </Link>
                  </li>
                  <li>
                    <Link href='/returns' className='hover:text-white'>
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
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
                    Email: support@
                    {process.env.NEXT_PUBLIC_BRAND_NAME?.toLowerCase()}.in
                  </p>
                  <p className='text-sm'>Phone: +91 93183 67696</p>
                </div>
              </div>
            </div>

            <div className='mt-12 border-t border-amber-800 pt-8 text-center text-white'>
              <p>
                &copy; 2025 {process.env.NEXT_PUBLIC_BRAND_NAME}. All rights
                reserved. | Privacy Policy | Terms of Service
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
