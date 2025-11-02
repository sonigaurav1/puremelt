"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/app/components/cart-context";
import clsx from "clsx";

// Navigation links
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Our Product" },
  { href: "/about", label: "About Us" },
  { href: "/recipes", label: "Recipes" },
  { href: "/contact", label: "Contact" },
];

// NavLinks component
const NavLinks = ({
  variant,
  pathname,
  textColor,
  scrolled,
  onClick,
}: {
  variant: "desktop" | "mobile";
  pathname: string;
  textColor: string;
  scrolled: boolean;
  onClick?: () => void;
}) => (
  <>
    {navLinks.map(({ href, label }) => {
      const isActive = pathname === href;

      const baseClasses = clsx(
        "relative transition-all duration-300 ease-in-out",
        variant === "desktop"
          ? "font-medium group"
          : "font-medium hover:text-[#f8d87d]",
        // Desktop: active tab always amber, inactive tabs black when scrolled, white otherwise
        variant === "desktop"
          ? isActive
            ? "!text-amber-700 font-semibold"
            : scrolled
            ? "text-black"
            : "text-white"
          : isActive
          ? "text-[#f8d87d] font-semibold underline underline-offset-4"
          : scrolled
          ? "text-white"
          : ""
      );

      return (
        <Link key={href} href={href} className={baseClasses} onClick={onClick}>
          {label}
          {variant === "desktop" && (
            <span
              className={clsx(
                "absolute left-0 -bottom-1 h-[2px] bg-amber-700 transition-all duration-300 ease-in-out",
                isActive ? "w-full" : "w-0 group-hover:w-full"
              )}
            />
          )}
        </Link>
      );
    })}
  </>
);

// HeaderIcons component
const HeaderIcons = ({
  pathname,
  textColor,
  scrolled,
  cartCount,
  pop,
}: {
  pathname: string;
  textColor: string;
  scrolled: boolean;
  cartCount: number;
  pop: boolean;
}) => (
  <div className="flex items-center gap-3">
    {/* Cart */}
    <Link href="/cart">
      <Button
        variant="ghost"
        size="sm"
        className="px-2 bg-transparent relative"
      >
        <ShoppingCart
          className={clsx(
            "!size-5 cursor-pointer",
            textColor,
            scrolled && "text-black",
            pathname === "/cart" && "!text-amber-700"
          )}
          aria-label="View cart"
        />
        {cartCount > 0 && (
          <span
            className={clsx(
              "absolute -top-1.5 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300",
              pop && "animate-pop"
            )}
          >
            {cartCount}
          </span>
        )}
      </Button>
    </Link>

    {/* User */}
    <Link href="/account">
      <Button variant="ghost" size="sm" className="px-2 bg-transparent">
        <User
          className={clsx(
            "!size-[22px] cursor-pointer transition-transform duration-200 hover:scale-110",
            textColor,
            scrolled && "text-black",
            pathname === "/account" && "!text-amber-700"
          )}
          aria-label="User account"
        />
      </Button>
    </Link>
  </div>
);

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Entrance animation + cart badge pop
  const [prevCartCount, setPrevCartCount] = useState(cartCount);
  const [pop, setPop] = useState(false);

  // Detect mobile vs desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > prevCartCount) {
      setPop(true);
      const timer = setTimeout(() => setPop(false), 300);
      return () => clearTimeout(timer);
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  // Dynamic color logic
  const getColors = () => {
    // Desktop
    if (!isMobile) {
      if (pathname === "/" || pathname === "/product") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/product") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/about") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/recipes") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/contact") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/cart") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/account") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      // Default fallback
      if (!scrolled) {
        return { bg: "bg-transparent", text: "text-white" };
      } else {
        return { bg: "bg-white", text: "text-black" };
      }
    }
    // Mobile
    if (isMobile) {
      if (pathname === "/") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-black" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/product") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/about") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/recipes") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/contact") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/cart") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      if (pathname === "/account") {
        if (!scrolled) {
          return { bg: "bg-transparent", text: "text-white" };
        } else {
          return { bg: "bg-white", text: "text-black" };
        }
      }
      // Default fallback
      if (!scrolled) {
        return { bg: "bg-transparent", text: "text-black" };
      } else {
        return { bg: "bg-white", text: "text-black" };
      }
    }
    // Fallback
    return { bg: "bg-transparent", text: "text-white" };
  };

  const { bg, text } = getColors();

  return (
    <header
      className={clsx(
        "fixed w-full border-b-2 top-0 z-50 transition-all duration-700 ease-out transform",
        mounted ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0",
        scrolled
          ? `${bg} shadow-md border-[#232323]`
          : `bg-transparent border-[#232323]`
      )}
    >
      <div className="container mx-auto px-4 md:px-14 py-4 md:max-w-[1500px] flex items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Menu
              className={clsx(
                "md:hidden size-6 cursor-pointer",
                text,
                scrolled && "!text-black"
              )}
              aria-label="Open navigation menu"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className={clsx(
              "w-64 bg-black/95 backdrop-blur-md text-white border-r border-[#f8d87d] shadow-lg transition-transform duration-300 ease-in-out",
              "[&>[data-state=open]]:translate-x-0 [&>[data-state=open]]:opacity-100",
              "[&>[data-state=closed]]:translate-x-[-100%] [&>[data-state=closed]]:opacity-0"
            )}
          >
            <nav className="flex flex-col gap-5 mt-10 text-white text-base font-medium">
              <SheetClose asChild>
                <NavLinks
                  variant="mobile"
                  pathname={pathname}
                  textColor={text}
                  scrolled={scrolled}
                />
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
              className={clsx(
                "text-[11.3px] tracking-[1.5px] -mt-2",
                text,
                scrolled && "!text-black"
              )}
            >
              Taste the Finest
            </span>
          </Link>
        </div>

        <Link href="/" className="hidden md:flex flex-col items-center">
          <span className="text-3xl font-extrabold text-primary-color">
            {process.env.NEXT_PUBLIC_BRAND_NAME}
          </span>
          <span
            className={clsx(
              "text-xs tracking-[1.2px]  -mt-2",
              text,
              scrolled && "!text-black"
            )}
          >
            Taste the Finest
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks
            variant="desktop"
            pathname={pathname}
            textColor={text}
            scrolled={scrolled}
          />
        </nav>

        {/* Right Icons */}
        <HeaderIcons
          pathname={pathname}
          textColor={text}
          scrolled={scrolled}
          cartCount={cartCount}
          pop={pop}
        />
      </div>
    </header>
  );
};

export default Header;
