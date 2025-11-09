'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowRight, Truck, Check } from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  name: string;
  size?: string;
  quantity: number;
  price: number;
}

interface Order {
  _id?: string;
  id?: string;
  date?: string;
  status: string;
  items: OrderItem[];
  total: number;
  trackingId?: string;
}

interface OrdersSectionProps {
  orders: Order[];
  isLoading?: boolean;
}

export const OrdersSection = ({
  orders,
  // eslint-disable-next-line unused-imports/no-unused-vars
  isLoading = false
}: OrdersSectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'confirmed':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'pending':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check className='h-4 w-4' />;
      case 'shipped':
        return <Truck className='h-4 w-4' />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <div className='flex items-center gap-2'>
          <ShoppingBag className='h-5 w-5 text-primary' />
          <CardTitle>Order History</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className='py-12 text-center'>
            <ShoppingBag className='mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50' />
            <p className='mb-4 text-muted-foreground'>No orders yet</p>
            <Link href='/products'>
              <Button variant='outline'>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className='space-y-4'>
            {orders.map((order) => (
              <Card
                key={order._id ?? order.id}
                className='border-border bg-card/50 transition-colors hover:bg-card/80'
              >
                <CardContent className='p-6'>
                  <div className='mb-4 flex items-start justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>Order ID</p>
                      <h3 className='text-lg font-semibold text-foreground'>
                        #{order.id}
                      </h3>
                    </div>
                    <Badge
                      className={`gap-2 border ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </div>

                  <p className='mb-4 text-sm text-muted-foreground'>
                    {order.date}
                  </p>

                  <div className='mb-4 space-y-2'>
                    {order.items.map((item, index) => (
                      <div key={index} className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>
                          {item.name}
                          {item.size && ` (${item.size})`} × {item.quantity}
                        </span>
                        <span className='font-medium text-foreground'>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className='my-4 bg-border/50' />

                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>Total</p>
                      <p className='text-xl font-semibold text-foreground'>
                        ₹{order.total.toLocaleString()}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      {order.trackingId && (
                        <Button size='sm' variant='outline'>
                          Track Order
                        </Button>
                      )}
                      <Button size='sm' className='gap-2'>
                        View Details
                        <ArrowRight className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
