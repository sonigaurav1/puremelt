"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/app/components/cart-context";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

const Header = () => {
  const { getTotalItems } = useCart();

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100">
      <div className="container mx-auto px-4 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Trigger */}

          <Sheet>
            <SheetTrigger asChild>
              <Menu className="md:hidden size-6 text-amber-900 cursor-pointer" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-64 bg-white/80 backdrop-blur-md [&>[data-state=closed]]:hidden"
            >
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-5 mt-10 text-amber-900 text-base font-medium">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className={
                      pathname === "/"
                        ? "text-amber-700 font-semibold underline underline-offset-4"
                        : "hover:text-amber-700"
                    }
                  >
                    Home
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/product"
                    className={
                      pathname === "/product"
                        ? "text-amber-700 font-semibold underline underline-offset-4"
                        : "hover:text-amber-700"
                    }
                  >
                    Our Product
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/about"
                    className={
                      pathname === "/about"
                        ? "text-amber-700 font-semibold underline underline-offset-4"
                        : "hover:text-amber-700"
                    }
                  >
                    About Us
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/recipes"
                    className={
                      pathname === "/recipes"
                        ? "text-amber-700 font-semibold underline underline-offset-4"
                        : "hover:text-amber-700"
                    }
                  >
                    Recipes
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className={
                      pathname === "/contact"
                        ? "text-amber-700 font-semibold underline underline-offset-4"
                        : "hover:text-amber-700"
                    }
                  >
                    Contact
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Mobile Logo */}
          <div className="absolute md:hidden left-1/2 -translate-x-1/2 text-center">
            <Link href="/" className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-pista">
                PureMelt
              </span>
              <span className="text-xs text-gray-500 tracking-[2.8px] -mt-2">
                Taste the Finest
              </span>
            </Link>
          </div>

          {/* Desktop Logo */}
          <Link href="/" className="hidden  md:flex flex-col items-center">
            <span className="text-3xl font-extrabold text-amber-900">
              PureMelt
            </span>
            <span className="text-xs text-gray-500 tracking-[2.8px] -mt-2">
              Taste the finest
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Right Buttons */}
          <div className="flex items-center">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-900 px-2 hover:bg-amber-50 bg-transparent relative"
              >
                <ShoppingCart className="!size-5 text-amber-900 cursor-pointer" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/account">
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-900 px-2 hover:bg-amber-50 bg-transparent"
              >
                <User className="!size-5 text-amber-900 cursor-pointer" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
