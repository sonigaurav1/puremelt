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
  Package,
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

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-5 h-5 fill-amber-400 text-amber-400"
        />
      );
    }

    // Render half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-5 h-5 text-amber-400" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
        </div>
      );
    }

    // Fill remaining stars up to 5 (empty stars)
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-400" />);
    }

    return stars;
  };

  return (
    <>
      <div className="min-h-screen !bg-black !text-white">
        <main className="">
          {/* Header */}
          <Header bgColor="bg-transparent" />

          <div className="md:pt-[76px]">
            <ImageSlider />
          </div>

          {/* Hero Section */}
          <section id="home" className="md:py-10 md:px-8 pt-10 px-4">
            <div className="container mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 relative">
                  <div className="space-y-4">
                    <Badge className="bg-[#90caf9] border-[#64b5f6] border hover:bg-[#69b31e] text-lg text-white">
                      <Award size={20} className="mr-1" /> India's Finest Nuts
                      Butter
                    </Badge>
                    <h1 className="text-[45px] font-playfair text-white lg:text-6xl font-bold leading-tight">
                      All-in-One
                      <span className="block text-primary-color -mt-4 md:-mt-2">
                        Nuts Butter
                      </span>
                    </h1>
                    <p className="text-xl text-white leading-1">
                      <span className="text-xl">A premium blend of </span>
                      <b className="text-primary-color text-[21px]">
                        {" "}
                        Peanuts, Almonds, Cashews, Pistachios, Dates, Raisins &
                        Honey{" "}
                      </b>{" "}
                      <span className="text-xl">
                        - all blended into one delicious spoonful.
                      </span>
                    </p>
                    <p className="text-xl text-[#9e6924] font-medium font-ibm text-[24px]">
                      Healthier. Tastier. Organic.
                    </p>
                  </div>

                  <div className="relative">
                    <Image
                      src="/cta.webp"
                      alt="Healthy peanut butter and nuts butter jar - Penova premium blend, organic peanut butter India"
                      width={500}
                      height={500}
                      className="w-full h-auto rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="text-white font-medium">
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

                  <div className="flex flex-col sm:flex-row gap-4 pb-8">
                    <Button
                      size="lg"
                      className="text-black text-lg px-8 py-3 bg-[#EEFF00]"
                      onClick={handleOrderNow}
                    >
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

                    {/* Trust badge & rating */}
                    <div className="flex flex-col items-center space-y-2 pt-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-5 h-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                        <span className="ml-2 font-medium">4.5/5</span>
                      </div>
                      <div className="text-sm text-white opacity-80">
                        <span className="font-semibold">
                          {isClient ? customerCount.toLocaleString() : "2,500"}+
                        </span>{" "}
                        Happy Customers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Product Spotlight */}
        <section id="product" className="pb-10 my-16 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto flex flex-col space-y-8 items-center">
              {/* Tagline */}
              <div className="flex flex-col items-center space-y-2 pt-8">
                <h3 className="text-3xl font-bold text-primary-color text-center">
                  Premium Nuts Blend
                </h3>
                <p className="text-lg text-white leading-relaxed text-center">
                  <span className="">All-in-One Superfood Spread</span> crafted
                  from{" "}
                  <span className="text-primary-color font-bold text-xl">
                    peanuts, almonds, cashews, pistachios, raisins & honey
                  </span>
                  . 100% natural,{" "}
                  <span className="font-bold text-[#d8d26f]">
                    no preservatives, no palm oil, no refined sugar
                  </span>
                  .
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
        </section>

        {/* Ingredients Section */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-3xl font-bold text-center mb-2">
                Nature's Finest, Blended to Perfection
              </h2>
              <p className="text-lg text-primary-color text-center max-w-md">
                Each ingredient is{" "}
                <span className="font-semibold">handpicked</span> for taste,
                nutrition, and quality.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-3xl font-bold px-4 py-1 mb-3">
                Why Choose Us?
              </h2>
              <p className="text-lg text-primary-color text-center max-w-md">
                Not just another nuts butter -{" "}
                <span className="text-primary-color font-semibold">
                  a revolution in a jar
                </span>
                .<br />
                <span className="text-[#f8d87d] font-bold">
                  Taste. Health. Purity.
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
              {[
                {
                  icon: (
                    <Shield className="w-7 h-7 text-[#f8d87d] mb-1 mx-auto" />
                  ),
                  title: "No Preservatives",
                  description: "100% natural, no artificial junk",
                },
                {
                  icon: (
                    <Leaf className="w-7 h-7 text-[#f8d87d] mb-1 mx-auto" />
                  ),
                  title: "No Palm Oil",
                  description: "Only the finest nuts oils",
                },
                {
                  icon: (
                    <Heart className="w-7 h-7 text-[#f8d87d] mb-1 mx-auto" />
                  ),
                  title: "No Refined Sugar",
                  description: "Sweetened with dates & honey",
                },
                {
                  icon: (
                    <Award className="w-7 h-7 text-[#f8d87d] mb-1 mx-auto" />
                  ),
                  title: "Organic Product",
                  description: "Certified organic ingredients",
                },
                {
                  icon: (
                    <Star className="w-7 h-7 text-[#f8d87d] mb-1 mx-auto" />
                  ),
                  title: "Unique Flavor",
                  description: "One-of-a-kind taste profile",
                },
                {
                  icon: (
                    <Package className="w-7 h-7 text-[#f8d87d] mb-1 mx-auto" />
                  ),
                  title: "All Nuts in One",
                  description: "7 premium ingredients in every spoon",
                },
              ].map((feature, idx) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center bg-[#181818] rounded-xl p-4 border-[.5px] border-[#f8d87d] shadow-sm text-center min-h-[140px]"
                >
                  {feature.icon}
                  <h3 className="font-bold text-base text-primary-color mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-white opacity-80">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-3xl text-center font-bold px-4 py-1 mb-3">
                How to Enjoy our nuts butter?
              </h2>
              <p className="text-lg text-primary-color text-center max-w-md">
                Versatile, delicious, and{" "}
                <span className=" font-semibold">
                  perfect for any time of day
                </span>
                .
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
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
              ].map((usage, idx) => (
                <div
                  key={usage.title}
                  className="flex flex-col items-center bg-[#181818] rounded-xl p-4 border-[.5px] border-[#f8d87d] shadow-sm text-center min-h-[120px]"
                >
                  <div className="text-4xl mb-2">{usage.image}</div>
                  <h3 className="font-bold text-base text-primary-color mb-1">
                    {usage.title}
                  </h3>
                  <p className="text-xs text-white opacity-80">
                    {usage.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/recipes">
                <Button
                  variant="outline"
                  className="border-primary-color text-white hover:bg-amber-50 bg-transparent"
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
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-3xl font-bold text-center mb-2">
                What Our Customers Say
              </h2>
              <p className="text-lg text-primary-color text-center max-w-md">
                <span className="font-semibold">
                  Join thousands of happy customers
                </span>{" "}
                who love Penova.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
              {[
                {
                  name: "Gaurav Soni",
                  location: "Mumbai",
                  rating: 5,
                  text: "Finally, a nuts butter that tastes amazing and is actually healthy! My kids love it too.",
                },
                {
                  name: "Pradip Saroj",
                  location: "Delhi",
                  rating: 4.5,
                  text: "As a fitness enthusiast, this is perfect for my post-workout meals. The taste is incredible!",
                },
                {
                  name: "Riya Sharma",
                  location: "Bangalore",
                  rating: 4.5,
                  text: "The blend of flavors is unique. I've never tasted anything like this before. Highly recommended!",
                },
              ].map((testimonial, idx) => (
                <div
                  key={testimonial.name}
                  className="flex flex-col items-center bg-[#181818] rounded-xl p-6 border-[.5px] border-[#f8d87d] shadow-sm text-center min-h-[140px]"
                >
                  <div className="flex items-center justify-center mb-2 gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="mb-3 italic text-base text-white">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-[#f8d87d]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-white opacity-70">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="py-12 bg-white" id="faq">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-4xl font-bold text-primary-color text-center mb-2">
                FAQ
              </h2>
              <p className="text-lg text-secondary-color text-center max-w-md">
                Everything you want to know about{" "}
                <span className="text-primary-color font-semibold">
                  healthy peanut butter
                </span>{" "}
                and our premium blend.
              </p>
            </div>

            <div className="max-w-2xl mx-auto flex flex-col gap-4">
              {[
                {
                  question:
                    "What makes Penova the best healthy nuts butter in India?",
                  answer:
                    "Penova uses only premium, natural ingredients: peanuts, almonds, cashews, pistachios, dates and honey. No palm oil, no preservatives, and no refined sugar. Our nuts butter is protein-rich, organic, and delicious!",
                },
                {
                  question:
                    "Is your nuts butter suitable for fitness and weight loss?",
                  answer:
                    "Yes! Our healthy nuts butter is high in protein and healthy fats, making it perfect for fitness enthusiasts, athletes, and anyone looking for a nutritious snack or post-workout meal.",
                },
                {
                  question: "Do you use palm oil or refined sugar?",
                  answer:
                    "Never. We use only natural sweeteners like dates and honey, and never add palm oil or refined sugar. This makes our nuts butter healthier and tastier.",
                },
                {
                  question: "Is Penova nuts butter organic?",
                  answer:
                    "Yes, we use certified organic ingredients wherever possible, ensuring a clean, healthy, and safe product for you and your family.",
                },
                {
                  question: "How can I use your nuts butter?",
                  answer: (
                    <span>
                      Spread it on bread, add to shakes, pair with fruits, or
                      drizzle on desserts. Check out our{" "}
                      <Link
                        href="/recipes"
                        className="text-primary-color underline"
                      >
                        healthy nuts butter recipes
                      </Link>{" "}
                      for more ideas!
                    </span>
                  ),
                },
              ].map((faq, idx) => (
                <div
                  key={faq.question}
                  className="bg-black rounded-xl p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-lg text-primary-color mb-2 flex items-center">
                    <span className="mr-2">Q{idx + 1}.</span> {faq.question}
                  </h3>
                  <div className="text-white text-base pl-6">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-[#000] text-white">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="w-full max-w-xl bg-[#181818] rounded-2xl shadow-lg p-8 flex flex-col items-center border border-[#f8d87d]">
              <Badge className="bg-[#f8d87d] text-black text-base font-bold px-4 py-1 mb-4 border-none">
                Limited Time Offer
              </Badge>
              <h2 className="text-3xl sm:text-4xl text-primary-color font-bold mb-3 text-center">
                Ready to Experience the Difference?
              </h2>
              <p className="text-lg sm:text-xl mb-8 opacity-90 text-center max-w-md">
                Join <span className="font-bold">thousands</span> of customers
                who've made the switch to{" "}
                <span className="font-semibold">premium nutrition</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link href="/buy-now" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#EEFF00] text-black font-bold px-8 py-3 shadow-md hover:bg-[#d4e000] text-lg rounded-xl"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Order Now - ₹599
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-[#f8d87d] bg-black hover:bg-[#222] hover:text-[#e3ef26] px-8 py-3 font-bold rounded-xl"
                  >
                    Try Risk-Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white pt-16 pb-6">
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
                      alt="UPI Payment for healthy peanut butter purchase, Penova India"
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
