import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Leaf, Shield, Award, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import Head from "next/head";
import Header from "@/components/layout/Header";

export default function ProductPage() {
  return (
    <>
      <Head>
        <title>
          Premium Healthy Peanut Butter & Nuts Butter | Penova Product
        </title>
        <meta
          name="description"
          content="Discover Penova's premium healthy peanut butter and nuts butter. Made with peanuts, almonds, cashews, pistachios, dates, honey & . No preservatives, no palm oil, no refined sugar."
        />
        <meta
          name="keywords"
          content="peanut butter, healthy peanut butter, premium nuts butter, organic peanut butter, penova product, best peanut butter India, protein peanut butter"
        />
        <link
          rel="canonical"
          href={
            (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
            "/product"
          }
        />
        {/* Product Page Structured Data */}
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
                  "/hero-butter.webp",
                (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
                  "/cta.webp",
              ],
              description:
                "Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates, honey & . No preservatives, no palm oil, no refined sugar. Healthier, tastier, organic.",
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
        <Header bgColor="bg-black" textColor="text-white" />

        {/* Hero Section */}
        <section className="pt-28 px-4">
          <div className="container mx-auto text-center">
            <Badge className="bg-[#90caf9] border-[#64b5f6] border hover:bg-[#69b31e] text-lg text-white mb-4">
              Premium Nuts Butter
            </Badge>
            <h1 className="text-5xl font-bold font-playfair text-white mb-6">
              {process.env.NEXT_PUBLIC_BRAND_NAME}{" "}
              <span className="text-primary-color">Premium Nuts Butter</span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed mb-8">
              The only nuts butter you'll ever need. Seven premium ingredients
              blended to perfection in one signature variant.
            </p>
            <Link href="/buy-now">
              <Button
                size="lg"
                className="bg-[#EEFF00] text-black text-lg px-8 py-3"
              >
                Order Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="pt-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src="/cta.webp"
                  alt={`${process.env.NEXT_PUBLIC_BRAND_NAME} Premium Nuts Butter`}
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-[#f8d87d] text-black px-4 py-2 rounded-full font-semibold">
                  100% Organic
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Your All-in-One Premium Nuts Butter
                  </h2>
                  <p className="text-lg text-white leading-relaxed mb-6">
                    In a market saturated with single-note spreads, we stand
                    apart by offering a one-of-a-kind, premium nuts butter that
                    blends peanuts, almonds, cashews, pistachios, dates and
                    honey all in one spoon.
                  </p>
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-[#f8d87d] font-medium">
                      4.9/5 (2,500+ reviews)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#181818] border-[.5px] border-[#f8d87d] p-4 rounded-lg text-center">
                    <h3 className="font-bold text-primary-color mb-2">
                      High Protein
                    </h3>
                    <p className="text-[#f8d87d]">25g per 100g</p>
                  </div>
                  <div className="bg-[#181818] border-[.5px] border-[#f8d87d] p-4 rounded-lg text-center">
                    <h3 className="font-bold text-primary-color mb-2">
                      Rich in Fiber
                    </h3>
                    <p className="text-[#f8d87d]">From dates & nuts</p>
                  </div>
                  <div className="bg-[#181818] border-[.5px] border-[#f8d87d] p-4 rounded-lg text-center">
                    <h3 className="font-bold text-primary-color mb-2">
                      Healthy Fats
                    </h3>
                    <p className="text-[#f8d87d]">Omega-3 & 6</p>
                  </div>
                  <div className="bg-[#181818] border-[.5px] border-[#f8d87d] p-4 rounded-lg text-center">
                    <h3 className="font-bold text-primary-color mb-2">
                      No Preservatives
                    </h3>
                    <p className="text-[#f8d87d]">100% Natural</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    Available Sizes
                  </h3>

                  <div className="grid grid-cols-3 gap-4">
                    <Card className="border-[.5px] border-[#f8d87d] bg-[#181818] hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-bold text-primary-color mb-2">
                          250g
                        </h4>
                        <p className="text-2xl font-bold text-white mb-1">
                          ₹299
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          ₹349
                        </p>
                        <Badge className="bg-green-100 text-green-800 mt-2">
                          14% OFF
                        </Badge>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-[#f8d87d] bg-[#181818] hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-bold text-primary-color mb-2">
                          500g
                        </h4>
                        <p className="text-2xl font-bold text-white mb-1">
                          ₹599
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          ₹699
                        </p>
                        <Badge className="bg-green-100 text-green-800 mt-2">
                          14% OFF
                        </Badge>
                        <Badge className="bg-primary-color text-white mt-2">
                          Most Popular
                        </Badge>
                      </CardContent>
                    </Card>
                    <Card className="border-[.5px] border-[#f8d87d] bg-[#181818] hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-bold text-primary-color mb-2">
                          1kg
                        </h4>
                        <p className="text-2xl font-bold text-white mb-1">
                          ₹1099
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          ₹1299
                        </p>
                        <Badge className="bg-green-100 text-green-800 mt-2">
                          15% OFF
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Link href="/buy-now">
                  <Button
                    size="lg"
                    className="w-full mt-6 bg-[#EEFF00] text-black text-lg"
                  >
                    Order Your {process.env.NEXT_PUBLIC_BRAND_NAME} Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients Detail */}
        <section className="pt-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                <span className="text-primary-color">Seven</span> Premium
                Ingredients
              </h2>
              <p className="text-xl text-[#f8d87d]">
                Each carefully selected for maximum nutrition and flavor
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Peanuts",
                  description:
                    "Roasted to perfection for that signature crunch and aroma",
                  icon: "https://images.unsplash.com/photo-1575399872095-9363bf262e64?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVhbnV0fGVufDB8fDB8fHww",
                  benefits: "High protein, healthy fats, vitamin E",
                },
                {
                  name: "Almonds",
                  description:
                    "Adds smoothness and creamy texture to every spoonful",
                  icon: "https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D",
                  benefits: "Vitamin E, magnesium, fiber",
                },
                {
                  name: "Cashews",
                  description:
                    "Premium cashews for ultimate creaminess and indulgence",
                  icon: "https://images.unsplash.com/photo-1723466998060-533cd1af4e11?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhc2hld3xlbnwwfHwwfHx8MA%3D%3D",
                  benefits: "Copper, magnesium, healthy fats",
                },
                {
                  name: "Pistachios",
                  description:
                    "Hand-picked pistachios adding luxury and antioxidants",
                  icon: "https://images.unsplash.com/photo-1704079662049-d00890d21a69?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlzdGFjaGlvc3xlbnwwfHwwfHx8MA%3D%3D",
                  benefits: "Antioxidants, protein, potassium",
                },
                {
                  name: "Dates",
                  description: "Natural sweetness with a rich caramel twist",
                  icon: "https://plus.unsplash.com/premium_photo-1676208753932-6e8bc83a0b0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0ZXN8ZW58MHx8MHx8fDA%3D",
                  benefits: "Fiber, potassium, natural sugars",
                },
                {
                  name: "Raisins",
                  description: "Natural sweetness & energy",
                  icon: "https://i.pinimg.com/736x/b4/8f/41/b48f410fbdc63a19197a349a702fb4b8.jpg",
                  benefits: "Natural sweetness & energy",
                },
                {
                  name: "Pure Honey",
                  description:
                    "Raw, unprocessed honey for natural golden sweetness",
                  icon: "https://images.unsplash.com/photo-1654515722385-c684c5331c04?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbmV5fGVufDB8fDB8fHww",
                  benefits: "Antioxidants, enzymes, natural energy",
                },
              ].map((ingredient, idx) => (
                <div
                  key={ingredient.name}
                  className="flex flex-col items-center bg-[#181818] rounded-xl p-4 border-[.5px] border-[#f8d87d] shadow-sm text-center min-h-[140px]"
                >
                  <div className="size-20 rounded-full flex justify-center items-center mb-2 overflow-hidden bg-black">
                    <Image
                      src={ingredient.icon}
                      alt={`Ingredient: ${ingredient.name} for healthy peanut butter, organic peanut butter, best peanut butter in India`}
                      width={60}
                      height={60}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-bold text-base text-primary-color mb-1">
                    {ingredient.name}
                  </h3>
                  <p className="text-xs text-white opacity-80">
                    {ingredient.description}
                  </p>
                  <div className="bg-black border-[.5px] border-[#f8d87d] p-2 rounded text-xs text-[#f8d87d] mt-2">
                    {ingredient.benefits}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="pt-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why {process.env.NEXT_PUBLIC_BRAND_NAME} Stands Apart
              </h2>
              <p className="text-xl text-[#f8d87d]">
                We're not just another nuts butter. We're a revolution in a jar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "No Preservatives",
                  description:
                    "100% natural ingredients with no artificial preservatives or chemicals",
                  color: "text-green-600",
                },
                {
                  icon: Leaf,
                  title: "No Palm Oil",
                  description:
                    "We use only the finest nuts oils for better health and sustainability",
                  color: "text-green-600",
                },
                {
                  icon: Heart,
                  title: "No Refined Sugar",
                  description:
                    "Sweetened naturally with dates and honey - no processed sugars",
                  color: "text-red-500",
                },
                {
                  icon: Award,
                  title: "Certified Organic",
                  description:
                    "All ingredients are certified organic and sourced responsibly",
                  color: "text-amber-600",
                },
                {
                  icon: Star,
                  title: "Unique Flavor Profile",
                  description:
                    "The only nuts butter with this exact blend - truly one of a kind",
                  color: "text-amber-600",
                },
                {
                  icon: Leaf,
                  title: "Single Focus",
                  description:
                    "One product perfected, not dozens of mediocre variants",
                  color: "text-amber-600",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="border-[.5px] border-[#f8d87d] bg-[#181818] hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-12 h-12 text-[#f8d87d] mx-auto mb-4" />
                    <h3 className="font-bold text-primary-color mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#f8d87d]">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nutrition Facts */}
        <section className="pt-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Nutrition Facts
              </h2>
              <p className="text-xl text-[#f8d87d]">Per 100g serving</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-[.5px] border-[#f8d87d] bg-[#181818]">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-primary-color mb-2">
                        580
                      </h3>
                      <p className="text-[#f8d87d]">Calories</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-primary-color mb-2">
                        25g
                      </h3>
                      <p className="text-[#f8d87d]">Protein</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-primary-color mb-2">
                        45g
                      </h3>
                      <p className="text-[#f8d87d]">Healthy Fats</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-primary-color mb-2">
                        12g
                      </h3>
                      <p className="text-[#f8d87d]">Fiber</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-primary-color mb-2">
                        15g
                      </h3>
                      <p className="text-[#f8d87d]">Natural Sugars</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-primary-color mb-2">
                        0mg
                      </h3>
                      <p className="text-[#f8d87d]">Cholesterol</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 pt-20 pb-20 bg-[#181818] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Taste the Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands who've discovered the perfect nuts butter
            </p>
            <Link href="/buy-now">
              <Button
                size="lg"
                className="bg-[#EEFF00] text-black px-8 py-3 text-lg"
              >
                Order {process.env.NEXT_PUBLIC_BRAND_NAME} Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
