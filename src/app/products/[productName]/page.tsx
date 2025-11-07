'use client';

import { useCart } from '../../components/cart-context';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
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
  Leaf
} from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import { PRODUCT_PRICES, PRODUCT_DEFAULT_SLUG, PRODUCTS } from '@/constant';
import Footer from '@/components/layout/Footer';

const BuyNowPage = () => {
  const searchParams = useSearchParams();
  const { productName } = useParams<{ productName: string }>();

  // Validate product slug from route param; fallback to default
  const productKey = (
    productName in PRODUCTS
      ? (productName as keyof typeof PRODUCTS)
      : (PRODUCT_DEFAULT_SLUG as keyof typeof PRODUCTS)
  ) as keyof typeof PRODUCTS;

  // Local product info
  const product = PRODUCTS[productKey];

  // Price map and available weights (intersection of defined prices and listed weights)
  const productPriceMap = PRODUCT_PRICES[productKey] ?? {};
  const availableWeights = (product?.availableWeights || []).filter(
    (w) =>
      (
        productPriceMap as Record<
          string,
          { original: number; discounted: number }
        >
      )[w]
  ) as string[];

  // Initial weight from query if valid, else first available or '350g'
  const initialWeightFromQuery = searchParams?.get('weight') || '';
  const [selectedWeight, setSelectedWeight] = useState<string>(
    availableWeights.includes(initialWeightFromQuery)
      ? initialWeightFromQuery
      : availableWeights[0] || '350g'
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [_, setLightboxApi] = useState<
    import('@/components/ui/carousel').CarouselApi | null
  >(null);

  const router = useRouter();

  const productImages = product?.images?.length
    ? product.images
    : ['/product.webp'];
  const currentPrice = (
    productPriceMap as Record<string, { original: number; discounted: number }>
  )[selectedWeight] ?? { original: 0, discounted: 0 };

  const discount = currentPrice.original
    ? Math.round(
        ((currentPrice.original - currentPrice.discounted) /
          currentPrice.original) *
          100
      )
    : 0;

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  const { addToCart } = useCart();

  // Keep selected weight in sync if product changes
  useEffect(() => {
    if (!availableWeights.includes(selectedWeight)) {
      setSelectedWeight(availableWeights[0] || '500g');
    }
  }, [productKey]);

  const addToCartHandler = () => {
    // Parse weight from selectedWeight (supports "500g" and "1kg")
    let weight = 0;
    if (selectedWeight.endsWith('kg')) {
      weight = Number(selectedWeight.replace('kg', ''));
    } else if (selectedWeight.endsWith('g')) {
      weight = Number(selectedWeight.replace('g', '')) / 1000;
    }
    addToCart({
      name: `${process.env.NEXT_PUBLIC_BRAND_NAME} ${product.name} (${selectedWeight})`,
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

  const renderStars = (rating: number) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const fillPercentage = Math.min(Math.max(rating - (i - 1), 0), 1);

      if (fillPercentage === 1) {
        // Full star
        stars.push(
          <Star
            key={`star-${i}`}
            className='h-5 w-5 fill-amber-400 text-amber-400'
          />
        );
      } else if (fillPercentage === 0) {
        // Empty star
        stars.push(
          <Star key={`star-${i}`} className='h-5 w-5 text-gray-300' />
        );
      } else {
        // Partial star
        stars.push(
          <div key={`star-${i}`} className='relative inline-block'>
            <Star className='h-5 w-5 text-gray-300' />
            <div
              className='absolute inset-0 overflow-hidden'
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star className='h-5 w-5 fill-amber-400 text-amber-400' />
            </div>
          </div>
        );
      }
    }

    return stars;
  };

  return (
    <>
      <Head>
        <title>
          Buy {product.name} | {process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'}
        </title>
        <meta
          name='description'
          content={`Buy ${process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'} ${product.name}. 100% natural, organic, no preservatives, no palm oil, no refined sugar. Fast delivery in India.`}
        />
        <meta
          name='keywords'
          content={`buy ${product.name}, buy healthy peanut butter, buy nuts butter, ${process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'} online, order peanut butter India, premium peanut butter`}
        />
        <link
          rel='canonical'
          href={
            (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
            `/products/${product.slug}`
          }
        />
        {/* Buy Now Page Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: `${process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'} ${product.name}`,
              image: [
                (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                  (productImages?.[0] || '/product.webp')
              ],
              description: product.description,
              brand: {
                '@type': 'Brand',
                name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'
              },
              offers: {
                '@type': 'Offer',
                url:
                  (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                  `/products/${product.slug}?weight=${selectedWeight}`,
                priceCurrency: 'INR',
                price: String(currentPrice.discounted || ''),
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: String(product.rating || 4.5),
                reviewCount: String(product.reviewCount || 0)
              }
            })
          }}
        />
      </Head>

      <div className='min-h-screen bg-black text-white'>
        {/* Header */}
        <Header />

        {/* Product Section */}
        <section className='bg-black pb-6 pt-[70px] text-white md:pt-24'>
          <div className='container mx-auto'>
            <div className='grid gap-6 lg:grid-cols-2'>
              {/* Left - Product Images */}
              <div className='space-y-4 px-4 py-4 md:max-h-max'>
                {/* Main Image */}
                <button
                  type='button'
                  onClick={() => setIsLightboxOpen(true)}
                  className='relative block overflow-hidden rounded-2xl border border-black/40 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f8d87d]'
                  aria-label='View image full screen'
                >
                  <Image
                    src={
                      productImages[selectedImageIndex] || '/placeholder.svg'
                    }
                    alt={`${process.env.NEXT_PUBLIC_BRAND_NAME} Product`}
                    width={500}
                    height={500}
                    className='h-96 w-full cursor-zoom-in object-cover'
                    priority
                  />
                  {/* Organic Badge */}
                  <div className='absolute right-4 top-4'>
                    {/* <Badge className='bg-green-500 text-white'>
                      100% Organic
                    </Badge> */}
                    <Image
                      src={'/organic.png'}
                      alt='Organic Badge'
                      width={100}
                      height={100}
                      className='size-16 object-contain mix-blend-multiply'
                    />
                  </div>
                </button>

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
                  <h1 className='bg-gradient-to-r from-[#faefd9] via-[#daa63e] to-[#daa63e] bg-clip-text text-3xl font-bold text-transparent'>
                    {process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'}{' '}
                    {product.name} ({selectedWeight})
                  </h1>
                  <div className='flex items-center space-x-2'>
                    <div className='flex items-center'>
                      {renderStars(product.rating || 4.5)}
                    </div>
                    <span className='text-sm'>
                      ({product.reviewCount.toLocaleString()}+ reviews)
                    </span>
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
                      {availableWeights.map((weight: string) => (
                        <SelectItem value={weight} key={weight}>
                          {weight} - ₹
                          {(
                            productPriceMap as Record<
                              string,
                              { original: number; discounted: number }
                            >
                          )[weight]?.discounted ?? 0}{' '}
                          (
                          <span className='line-through'>
                            ₹
                            {(
                              productPriceMap as Record<
                                string,
                                { original: number; discounted: number }
                              >
                            )[weight]?.original ?? 0}
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
                    className='w-full bg-gradient-to-r from-[hsl(var(--honey))] to-[hsl(var(--amber-rich))] font-bold text-black'
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
                  ].map((feature) => (
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
                <div className=''>
                  <h3 className='text-xl font-bold text-primary-color'>
                    Product Description
                  </h3>
                  <div className='space-y-3 border-b-2 border-gray-800 pb-6'>
                    {String(product.description || '')
                      .split(/\n\s*\n/)
                      .map((para, idx) => (
                        <p key={idx}>{para.trim()}</p>
                      ))}
                    <p>
                      Enjoy it on toast, in smoothies, with fruit, or straight
                      from the jar.
                    </p>
                  </div>

                  {/* Features with icons */}
                  <div className='grid w-full grid-cols-2 gap-4 pt-6'>
                    {[
                      {
                        icon: (
                          <Star className='mx-auto mb-1 h-6 w-6 text-primary-color' />
                        ), // protein
                        title: 'Protein Rich',
                        description: `${product.protein}g protein per 100g`
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
                        title: 'Natural Sweetness',
                        description: 'From dates'
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

        <Footer />
      </div>

      {/* Fullscreen Lightbox */}
      <Lightbox
        open={isLightboxOpen}
        onOpenChange={setIsLightboxOpen}
        images={productImages}
        startIndex={selectedImageIndex}
        onIndexChange={setSelectedImageIndex}
        setCarouselApi={setLightboxApi}
      />
    </>
  );
};

export default BuyNowPage;

// --- Lightbox component (internal to this page) ---

function Lightbox(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: readonly string[];
  startIndex: number;
  onIndexChange?: (idx: number) => void;
  setCarouselApi?: (
    api: import('@/components/ui/carousel').CarouselApi
  ) => void;
}) {
  const {
    open,
    onOpenChange,
    images,
    startIndex,
    onIndexChange,
    setCarouselApi
  } = props;
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [carouselApiLocal, setCarouselApiLocal] = useState<
    import('@/components/ui/carousel').CarouselApi | null
  >(null);

  let hideControlsTimer: NodeJS.Timeout;

  // Reset zoom when changing images
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  // Auto-hide controls after inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimer);
    hideControlsTimer = setTimeout(() => {
      if (!isZoomed) setShowControls(false);
    }, 3000);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        carouselApiLocal?.scrollPrev();
      } else if (e.key === 'ArrowRight') {
        carouselApiLocal?.scrollNext();
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed(!isZoomed);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, carouselApiLocal, isZoomed, onOpenChange]);

  // Cleanup timer
  useEffect(() => {
    return () => clearTimeout(hideControlsTimer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='inset-0 h-screen w-screen max-w-none translate-x-0 translate-y-0 rounded-none border-0 bg-black p-0'
        onMouseMove={handleMouseMove}
        onTouchStart={() => setShowControls(true)}
      >
        <div className='relative flex h-dvh w-full items-center justify-center overflow-hidden'>
          {/* Top Controls Bar */}
          <div
            className={`absolute left-0 right-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className='flex items-center space-x-4'>
              <span className='text-sm font-medium text-white'>
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            <div className='flex items-center space-x-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsZoomed(!isZoomed)}
                className='text-white hover:bg-white/20'
                title={isZoomed ? 'Zoom Out (Z)' : 'Zoom In (Z)'}
              >
                {isZoomed ? (
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7'
                    />
                  </svg>
                ) : (
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7'
                    />
                  </svg>
                )}
              </Button>

              <Button
                variant='ghost'
                size='sm'
                onClick={() => onOpenChange(false)}
                className='text-white hover:bg-white/20'
                title='Close (Esc)'
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <Carousel
            className='h-full w-full'
            opts={{ loop: true }}
            setApi={(api) => {
              if (!api) return;
              setCarouselApiLocal(api);
              setCarouselApi?.(api);

              // Scroll to the start index when dialog opens
              if (open && typeof startIndex === 'number') {
                try {
                  api.scrollTo(startIndex, true);
                } catch {
                  // ignore initial scroll failures (carousel may not be ready yet)
                }
              }

              // Subscribe to index changes
              const onSelect = () => {
                const idx = api.selectedScrollSnap();
                setCurrentIndex(idx);
                onIndexChange?.(idx);
              };
              api.on('select', onSelect);
            }}
          >
            <CarouselContent className='h-full'>
              {images.map((src, i) => (
                <CarouselItem key={i} className='h-full'>
                  <div
                    className='relative flex h-screen w-screen items-center justify-center overflow-hidden'
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <div
                      className={`relative h-full w-full transition-transform duration-300 ${
                        isZoomed
                          ? 'scale-150 cursor-zoom-out'
                          : 'cursor-zoom-in'
                      }`}
                      style={{
                        touchAction: isZoomed ? 'pan-x pan-y' : 'auto'
                      }}
                    >
                      <Image
                        src={src || '/placeholder.svg'}
                        alt={`Full view ${i + 1}`}
                        fill
                        sizes='100vw'
                        className='object-contain'
                        priority={i === startIndex}
                        draggable={false}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <div
              className={`transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
            >
              <CarouselPrevious className='left-4 h-12 w-12 border-2 border-[#f8d87d] bg-white/90 text-black transition-transform hover:scale-110 hover:bg-white' />
              <CarouselNext className='right-4 h-12 w-12 border-2 border-[#f8d87d] bg-white/90 text-black transition-transform hover:scale-110 hover:bg-white' />
            </div>
          </Carousel>

          {/* Bottom Info Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className='flex items-center justify-center space-x-4 text-center text-sm text-white/90'>
              <span className='hidden sm:inline'>Press Esc to close</span>
              <span className='hidden sm:inline'>•</span>
              <span className='hidden sm:inline'>Z to zoom</span>
              <span className='hidden sm:inline'>•</span>
              <span>Arrow keys or swipe to navigate</span>
            </div>

            {/* Thumbnail Preview */}
            <div className='mt-4 flex justify-center space-x-2'>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => carouselApiLocal?.scrollTo(i)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                    i === currentIndex
                      ? 'scale-110 border-[#f8d87d] opacity-100'
                      : 'border-white/30 opacity-50 hover:border-white/50 hover:opacity-75'
                  }`}
                >
                  <Image
                    src={src || '/placeholder.svg'}
                    alt={`Thumbnail ${i + 1}`}
                    width={64}
                    height={64}
                    className='h-full w-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
