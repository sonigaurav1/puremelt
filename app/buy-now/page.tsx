"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import Header from "@/components/layout/Header";

const BuyNowPage = () => {
  const searchParams = useSearchParams();
  const [selectedWeight, setSelectedWeight] = useState(
    searchParams.get("weight") || "500g"
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productImages = ["/product.webp", "/product.webp", "/product.webp"];

  const prices = {
    "250g": { original: 349, discounted: 299 },
    "500g": { original: 699, discounted: 599 },
    "1kg": { original: 1299, discounted: 1099 },
  };

  const currentPrice = prices[selectedWeight as keyof typeof prices];
  const discount = Math.round(
    ((currentPrice.original - currentPrice.discounted) /
      currentPrice.original) *
      100
  );

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  const addToCart = () => {
    // Add to cart logic here
    alert(
      `Added ${quantity} x ${process.env.NEXT_PUBLIC_BRAND_NAME} ${selectedWeight} to cart!`
    );
  };

  const buyNow = () => {
    // Buy now logic here
    alert(
      `Proceeding to checkout with ${quantity} x ${process.env.NEXT_PUBLIC_BRAND_NAME} ${selectedWeight}`
    );
  };

  return (
    <>
      <Head>
        <title>Buy Healthy Peanut Butter Online | Penova</title>
        <meta
          name="description"
          content="Buy Penova premium healthy peanut butter and nuts butter online. 100% natural, organic, no preservatives, no palm oil, no refined sugar. Fast delivery in India."
        />
        <meta
          name="keywords"
          content="buy peanut butter, buy healthy peanut butter, buy nuts butter, penova online, order peanut butter India, premium peanut butter"
        />
        <link
          rel="canonical"
          href={
            (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
            "/buy-now"
          }
        />
        {/* Buy Now Page Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name:
                (process.env.NEXT_PUBLIC_BRAND_NAME || "Penova") +
                " Premium Peanut Butter",
              image: [
                (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
                  "/product.webp",
              ],
              description:
                "Buy Penova premium healthy peanut butter and nuts butter online. 100% natural, organic, no preservatives, no palm oil, no refined sugar. Fast delivery in India.",
              brand: {
                "@type": "Brand",
                name: process.env.NEXT_PUBLIC_BRAND_NAME || "Penova",
              },
              offers: {
                "@type": "Offer",
                url:
                  (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
                  "/buy-now",
                priceCurrency: "INR",
                price: "599",
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.5",
                reviewCount: "2500",
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <Header />

        {/* Product Section */}
        <section className="pb-12 pt-24 px-4 text-white bg-black">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left - Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative bg-white rounded-2xl overflow-hidden border border-black/40 shadow-lg">
                  <Image
                    src={
                      productImages[selectedImageIndex] || "/placeholder.svg"
                    }
                    alt={`${process.env.NEXT_PUBLIC_BRAND_NAME} Product`}
                    width={500}
                    height={500}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white">
                      100% Organic
                    </Badge>
                  </div>
                </div>

                {/* Thumbnail Images */}
                <div className="relative">
                  <div className="flex space-x-2 px-8 overflow-hidden">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border transition-all ${
                          selectedImageIndex === index
                            ? "border-primary-color"
                            : "border-black/20 hover:border-primary-color"
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
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2 shadow-lg border border-[#f8d87d] hover:bg-amber-50"
                  >
                    <ChevronLeft className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white rounded-full p-2 shadow-lg border border-[#f8d87d] hover:bg-amber-50"
                  >
                    <ChevronRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>

              {/* Right - Product Details */}
              <div className="space-y-6">
                {/* Product Title and Rating */}
                <div className="space-y-2">
                  <h1 className="text-3xl text-primary-color font-bold">
                    {process.env.NEXT_PUBLIC_BRAND_NAME || "Penova"} Premium
                    All-in-One Nuts Butter ({selectedWeight})
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm">(2,500+ reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold">
                      ₹{currentPrice.discounted}
                    </span>
                    <span className="text-xl text-[#f8d87d] line-through">
                      ₹{currentPrice.original}
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      {discount}% OFF
                    </Badge>
                  </div>
                  <p className="text-sm mt-1">(Inclusive all taxes)</p>
                </div>

                {/* Size Selection */}
                <div className="space-y-2">
                  <label className="text-white font-medium">Choose Size:</label>
                  <Select
                    value={selectedWeight}
                    onValueChange={setSelectedWeight}
                  >
                    <SelectTrigger className="w-full text-black">
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
                  <label className="text-white font-medium">Quantity:</label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-[#f8d87d] text-black"
                    >
                      -
                    </Button>
                    <span className="text-xl font-medium text-white min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-[#f8d87d] text-black"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full bg-[#EEFF00] text-black font-bold"
                    onClick={buyNow}
                  >
                    Buy Now - ₹{currentPrice.discounted * quantity}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-primary-color text-white bg-transparent"
                    onClick={addToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-primary-color hover:bg-amber-50"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    {
                      icon: (
                        <Star className="w-6 h-6 text-primary-color mx-auto mb-2" />
                      ),
                      label: "Top Rated Quality",
                    },
                    {
                      icon: (
                        <Shield className="w-6 h-6 text-primary-color mx-auto mb-2" />
                      ),
                      label: "Secure Payment",
                    },
                    {
                      icon: (
                        <Truck className="w-6 h-6 text-primary-color mx-auto mb-2" />
                      ),
                      label: "Fast Delivery",
                    },
                  ].map((feature, idx) => (
                    <div className="text-center" key={feature.label}>
                      {feature.icon}
                      <p className="text-xs text-primary-color">
                        {feature.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Product Description */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary-color">
                    Product Description
                  </h3>
                  <div className="space-y-3">
                    <p>
                      {process.env.NEXT_PUBLIC_BRAND_NAME || "Penova"} is not
                      just another nuts butter. It's a carefully crafted blend
                      of seven premium ingredients that creates a unique taste
                      experience unlike anything else in the market.
                    </p>
                    <p>
                      Our signature blend includes roasted peanuts for crunch,
                      smooth almonds for creaminess, rich cashews for
                      indulgence, premium pistachios for luxury, natural dates
                      for sweetness, and pure honey for golden flavor.
                    </p>
                  </div>

                  {/* Features with icons */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      {
                        icon: (
                          <Star className="w-6 h-6 text-[#e3ef26] mx-auto mb-1" />
                        ), // protein
                        title: "Protein Rich",
                        description: "25g protein per 100g",
                      },
                      {
                        icon: (
                          <Leaf className="w-6 h-6 text-[#e3ef26] mx-auto mb-1" />
                        ), // healthy fats
                        title: "Healthy Fats",
                        description: "Omega-3 & Omega-6",
                      },
                      {
                        icon: (
                          <Shield className="w-6 h-6 text-[#e3ef26] mx-auto mb-1" />
                        ), // no preservatives
                        title: "No Preservatives",
                        description: "100% Natural",
                      },
                      {
                        icon: (
                          <Heart className="w-6 h-6 text-[#e3ef26] mx-auto mb-1" />
                        ), // fiber
                        title: "Fiber Rich",
                        description: "From dates & nuts",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="bg-[#181818] flex flex-col items-center text-center border-[.5px] border-[#f8d87d] p-4 py-6 rounded-xl shadow-sm"
                      >
                        <h4 className="font-bold text-base mb-1 text-primary-color">
                          {item.title}
                        </h4>
                        <p className="text-xs text-white opacity-80">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BuyNowPage;
