'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
}

interface WishlistSectionProps {
  wishlist: WishlistItem[];
  setWishlist: (items: WishlistItem[]) => void;
}

export const WishlistSection = ({
  wishlist,
  setWishlist
}: WishlistSectionProps) => {
  const [demoWishlist] = useState<WishlistItem[]>([
    // {
    //   id: "wish-1",
    //   name: "Premium Noise-Cancelling Headphones",
    //   price: 349,
    //   category: "Electronics",
    // },
    // {
    //   id: "wish-2",
    //   name: "Luxury Leather Wallet",
    //   price: 189,
    //   category: "Accessories",
    // },
    // {
    //   id: "wish-3",
    //   name: "Smart Watch Pro",
    //   price: 499,
    //   category: "Electronics",
    // },
    // {
    //   id: "wish-4",
    //   name: "Designer Sunglasses",
    //   price: 299,
    //   category: "Accessories",
    // },
  ]);

  const displayedWishlist = wishlist.length > 0 ? wishlist : demoWishlist;

  const handleRemoveFromWishlist = (id: string) => {
    const updated = displayedWishlist.filter((item) => item.id !== id);
    setWishlist(updated);
  };

  const handleAddToCart = (item: WishlistItem) => {
    console.log('Added to cart:', item);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <div className='flex items-center gap-2'>
          <Heart className='h-5 w-5 fill-current text-primary' />
          <CardTitle>My Wishlist</CardTitle>
        </div>
        <span className='text-sm text-muted-foreground'>
          {displayedWishlist.length} items
        </span>
      </CardHeader>
      <CardContent>
        {displayedWishlist.length === 0 ? (
          <div className='py-12 text-center'>
            <Heart className='mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50' />
            <h3 className='mb-2 text-lg font-semibold text-foreground'>
              Your wishlist is empty
            </h3>
            <p className='mb-6 text-muted-foreground'>
              Save items you love for later
            </p>
            <Link href='/products'>
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {displayedWishlist.map((item) => (
              <div
                key={item.id}
                className='rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-primary/50'
              >
                <div className='mb-4 flex aspect-square items-center justify-center rounded-lg bg-muted/30'>
                  <Heart className='h-12 w-12 text-muted-foreground/30' />
                </div>
                <div className='space-y-2'>
                  {item.category && (
                    <p className='text-xs uppercase tracking-wide text-muted-foreground'>
                      {item.category}
                    </p>
                  )}
                  <h4 className='line-clamp-2 text-sm font-medium text-foreground'>
                    {item.name}
                  </h4>
                  <p className='text-lg font-semibold text-primary'>
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
                <div className='mt-4 flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    className='flex-1 bg-transparent'
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    size='sm'
                    className='flex-1 gap-2'
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className='h-4 w-4' />
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
