"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
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

const Header = ({ bgColor = "bg-white", textColor = "text-black" }) => {
  const { getTotalItems } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Sync cart count from localStorage and custom event
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateCartCount = () => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          try {
            const parsed = JSON.parse(storedCart);
            setCartCount(
              parsed.reduce(
                (sum: number, item: any) => sum + (item.quantity || 1),
                0
              )
            );
          } catch {
            setCartCount(getTotalItems());
          }
        } else {
          setCartCount(getTotalItems());
        }
      };
      updateCartCount();
      window.addEventListener("storage", updateCartCount);
      window.addEventListener("cartUpdated", updateCartCount);
      return () => {
        window.removeEventListener("storage", updateCartCount);
        window.removeEventListener("cartUpdated", updateCartCount);
      };
    }
  }, [getTotalItems]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    handleScroll(); // Initial check

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed ${bgColor} w-full border-b-2 border-[#232323]  top-0 z-50 transition-colors duration-300 ${
        scrolled ? "!bg-white md:bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-14 py-4 md:max-w-[1500px]">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Menu
                className={`md:hidden size-6 cursor-pointer ${
                  scrolled ? "!text-black" : ""
                } ${textColor}`}
              />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-64 bg-black text-white border-r border-[#f8d87d] shadow-lg backdrop-blur-md [&>[data-state=closed]]:hidden"
            >
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-5 mt-10 text-white text-base font-medium">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className={
                      pathname === "/"
                        ? "text-[#f8d87d] font-semibold underline underline-offset-4"
                        : "hover:text-[#f8d87d]"
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
                        ? "text-[#f8d87d] font-semibold underline underline-offset-4"
                        : "hover:text-[#f8d87d]"
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
                        ? "text-[#f8d87d] font-semibold underline underline-offset-4"
                        : "hover:text-[#f8d87d]"
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
                        ? "text-[#f8d87d] font-semibold underline underline-offset-4"
                        : "hover:text-[#f8d87d]"
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
                        ? "text-[#f8d87d] font-semibold underline underline-offset-4"
                        : "hover:text-[#f8d87d]"
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
              <span className="text-3xl font-extrabold text-primary-color">
                {process.env.NEXT_PUBLIC_BRAND_NAME}
              </span>
              <span
                className={`text-[11.3px] ${textColor} ${
                  scrolled ? "!text-black" : ""
                } tracking-[1.2px] -mt-2`}
              >
                Taste the Finest
              </span>
            </Link>
          </div>

          {/* Desktop Logo */}
          <Link href="/" className="hidden  md:flex flex-col items-center">
            <span className="text-3xl font-extrabold text-primary-color">
              {process.env.NEXT_PUBLIC_BRAND_NAME}
            </span>
            <span
              className={`text-xs ${textColor} ${
                scrolled ? "!text-black" : ""
              }  tracking-[1.3px] md:tracking-[1.5px] -mt-2`}
            >
              Taste the finest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-8`}>
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "text-amber-700 font-semibold"
                  : `${textColor} ${
                      scrolled ? "!text-black" : ""
                    } hover:text-amber-700 font-medium`
              }`}
            >
              Home
            </Link>
            <Link
              href="/product"
              className={`${
                pathname === "/product"
                  ? "text-amber-700 font-semibold"
                  : `${textColor} ${
                      scrolled ? "!text-black" : ""
                    } hover:text-amber-700 font-medium`
              }`}
            >
              Our Product
            </Link>
            <Link
              href="/about"
              className={`${
                pathname === "/about"
                  ? "text-amber-700 font-semibold"
                  : `${textColor} ${
                      scrolled ? "!text-black" : ""
                    } hover:text-amber-700 font-medium`
              }`}
            >
              About Us
            </Link>
            <Link
              href="/recipes"
              className={`${
                pathname === "/recipes"
                  ? "text-amber-700 font-semibold"
                  : `${textColor} ${
                      scrolled ? "!text-black" : ""
                    } hover:text-amber-700 font-medium`
              }`}
            >
              Recipes
            </Link>
            <Link
              href="/contact"
              className={`${
                pathname === "/contact"
                  ? "text-amber-700 font-semibold"
                  : `${textColor} ${
                      scrolled ? "!text-black" : ""
                    } hover:text-amber-700 font-medium`
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 bg-transparent relative`}
              >
                <ShoppingCart
                  className={`!size-5 ${
                    scrolled ? "!text-black" : ""
                  } ${textColor} 
                  ${pathname === "/cart" ? "!text-amber-700" : ""}
                  cursor-pointer`}
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/account">
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 bg-transparent `}
              >
                <User
                  className={`!size-5 ${
                    scrolled ? "!text-black" : ""
                  } ${textColor} ${
                    pathname === "/account" ? "!text-amber-700" : ""
                  } cursor-pointer`}
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
