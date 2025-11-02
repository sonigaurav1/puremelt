"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Large 404 with subtle animation */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-bold text-white/20 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-7xl font-bold text-white">404</div>
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Page Not Found</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button
              variant="default"
              size="lg"
              className="bg-white text-black hover:bg-white/90 transition-all duration-200 flex items-center gap-2 px-6"
            >
              <Home size={20} />
              Go Home
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.history.back()}
            className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-2 pt-8">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  )
}
