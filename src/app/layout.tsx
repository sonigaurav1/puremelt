import type React from 'react';
// Service worker registration moved to client component
import type { Metadata, Viewport } from 'next';
import {
  Alex_Brush,
  IBM_Plex_Sans,
  Inter,
  Parisienne,
  Playfair
} from 'next/font/google';
import './globals.css';
import { CartProvider } from './components/cart-context';
import { AuthProvider } from './components/auth-context';
import { ThemeProvider } from '../components/theme-provider';
import { Toaster } from '../components/ui/sonner';
import { ConvexClientProvider } from '@/components/providers/ConvexProvider';
import { PHONE_NUMBER } from '@/constant';

const inter = Inter({ subsets: ['latin'] });

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair' // optional for CSS vars
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // include bold weights
  variable: '--font-ibmplex', // optional for Tailwind usage
  display: 'swap' // improves performance
});

const parisienne = Parisienne({
  weight: '400', // Only one weight available for Parisienne
  subsets: ['latin'], // or ["latin-ext"]
  variable: '--font-parisienne', // optional for Tailwind usage
  display: 'swap'
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-alex',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in'
  ),
  title: `${process.env.NEXT_PUBLIC_BRAND_NAME} | Premium Peanut Butter & Healthy Nuts Butters`,
  description:
    'Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates & honey. No preservatives, no palm oil, no refined sugar. Healthier, tastier, organic.',
  keywords: [
    'peanut butter',
    'healthy peanut butter',
    'organic peanut butter',
    'nuts butter',
    'premium peanut butter',
    'natural peanut butter',
    'no palm oil peanut butter',
    'no sugar peanut butter',
    'protein peanut butter',
    'best peanut butter India',
    'cashew butter',
    'almond butter',
    'pistachio butter',
    'dates honey peanut butter',
    'penowa peanut butter',
    'best peanut butter in india',
    'organic peanut butter india',
    'buy peanut butter online'
  ],
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png' }],
    other: [{ rel: 'manifest', url: '/manifest.json' }]
  },
  authors: [{ name: 'Gaurav Soni' }],
  creator: 'Gaurav Soni',
  publisher: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa',
  applicationName: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in'
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in',
    title: `${process.env.NEXT_PUBLIC_BRAND_NAME} | Premium Peanut Butter & Healthy Nuts Butters`,
    description:
      'Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates & honey. Healthier, tastier, organic.',
    siteName: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa',
    images: [
      {
        url:
          (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
          '/hero-butter.webp',
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_BRAND_NAME} Premium Peanut Butter`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@puremeltin',
    creator: '@puremeltin',
    title: `${process.env.NEXT_PUBLIC_BRAND_NAME} | Premium Peanut Butter & Healthy Nuts Butters`,
    description:
      'Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates & honey. Healthier, tastier, organic.',
    images: [
      (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
        '/hero-butter.webp'
    ]
  },
  appleWebApp: {
    title: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa',
    statusBarStyle: 'black-translucent',
    capable: true
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true
  },
  category: 'Food',
  classification: 'Peanut Butter & Nut Butters',
  other: {
    'business:contact_data:street_address': 'Humayunpur Chowk',
    'business:contact_data:locality': 'South Delhi',
    'business:contact_data:region': 'Delhi',
    'business:contact_data:postal_code': '110029',
    'business:contact_data:country_name': 'India',
    'fb:app_id': '',
    'article:author': 'Gaurav Soni',
    'article:section': 'Food',
    'article:tag': 'peanut butter'
  }
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fff9f3'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${inter.className} ${alexBrush.variable} ${playfair.variable} ${ibmPlexSans.variable} ${parisienne.variable}`}
    >
      <head>
        {/* Canonical tag for SEO */}
        <link
          rel='canonical'
          href={process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in'}
        />
        <link rel='manifest' href='/manifest.json' />
        {/* Organization Structured Data for SEO */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in',
              logo:
                (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                '/placeholder-logo.png',
              sameAs: [
                'https://www.instagram.com/puremeltin/',
                'https://www.facebook.com/puremeltin/',
                'https://twitter.com/puremeltin'
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: PHONE_NUMBER,
                  contactType: 'customer support',
                  email: 'support@penowa.in'
                }
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Humayunpur Chowk',
                addressLocality: 'South Delhi',
                addressRegion: 'Delhi',
                postalCode: '110029',
                addressCountry: 'IN'
              }
            })
          }}
        />
      </head>
      <body>
        {/* <RegisterServiceWorker /> */}
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          enableColorScheme={false}
        >
          <Toaster richColors />
          <AuthProvider>
            <ConvexClientProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </ConvexClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
