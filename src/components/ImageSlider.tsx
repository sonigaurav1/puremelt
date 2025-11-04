'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import clsx from 'clsx';
import { Leaf } from 'lucide-react';

const images = [
  {
    src: '/penowa.png',
    caption: (
      <p className='text-center text-xl font-semibold text-white sm:text-2xl'>
        No Refined Sugar and Palm Oil
      </p>
    )
  },
  {
    src: '/penowa.png',
    caption: (
      <p className='text-center text-xl font-semibold text-white sm:text-2xl'>
        <Leaf className='mr-2 inline' /> 100% Natural Ingredients
      </p>
    )
  },
  {
    src: '/penowa.png',
    caption: (
      <div className='space-y-1'>
        <h3 className='text-xl font-bold text-white'>No Preservatives</h3>
        <p className='text-sm text-white'>Just clean, premium nuts.</p>
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
            <Image
              src={img.src}
              alt={`Slide ${index + 1}`}
              fill
              className='object-cover'
              priority={index === 0}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
            />

            {/* Caption with improved animations */}
            {/* <div
              className={clsx(
                'absolute bottom-12 left-1/2 z-20 -translate-x-1/2 transform px-2 py-2 sm:bottom-16 sm:px-4 md:bottom-20',
                'transition-all duration-700 ease-in-out',
                {
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-4 opacity-0': currentSlide !== index
                }
              )}
            >
              {img?.caption}
            </div> */}
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
