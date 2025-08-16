"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
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

  // Load cart items from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          // Map localStorage cart to CartItem type
          const parsed = JSON.parse(storedCart);
          const mapped = parsed.map((item: any, idx: number) => ({
            id: idx + 1,
            name: item.name,
            price: item.price,
            originalPrice: item.price + 50, // Example: show discount
            quantity: item.quantity,
            size: item.weight || item.size,
            image: item.image || "/product.webp",
          }));
          setCartItems(mapped);
        } catch {
          // Keep existing demo items
        }
      }
    }
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    let updatedCart;
    if (newQuantity === 0) {
      updatedCart = cartItems.filter((item) => item.id !== id);
    } else {
      updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    }
    setCartItems(updatedCart);
    if (typeof window !== "undefined") {
      // Update localStorage
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const parsed = JSON.parse(storedCart);
          // Update quantity or remove item
          let filtered;
          if (newQuantity === 0) {
            const match = cartItems.find((ci) => ci.id === id);
            filtered = parsed.filter((item: any) => {
              if (!match) return true;
              return !(
                item.name === match.name &&
                item.price === match.price &&
                (item.weight || item.size) === match.size
              );
            });
          } else {
            filtered = parsed.map((item: any) => {
              const match = cartItems.find((ci) => ci.id === id);
              if (
                match &&
                item.name === match.name &&
                item.price === match.price &&
                (item.weight || item.size) === match.size
              ) {
                return { ...item, quantity: newQuantity };
              }
              return item;
            });
          }
          localStorage.setItem("cart", JSON.stringify(filtered));
          window.dispatchEvent(new Event("cartUpdated"));
        } catch {
          // Ignore localStorage errors
        }
      } else {
        window.dispatchEvent(new Event("cartUpdated"));
      }
    }
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    if (typeof window !== "undefined") {
      // Remove from localStorage as well
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const parsed = JSON.parse(storedCart);
          // Remove by matching name, price, and size (since id may differ)
          const filtered = parsed.filter((item: any) => {
            const match = cartItems.find((ci) => ci.id === id);
            if (!match) return true;
            return !(
              item.name === match.name &&
              item.price === match.price &&
              (item.weight || item.size) === match.size
            );
          });
          localStorage.setItem("cart", JSON.stringify(filtered));
          window.dispatchEvent(new Event("cartUpdated"));
        } catch {
          // Ignore localStorage errors
        }
      } else {
        window.dispatchEvent(new Event("cartUpdated"));
      }
    }
  };

  // Industrial-level Razorpay payment handler for cart
  const handleRazorpayPayment = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }
    // Calculate total amount in paise
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal >= 500 ? 0 : 50;
    const total = subtotal + shipping;
    const amount = total * 100; // paise

    // Collect order details
    const orderDetails = {
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image || "/product.webp",
      })),
      subtotal,
      shipping,
      total,
      currency: "INR",
      notes: {
        cartSummary: `Total items: ${cartItems.length}`,
      },
      // Optionally, collect user info from a form or context
      customer: {
        name: "Gaurav Soni", // Replace with dynamic user info
        email: "gaurav@example.com",
        contact: "9876543210",
      },
    };

    let orderData;
    try {
      const orderRes = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          notes: orderDetails.notes,
          items: orderDetails.items,
          customer: orderDetails.customer,
        }),
      });
      orderData = await orderRes.json();
    } catch (err) {
      alert("Failed to create order. Please try again.");
      return;
    }
    if (!orderData.id) {
      alert("Order creation failed. Please try again.");
      return;
    }

    // Prepare Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_wRRcjbZESJnz17",
      amount: orderData.amount,
      currency: orderData.currency,
      name: process.env.NEXT_PUBLIC_BRAND_NAME || "Penova",
      description: `Order for ${cartItems.length} items`,
      image:
        (process.env.NEXT_PUBLIC_SITE_URL || "https://puremelt.in") +
        "/product.webp",
      order_id: orderData.id,
      handler: async function (response: any) {
        // Send payment verification to backend
        try {
          const verifyRes = await fetch("/api/razorpay-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              order_id: orderData.id,
              cart: orderDetails.items,
              customer: orderDetails.customer,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment successful! Order ID: " + orderData.id);
            // Optionally, clear cart and redirect
            localStorage.removeItem("cart");
            window.location.href = "/account";
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        } catch {
          alert("Payment verification failed. Please contact support.");
        }
      },
      prefill: orderDetails.customer,
      notes: orderDetails.notes,
      theme: {
        color: "#EEFF00",
      },
      modal: {
        ondismiss: function () {
          alert("Payment popup closed. You can try again.");
        },
      },
    };

    // Load Razorpay SDK if not loaded
    function loadRazorpayScript() {
      return new Promise((resolve, reject) => {
        if (typeof window === "undefined") return reject();
        if ((window as any).Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    }

    try {
      await loadRazorpayScript();
      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay SDK failed to load. Please try again later.");
      }
    } catch {
      alert("Razorpay SDK failed to load. Please try again later.");
    }
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
    <div className="min-h-screen bg-black">
      {/* Header */}
      <Header bgColor="bg-black" textColor="md:text-white text-white" />

      {/* Cart Content */}
      <section className="pt-20 md:pt-24 pb-16 px-4 md:px-14">
        <div className="mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Shopping Cart
            </h1>
            <div className="w-16 h-1 bg-amber-400 rounded"></div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-24 bg-gray-900 rounded-2xl shadow-lg border border-gray-800">
              <ShoppingBag className="w-20 h-20 text-amber-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-400 mb-8">
                Add some delicious peanut butter to get started!
              </p>
              <Link href="/buy-now">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 text-lg rounded-xl font-semibold">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 p-6 bg-gray-800 border-b border-gray-700">
                <div className="col-span-6 font-semibold text-amber-400">
                  Products
                </div>
                <div className="col-span-2 font-semibold text-amber-400 text-center">
                  Price
                </div>
                <div className="col-span-2 font-semibold text-amber-400 text-center">
                  Quantity
                </div>
                <div className="col-span-2 font-semibold text-amber-400 text-center">
                  Total
                </div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-800">
                {cartItems.map((item, index) => (
                  <div key={item.id} className="p-4 md:p-6">
                    <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Mobile Layout */}
                      <div className="md:hidden">
                        <div className="flex gap-4 mb-4">
                          <div className="relative flex-shrink-0">
                            <Image
                              src={
                                item.image ||
                                "/placeholder.svg?height=80&width=80&query=peanut butter jar"
                              }
                              alt={item.name}
                              width={80}
                              height={80}
                              className="rounded-lg bg-gray-800 border border-gray-700"
                            />
                            <button
                              onClick={() => removeItem(item.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                            >
                              ×
                            </button>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-base mb-1 leading-tight">
                              {item.name}
                            </h3>
                            <p className="text-gray-400 text-sm mb-2">
                              Size: {item.size}
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-bold text-white text-lg">
                                ₹{item.price}
                              </span>
                              <span className="text-gray-500 line-through text-sm">
                                ₹{item.originalPrice}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-10 h-10 bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 h-10 flex items-center justify-center font-semibold text-white bg-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-10 h-10 bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400 mb-1">
                              Total
                            </div>
                            <span className="font-bold text-white text-lg">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      {/* Product Info */}
                      <div className="hidden md:flex md:col-span-6 items-center gap-4">
                        <div className="relative">
                          <Image
                            src={
                              item.image ||
                              "/placeholder.svg?height=80&width=80&query=peanut butter jar"
                            }
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg bg-gray-800 border border-gray-700"
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                          >
                            ×
                          </button>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg mb-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Size: {item.size}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden md:block md:col-span-2 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-white text-lg">
                            ₹{item.price}
                          </span>
                          <span className="text-gray-500 line-through text-sm">
                            ₹{item.originalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="hidden md:flex md:col-span-2 justify-center">
                        <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center font-semibold text-white bg-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="hidden md:block md:col-span-2 text-center">
                        <span className="font-bold text-white text-lg">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="p-4 md:p-6 bg-gray-800 border-t border-gray-700">
                <div className="md:max-w-md md:ml-auto">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-white">
                        ₹{subtotal}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-300">
                      <span>Original Total:</span>
                      <span className="font-semibold line-through text-white">
                        ₹{originalTotal}
                      </span>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Total Savings:</span>
                        <span className="font-semibold">₹{savings}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-300">
                      <span>Shipping:</span>
                      <span className="font-semibold text-white">
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>

                    {subtotal < 500 && (
                      <p className="text-sm text-amber-300 bg-gray-800 border border-amber-500/30 p-3 rounded-lg">
                        Add ₹{500 - subtotal} more for free shipping!
                      </p>
                    )}

                    <Separator className="bg-gray-600" />

                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total:</span>
                      <span className="text-amber-400">₹{total}</span>
                    </div>
                  </div>

                  <div className="">
                    <Button
                      onClick={handleRazorpayPayment}
                      className="w-full bg-amber-500 mb-4 hover:bg-amber-600 text-black py-4 text-lg rounded-xl font-semibold"
                    >
                      🔒 Checkout
                    </Button>
                    <Link href="/buy-now">
                      <Button
                        variant="outline"
                        className="w-full border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 py-4 text-lg rounded-xl font-semibold bg-transparent"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
