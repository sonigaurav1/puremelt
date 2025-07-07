"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const savings = originalTotal - subtotal
  const shipping = subtotal >= 500 ? 0 : 50
  const total = subtotal + shipping

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
              <span className="text-2xl font-bold text-amber-900">PureMelt</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-amber-900 hover:text-amber-700 font-medium">
                Home
              </Link>
              <Link href="/product" className="text-amber-900 hover:text-amber-700 font-medium">
                Our Product
              </Link>
              <Link href="/about" className="text-amber-900 hover:text-amber-700 font-medium">
                About Us
              </Link>
              <Link href="/recipes" className="text-amber-900 hover:text-amber-700 font-medium">
                Recipes
              </Link>
              <Link href="/contact" className="text-amber-900 hover:text-amber-700 font-medium">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/buy-now">
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-amber-900 mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-24 h-24 text-amber-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Your cart is empty</h2>
              <p className="text-amber-700 mb-8">Add some delicious PureMelt to get started!</p>
              <Link href="/buy-now">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">Start Shopping</Button>
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
                          <h3 className="font-bold text-amber-900 mb-1">{item.name}</h3>
                          <p className="text-amber-700 mb-2">Size: {item.size}</p>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-amber-900">₹{item.price}</span>
                            <span className="text-gray-500 line-through text-sm">₹{item.originalPrice}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="border-amber-200"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium text-amber-900 min-w-[2rem] text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border-amber-200"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-amber-900">₹{item.price * item.quantity}</p>
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
                    <h3 className="text-xl font-bold text-amber-900 mb-4">Order Summary</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-amber-700">Subtotal</span>
                        <span className="text-amber-900">₹{subtotal}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-amber-700">Original Price</span>
                        <span className="text-gray-500 line-through">₹{originalTotal}</span>
                      </div>

                      <div className="flex justify-between text-green-600">
                        <span>You Save</span>
                        <span>₹{savings}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-amber-700">Shipping</span>
                        <span className="text-amber-900">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                      </div>

                      {subtotal < 500 && (
                        <p className="text-sm text-amber-600">Add ₹{500 - subtotal} more for free shipping!</p>
                      )}

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-amber-900">Total</span>
                        <span className="text-amber-900">₹{total}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Proceed to Checkout</Button>
                      <Link href="/buy-now">
                        <Button
                          variant="outline"
                          className="w-full border-amber-300 text-amber-900 hover:bg-amber-50 bg-transparent"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-2">Why Choose PureMelt?</h4>
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
  )
}
