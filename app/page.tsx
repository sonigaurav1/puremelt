"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  ShoppingCart,
  Heart,
  Leaf,
  Shield,
  Award,
  Users,
  Instagram,
  Facebook,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./components/cart-context";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";

export default function HomePage() {
  const [customerCount, setCustomerCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState("500g");
  const router = useRouter();

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animate customer count only after client-side hydration
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCustomerCount((prev) => {
        if (prev >= 2500) {
          clearInterval(interval);
          return 2500;
        }
        return prev + 50;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isClient]);

  const handleOrderNow = () => {
    router.push(`/buy-now?weight=${selectedWeight}`);
  };

  const handleLearnMore = () => {
    router.push("/about");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section id="home" className="md:py-10 md:px-8 py-10 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-amber-100 text-sm  text-amber-800 hover:bg-amber-200">
                  India's Finest Nut Butter
                </Badge>
                <h1 className="text-[40px] lg:text-6xl font-bold text-amber-900 leading-tight">
                  All-in-One
                  <span className="block text-amber-700">Nut Butter</span>
                </h1>
                <p className="text-xl text-amber-800 leading-relaxed">
                  A premium blend of{" "}
                  <b>
                    {" "}
                    peanuts, almonds, cashews, pistachios, dates, honey &
                    chocolate{" "}
                  </b>{" "}
                  - crafted into one irresistible spoon.
                </p>
                <p className="text-lg text-amber-700 font-medium">
                  Healthier. Happier. Organic.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-amber-900 font-medium">
                    Choose Weight:
                  </label>
                  <Select
                    value={selectedWeight}
                    onValueChange={setSelectedWeight}
                  >
                    <SelectTrigger className="w-32 focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="250g">250g</SelectItem>
                      <SelectItem value="500g">500g</SelectItem>
                      <SelectItem value="1kg">1kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3"
                    onClick={handleOrderNow}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Buy Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-amber-300 text-amber-900 hover:bg-amber-50 px-8 py-3 bg-transparent"
                    onClick={handleLearnMore}
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-2 text-amber-800 font-medium">4.9/5</span>
                </div>
                <div className="text-amber-700">
                  <span className="font-semibold">
                    {isClient ? customerCount.toLocaleString() : "2,500"}+
                  </span>{" "}
                  Happy Customers
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl overflow-hidden">
                <Image
                  src="/hero.webp"
                  alt="PureMelt Premium Nut Butter Jar"
                  width={400}
                  height={400}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-full font-semibold">
                100% Organic
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Spotlight */}
      <section id="product" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Our Signature Product
            </h2>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto">
              One variant. Perfected. Because sometimes, one is enough.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/cta.webp"
                alt="PureMelt Jar with ingredients"
                width={500}
                height={500}
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-amber-900 mb-4">
                  Premium Nut Blend
                </h3>
                <p className="text-lg text-amber-700 leading-relaxed">
                  We carefully blend the finest peanuts, almonds, cashews,
                  pistachios, dates, honey, and chocolate into one balanced,
                  nutrient-rich spread. No preservatives, no palm oil, no
                  refined sugar—just real ingredients.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">
                    Protein Rich
                  </h4>
                  <p className="text-sm text-amber-700">25g protein per 100g</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">
                    Healthy Fats
                  </h4>
                  <p className="text-sm text-amber-700">Omega-3 & Omega-6</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">
                    No Preservatives
                  </h4>
                  <p className="text-sm text-amber-700">100% Natural</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">
                    Fiber Rich
                  </h4>
                  <p className="text-sm text-amber-700">From dates & nuts</p>
                </div>
              </div>

              <Link href="/buy-now">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₹599
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Nature's Finest, Blended to Perfection
            </h2>
            <p className="text-xl text-amber-700">
              Each ingredient is carefully selected for taste, nutrition, and
              quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Peanuts",
                description: "Roasted for aroma & crunch",
                icon: "🥜",
              },
              {
                name: "Almonds",
                description: "Smoothness & healthy fats",
                icon: "🌰",
              },
              {
                name: "Cashews",
                description: "Creamy delight & rich nutrients",
                icon: "🥜",
              },
              {
                name: "Pistachios",
                description: "Luxury & antioxidants",
                icon: "🌰",
              },
              {
                name: "Dates",
                description: "Fiber-rich with caramel twist",
                icon: "🌴",
              },
              { name: "Honey", description: "Natural sweetness", icon: "🍯" },
              {
                name: "Dark Chocolate",
                description: "Indulgent & rich",
                icon: "🍫",
              },
            ].map((ingredient, index) => (
              <Card
                key={index}
                className="border-amber-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{ingredient.icon}</div>
                  <h3 className="font-bold text-amber-900 mb-2">
                    {ingredient.name}
                  </h3>
                  <p className="text-sm text-amber-700">
                    {ingredient.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why PureMelt Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Why Choose PureMelt?
            </h2>
            <p className="text-xl text-amber-700">
              We're not just another peanut butter. We're a revolution in a jar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "No Preservatives",
                description:
                  "100% natural ingredients with no artificial preservatives",
              },
              {
                icon: Leaf,
                title: "No Palm Oil",
                description:
                  "We use only the finest nut oils for better health",
              },
              {
                icon: Heart,
                title: "No Refined Sugar",
                description: "Sweetened naturally with dates and honey",
              },
              {
                icon: Award,
                title: "Organic Product",
                description:
                  "Certified organic ingredients sourced responsibly",
              },
              {
                icon: Star,
                title: "Unique Flavor",
                description:
                  "Best flavor profile in the market - one of a kind",
              },
              {
                icon: Users,
                title: "All Nuts in One",
                description: "7 premium ingredients in every spoonful",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-amber-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-bold text-amber-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-amber-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              How to Enjoy PureMelt
            </h2>
            <p className="text-xl text-amber-700">
              Versatile, delicious, and perfect for any time of day
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Spread on Bread",
                description: "Perfect for breakfast toast or sandwiches",
                image: "🍞",
              },
              {
                title: "Add to Shakes",
                description: "Boost your protein smoothies",
                image: "🥤",
              },
              {
                title: "Pair with Fruits",
                description: "Delicious with apples, bananas, or berries",
                image: "🍎",
              },
              {
                title: "Drizzle on Desserts",
                description: "Elevate your desserts and treats",
                image: "🧁",
              },
            ].map((usage, index) => (
              <Card
                key={index}
                className="border-amber-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{usage.image}</div>
                  <h3 className="font-bold text-amber-900 mb-2">
                    {usage.title}
                  </h3>
                  <p className="text-amber-700">{usage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/recipes">
              <Button
                variant="outline"
                className="border-amber-300 text-amber-900 hover:bg-amber-50 bg-transparent"
              >
                View All Recipes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-amber-700">
              Join thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                rating: 5,
                text: "Finally, a nut butter that tastes amazing and is actually healthy! My kids love it too.",
              },
              {
                name: "Rahul Gupta",
                location: "Delhi",
                rating: 5,
                text: "As a fitness enthusiast, this is perfect for my post-workout meals. The taste is incredible!",
              },
              {
                name: "Anita Patel",
                location: "Bangalore",
                rating: 5,
                text: "The blend of flavors is unique. I've never tasted anything like this before. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-amber-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-amber-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-amber-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-amber-600">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of customers who've made the switch to premium
            nutrition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buy-now">
              <Button
                size="lg"
                className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order Now - ₹599
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-amber-700 px-8 py-3 bg-transparent"
              >
                Try Risk-Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white pt-16 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-xl font-bold">PureMelt</span>
              </Link>
              <p className="text-amber-200 mb-4">
                Premium nut butter crafted for the health-conscious,
                flavor-seeking consumer.
              </p>
              <div className="flex space-x-4">
                <Instagram className="w-5 h-5 text-amber-300 hover:text-white cursor-pointer" />
                <Facebook className="w-5 h-5 text-amber-300 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-amber-300 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-amber-200">
                <li>
                  <Link href="/about" className="hover:text-white">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/product" className="hover:text-white">
                    Our Product
                  </Link>
                </li>
                <li>
                  <Link href="/recipes" className="hover:text-white">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-amber-200">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-amber-200 text-sm mb-4">
                Get recipes, health tips, and exclusive offers!
              </p>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-amber-700 text-white placeholder:text-amber-300"
                />
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">We Accept</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="rounded text-center">
                  <Image
                    src="/upi.webp"
                    alt="UPI Payment"
                    width={100}
                    height={100}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="space-y-2 text-amber-200">
                <p className="text-sm">Email: support@puremelt.in</p>
                <p className="text-sm">Phone: +91 93183 67696</p>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-12 pt-8 text-center text-amber-300">
            <p>
              &copy; 2025 PureMelt. All rights reserved. | Privacy Policy |
              Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
