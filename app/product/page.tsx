import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Leaf, Shield, Award, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/layout/Header"

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 mb-4">Premium Nut Butter</Badge>
          <h1 className="text-5xl font-bold text-amber-900 mb-6">PureMelt Premium Nut Butter</h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed mb-8">
            The only nut butter you'll ever need. Seven premium ingredients blended to perfection in one signature
            variant.
          </p>
          <Link href="/buy-now">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
              Order Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/cta.webp"
                alt="PureMelt Premium Nut Butter"
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                100% Organic
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-amber-900 mb-4">One Product. Perfected.</h2>
                <p className="text-lg text-amber-700 leading-relaxed mb-6">
                  In a market saturated with single-note spreads, we stand apart by offering a one-of-a-kind, premium
                  nut butter that blends peanuts, almonds, cashews, pistachios, dates, honey, and chocolate—all in one
                  spoon.
                </p>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-amber-700 font-medium">4.9/5 (2,500+ reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-amber-900 mb-2">High Protein</h3>
                  <p className="text-amber-700">25g per 100g</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-amber-900 mb-2">Rich in Fiber</h3>
                  <p className="text-amber-700">From dates & nuts</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-amber-900 mb-2">Healthy Fats</h3>
                  <p className="text-amber-700">Omega-3 & 6</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-amber-900 mb-2">No Preservatives</h3>
                  <p className="text-amber-700">100% Natural</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-amber-900">Available Sizes</h3>

                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-amber-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <h4 className="font-bold text-amber-900 mb-2">250g</h4>
                      <p className="text-2xl font-bold text-amber-900 mb-1">₹299</p>
                      <p className="text-sm text-gray-500 line-through">₹349</p>
                      <Badge className="bg-green-100 text-green-800 mt-2">14% OFF</Badge>
                    </CardContent>
                  </Card>
                  <Card className="border-amber-600 border-2 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <Badge className="bg-amber-600 text-white mb-2">Most Popular</Badge>
                      <h4 className="font-bold text-amber-900 mb-2">500g</h4>
                      <p className="text-2xl font-bold text-amber-900 mb-1">₹599</p>
                      <p className="text-sm text-gray-500 line-through">₹699</p>
                      <Badge className="bg-green-100 text-green-800 mt-2">14% OFF</Badge>
                    </CardContent>
                  </Card>
                  <Card className="border-amber-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <h4 className="font-bold text-amber-900 mb-2">1kg</h4>
                      <p className="text-2xl font-bold text-amber-900 mb-1">₹1099</p>
                      <p className="text-sm text-gray-500 line-through">₹1299</p>
                      <Badge className="bg-green-100 text-green-800 mt-2">15% OFF</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Link href="/buy-now">
                <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Order Your PureMelt Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Detail */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Seven Premium Ingredients</h2>
            <p className="text-xl text-amber-700">Each carefully selected for maximum nutrition and flavor</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Premium Peanuts",
                description: "Roasted to perfection for that signature crunch and aroma",
                icon: "🥜",
                benefits: "High protein, healthy fats, vitamin E",
              },
              {
                name: "California Almonds",
                description: "Adds smoothness and creamy texture to every spoonful",
                icon: "🌰",
                benefits: "Vitamin E, magnesium, fiber",
              },
              {
                name: "Rich Cashews",
                description: "Premium cashews for ultimate creaminess and indulgence",
                icon: "🥜",
                benefits: "Copper, magnesium, healthy fats",
              },
              {
                name: "Luxury Pistachios",
                description: "Hand-picked pistachios adding luxury and antioxidants",
                icon: "🌰",
                benefits: "Antioxidants, protein, potassium",
              },
              {
                name: "Medjool Dates",
                description: "Natural sweetness with a rich caramel twist",
                icon: "🌴",
                benefits: "Fiber, potassium, natural sugars",
              },
              {
                name: "Pure Honey",
                description: "Raw, unprocessed honey for natural golden sweetness",
                icon: "🍯",
                benefits: "Antioxidants, enzymes, natural energy",
              },
              {
                name: "Dark Chocolate",
                description: "Premium cocoa for that perfect indulgent finish",
                icon: "🍫",
                benefits: "Antioxidants, mood enhancer, iron",
              },
            ].map((ingredient, index) => (
              <Card key={index} className="border-amber-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{ingredient.icon}</div>
                  <h3 className="font-bold text-amber-900 mb-2">{ingredient.name}</h3>
                  <p className="text-sm text-amber-700 mb-3">{ingredient.description}</p>
                  <div className="bg-amber-50 p-2 rounded text-xs text-amber-600">{ingredient.benefits}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PureMelt */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Why PureMelt Stands Apart</h2>
            <p className="text-xl text-amber-700">We're not just another nut butter. We're a revolution in a jar.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "No Preservatives",
                description: "100% natural ingredients with no artificial preservatives or chemicals",
                color: "text-green-600",
              },
              {
                icon: Leaf,
                title: "No Palm Oil",
                description: "We use only the finest nut oils for better health and sustainability",
                color: "text-green-600",
              },
              {
                icon: Heart,
                title: "No Refined Sugar",
                description: "Sweetened naturally with dates and honey - no processed sugars",
                color: "text-red-500",
              },
              {
                icon: Award,
                title: "Certified Organic",
                description: "All ingredients are certified organic and sourced responsibly",
                color: "text-amber-600",
              },
              {
                icon: Star,
                title: "Unique Flavor Profile",
                description: "The only nut butter with this exact blend - truly one of a kind",
                color: "text-amber-600",
              },
              {
                icon: Leaf,
                title: "Single Focus",
                description: "One product perfected, not dozens of mediocre variants",
                color: "text-amber-600",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-amber-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                  <h3 className="font-bold text-amber-900 mb-2">{feature.title}</h3>
                  <p className="text-amber-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Facts */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Nutrition Facts</h2>
            <p className="text-xl text-amber-700">Per 100g serving</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-amber-200">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-amber-900 mb-2">580</h3>
                    <p className="text-amber-700">Calories</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-amber-900 mb-2">25g</h3>
                    <p className="text-amber-700">Protein</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-amber-900 mb-2">45g</h3>
                    <p className="text-amber-700">Healthy Fats</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-amber-900 mb-2">12g</h3>
                    <p className="text-amber-700">Fiber</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-amber-900 mb-2">15g</h3>
                    <p className="text-amber-700">Natural Sugars</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-amber-900 mb-2">0mg</h3>
                    <p className="text-amber-700">Cholesterol</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Taste the Difference?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands who've discovered the perfect nut butter</p>
          <Link href="/buy-now">
            <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-3">
              Order PureMelt Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
