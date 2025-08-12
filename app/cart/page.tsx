"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/layout/Header";

type CartItem = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  size: string;
  image?: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const savings = originalTotal - subtotal;
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen !bg-black !text-white">
      {/* Header */}
      <Header />

      {/* Cart Content */}
      <section className="md:pb-16 md:px-8 pt-24 md:pt-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl font-bold font-playfair text-white mb-8">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag className="w-24 h-24 text-[#f8d87d] mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-primary-color mb-4">
                Your cart is empty
              </h2>
              <p className="text-[#f8d87d] mb-8">
                Add some delicious {process.env.NEXT_PUBLIC_BRAND_NAME} to get
                started!
              </p>
              <Link href="/buy-now">
                <Button className="bg-[#EEFF00] hover:bg-[#f8d87d] text-black text-lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    className="border-[.5px] border-[#f8d87d] bg-[#181818]"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-6">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg bg-black"
                        />

                        <div className="flex-1">
                          <h3 className="font-bold text-primary-color mb-1">
                            {item.name}
                          </h3>
                          <p className="text-[#f8d87d] mb-2">
                            Size: {item.size}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-primary-color">
                              ₹{item.price}
                            </span>
                            <span className="text-[#f8d87d] line-through text-sm">
                              ₹{item.originalPrice}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="border-[#f8d87d] text-[#f8d87d] hover:bg-[#222]"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium text-primary-color min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="border-[#f8d87d] text-[#f8d87d] hover:bg-[#222]"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-primary-color">
                            ₹{item.price * item.quantity}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-[#222] mt-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-[.5px] border-[#f8d87d] bg-[#181818] sticky top-24">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-primary-color mb-4">
                      Order Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#f8d87d]">Subtotal</span>
                        <span className="text-primary-color">₹{subtotal}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#f8d87d]">Original Price</span>
                        <span className="text-[#f8d87d] line-through">
                          ₹{originalTotal}
                        </span>
                      </div>

                      <div className="flex justify-between text-green-400">
                        <span>You Save</span>
                        <span>₹{savings}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#f8d87d]">Shipping</span>
                        <span className="text-primary-color">
                          {shipping === 0 ? "FREE" : `₹${shipping}`}
                        </span>
                      </div>

                      {subtotal < 500 && (
                        <p className="text-sm text-[#f8d87d]">
                          Add ₹{500 - subtotal} more for free shipping!
                        </p>
                      )}

                      <Separator className="bg-[#f8d87d]" />

                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-primary-color">Total</span>
                        <span className="text-primary-color">₹{total}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <Button className="w-full bg-[#EEFF00] hover:bg-[#f8d87d] text-black text-lg">
                        Proceed to Checkout
                      </Button>
                      <Link href="/buy-now">
                        <Button
                          variant="outline"
                          className="w-full border-[#f8d87d] text-[#f8d87d] hover:bg-[#222] bg-transparent text-lg"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>

                    <div className="mt-6 p-4 bg-black border border-[#f8d87d] rounded-lg">
                      <h4 className="font-semibold text-primary-color mb-2">
                        Why Choose {process.env.NEXT_PUBLIC_BRAND_NAME}?
                      </h4>
                      <ul className="text-sm text-[#f8d87d] space-y-1">
                        <li>• 100% Natural & Organic</li>
                        <li>• No Preservatives or Palm Oil</li>
                        <li>• 7 Premium Ingredients</li>
                        <li>• High Protein & Fiber</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
