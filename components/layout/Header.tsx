"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/app/components/cart-context";

const Header = () => {
  const { getTotalItems } = useCart();

  return (
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
            <Link
              href="/"
              className="text-amber-900 hover:text-amber-700 font-medium"
            >
              Home
            </Link>
            <Link
              href="/product"
              className="text-amber-900 hover:text-amber-700 font-medium"
            >
              Our Product
            </Link>
            <Link
              href="/about"
              className="text-amber-900 hover:text-amber-700 font-medium"
            >
              About Us
            </Link>
            <Link
              href="/recipes"
              className="text-amber-900 hover:text-amber-700 font-medium"
            >
              Recipes
            </Link>
            <Link
              href="/contact"
              className="text-amber-900 hover:text-amber-700 font-medium"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button
                variant="outline"
                size="sm"
                className="border-amber-200 text-amber-900 hover:bg-amber-50 bg-transparent relative"
              >
                <ShoppingCart className="w-4 h-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/account">
              <Button
                variant="outline"
                size="sm"
                className="border-amber-200 text-amber-900 hover:bg-amber-50 bg-transparent"
              >
                <User className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
