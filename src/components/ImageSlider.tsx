'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import { Leaf } from 'lucide-react';

const images = [
  {
    src: '/slider_desktop_1.jpg',
    mobileSrc: '/slider_mobile_1.jpg',
    caption: (
      <div className='flex flex-col items-center sm:items-start text-center sm:text-left space-y-6 max-w-xl mx-auto sm:mx-0 bg-white/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-6 sm:p-0 rounded-2xl'>
        <h2 className='text-3xl sm:text-5xl md:text-6xl font-bold text-amber-950 leading-tight drop-shadow-sm'>
          Healthier. Happier.<br className='hidden sm:block' /> And Organic.
        </h2>
        <p className='text-lg sm:text-xl text-amber-900 font-medium max-w-md drop-shadow-sm'>
          Premium all-in-one nuts butter crafted without palm oil, refined sugar, or preservatives.
        </p>
        <button className='mt-4 bg-amber-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-900 transition-colors shadow-lg'>
          Shop Now
        </button>
      </div>
    )
  },
  {
    src: '/slider_desktop_2.jpg',
    caption: (
      <div className='flex  flex-col items-center sm:items-start text-center sm:text-left space-y-4 max-w-xl mx-auto sm:mx-0 bg-white/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-6 sm:p-0 rounded-2xl'>
        <h2 className='text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-sm'>
          Elevate Your<br className='hidden sm:block' /> Daily Nutrition
        </h2>
        <p className='text-lg sm:text-xl text-white font-medium max-w-md drop-shadow-sm'>
          A spoonful of everything good. The perfect companion for your morning toast, smoothies, and desserts.
        </p>
        <button className='mt-4 text-amber-800 bg-white px-8 py-3 rounded-full font-semibold hover:bg-amber-900 transition-colors shadow-lg'>
          Explore Recipes
        </button>
      </div>
    )
  }
];

const AUTOPLAY_INTERVAL = 3000;

export default function ImageSlider() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 0
    },
    initial: 0,
    slideChanged(slider) {
      const newSlide = slider.track.details.rel;
      setCurrentSlide(newSlide);
    },
    created() {
      setIsLoaded(true);
    }
  });

  // Clean up timers
  const clearTimers = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  }, []);

  // Progress bar animation
  const startProgress = useCallback(() => {
    if (progressTimer.current) clearInterval(progressTimer.current);

    setProgress(0);
    const startTime = Date.now();

    progressTimer.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        if (progressTimer.current) {
          clearInterval(progressTimer.current);
          progressTimer.current = null;
        }
      }
    }, 16); // ~60fps
  }, []);

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    if (timer.current) clearInterval(timer.current);

    // Start progress immediately
    startProgress();

    timer.current = setInterval(() => {
      if (!isHovered && instanceRef.current) {
        instanceRef.current.next();
        // Start progress for next slide
        setTimeout(() => startProgress(), 100);
      }
    }, AUTOPLAY_INTERVAL);
  }, [instanceRef, isHovered, startProgress]);

  const stopAutoplay = useCallback(() => {
    clearTimers();
    setProgress(0);
  }, [clearTimers]);

  // Handle autoplay based on hover state
  useEffect(() => {
    if (isHovered) {
      stopAutoplay();
    } else {
      startAutoplay();
    }

    return stopAutoplay;
  }, [isHovered, startAutoplay, stopAutoplay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  // Handle dot navigation
  const handleDotClick = useCallback(
    (index: number) => {
      if (instanceRef.current) {
        instanceRef.current.moveToIdx(index);
        // Restart progress immediately after manual navigation
        if (!isHovered) {
          setTimeout(() => startProgress(), 100);
        }
      }
    },
    [instanceRef, isHovered, startProgress]
  );

  // Handle mouse events
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='group relative mx-auto w-full'
    >
      {/* Slider Container */}
      <div
        ref={sliderRef}
        className='keen-slider h-[500px] w-full overflow-hidden shadow-md sm:h-[450px] md:h-[500px]'
      >
        {images.map((img, index) => (
          <div
            key={index}
            className='keen-slider__slide relative h-full w-full'
          >
            {img.mobileSrc ? (
              <>
                <div className="hidden sm:block absolute inset-0">
                  <Image
                    src={img.src}
                    alt={`Slide ${index + 1} Desktop`}
                    fill
                    className='object-cover'
                    priority={index === 0}
                    sizes='(max-width: 1200px) 80vw, 1200px'
                  />
                </div>
                <div className="block sm:hidden absolute inset-0">
                  <Image
                    src={img.mobileSrc}
                    alt={`Slide ${index + 1} Mobile`}
                    fill
                    className='object-cover'
                    priority={index === 0}
                    sizes='100vw'
                  />
                </div>
              </>
            ) : (
              <Image
                src={img.src}
                alt={`Slide ${index + 1}`}
                fill
                className='object-cover'
                priority={index === 0}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
              />
            )}

            {/* Caption with improved animations */}
            <div
              className={`absolute top-12 left-0 right-0 px-6 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto sm:left-12 md:left-10 sm:right-auto z-20 transition-all duration-700 ease-in-out ${
                currentSlide === index ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-4 opacity-0 pointer-events-none'
              }`}
            >
              {img?.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Loading skeleton - only show if not loaded */}
      {!isLoaded && (
        <div className='absolute inset-0 h-[500px] w-full animate-pulse rounded-md bg-gray-200 sm:h-[450px] md:h-[500px]' />
      )}

      {/* Dot Indicators */}
      <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform items-center gap-3'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className='cursor-pointer rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-white/50'
            aria-label={`Go to slide ${index + 1}`}
          >
            {currentSlide === index ? (
              <div className='h-2 w-12 overflow-hidden rounded-full bg-white/80 sm:w-16'>
                <div
                  className='h-full rounded-full bg-amber-700 transition-all duration-100 ease-linear'
                  style={{
                    width: isHovered ? '100%' : `${progress}%`,
                    transition: isHovered ? 'width 0.3s ease' : 'none'
                  }}
                />
              </div>
            ) : (
              <div className='h-2 w-2 rounded-full bg-white/60 transition-all duration-300 hover:bg-white/80' />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
