'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { useCart } from '@/app/components/cart-context';
import clsx from 'clsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';

// Navigation links
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Our Product' },
  { href: '/about', label: 'About Us' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/contact', label: 'Contact' }
];

// NavLinks component
const NavLinks = ({
  variant,
  pathname,
  scrolled,
  onClick
}: {
  variant: 'desktop' | 'mobile';
  pathname: string;
  scrolled: boolean;
  onClick?: () => void;
}) => (
  <>
    {navLinks.map(({ href, label }) => {
      const isActive = pathname === href;

      const baseClasses = clsx(
        'relative transition-all duration-300 ease-in-out',
        variant === 'desktop'
          ? 'font-medium group'
          : 'font-medium hover:text-[#f8d87d]',
        // Desktop: active tab always amber, inactive tabs black when scrolled, white otherwise
        variant === 'desktop'
          ? isActive
            ? '!text-amber-700 font-semibold'
            : scrolled
              ? 'text-black'
              : 'text-white'
          : isActive
            ? 'text-[#f8d87d] font-semibold underline underline-offset-4'
            : scrolled
              ? 'text-white'
              : ''
      );

      return (
        <Link key={href} href={href} className={baseClasses} onClick={onClick}>
          {label}
          {variant === 'desktop' && (
            <span
              className={clsx(
                'absolute -bottom-1 left-0 h-[2px] bg-amber-700 transition-all duration-300 ease-in-out',
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
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
  isMobile,
  mounted
}: {
  pathname: string;
  textColor: string;
  scrolled: boolean;
  cartCount: number;
  pop: boolean;
  isMobile: boolean;
  mounted: boolean;
}) => {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Auth-aware user menu that only calls Clerk hooks when Clerk is configured
  const UserMenu = () => {
    const { isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const name = user?.fullName || user?.firstName || user?.username || 'User';

    const handleLogout = async () => {
      await signOut();
      router.push('/');
    };

    return (
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='bg-transparent px-2'
            onMouseEnter={() => setMenuOpen(true)}
            aria-label={isSignedIn ? `Hi, ${name}` : 'User account'}
          >
            {isSignedIn && !isMobile ? (
              <span
                className={clsx(
                  'text-sm font-medium',
                  textColor,
                  scrolled && 'text-black',
                  pathname === '/account' && '!text-amber-700'
                )}
              >
                Hi, {name.split(' ')[0]}
              </span>
            ) : (
              <User
                className={clsx(
                  '!size-[22px] cursor-pointer transition-transform duration-200 hover:scale-110',
                  textColor,
                  scrolled && 'text-black',
                  pathname === '/account' && '!text-amber-700'
                )}
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='min-w-[12rem]'
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          {!isSignedIn ? (
            <>
              <DropdownMenuLabel>Welcome</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/account' className='cursor-pointer'>
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/account/register' className='cursor-pointer'>
                  Register
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel>Signed in as {name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/account' className='cursor-pointer'>My account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/account' className='cursor-pointer'>Order history</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  // Fallback menu when Clerk isn't configured during build — avoids calling Clerk hooks
  const GuestMenu = () => (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='bg-transparent px-2'
          onMouseEnter={() => setMenuOpen(true)}
          aria-label='User account'
        >
          <User
            className={clsx(
              '!size-[22px] cursor-pointer transition-transform duration-200 hover:scale-110',
              textColor,
              scrolled && 'text-black',
              pathname === '/account' && '!text-amber-700'
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='min-w-[12rem]'
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <DropdownMenuLabel>Welcome</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/account' className='cursor-pointer'>
            Login
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/account/register' className='cursor-pointer'>
            Register
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className='flex items-center gap-3'>
      {/* Cart */}
      <Link href='/cart'>
        <Button
          variant='ghost'
          size='sm'
          className='relative bg-transparent px-2'
        >
          <ShoppingCart
            className={clsx(
              '!size-5 cursor-pointer',
              textColor,
              scrolled && 'text-black',
              pathname === '/cart' && '!text-amber-700'
            )}
            aria-label='View cart'
          />
          {mounted && cartCount > 0 && (
            <span
              className={clsx(
                'absolute -right-2 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white transition-transform duration-300',
                pop && 'animate-pop'
              )}
            >
              {cartCount}
            </span>
          )}
        </Button>
      </Link>

      {/* User */}
      {hasClerk ? <UserMenu /> : <GuestMenu />}
    </div>
  );
};

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      if (pathname === '/' || pathname === '/products') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/products') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/about') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/recipes') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/contact') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/cart') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/account') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      // Default fallback
      if (!scrolled) {
        return { bg: 'bg-transparent', text: 'text-white' };
      } else {
        return { bg: 'bg-white', text: 'text-black' };
      }
    }
    // Mobile
    if (isMobile) {
      if (pathname === '/') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-black' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/products') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (
        pathname === '/products/[slug]' ||
        pathname.startsWith('/products/')
      ) {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/about') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/faq') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/recipes') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/contact') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/cart') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/account') {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      if (pathname === '/account/[slug]' || pathname.startsWith('/account/')) {
        if (!scrolled) {
          return { bg: 'bg-transparent', text: 'text-white' };
        } else {
          return { bg: 'bg-white', text: 'text-black' };
        }
      }
      // Default fallback
      if (!scrolled) {
        return { bg: 'bg-transparent', text: 'text-black' };
      } else {
        return { bg: 'bg-white', text: 'text-black' };
      }
    }
    // Fallback
    return { bg: 'bg-transparent', text: 'text-white' };
  };

  const { bg, text } = getColors();

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 w-full transform border-b-2 transition-all duration-700 ease-out',
        mounted ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0',
        scrolled
          ? `${bg} border-[#232323] shadow-md`
          : `border-[#232323] bg-transparent`
      )}
    >
      <div className='container mx-auto flex items-center justify-between px-4 py-4 md:max-w-[1500px] md:px-14 lg:px-16'>
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Menu
              className={clsx(
                'size-6 cursor-pointer md:hidden',
                text,
                scrolled && '!text-black'
              )}
              aria-label='Open navigation menu'
            />
          </SheetTrigger>

          <SheetContent
            side='left'
            className={clsx(
              'w-64 border-r border-[#f8d87d] bg-black/95 text-white shadow-lg backdrop-blur-md transition-transform duration-300 ease-in-out',
              '[&>[data-state=open]]:translate-x-0 [&>[data-state=open]]:opacity-100',
              '[&>[data-state=closed]]:translate-x-[-100%] [&>[data-state=closed]]:opacity-0'
            )}
          >
            <nav className='mt-10 flex flex-col gap-5 text-base font-medium text-white'>
              <SheetClose asChild>
                <NavLinks
                  variant='mobile'
                  pathname={pathname}
                  scrolled={scrolled}
                />
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Mobile Logo */}
        <div className='absolute left-1/2 -translate-x-1/2 text-center md:hidden'>
          <Link href='/' className='flex flex-col items-center'>
            <span className='text-3xl font-extrabold text-primary-color'>
              {process.env.NEXT_PUBLIC_BRAND_NAME}
            </span>
            <span
              className={clsx(
                '-mt-2 text-[11.3px] tracking-[1.5px]',
                text,
                scrolled && '!text-black'
              )}
            >
              Taste the Finest
            </span>
          </Link>
        </div>

        <Link href='/' className='hidden flex-col items-center md:flex'>
          <span className='text-3xl font-extrabold text-primary-color'>
            {process.env.NEXT_PUBLIC_BRAND_NAME}
          </span>
          <span
            className={clsx(
              '-mt-2 text-xs tracking-[1.2px]',
              text,
              scrolled && '!text-black'
            )}
          >
            Taste the Finest
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden items-center space-x-8 md:flex'>
          <NavLinks variant='desktop' pathname={pathname} scrolled={scrolled} />
        </nav>

        {/* Right Icons */}
        <HeaderIcons
          pathname={pathname}
          textColor={text}
          scrolled={scrolled}
          cartCount={cartCount}
          pop={pop}
          isMobile={isMobile}
          mounted={mounted}
        />
      </div>
    </header>
  );
};

export default Header;
