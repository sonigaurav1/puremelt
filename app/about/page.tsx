import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Award, Users, Target, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold text-secondary-color">
                PureMelt
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-secondary-color hover:text-amber-700 font-medium"
              >
                Home
              </Link>
              <Link
                href="/product"
                className="text-secondary-color hover:text-amber-700 font-medium"
              >
                Our Product
              </Link>
              <Link
                href="/about"
                className="text-amber-700 font-medium border-b-2 border-amber-700"
              >
                About Us
              </Link>
              <Link
                href="/recipes"
                className="text-secondary-color hover:text-amber-700 font-medium"
              >
                Recipes
              </Link>
              <Link
                href="/contact"
                className="text-secondary-color hover:text-amber-700 font-medium"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-200 text-secondary-color hover:bg-amber-50 bg-transparent"
                >
                  Cart
                </Button>
              </Link>
              <Link href="/buy-now">
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-secondary-color mb-6">
            About PureMelt
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Welcome to PureMelt, where we believe that the simplest ideas often
            make the boldest impact. In a world full of generic peanut butters,
            we dared to ask—what if one spoon could offer more?
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-secondary-color mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-amber-700 leading-relaxed">
                <p>
                  That question led to the creation of our signature and only
                  product: a premium nut butter unlike anything else on the
                  market. We carefully blend peanuts, almonds, cashews,
                  pistachios, dates, honey, and chocolate into one balanced,
                  nutrient-rich spread.
                </p>
                <p>
                  This unique mix delivers indulgent taste with natural
                  goodness—no preservatives, no unnecessary additives, just real
                  ingredients. Our mission is focused and deliberate: create one
                  exceptional product, and do it better than anyone else.
                </p>
                <p>
                  Designed for those who value both health and taste, PureMelt
                  is perfect for gym-goers, parents, foodies, or anyone craving
                  honest nourishment with a premium touch.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="PureMelt Story"
                width={400}
                height={400}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-amber-200 p-8">
              <CardContent className="text-center">
                <Target className="w-16 h-16 text-amber-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-secondary-color mb-4">
                  Our Mission
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  To elevate everyday nutrition with a thoughtfully crafted nut
                  butter that blends premium ingredients, health, and
                  indulgence—all in a single, standout variant.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 p-8">
              <CardContent className="text-center">
                <Eye className="w-16 h-16 text-amber-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-secondary-color mb-4">
                  Our Vision
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  To be the most trusted single-variant nut butter brand in
                  India, known for innovation, purity, and an uncompromising
                  commitment to taste and quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-color mb-4">
              Our Values
            </h2>
            <p className="text-xl text-amber-700">What drives us every day</p>
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
                className="border-amber-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <value.icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-bold text-secondary-color mb-2">
                    {value.title}
                  </h3>
                  <p className="text-amber-700 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why One Product */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-color mb-4">
              Why Just One Product?
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              In a world of endless choices, we believe in the power of
              perfection through focus.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="font-bold text-secondary-color mb-2">
                  Focused Excellence
                </h3>
                <p className="text-amber-700">
                  By focusing on one product, we can perfect every aspect of
                  taste, nutrition, and quality.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="font-bold text-secondary-color mb-2">
                  No Compromise
                </h3>
                <p className="text-amber-700">
                  Every jar represents our unwavering commitment to premium
                  ingredients and exceptional taste.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="font-bold text-secondary-color mb-2">
                  Simple Choice
                </h3>
                <p className="text-amber-700">
                  No confusion, no overwhelming options. Just one perfect
                  product that delivers everything you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Experience the PureMelt Difference
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether it's breakfast, a midday snack, or a post-workout boost,
            PureMelt turns an everyday habit into a delicious ritual.
          </p>
          <p className="text-2xl font-bold mb-8">
            One variant. One jar. Infinite love.
          </p>
          <Link href="/buy-now">
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-3"
            >
              Try PureMelt Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
