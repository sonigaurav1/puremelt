import type React from "react";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter, Parisienne, Playfair } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/cart-context";
import { AuthProvider } from "./components/auth-context";

const inter = Inter({ subsets: ["latin"] });

const playfair = Playfair({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair", // optional for CSS vars
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // include bold weights
  variable: "--font-ibmplex", // optional for Tailwind usage
  display: "swap", // improves performance
});

const parisienne = Parisienne({
  weight: "400", // Only one weight available for Parisienne
  subsets: ["latin"], // or ["latin-ext"]
  variable: "--font-parisienne", // optional for Tailwind usage
  display: "swap",
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_BRAND_NAME} | Premium Peanut Butter & Healthy Nuts Butters`,
  description:
    "Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates & honey. No preservatives, no palm oil, no refined sugar. Healthier, tastier, organic.",
  keywords: [
    "peanut butter",
    "healthy peanut butter",
    "organic peanut butter",
    "nuts butter",
    "premium peanut butter",
    "natural peanut butter",
    "no palm oil peanut butter",
    "no sugar peanut butter",
    "protein peanut butter",
    "best peanut butter India",
    "cashew butter",
    "almond butter",
    "pistachio butter",
    "dates honey peanut butter",
    "peanut butter",
    "penova peanut butter",
    "best peanut butter in india",
    "natural peanut butter",
    "organic peanut butter india",
    "buy peanut butter online",
  ],
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_BRAND_NAME} | Premium Peanut Butter & Healthy Nuts Butters`,
    description:
      "Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates & honey. Healthier, tastier, organic.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in",
    siteName: process.env.NEXT_PUBLIC_BRAND_NAME || "Penova",
    images: [
      {
        url:
          (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
          "/hero-butter.webp",
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_BRAND_NAME} Premium Peanut Butter`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${process.env.NEXT_PUBLIC_BRAND_NAME} | Premium Peanut Butter & Healthy Nuts Butters`,
    description:
      "Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates & honey. Healthier, tastier, organic.",
    images: [
      (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
        "/hero-butter.webp",
    ],
    site: "@puremeltin",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Canonical tag for SEO */}
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in"}
        />
        {/* Organization Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: process.env.NEXT_PUBLIC_BRAND_NAME || "Penova",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in",
              logo:
                (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
                "/placeholder-logo.png",
              sameAs: [
                "https://www.instagram.com/puremeltin/",
                "https://www.facebook.com/puremeltin/",
                "https://twitter.com/puremeltin",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91 93183 67696",
                  contactType: "customer support",
                  email: "support@penova.in",
                },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Humayunpur Chowk",
                addressLocality: "South Delhi",
                addressRegion: "Delhi",
                postalCode: "110029",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} ${playfair.variable} ${ibmPlexSans.variable} ${parisienne.variable}`}
      >
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
