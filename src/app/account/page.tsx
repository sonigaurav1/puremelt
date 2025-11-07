'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Eye,
  Truck
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import Header from '@/components/layout/Header';
import HomeLoader from '@/components/HomeLoader';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';

// Local interfaces to replace `any` usages
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
  status: string; // could narrow to a union of known statuses
  items: OrderItem[];
  total: number;
  trackingId?: string;
}

interface UserAddress {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface ConvexUser {
  name?: string;
  email?: string;
  phone?: string;
  address?: UserAddress;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

const AccountPage = () => {
  // Only need logout here; others removed to satisfy unused variable lint warnings
  const { logout } = useAuth();
  const { user, isSignedIn, isLoaded } = useUser();

  // Convex hooks
  const createUser = useMutation(api.users.users.createUser);
  const convexUser = useQuery(
    api.users.users.getUserByClerkId,
    user?.id ? { clerkUserId: user.id } : 'skip'
  );
  // Fetch orders for the signed-in user. Always call the hook but skip when
  // the user isn't signed in to keep hook call order stable.
  const userOrders = useQuery(
    api.orders.orders.getOrderByClerkId,
    isSignedIn ? undefined : 'skip'
  );
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '', state: '', pincode: '' }
  });
  const [orders, setOrders] = useState<Order[]>([]);
  // Only the value is used; ignore the setter to avoid unused var warning
  const [wishlist] = useState<WishlistItem[]>([]);

  // Create user in Convex on sign in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      createUser({
        clerkUserId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        name: user.fullName || '',
        imageUrl: user.imageUrl || ''
      });
      // Only redirect if not already on /account
      if (
        router &&
        typeof window !== 'undefined' &&
        window.location.pathname !== '/account'
      ) {
        router.push('/account');
      }
    }
  }, [isLoaded, isSignedIn, user, createUser, router]);

  // Set profile data from Convex or Clerk user
  useEffect(() => {
    if (isLoaded && isSignedIn && (convexUser || user)) {
      const typedConvexUser = convexUser as ConvexUser | undefined;
      setProfileData(() => ({
        name: typedConvexUser?.name || user?.fullName || '',
        email:
          typedConvexUser?.email ||
          user?.emailAddresses?.[0]?.emailAddress ||
          '',
        phone: typedConvexUser?.phone || '',
        address: {
          street: typedConvexUser?.address?.street || '',
          city: typedConvexUser?.address?.city || '',
          state: typedConvexUser?.address?.state || '',
          pincode: typedConvexUser?.address?.pincode || ''
        }
      }));
    }
  }, [isLoaded, isSignedIn, convexUser, user]);

  // Set orders from Convex
  useEffect(() => {
    if (isLoaded && isSignedIn && Array.isArray(userOrders)) {
      setOrders(userOrders);
    }
  }, [isLoaded, isSignedIn, userOrders]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-amber-100 text-amber-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Redirect unauthenticated users to the dedicated login page (must be declared before any early return)
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/account/login');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <HomeLoader />;
  }

  if (!isSignedIn) {
    return <HomeLoader />;
  }

  return (
    <div className='min-h-screen pt-12 md:pt-0 bg-black bg-gradient-to-b text-white'>
      <div className='min-h-screen bg-black bg-gradient-to-b text-white'>
        {/* Header */}
        <Header />

        {/* Account Dashboard */}
        <section className='bg-black px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16 xl:py-20'>
          <div className='container mx-auto max-w-7xl lg:pt-4'>
            <div className='mb-8 flex items-center justify-between'>
              <div>
                <h1 className='text-4xl font-bold text-white'>My Account</h1>
                <p className='text-amber-700'>
                  Welcome back, {convexUser?.name || user.fullName}!
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant='outline'
                className='border-red-200 bg-transparent text-red-600 hover:bg-red-50'
              >
                <LogOut className='mr-2 h-4 w-4' />
                Logout
              </Button>
            </div>

            <Tabs defaultValue='profile' className='space-y-8'>
              <TabsList className='grid w-full grid-cols-5'>
                <TabsTrigger
                  value='profile'
                  className='flex items-center space-x-2'
                >
                  <User className='h-4 w-4' />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value='orders'
                  className='flex items-center space-x-2'
                >
                  <Package className='h-4 w-4' />
                  <span>Orders</span>
                </TabsTrigger>
                <TabsTrigger
                  value='tracking'
                  className='flex items-center space-x-2'
                >
                  <Truck className='h-4 w-4' />
                  <span>Track Order</span>
                </TabsTrigger>
                <TabsTrigger
                  value='wishlist'
                  className='flex items-center space-x-2'
                >
                  <Heart className='h-4 w-4' />
                  <span>Wishlist</span>
                </TabsTrigger>
                <TabsTrigger
                  value='settings'
                  className='flex items-center space-x-2'
                >
                  <Settings className='h-4 w-4' />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value='profile'>
                <Card className='border-amber-200'>
                  <CardContent className='p-8'>
                    <h2 className='mb-6 text-2xl font-bold text-secondary-color'>
                      Profile Information
                    </h2>
                    <form className='space-y-6'>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div>
                          <label className='mb-2 block font-medium text-secondary-color'>
                            Full Name
                          </label>
                          <Input
                            value={profileData.name}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                name: e.target.value
                              })
                            }
                            className='border-amber-200 focus:border-amber-600'
                          />
                        </div>
                        <div>
                          <label className='mb-2 block font-medium text-secondary-color'>
                            Email
                          </label>
                          <Input
                            type='email'
                            value={profileData.email}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                email: e.target.value
                              })
                            }
                            className='border-amber-200 focus:border-amber-600'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='mb-2 block font-medium text-secondary-color'>
                          Phone
                        </label>
                        <Input
                          value={profileData.phone || ''}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value
                            })
                          }
                          className='border-amber-200 focus:border-amber-600'
                          placeholder='+91 12345 67890'
                        />
                      </div>

                      <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-secondary-color'>
                          Address
                        </h3>
                        <div>
                          <label className='mb-2 block font-medium text-secondary-color'>
                            Street Address
                          </label>
                          <Input
                            value={profileData.address?.street || ''}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: {
                                  street: e.target.value,
                                  city: profileData.address?.city || '',
                                  state: profileData.address?.state || '',
                                  pincode: profileData.address?.pincode || ''
                                }
                              })
                            }
                            className='border-amber-200 focus:border-amber-600'
                          />
                        </div>
                        <div className='grid gap-4 md:grid-cols-3'>
                          <div>
                            <label className='mb-2 block font-medium text-secondary-color'>
                              City
                            </label>
                            <Input
                              value={profileData.address?.city || ''}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  address: {
                                    street: profileData.address?.street || '',
                                    city: e.target.value,
                                    state: profileData.address?.state || '',
                                    pincode: profileData.address?.pincode || ''
                                  }
                                })
                              }
                              className='border-amber-200 focus:border-amber-600'
                            />
                          </div>
                          <div>
                            <label className='mb-2 block font-medium text-secondary-color'>
                              State
                            </label>
                            <Input
                              value={profileData.address?.state || ''}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  address: {
                                    street: profileData.address?.street || '',
                                    city: profileData.address?.city || '',
                                    state: e.target.value,
                                    pincode: profileData.address?.pincode || ''
                                  }
                                })
                              }
                              className='border-amber-200 focus:border-amber-600'
                            />
                          </div>
                          <div>
                            <label className='mb-2 block font-medium text-secondary-color'>
                              Pincode
                            </label>
                            <Input
                              value={profileData.address?.pincode || ''}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  address: {
                                    street: profileData.address?.street || '',
                                    city: profileData.address?.city || '',
                                    state: profileData.address?.state || '',
                                    pincode: e.target.value
                                  }
                                })
                              }
                              className='border-amber-200 focus:border-amber-600'
                            />
                          </div>
                        </div>
                      </div>

                      {/* Update Profile button removed, add logic if needed */}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='orders'>
                <Card className='border-amber-200'>
                  <CardContent className='p-8'>
                    <h2 className='mb-6 text-2xl font-bold text-secondary-color'>
                      Order History
                    </h2>
                    <div className='space-y-4'>
                      {orders.map((order: Order, idx) => (
                        <Card
                          key={order._id ?? order.id ?? idx}
                          className='border-amber-100'
                        >
                          <CardContent className='p-6'>
                            <div className='mb-4 flex items-center justify-between'>
                              <div>
                                <h3 className='font-bold text-secondary-color'>
                                  Order #{order.id}
                                </h3>
                                <p className='text-amber-700'>
                                  Placed on {order.date}
                                </p>
                              </div>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </Badge>
                            </div>

                            <div className='mb-4 space-y-2'>
                              {order.items.map(
                                (item: OrderItem, index: number) => (
                                  <div
                                    key={index}
                                    className='flex justify-between'
                                  >
                                    <span className='text-amber-700'>
                                      {item.name} ({item.size}) x{' '}
                                      {item.quantity}
                                    </span>
                                    <span className='font-medium text-secondary-color'>
                                      ₹{item.price * item.quantity}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>

                            <Separator className='my-4' />

                            <div className='flex items-center justify-between'>
                              <span className='text-lg font-bold text-secondary-color'>
                                Total: ₹{order.total}
                              </span>
                              <div className='space-x-2'>
                                {order.trackingId && (
                                  <Button
                                    variant='outline'
                                    size='sm'
                                    className='border-amber-200 bg-transparent'
                                  >
                                    <Eye className='mr-2 h-4 w-4' />
                                    Track Order
                                  </Button>
                                )}
                                <Button
                                  variant='outline'
                                  size='sm'
                                  className='border-amber-200 bg-transparent'
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='tracking'>
                <Card className='border-amber-200'>
                  <CardContent className='p-8'>
                    <h2 className='mb-6 text-2xl font-bold text-secondary-color'>
                      Track Your Order
                    </h2>
                    <div className='space-y-6'>
                      <div>
                        <label className='mb-2 block font-medium text-secondary-color'>
                          Order ID or Tracking Number
                        </label>
                        <div className='flex space-x-2'>
                          <Input
                            placeholder='Enter order ID or tracking number'
                            className='border-amber-200 focus:border-amber-600'
                          />
                          <Button className='bg-amber-600 text-white hover:bg-amber-700'>
                            Track
                          </Button>
                        </div>
                      </div>

                      {/* Sample tracking info */}
                      <div className='rounded-lg bg-amber-50 p-6'>
                        <h3 className='mb-4 font-bold text-secondary-color'>
                          Order #ORD002 - Tracking ID: TRK987654321
                        </h3>
                        <div className='space-y-4'>
                          <div className='flex items-center space-x-4'>
                            <div className='h-4 w-4 rounded-full bg-green-500'></div>
                            <div>
                              <p className='font-medium text-secondary-color'>
                                Order Confirmed
                              </p>
                              <p className='text-sm text-amber-700'>
                                Jan 20, 2024 - 10:30 AM
                              </p>
                            </div>
                          </div>
                          <div className='flex items-center space-x-4'>
                            <div className='h-4 w-4 rounded-full bg-green-500'></div>
                            <div>
                              <p className='font-medium text-secondary-color'>
                                Order Shipped
                              </p>
                              <p className='text-sm text-amber-700'>
                                Jan 21, 2024 - 2:15 PM
                              </p>
                            </div>
                          </div>
                          <div className='flex items-center space-x-4'>
                            <div className='h-4 w-4 rounded-full bg-amber-400'></div>
                            <div>
                              <p className='font-medium text-secondary-color'>
                                Out for Delivery
                              </p>
                              <p className='text-sm text-amber-700'>
                                Expected: Jan 23, 2024
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='wishlist'>
                <Card className='border-amber-200'>
                  <CardContent className='p-8'>
                    <h2 className='mb-6 text-2xl font-bold text-secondary-color'>
                      My Wishlist
                    </h2>
                    {wishlist.length === 0 ? (
                      <div className='py-12 text-center'>
                        <Heart className='mx-auto mb-4 h-16 w-16 text-amber-300' />
                        <h3 className='mb-2 text-xl font-bold text-secondary-color'>
                          Your wishlist is empty
                        </h3>
                        <p className='mb-6 text-amber-700'>
                          Save items you love for later
                        </p>
                        <Link href='/product'>
                          <Button className='bg-amber-600 text-white hover:bg-amber-700'>
                            Browse Products
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {/* Wishlist items would be rendered here */}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='settings'>
                <Card className='border-amber-200'>
                  <CardContent className='p-8'>
                    <h2 className='mb-6 text-2xl font-bold text-secondary-color'>
                      Account Settings
                    </h2>
                    <div className='space-y-6'>
                      <div className='flex items-center justify-between rounded-lg border border-amber-200 p-4'>
                        <div>
                          <h3 className='font-medium text-secondary-color'>
                            Email Notifications
                          </h3>
                          <p className='text-sm text-amber-700'>
                            Receive updates about your orders and offers
                          </p>
                        </div>
                        <Button
                          variant='outline'
                          size='sm'
                          className='border-amber-200 bg-transparent'
                        >
                          Manage
                        </Button>
                      </div>

                      <div className='flex items-center justify-between rounded-lg border border-amber-200 p-4'>
                        <div>
                          <h3 className='font-medium text-secondary-color'>
                            Privacy Settings
                          </h3>
                          <p className='text-sm text-amber-700'>
                            Control your data and privacy preferences
                          </p>
                        </div>
                        <Button
                          variant='outline'
                          size='sm'
                          className='border-amber-200 bg-transparent'
                        >
                          Manage
                        </Button>
                      </div>

                      <div className='flex items-center justify-between rounded-lg border border-amber-200 p-4'>
                        <div>
                          <h3 className='font-medium text-secondary-color'>
                            Change Password
                          </h3>
                          <p className='text-sm text-amber-700'>
                            Update your account password
                          </p>
                        </div>
                        <Button
                          variant='outline'
                          size='sm'
                          className='border-amber-200 bg-transparent'
                        >
                          Change
                        </Button>
                      </div>

                      <div className='flex items-center justify-between rounded-lg border border-red-200 p-4'>
                        <div>
                          <h3 className='font-medium text-red-600'>
                            Delete Account
                          </h3>
                          <p className='text-sm text-red-500'>
                            Permanently delete your account and data
                          </p>
                        </div>
                        <Button
                          variant='outline'
                          size='sm'
                          className='border-red-200 bg-transparent text-red-600 hover:bg-red-50'
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountPage;
