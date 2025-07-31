"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import clsx from "clsx";
import { Award, Badge, Leaf } from "lucide-react";

const images = [
  {
    src: "/cta.webp",
  },
  {
    src: "/cta.webp",
    caption: (
      <p className="text-white text-center text-xl sm:text-2xl font-semibold">
        <Leaf className="inline mr-2" /> 100% Natural Ingredients
      </p>
    ),
  },
  {
    src: "/cta.webp",
    caption: (
      <div className="space-y-1">
        <h3 className="text-white text-xl font-bold">No Preservatives</h3>
        <p className="text-white text-sm">Just clean, premium nuts.</p>
      </div>
    ),
  },
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
      spacing: 0,
    },
    initial: 0,
    slideChanged(slider) {
      const newSlide = slider.track.details.rel;
      setCurrentSlide(newSlide);
    },
    created() {
      setIsLoaded(true);
    },
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
      className="relative 2xl:max-w-5xl w-full mx-auto group"
    >
      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="keen-slider w-full h-[450px] sm:h-[550px] md:h-[500px] overflow-hidden shadow-md"
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="keen-slider__slide relative w-full h-full"
          >
            <Image
              src={img.src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />

            {/* Caption with improved animations */}
            <div
              className={clsx(
                "absolute bottom-12 sm:bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 px-2 sm:px-4 py-2 z-20",
                "transition-all duration-700 ease-in-out",
                {
                  "opacity-100 translate-y-0": currentSlide === index,
                  "opacity-0 translate-y-4": currentSlide !== index,
                }
              )}
            >
              {img?.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Loading skeleton - only show if not loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 w-full h-[450px] sm:h-[550px] md:h-[500px] bg-gray-200 animate-pulse rounded-md" />
      )}

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1"
            aria-label={`Go to slide ${index + 1}`}
          >
            {currentSlide === index ? (
              <div className="w-12 sm:w-16 h-2 rounded-full bg-white/80 overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-100 ease-linear"
                  style={{
                    width: isHovered ? "100%" : `${progress}%`,
                    transition: isHovered ? "width 0.3s ease" : "none",
                  }}
                />
              </div>
            ) : (
              <div className="h-2 w-2 rounded-full bg-white/60 transition-all duration-300 hover:bg-white/80" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
