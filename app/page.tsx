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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import ImageSlider from "@/components/ImageSlider";

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
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Puremelt Peanut Butter | Best Organic, Healthy, Chocolate Peanut Butter in India</title>
        <meta name="description" content="Buy Puremelt's premium, organic, and healthy peanut butter. India's best chocolate peanut butter for fitness, gym, and health. No palm oil, no refined sugar, only real ingredients!" />
        <meta name="keywords" content="peanut butter, puremelt peanut butter, organic peanut butter, healthy peanut butter, chocolate peanut butter, best peanut butter, india peanut butter, premium peanut butter, fitness peanut butter, gym peanut butter, nuts butter, natural peanut butter, protein peanut butter" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Puremelt Peanut Butter | Best Organic, Healthy, Chocolate Peanut Butter in India" />
        <meta property="og:description" content="Buy Puremelt's premium, organic, and healthy peanut butter. India's best chocolate peanut butter for fitness, gym, and health. No palm oil, no refined sugar, only real ingredients!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://puremelt.in/" />
        <meta property="og:image" content="https://puremelt.in/hero-butter.webp" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Puremelt Peanut Butter | Best Organic, Healthy, Chocolate Peanut Butter in India" />
        <meta name="twitter:description" content="Buy Puremelt's premium, organic, and healthy peanut butter. India's best chocolate peanut butter for fitness, gym, and health. No palm oil, no refined sugar, only real ingredients!" />
        <meta name="twitter:image" content="https://puremelt.in/hero-butter.webp" />
      </head>
      {/* JSON-LD Structured Data for Product SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name:
              (process.env.NEXT_PUBLIC_BRAND_NAME || "Puremelt") +
              " Premium Peanut Butter",
            image: [
              (process.env.NEXT_PUBLIC_SITE_URL || "https://puremelt.in") +
                "/hero-butter.webp",
              (process.env.NEXT_PUBLIC_SITE_URL || "https://puremelt.in") +
                "/cta.webp",
            ],
            description:
              "Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates, honey & chocolate. No preservatives, no palm oil, no refined sugar. Healthier, tastier, organic.",
            brand: {
              "@type": "Brand",
              name: process.env.NEXT_PUBLIC_BRAND_NAME || "Puremelt",
            },
            offers: {
              "@type": "Offer",
              url:
                (process.env.NEXT_PUBLIC_SITE_URL || "https://puremelt.in") +
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

      {/* FAQPage JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What makes Puremelt the best healthy peanut butter in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Puremelt uses only premium, natural ingredients: peanuts, almonds, cashews, pistachios, dates, honey, and chocolate. No palm oil, no preservatives, and no refined sugar. Our peanut butter is protein-rich, organic, and delicious!"
                }
              },
              {
                "@type": "Question",
                "name": "Is your peanut butter suitable for fitness and weight loss?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our healthy peanut butter is high in protein and healthy fats, making it perfect for fitness enthusiasts, athletes, and anyone looking for a nutritious snack or post-workout meal."
                }
              },
              {
                "@type": "Question",
                "name": "Do you use palm oil or refined sugar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Never. We use only natural sweeteners like dates and honey, and never add palm oil or refined sugar. This makes our nuts butter healthier and tastier."
                }
              },
              {
                "@type": "Question",
                "name": "Is Puremelt peanut butter organic?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we use certified organic ingredients wherever possible, ensuring a clean, healthy, and safe product for you and your family."
                }
              },
              {
                "@type": "Question",
                "name": "How can I use your peanut butter?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Spread it on bread, add to shakes, pair with fruits, or drizzle on desserts. Check out our healthy peanut butter recipes for more ideas!"
                }
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />

        <main className="md:pt-[76px]">
          <ImageSlider />
        </main>

        {/* Hero Section */}
        <section id="home" className="md:py-10 md:px-8 pt-10 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 relative">
                <div className="space-y-4">
                  <Badge className="bg-[#69b31e] hover:bg-[#69b31e] text-lg text-white">
                    <Award size={20} className="mr-1" /> India's Finest Nuts
                    Butter
                  </Badge>
                  <h1 className="text-[45px] font-playfair text-[#232323] lg:text-6xl font-bold leading-tight">
                    All-in-One
                    <span className="block text-primary-color -mt-4 md:-mt-2">
                      Nuts Butter
                    </span>
                  </h1>
                  <div className="absolute top-4 right-8 -rotate-45 md:hidden">
                    <Image
                      src="/hero-butter.webp"
                      alt="Premium healthy peanut butter jar with ingredients - Puremelt, best organic healthy peanut butter in India"
                      width={100}
                      height={100}
                      className="w-20 rounded-2xl"
                      priority
                    />
                  </div>
                  <p className="text-xl text-[#232323] leading-1">
                    <span className="text-xl">A premium blend of </span>
                    <b
                      style={{ fontFamily: "Magnolia Script" }}
                      className="text-primary-color font-ibm text-[23px]"
                    >
                      {" "}
                      Peanuts, Almonds, Cashews, Pistachios, Dates, Raisins,
                      Honey & Chocolate{" "}
                    </b>{" "}
                    <span className="text-xl">
                      - all blended into one delicious spoonful.
                    </span>
                  </p>
                  <p className="text-xl text-[#69b31e] font-medium font-ibm text-[24px]">
                    Healthier. Tastier. Organic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Spotlight */}
        <section id="product" className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src="/cta.webp"
                  alt="Healthy peanut butter and nuts butter jar - Puremelt premium blend, organic chocolate peanut butter India"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-secondary-color font-medium">
                      Choose Weight:
                    </label>
                    <Select
                      value={selectedWeight}
                      onValueChange={setSelectedWeight}
                    >
                      <SelectTrigger className="w-32 font-bold border-primary-color text-primary-color focus:ring-0 border-[.1px] focus:border-primary-color">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="text-primary-color border-primary-color">
                        <SelectItem value="250g">250g</SelectItem>
                        <SelectItem value="500g">500g</SelectItem>
                        <SelectItem value="1kg">1kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="text-white px-8 py-3 bg-[#ff0000]"
                      onClick={handleOrderNow}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Buy Now
                    </Button>
                    <Link href="/buy-now">
                      <Button
                        size="lg"
                        className="hover:bg-slate-100 border-[.1px] border-primary-color text-secondary-color bg-white w-full"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart - ₹599
                      </Button>
                    </Link>
                  </div>

                  <h3 className="text-3xl pt-10 font-bold text-primary-color">
                    Premium Nuts Blend
                  </h3>

                  <p className="text-lg text-secondary-color leading-relaxed">
                    We carefully blend the finest{" "}
                    <b className="text-[#674ebc] text-xl">
                      {" "}
                      peanuts, almonds, cashews, pistachios, raisins, honey, and
                      chocolate{" "}
                    </b>
                    into one balanced, nutrient-rich spread.{" "}
                    <b className="text-[#674ebc] text-xl">
                      {" "}
                      No preservatives, no palm oil, no refined sugar{" "}
                    </b>{" "}
                    - just real ingredients.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      title: "Protein Rich",
                      description: "25g protein per 100g",
                    },
                    {
                      title: "Healthy Fats",
                      description: "Omega-3 & Omega-6",
                    },
                    {
                      title: "No Preservatives",
                      description: "100% Natural",
                    },
                    {
                      title: "Fiber Rich",
                      description: "From dates & nuts",
                    },
                  ].map((item, idx) => (
                    <div
                      key={item.title}
                      className="bg-white border-[.1px] border-primary-color p-4 rounded-lg"
                    >
                      <h4 className="font-semibold text-secondary-color mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#bd0000]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="ml-2 font-medium">4.5/5</span>
                  </div>
                  <div className="">
                    <span className="font-semibold">
                      {isClient ? customerCount.toLocaleString() : "2,500"}+
                    </span>{" "}
                    Happy Customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary-color mb-4">
                <span className="text-primary-color">Nature's</span> Finest,
                Blended to Perfection
              </h2>
              <p className="text-xl text-sub-heading">
                Each ingredient is carefully selected for taste, nutrition, and
                quality.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-6">
              {[
                {
                  name: "Peanuts",
                  description: "Roasted for aroma & crunch",
                  icon: "https://images.unsplash.com/photo-1575399872095-9363bf262e64?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVhbnV0fGVufDB8fDB8fHww",
                },
                {
                  name: "Almonds",
                  description: "Smoothness & healthy fats",
                  icon: "https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  name: "Cashews",
                  description: "Creamy delight & rich nutrients",
                  icon: "https://images.unsplash.com/photo-1723466998060-533cd1af4e11?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhc2hld3xlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  name: "Pistachios",
                  description: "Luxury & antioxidants",
                  icon: "https://images.unsplash.com/photo-1704079662049-d00890d21a69?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlzdGFjaGlvc3xlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  name: "Dates",
                  description: "Fiber-rich with caramel twist",
                  icon: "https://plus.unsplash.com/premium_photo-1676208753932-6e8bc83a0b0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0ZXN8ZW58MHx8MHx8fDA%3D",
                },
                {
                  name: "Raisins",
                  description: "Natural sweetness & energy",
                  icon: "https://i.pinimg.com/736x/b4/8f/41/b48f410fbdc63a19197a349a702fb4b8.jpg",
                },
                {
                  name: "Honey",
                  description: "Natural sweetness",
                  icon: "https://images.unsplash.com/photo-1654515722385-c684c5331c04?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbmV5fGVufDB8fDB8fHww",
                },
                {
                  name: "Dark Chocolate",
                  description: "Indulgent & rich",
                  icon: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
                },
              ].map((ingredient, index) => (
                <Card
                  key={index}
                  className="border-[.1px] border-primary-color hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl size-24 rounded-full flex justify-center items-center mx-auto mb-4 overflow-hidden">
                      <Image
                        src={ingredient.icon}
                        alt={`Ingredient: ${ingredient.name} for healthy peanut butter, organic peanut butter, best peanut butter in India`}
                        width={50}
                        height={50}
                        className="size-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-bold text-secondary-color mb-2">
                      {ingredient.name}
                    </h3>
                    <p className="text-sm text-[#bd0000]">
                      {ingredient.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary-color mb-4">
                Why Choose{" "}
                <span className="text-primary-color">
                  {process.env.NEXT_PUBLIC_BRAND_NAME}
                </span>
                ?
              </h2>
              <p className="text-xl text-sub-heading">
                We're not just another peanut butter. We're a revolution in a
                jar.
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
                    "We use only the finest nuts oils for better health",
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
                  className="border-primary-color border-[.1px] hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-12 h-12 text-primary-color mx-auto mb-4" />
                    <h3 className="font-bold text-secondary-color mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-primary-color">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary-color mb-4">
                How to Enjoy{" "}
                <span className="text-primary-color">
                  {process.env.NEXT_PUBLIC_BRAND_NAME}
                </span>
              </h2>
              <p className="text-xl text-sub-heading">
                Versatile, delicious, and perfect for any time of day.
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
                  className="border-primary-color border-[.1px] hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{usage.image}</div>
                    <h3 className="font-bold text-secondary-color mb-2">
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
                  className="border-primary-color text-secondary-color hover:bg-amber-50 bg-transparent"
                >
                  View All Recipes
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary-color mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-sub-heading">
                Join thousands of satisfied customers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  location: "Mumbai",
                  rating: 5,
                  text: "Finally, a nuts butter that tastes amazing and is actually healthy! My kids love it too.",
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
                <Card key={index} className="border-primary-color">
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
                      <p className="font-semibold text-secondary-color">
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

        {/* FAQ Section for SEO */}
        <section className="py-12 bg-amber-50" id="faq">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-secondary-color mb-4">
                Frequently Asked Questions about Peanut Butter
              </h2>
              <p className="text-xl text-sub-heading">
                Everything you want to know about healthy peanut butter, nuts
                butters, and our premium blend.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="font-semibold text-lg text-primary-color mb-2">
                  What makes Puremelt the best healthy peanut butter in India?
                </h3>
                <p className="text-secondary-color">
                  Puremelt uses only premium, natural ingredients: peanuts,
                  almonds, cashews, pistachios, dates, honey, and chocolate. No
                  palm oil, no preservatives, and no refined sugar. Our peanut
                  butter is protein-rich, organic, and delicious!
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary-color mb-2">
                  Is your peanut butter suitable for fitness and weight loss?
                </h3>
                <p className="text-secondary-color">
                  Yes! Our healthy peanut butter is high in protein and healthy
                  fats, making it perfect for fitness enthusiasts, athletes, and
                  anyone looking for a nutritious snack or post-workout meal.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary-color mb-2">
                  Do you use palm oil or refined sugar?
                </h3>
                <p className="text-secondary-color">
                  Never. We use only natural sweeteners like dates and honey,
                  and never add palm oil or refined sugar. This makes our nuts
                  butter healthier and tastier.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary-color mb-2">
                  Is Puremelt peanut butter organic?
                </h3>
                <p className="text-secondary-color">
                  Yes, we use certified organic ingredients wherever possible,
                  ensuring a clean, healthy, and safe product for you and your
                  family.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary-color mb-2">
                  How can I use your peanut butter?
                </h3>
                <p className="text-secondary-color">
                  Spread it on bread, add to shakes, pair with fruits, or
                  drizzle on desserts. Check out our{" "}
                  <Link
                    href="/recipes"
                    className="text-primary-color underline"
                  >
                    healthy peanut butter recipes
                  </Link>{" "}
                  for more ideas!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary-dark text-white">
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
        <footer className="bg-primary-color text-white pt-16 pb-6">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-5 gap-8">
              <div>
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">P</span>
                  </div>
                  <span className="text-xl font-bold">
                    {process.env.NEXT_PUBLIC_BRAND_NAME}
                  </span>
                </Link>
                <p className="text-white mb-4">
                  Premium nuts butter crafted for the health-conscious,
                  flavor-seeking consumer.
                </p>
                <div className="flex space-x-4">
                  <Instagram className="w-5 h-5 text-white hover:text-white cursor-pointer" />
                  <Facebook className="w-5 h-5 text-white hover:text-white cursor-pointer" />
                  <Twitter className="w-5 h-5 text-white hover:text-white cursor-pointer" />
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-white">
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
                <ul className="space-y-2 text-white">
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
                <p className="text-white text-sm mb-4">
                  Get recipes, health tips, and exclusive offers!
                </p>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="border-amber-700 text-white placeholder:text-slate-400"
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
                      alt="UPI Payment for healthy peanut butter purchase, Puremelt India"
                      width={100}
                      height={100}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-2 text-white">
                  <p className="text-sm">
                    Email: support@{process.env.NEXT_PUBLIC_BRAND_NAME}.in
                  </p>
                  <p className="text-sm">Phone: +91 93183 67696</p>
                </div>
              </div>
            </div>

            <div className="border-t border-amber-800 mt-12 pt-8 text-center text-white">
              <p>
                &copy; 2025 {process.env.NEXT_PUBLIC_BRAND_NAME}. All rights
                reserved. | Privacy Policy | Terms of Service
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
