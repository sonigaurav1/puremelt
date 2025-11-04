'use client';

import { useState, useEffect } from 'react';

const HomeLoader = () => {
  // Smooth per-letter reveal using CSS transitions rather than re-rendering full string
  const fullText = 'Penowa';
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fine-tuned timing for natural feel; minimal work per tick
  useEffect(() => {
    let delay = isDeleting ? 70 : 120; // base speed

    if (!isDeleting && index === fullText.length) delay = 1800; // pause after typing
    if (isDeleting && index === 0) delay = 420; // short pause before retyping

    const id = setTimeout(() => {
      if (!isDeleting) {
        if (index < fullText.length) setIndex(index + 1);
        else setIsDeleting(true);
      } else {
        if (index > 0) setIndex(index - 1);
        else setIsDeleting(false);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [index, isDeleting, fullText.length]);

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
          {/* Container to stack gradient text and a masking overlay that reveals per-letter */}
          <span className='relative inline-block'>
            {/* Bottom layer: single continuous gradient across the whole word */}
            <span className='gradient-text bg-gradient-to-r from-amber-600 via-white to-amber-600 bg-clip-text text-7xl font-bold text-transparent [-webkit-font-smoothing:antialiased] [text-rendering:optimizeLegibility] md:text-8xl'>
              {fullText}
            </span>
            {/* Top layer: per-letter overlay that fades out to reveal gradient below */}
            <span
              aria-hidden
              className='mask-layer pointer-events-none absolute inset-0 inline-flex items-end text-7xl font-bold [-webkit-font-smoothing:antialiased] [text-rendering:optimizeLegibility] md:text-8xl'
            >
              {fullText.split('')?.map((ch, i) => (
                <span
                  key={i}
                  className={`mask-letter ${i < index ? 'revealed' : ''}`}
                >
                  {ch}
                  <span className='cover' />
                </span>
              ))}
            </span>
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

        /* Subtle, smooth per-letter reveal */
        /* Per-letter overlay that hides text until revealed (continuous gradient below) */
        .mask-layer {
          color: transparent; /* do not render overlay text itself */
          text-shadow: none;
        }
        .mask-letter {
          position: relative;
          display: inline-block;
        }
        .mask-letter .cover {
          position: absolute;
          inset: 0;
          background: #000; /* match page background */
          transform-origin: left center;
          transform: scaleX(1);
          opacity: 1;
          transition:
            transform 220ms ease,
            opacity 220ms ease;
          will-change: transform, opacity;
        }
        .mask-letter.revealed .cover {
          transform: scaleX(0);
          opacity: 0;
        }

        /* Ensure gradient text works across browsers (esp. Safari) */
        .gradient-text {
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }

        /* GPU-friendly caret blink */
        @keyframes caret-blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        .caret {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: linear-gradient(to bottom, #f59e0b, #ffffff);
          animation: caret-blink 1s step-start infinite;
          align-self: flex-end;
        }
      `}</style>
    </div>
  );
};

export default HomeLoader;
