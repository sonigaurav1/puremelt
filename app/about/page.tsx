import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Award, Users, Target, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import Head from "next/head";
import Header from "@/components/layout/Header";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Penova | Premium Healthy Peanut Butter Brand India</title>
        <meta
          name="description"
          content="Learn about Penova, India's premium healthy peanut butter and nuts butter brand. Discover our story, mission, and commitment to quality, health, and taste."
        />
        <meta
          name="keywords"
          content="about penova, peanut butter brand, healthy peanut butter, premium nuts butter, organic peanut butter, penova story, penova mission"
        />
        <link
          rel="canonical"
          href={
            (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") + "/about"
          }
        />
        {/* About Page Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: "About Penova",
              description:
                "Learn about Penova, India's premium healthy peanut butter and nuts butter brand. Discover our story, mission, and commitment to quality, health, and taste.",
              url:
                (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
                "/about",
              publisher: {
                "@type": "Organization",
                name: process.env.NEXT_PUBLIC_BRAND_NAME || "Penova",
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen !bg-black !text-white">
        {/* Header */}
        <Header bgColor="bg-black" textColor="text-white" />

        {/* Hero Section */}
        <section className="pt-28 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold font-playfair text-white mb-6">
              About{" "}
              <span className="text-primary-color">
                {process.env.NEXT_PUBLIC_BRAND_NAME}
              </span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Welcome to{" "}
              <span className="text-primary-color">
                {process.env.NEXT_PUBLIC_BRAND_NAME}
              </span>
              , where we believe that the simplest ideas often make the boldest
              impact. In a world full of generic peanut butters, we dared to
              ask—what if one spoon could offer more?
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="pt-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold font-playfair text-primary-color mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-[#f8d87d] leading-relaxed">
                  <p>
                    That question led to the creation of our signature and only
                    product: a premium nuts butter unlike anything else on the
                    market. We carefully blend peanuts, almonds, cashews,
                    pistachios, dates and honey into one balanced, nutrient-rich
                    spread.
                  </p>
                  <p>
                    This unique mix delivers indulgent taste with natural
                    goodness—no preservatives, no unnecessary additives, just
                    real ingredients. Our mission is focused and deliberate:
                    create one exceptional product, and do it better than anyone
                    else.
                  </p>
                  <p>
                    Designed for those who value both health and taste,{" "}
                    <span className="text-primary-color font-semibold">
                      {process.env.NEXT_PUBLIC_BRAND_NAME}
                    </span>{" "}
                    is perfect for gym-goers, parents, foodies, or anyone
                    craving honest nourishment with a premium touch.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt={`${process.env.NEXT_PUBLIC_BRAND_NAME} Story`}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="pt-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-[.5px] border-[#f8d87d] bg-[#181818] p-8">
                <CardContent className="text-center">
                  <Target className="w-16 h-16 text-primary-color mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-primary-color mb-4">
                    Our Mission
                  </h3>
                  <p className="text-[#f8d87d] leading-relaxed">
                    To elevate everyday nutrition with a thoughtfully crafted
                    nuts butter that blends premium ingredients, health, and
                    indulgence—all in a single, standout variant.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[.5px] border-[#f8d87d] bg-[#181818] p-8">
                <CardContent className="text-center">
                  <Eye className="w-16 h-16 text-primary-color mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-primary-color mb-4">
                    Our Vision
                  </h3>
                  <p className="text-[#f8d87d] leading-relaxed">
                    To be the most trusted single-variant nuts butter brand in
                    India, known for innovation, purity, and an uncompromising
                    commitment to taste and quality.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="pt-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
              <p className="text-xl text-[#f8d87d]">What drives us every day</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Premium Quality",
                  description:
                    "We use only the finest ingredients, sourced responsibly and crafted with care.",
                },
                {
                  icon: Leaf,
                  title: "Natural & Organic",
                  description:
                    "100% natural ingredients with no preservatives, additives, or artificial flavors.",
                },
                {
                  icon: Award,
                  title: "Innovation",
                  description:
                    "Constantly pushing boundaries to create unique, exceptional products.",
                },
                {
                  icon: Users,
                  title: "Customer First",
                  description:
                    "Every decision we make is centered around our customers' health and satisfaction.",
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="border-[.5px] border-[#f8d87d] bg-[#181818] hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <value.icon className="w-12 h-12 text-primary-color mx-auto mb-4" />
                    <h3 className="font-bold text-primary-color mb-2">
                      {value.title}
                    </h3>
                    <p className="text-[#f8d87d] text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why One Product */}
        <section className="pt-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Just One Product?
              </h2>
              <p className="text-xl text-[#f8d87d] max-w-3xl mx-auto">
                In a world of endless choices, we believe in the power of
                perfection through focus.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-color rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <h3 className="font-bold text-primary-color mb-2">
                    Focused Excellence
                  </h3>
                  <p className="text-[#f8d87d]">
                    By focusing on one product, we can perfect every aspect of
                    taste, nutrition, and quality.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-color rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  <h3 className="font-bold text-primary-color mb-2">
                    No Compromise
                  </h3>
                  <p className="text-[#f8d87d]">
                    Every jar represents our unwavering commitment to premium
                    ingredients and exceptional taste.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-color rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <h3 className="font-bold text-primary-color mb-2">
                    Simple Choice
                  </h3>
                  <p className="text-[#f8d87d]">
                    No confusion, no overwhelming options. Just one perfect
                    product that delivers everything you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 pt-20 pb-20 bg-[#181818] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Experience the {process.env.NEXT_PUBLIC_BRAND_NAME} Difference
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether it's breakfast, a midday snack, or a post-workout boost,{" "}
              {process.env.NEXT_PUBLIC_BRAND_NAME} turns an everyday habit into
              a delicious ritual.
            </p>
            <p className="text-2xl font-bold mb-8">
              One variant. One jar. Infinite love.
            </p>
            <Link href="/buy-now">
              <Button
                size="lg"
                className="bg-[#EEFF00] text-black px-8 py-3 text-lg"
              >
                Try {process.env.NEXT_PUBLIC_BRAND_NAME} Today
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
