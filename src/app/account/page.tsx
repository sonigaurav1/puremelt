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
  EyeOff,
  Truck,
  LoaderCircle
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';
import { GoogleOneTap, useUser } from '@clerk/clerk-react';
import Header from '@/components/layout/Header';
import HomeLoader from '@/components/HomeLoader';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';

const AccountPage = () => {
  const { login, register, logout, loading, verifyEmailOtp } = useAuth();
  const { user, isSignedIn, isLoaded } = useUser();
  // Clerk Google login handler
  const handleGoogleLogin = () => {
    if (typeof window !== 'undefined' && window.Clerk) {
      window.Clerk.openSignIn({ strategy: 'oauth_google' });
    } else {
      // Fallback: redirect to Clerk hosted Google login
      window.location.href = 'https://clerk.dev/oauth/google';
    }
  };
  // Convex hooks
  const createUser = useMutation(api.users.users.createUser);
  const updateUser = useMutation(api.users.users.updateUser);
  const convexUser = useQuery(
    api.users.users.getUserByClerkId,
    user?.id ? { clerkUserId: user.id } : 'skip'
  );
  // Fetch orders for the signed-in user
  const userOrders =
    isSignedIn && useQuery(api.orders.orders.getOrderByClerkId);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '', state: '', pincode: '' }
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

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
      setProfileData((prev) => ({
        name: convexUser?.name || user?.fullName || '',
        email:
          convexUser?.email || user?.emailAddresses?.[0]?.emailAddress || '',
        phone: convexUser?.phone || '',
        address: {
          street: convexUser?.address?.street || '',
          city: convexUser?.address?.city || '',
          state: convexUser?.address?.state || '',
          pincode: convexUser?.address?.pincode || ''
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData.email, loginData.password);
    if (success) {
      router.push('/account');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const result = await register({
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password
    });
    if (!result.success && result.needsVerification && result.signUpRef) {
      // Use window.prompt for OTP
      const code = window.prompt(
        'Enter the verification code sent to your email:'
      );
      if (!code) return;
      await verifyEmailOtp(result.signUpRef, code);
    }
  };

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

  if (!isLoaded) {
    return <HomeLoader />;
  }

  if (!isSignedIn) {
    return (
      <div className='min-h-dvh !bg-black !text-white'>
        {/* Header */}
        <Header />
        {/* Login/Register Section */}
        <section className='flex items-center justify-center px-4 py-40 md:py-32'>
          <div className='w-full max-w-md'>
            <Card className='border-[#f8d87d] bg-black text-white'>
              <CardContent className='p-8'>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className='w-full'
                >
                  <TabsList className='grid w-full grid-cols-2 border border-[#f8d87d] bg-[#222]'>
                    <TabsTrigger value='login' className='text-white'>
                      Login
                    </TabsTrigger>
                    <TabsTrigger value='register' className='text-white'>
                      Register
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value='login' className='space-y-4'>
                    <div className='mb-6 text-center'>
                      <h2 className='text-2xl font-bold text-[#f8d87d]'>
                        Welcome Back
                      </h2>
                      <p className='text-[#f8d87d]'>Sign in to your account</p>
                    </div>
                    <form onSubmit={handleLogin} className='space-y-4'>
                      <div>
                        <label className='mb-2 block font-medium text-white'>
                          Email
                        </label>
                        <Input
                          type='email'
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value
                            })
                          }
                          className='border-[#f8d87d] bg-black text-white focus:border-[#EEFF00]'
                          placeholder='your@email.com'
                          required
                        />
                      </div>
                      <div>
                        <label className='mb-2 block font-medium text-white'>
                          Password
                        </label>
                        <Input
                          type='password'
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value
                            })
                          }
                          className='border-[#f8d87d] bg-black text-white focus:border-[#EEFF00]'
                          placeholder='••••••••'
                          required
                        />
                      </div>
                      <Button
                        type='button'
                        className='mb-4 flex w-full items-center justify-center gap-2 bg-[#4285F4] font-bold text-white hover:bg-[#357ae8]'
                        onClick={handleGoogleLogin}
                      >
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 48 48'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g>
                            <path
                              d='M44.5 20H24V28.5H35.7C34.3 32.1 30.7 34.5 26.5 34.5C21.3 34.5 17 30.2 17 25C17 19.8 21.3 15.5 26.5 15.5C28.7 15.5 30.7 16.3 32.2 17.6L37.2 12.6C34.1 9.8 30.1 8 26.5 8C16.8 8 9 15.8 9 25.5C9 35.2 16.8 43 26.5 43C36.2 43 44 35.2 44 25.5C44 23.7 44.3 21.9 44.5 20Z'
                              fill='#4285F4'
                            />
                            <path
                              d='M6.3 14.7L12.1 19.1C13.7 16.1 16.8 14 20.5 14C22.7 14 24.7 14.7 26.2 16L31.2 11C28.1 8.2 24.1 6.5 20.5 6.5C12.7 6.5 6.3 12.9 6.3 20.7C6.3 22.5 6.6 24.3 7.1 26L12.1 21C11.7 19.8 11.5 18.6 11.5 17.5C11.5 16.4 11.7 15.2 12.1 14.7Z'
                              fill='#34A853'
                            />
                            <path
                              d='M24 44.5C28.1 44.5 31.7 43.1 34.5 40.7L29.5 36.7C28.1 37.7 26.4 38.5 24.5 38.5C20.7 38.5 17.6 36.4 16 33.4L10.2 37.8C13.3 41.1 18.1 44.5 24 44.5Z'
                              fill='#FBBC05'
                            />
                            <path
                              d='M44.5 20H24V28.5H35.7C34.3 32.1 30.7 34.5 26.5 34.5C21.3 34.5 17 30.2 17 25C17 19.8 21.3 15.5 26.5 15.5C28.7 15.5 30.7 16.3 32.2 17.6L37.2 12.6C34.1 9.8 30.1 8 26.5 8C16.8 8 9 15.8 9 25.5C9 35.2 16.8 43 26.5 43C36.2 43 44 35.2 44 25.5C44 23.7 44.3 21.9 44.5 20Z'
                              fill='#4285F4'
                            />
                          </g>
                        </svg>
                        Login with Google
                      </Button>
                      {typeof window !== 'undefined' && isLoaded && (
                        <GoogleOneTap />
                      )}
                      <Button
                        type='submit'
                        className='w-full bg-[#EEFF00] font-bold text-black hover:bg-[#f8d87d]'
                      >
                        Sign In
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value='register' className='space-y-4'>
                    <div className='mb-6 text-center'>
                      <h2 className='text-2xl font-bold text-[#f8d87d]'>
                        Create Account
                      </h2>
                      <p className='text-[#f8d87d]'>
                        Join the {process.env.NEXT_PUBLIC_BRAND_NAME} family
                      </p>
                    </div>
                    <form onSubmit={handleRegister} className='space-y-4'>
                      <div className='flex gap-4'>
                        <div>
                          <label className='mb-2 block font-medium text-white'>
                            First Name
                          </label>
                          <Input
                            value={registerData.firstName}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                firstName: e.target.value
                              })
                            }
                            className='border-[#f8d87d] bg-black text-white focus:border-[#EEFF00]'
                            placeholder='Your first name'
                            required
                          />
                        </div>
                        <div>
                          <label className='mb-2 block font-medium text-white'>
                            Last Name
                          </label>
                          <Input
                            value={registerData.lastName}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                lastName: e.target.value
                              })
                            }
                            className='border-[#f8d87d] bg-black text-white focus:border-[#EEFF00]'
                            placeholder='Your last name'
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className='mb-2 block font-medium text-white'>
                          Email
                        </label>
                        <Input
                          type='email'
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              email: e.target.value
                            })
                          }
                          className='border-[#f8d87d] bg-black text-white focus:border-[#EEFF00]'
                          placeholder='your@email.com'
                          required
                        />
                      </div>
                      <div className='relative'>
                        <label className='mb-2 block font-medium text-white'>
                          Password
                        </label>
                        <Input
                          type={registerData.showPassword ? 'text' : 'password'}
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              password: e.target.value
                            })
                          }
                          className='border-[#f8d87d] bg-black pr-10 text-white focus:border-[#EEFF00]'
                          placeholder='••••••••'
                          required
                        />
                        <button
                          type='button'
                          className='absolute right-2 top-10 text-[#f8d87d]'
                          tabIndex={-1}
                          onClick={() =>
                            setRegisterData({
                              ...registerData,
                              showPassword: !registerData.showPassword
                            })
                          }
                        >
                          {registerData.showPassword ? (
                            <EyeOff className='h-5 w-5' />
                          ) : (
                            <Eye className='h-5 w-5' />
                          )}
                        </button>
                      </div>
                      <div className='relative'>
                        <label className='mb-2 block font-medium text-white'>
                          Confirm Password
                        </label>
                        <Input
                          type={
                            registerData.showConfirmPassword
                              ? 'text'
                              : 'password'
                          }
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              confirmPassword: e.target.value
                            })
                          }
                          className='border-[#f8d87d] bg-black pr-10 text-white focus:border-[#EEFF00]'
                          placeholder='••••••••'
                          required
                        />
                        <button
                          type='button'
                          className='absolute right-2 top-10 text-[#f8d87d]'
                          tabIndex={-1}
                          onClick={() =>
                            setRegisterData({
                              ...registerData,
                              showConfirmPassword:
                                !registerData.showConfirmPassword
                            })
                          }
                        >
                          {registerData.showConfirmPassword ? (
                            <EyeOff className='h-5 w-5' />
                          ) : (
                            <Eye className='h-5 w-5' />
                          )}
                        </button>
                      </div>
                      <Button
                        type='button'
                        className='mb-4 flex w-full items-center justify-center gap-2 bg-[#4285F4] font-bold text-white hover:bg-[#357ae8]'
                        onClick={handleGoogleLogin}
                      >
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 48 48'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g>
                            <path
                              d='M44.5 20H24V28.5H35.7C34.3 32.1 30.7 34.5 26.5 34.5C21.3 34.5 17 30.2 17 25C17 19.8 21.3 15.5 26.5 15.5C28.7 15.5 30.7 16.3 32.2 17.6L37.2 12.6C34.1 9.8 30.1 8 26.5 8C16.8 8 9 15.8 9 25.5C9 35.2 16.8 43 26.5 43C36.2 43 44 35.2 44 25.5C44 23.7 44.3 21.9 44.5 20Z'
                              fill='#4285F4'
                            />
                            <path
                              d='M6.3 14.7L12.1 19.1C13.7 16.1 16.8 14 20.5 14C22.7 14 24.7 14.7 26.2 16L31.2 11C28.1 8.2 24.1 6.5 20.5 6.5C12.7 6.5 6.3 12.9 6.3 20.7C6.3 22.5 6.6 24.3 7.1 26L12.1 21C11.7 19.8 11.5 18.6 11.5 17.5C11.5 16.4 11.7 15.2 12.1 14.7Z'
                              fill='#34A853'
                            />
                            <path
                              d='M24 44.5C28.1 44.5 31.7 43.1 34.5 40.7L29.5 36.7C28.1 37.7 26.4 38.5 24.5 38.5C20.7 38.5 17.6 36.4 16 33.4L10.2 37.8C13.3 41.1 18.1 44.5 24 44.5Z'
                              fill='#FBBC05'
                            />
                            <path
                              d='M44.5 20H24V28.5H35.7C34.3 32.1 30.7 34.5 26.5 34.5C21.3 34.5 17 30.2 17 25C17 19.8 21.3 15.5 26.5 15.5C28.7 15.5 30.7 16.3 32.2 17.6L37.2 12.6C34.1 9.8 30.1 8 26.5 8C16.8 8 9 15.8 9 25.5C9 35.2 16.8 43 26.5 43C36.2 43 44 35.2 44 25.5C44 23.7 44.3 21.9 44.5 20Z'
                              fill='#4285F4'
                            />
                          </g>
                        </svg>
                        Login with Google Reg
                      </Button>
                      <div
                        id='clerk-captcha'
                        style={{ marginBottom: '1rem' }}
                      ></div>
                      {!loading ? (
                        <Button
                          type='submit'
                          disabled={loading}
                          className='w-full bg-[#EEFF00] font-bold text-black hover:bg-[#f8d87d]'
                        >
                          Create Account
                        </Button>
                      ) : (
                        <Button
                          type='submit'
                          disabled={loading}
                          className='w-full bg-[#EEFF00] font-bold text-black hover:bg-[#f8d87d]'
                        >
                          <LoaderCircle className='animate-spin' />
                        </Button>
                      )}
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black bg-gradient-to-b text-white'>
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
                      {orders.map((order, idx) => (
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
                              {order.items.map((item: any, index: number) => (
                                <div
                                  key={index}
                                  className='flex justify-between'
                                >
                                  <span className='text-amber-700'>
                                    {item.name} ({item.size}) x {item.quantity}
                                  </span>
                                  <span className='font-medium text-secondary-color'>
                                    ₹{item.price * item.quantity}
                                  </span>
                                </div>
                              ))}
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
