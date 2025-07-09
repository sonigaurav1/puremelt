"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/layout/Header"

export default function BuyNowPage() {
  const searchParams = useSearchParams()
  const [selectedWeight, setSelectedWeight] = useState(searchParams.get("weight") || "500g")
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const productImages = [
    "/product.webp",
    "/product.webp",
    "/product.webp",
    "/product.webp",
    "/product.webp",
  ]

  const prices = {
    "250g": { original: 349, discounted: 299 },
    "500g": { original: 699, discounted: 599 },
    "1kg": { original: 1299, discounted: 1099 },
  }

  const currentPrice = prices[selectedWeight as keyof typeof prices]
  const discount = Math.round(((currentPrice.original - currentPrice.discounted) / currentPrice.original) * 100)

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const addToCart = () => {
    // Add to cart logic here
    alert(`Added ${quantity} x PureMelt ${selectedWeight} to cart!`)
  }

  const buyNow = () => {
    // Buy now logic here
    alert(`Proceeding to checkout with ${quantity} x PureMelt ${selectedWeight}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <Header />

      {/* Product Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden border border-amber-200">
                <Image
                  src={productImages[selectedImageIndex] || "/placeholder.svg"}
                  alt="PureMelt Product"
                  width={500}
                  height={500}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">100% Organic</Badge>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="relative">
                <div className="flex space-x-2 px-8 overflow-hidden">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index ? "border-amber-600" : "border-amber-200"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product view ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2 shadow-lg border border-amber-200 hover:bg-amber-50"
                >
                  <ChevronLeft className="w-4 h-4 text-amber-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white rounded-full p-2 shadow-lg border border-amber-200 hover:bg-amber-50"
                >
                  <ChevronRight className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>

            {/* Right - Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-amber-900 mb-2">PureMelt Premium Nut Butter</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-amber-700">(2,500+ reviews)</span>
                </div>
                <p className="text-amber-700 leading-relaxed">
                  A premium blend of peanuts, almonds, cashews, pistachios, dates, honey & chocolate—crafted into one
                  irresistible spoon. Healthier. Happier. Organic.
                </p>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-amber-900">₹{currentPrice.discounted}</span>
                  <span className="text-xl text-gray-500 line-through">₹{currentPrice.original}</span>
                  <Badge className="bg-green-100 text-green-800">{discount}% OFF</Badge>
                </div>
                <p className="text-sm text-amber-600">Inclusive of all taxes • Free shipping on orders above ₹500</p>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <label className="text-amber-900 font-medium">Choose Size:</label>
                <Select value={selectedWeight} onValueChange={setSelectedWeight}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="250g">250g - ₹299 (₹349)</SelectItem>
                    <SelectItem value="500g">500g - ₹599 (₹699)</SelectItem>
                    <SelectItem value="1kg">1kg - ₹1099 (₹1299)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-amber-900 font-medium">Quantity:</label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-amber-200"
                  >
                    -
                  </Button>
                  <span className="text-xl font-medium text-amber-900 min-w-[2rem] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-amber-200"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white" onClick={buyNow}>
                  Buy Now - ₹{currentPrice.discounted * quantity}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-amber-300 text-amber-900 hover:bg-amber-50 bg-transparent"
                  onClick={addToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="ghost" size="lg" className="w-full text-amber-700 hover:bg-amber-50">
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-xs text-amber-700">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-xs text-amber-700">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-xs text-amber-700">Easy Returns</p>
                </div>
              </div>

              <Separator />

              {/* Product Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-amber-900">Product Description</h3>
                <div className="space-y-3 text-amber-700">
                  <p>
                    PureMelt is not just another peanut butter. It's a carefully crafted blend of seven premium
                    ingredients that creates a unique taste experience unlike anything else in the market.
                  </p>
                  <p>
                    Our signature blend includes roasted peanuts for crunch, smooth almonds for creaminess, rich cashews
                    for indulgence, premium pistachios for luxury, natural dates for sweetness, pure honey for golden
                    flavor, and dark chocolate for that perfect finish.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-1">Protein Rich</h4>
                    <p className="text-sm text-amber-700">25g protein per 100g</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-1">No Preservatives</h4>
                    <p className="text-sm text-amber-700">100% Natural</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-1">Healthy Fats</h4>
                    <p className="text-sm text-amber-700">Omega-3 & Omega-6</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-1">Fiber Rich</h4>
                    <p className="text-sm text-amber-700">From dates & nuts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
