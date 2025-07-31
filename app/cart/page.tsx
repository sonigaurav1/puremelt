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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <Header />

      {/* Cart Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-secondary-color mb-8">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-24 h-24 text-amber-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-secondary-color mb-4">
                Your cart is empty
              </h2>
              <p className="text-amber-700 mb-8">
                Add some delicious {process.env.NEXT_PUBLIC_BRAND_NAME} to get started!
              </p>
              <Link href="/buy-now">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-amber-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />

                        <div className="flex-1">
                          <h3 className="font-bold text-secondary-color mb-1">
                            {item.name}
                          </h3>
                          <p className="text-amber-700 mb-2">
                            Size: {item.size}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-secondary-color">
                              ₹{item.price}
                            </span>
                            <span className="text-gray-500 line-through text-sm">
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
                            className="border-amber-200"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium text-secondary-color min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="border-amber-200"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-secondary-color">
                            ₹{item.price * item.quantity}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-2"
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
                <Card className="border-amber-200 sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-secondary-color mb-4">
                      Order Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-amber-700">Subtotal</span>
                        <span className="text-secondary-color">
                          ₹{subtotal}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-amber-700">Original Price</span>
                        <span className="text-gray-500 line-through">
                          ₹{originalTotal}
                        </span>
                      </div>

                      <div className="flex justify-between text-green-600">
                        <span>You Save</span>
                        <span>₹{savings}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-amber-700">Shipping</span>
                        <span className="text-secondary-color">
                          {shipping === 0 ? "FREE" : `₹${shipping}`}
                        </span>
                      </div>

                      {subtotal < 500 && (
                        <p className="text-sm text-amber-600">
                          Add ₹{500 - subtotal} more for free shipping!
                        </p>
                      )}

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-secondary-color">Total</span>
                        <span className="text-secondary-color">₹{total}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        Proceed to Checkout
                      </Button>
                      <Link href="/buy-now">
                        <Button
                          variant="outline"
                          className="w-full border-amber-300 text-secondary-color hover:bg-amber-50 bg-transparent"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-secondary-color mb-2">
                        Why Choose {process.env.NEXT_PUBLIC_BRAND_NAME}?
                      </h4>
                      <ul className="text-sm text-amber-700 space-y-1">
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
