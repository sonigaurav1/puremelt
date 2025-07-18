import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, Inter, Playfair, Titillium_Web } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./components/cart-context"
import { AuthProvider } from "./components/auth-context"

const inter = Inter({ subsets: ["latin"] })

const tilillium_web = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tilillium_web", // optional for CSS vars
});

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

export const metadata: Metadata = {
  title: "PureMelt - Premium Nut Butter",
  description: "Premium blend of peanuts, almonds, cashews, pistachios, dates, honey & chocolate"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} ${ibmPlexSans.className}`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
