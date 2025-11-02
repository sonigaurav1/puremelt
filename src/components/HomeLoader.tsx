'use client';

import { useState, useEffect } from 'react';

const HomeLoader = () => {
  const [loadingText, setLoadingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Penowa';

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeText = () => {
      if (!isDeleting && currentIndex < fullText.length) {
        setLoadingText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeText, 150);
      } else if (!isDeleting && currentIndex === fullText.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          typeText();
        }, 2000);
      } else if (isDeleting && currentIndex > 0) {
        currentIndex--;
        setLoadingText(fullText.slice(0, currentIndex));
        timeoutId = setTimeout(typeText, 100);
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        timeoutId = setTimeout(typeText, 500);
      }
    };

    typeText();

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 600);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-black bg-gradient-to-br text-white'>
      <div className='absolute inset-0'>
        {/* Animated gradient orbs */}
        {/* <div className="absolute top-1/4 -left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/3 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div> */}

        {/* Subtle grid pattern overlay */}
        <div
          className='absolute inset-0 opacity-5'
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className='relative z-10 text-center'>
        <div className='mb-2'>
          <span className='bg-gradient-to-r from-amber-600 via-white to-amber-600 bg-clip-text text-7xl font-bold text-transparent drop-shadow-2xl md:text-8xl'>
            {loadingText || '\u00A0'}
            {/* <span
              className={`inline-block w-1 h-20 bg-gradient-to-b from-amber-600 to-purple-600 ml-2 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
            /> */}
          </span>
        </div>

        {/* <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-b from-amber-400 to-white rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "1.4s",
                }}
              />
            ))}
          </div>
        </div> */}

        <p className='mb-8 animate-pulse text-sm font-light uppercase tracking-widest text-slate-400'>
          Taste the Finest
        </p>

        <div className='mx-auto mt-8 h-px w-72 overflow-hidden rounded-full bg-gradient-to-r from-transparent via-slate-600 to-transparent'>
          <div
            className='h-full bg-gradient-to-r from-amber-500 to-amber-500'
            style={{
              width: '100%',
              animation: 'loading-bar 2s ease-in-out infinite'
            }}
          />
        </div>

        {/* <p className="text-slate-600 text-xs font-light tracking-wider mt-12">v1.0.0</p> */}
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            opacity: 0;
          }
          50% {
            width: 70%;
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0.5;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeLoader;
