'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { ProfileSection } from '@/features/account/components/ProfileSection';
import { AddressSection } from '@/features/account/components/AddressSection';
import { OrdersSection } from '@/features/account/components/OrdersSection';
import { WishlistSection } from '@/features/account/components/WishlistSection';
import type { Address } from '@/features/account/components/AddressForm';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

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

// Fallback orders demo (used only if no server data)
const DEMO_ORDERS: Order[] = [];

const AccountPage = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const { isSignedIn, user, isLoaded: isClerkLoaded } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    category?: string;
  }
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Convex queries & mutations
  const userDoc = useQuery(
    api.users.users.getUserByClerkId,
    isClerkLoaded && isSignedIn && user?.id ? { clerkUserId: user.id } : 'skip'
  );
  const upsertUser = useMutation(api.users.users.upsertUserByClerkId);
  const updateUser = useMutation(api.users.users.updateUser);

  const addressDocs = useQuery(api.addresses.addresses.getAddressesForUser, {});
  const createAddress = useMutation(api.addresses.addresses.createAddress);
  const editAddress = useMutation(api.addresses.addresses.updateAddress);
  const removeAddress = useMutation(api.addresses.addresses.deleteAddress);
  const setDefaultAddress = useMutation(
    api.addresses.addresses.setDefaultAddress
  );

  const orderDocs = useQuery(
    api.orders.orders.getOrderByClerkId,
    isSignedIn ? {} : 'skip'
  );

  // Initialize/Sync user profile from Clerk/Convex
  useEffect(() => {
    if (!isClerkLoaded) return;
    if (!isSignedIn || !user) {
      setIsLoaded(true);
      return;
    }
    // Ensure user exists in Convex
    const ensure = async () => {
      try {
        await upsertUser({
          clerkUserId: user.id,
          email:
            user.primaryEmailAddress?.emailAddress ||
            user.emailAddresses[0]?.emailAddress ||
            '',
          name: user.fullName || user.firstName || user.username || 'User',
          imageUrl: user.imageUrl
        });
      } catch {
        // noop
      } finally {
        setIsLoaded(true);
      }
    };
    ensure();
  }, [isClerkLoaded, isSignedIn, upsertUser, user]);

  // Map profile data from Convex or Clerk
  useEffect(() => {
    if (!isClerkLoaded) return;
    const name = userDoc?.name || user?.fullName || user?.firstName || '';
    const email =
      userDoc?.email || user?.primaryEmailAddress?.emailAddress || '';
    setProfileData((prev) => ({ ...prev, name, email }));
  }, [userDoc, user, isClerkLoaded]);

  // Map addresses from Convex docs
  useEffect(() => {
    if (!addressDocs) return;
    const mapped: Address[] = addressDocs.map(
      (a: {
        _id: string;
        label: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        postalCode: string;
        isDefault?: boolean;
      }) => ({
        id: a._id,
        name: a.label,
        phone: a.phone,
        street: [a.addressLine1, a.addressLine2].filter(Boolean).join(', '),
        city: a.city,
        state: a.state,
        postalCode: a.postalCode,
        isDefault: !!a.isDefault
      })
    );
    setAddresses(mapped);
  }, [addressDocs]);

  // Map orders from Convex docs
  useEffect(() => {
    if (!orderDocs) {
      setOrders(DEMO_ORDERS);
      return;
    }
    type RawOrderItem = {
      name: string;
      size?: string;
      quantity: number;
      price: number;
    };
    type RawOrder = {
      _id: string;
      merchantOrderId?: string;
      createdAt?: number;
      status: string;
      items?: RawOrderItem[];
      total: number;
    };
    const mapped: Order[] = orderDocs.map((o: RawOrder) => ({
      _id: o._id,
      id: o.merchantOrderId || o._id,
      date: o.createdAt
        ? new Date(o.createdAt).toLocaleDateString()
        : undefined,
      status: o.status,
      items: (o.items || []).map((it: RawOrderItem) => ({
        name: it.name,
        size: it.size,
        quantity: it.quantity,
        price: it.price
      })),
      total: o.total,
      trackingId: undefined
    }));
    setOrders(mapped);
  }, [orderDocs]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleProfileSave = async (data: typeof profileData) => {
    setIsLoadingProfile(true);
    try {
      setProfileData(data);
      if (userDoc?._id) {
        await updateUser({
          userId: userDoc._id,
          name: data.name,
          email: data.email
        });
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleAddAddress = async (address: Address) => {
    const line1 = address.street;
    const payload = {
      label: address.name,
      addressLine1: line1,
      addressLine2: undefined as string | undefined,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: process.env.NEXT_PUBLIC_DEFAULT_COUNTRY || 'India',
      phone: address.phone,
      isDefault: !!address.isDefault,
      createdAt: Date.now()
    };
    await createAddress(payload);
  };

  const handleEditAddress = async (address: Address) => {
    if (!address.id) return;
    const line1 = address.street;
    await editAddress({
      addressId: address.id as unknown as Id<'addresses'>,
      label: address.name,
      addressLine1: line1,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      phone: address.phone,
      isDefault: address.isDefault
    });
  };

  const handleDeleteAddress = async (id: string) => {
    await removeAddress({ addressId: id as unknown as Id<'addresses'> });
  };

  const handleSetDefaultAddress = async (id: string) => {
    await setDefaultAddress({ addressId: id as unknown as Id<'addresses'> });
  };

  if (!isLoaded) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background'>
        <div className='text-center'>
          <div className='animate-pulse'>
            <div className='mx-auto mb-4 h-8 w-32 rounded bg-muted'></div>
            <div className='mx-auto h-4 w-48 rounded bg-muted'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />

      <section className='px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:pb-16 lg:pt-24'>
        <div className='container mx-auto max-w-7xl'>
          {/* Header Section */}
          <div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <h1 className='text-3xl font-bold md:text-4xl'>My Account</h1>
              <p className='mt-2 text-muted-foreground'>
                Welcome back, {profileData.name || 'user'}! Manage your profile,
                addresses, and orders.
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant='outline'
              className='w-full gap-2 bg-transparent sm:w-auto'
            >
              <LogOut className='h-4 w-4' />
              Logout
            </Button>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue='profile' className='space-y-6'>
            <TabsList className='grid h-auto w-full grid-cols-2 gap-1 overflow-x-auto rounded-lg border border-border bg-muted p-1 sm:grid-cols-5 lg:w-auto'>
              <TabsTrigger
                value='profile'
                className='gap-1 rounded-md px-2 py-2 text-xs transition-colors hover:bg-border/50 data-[state=active]:bg-primary/10 data-[state=active]:text-foreground sm:gap-2 sm:px-3 sm:py-2 sm:text-sm'
              >
                <UserIcon className='h-4 w-4' />
                <span className='hidden sm:inline'>Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value='addresses'
                className='gap-1 rounded-md px-2 py-2 text-xs transition-colors hover:bg-border/50 data-[state=active]:bg-primary/10 data-[state=active]:text-foreground sm:gap-2 sm:px-3 sm:py-2 sm:text-sm'
              >
                <MapPin className='h-4 w-4' />
                <span className='hidden sm:inline'>Addresses</span>
              </TabsTrigger>
              <TabsTrigger
                value='orders'
                className='gap-1 rounded-md px-2 py-2 text-xs transition-colors hover:bg-border/50 data-[state=active]:bg-primary/10 data-[state=active]:text-foreground sm:gap-2 sm:px-3 sm:py-2 sm:text-sm'
              >
                <Package className='h-4 w-4' />
                <span className='hidden sm:inline'>Orders</span>
              </TabsTrigger>
              <TabsTrigger
                value='wishlist'
                className='gap-1 rounded-md px-2 py-2 text-xs transition-colors hover:bg-border/50 data-[state=active]:bg-primary/10 data-[state=active]:text-foreground sm:gap-2 sm:px-3 sm:py-2 sm:text-sm'
              >
                <Heart className='h-4 w-4' />
                <span className='hidden sm:inline'>Wishlist</span>
              </TabsTrigger>
              <TabsTrigger
                value='settings'
                className='gap-1 rounded-md px-2 py-2 text-xs transition-colors hover:bg-border/50 data-[state=active]:bg-primary/10 data-[state=active]:text-foreground sm:gap-2 sm:px-3 sm:py-2 sm:text-sm'
              >
                <Settings className='h-4 w-4' />
                <span className='hidden sm:inline'>Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value='profile'>
              <ProfileSection
                data={profileData}
                onSave={handleProfileSave}
                isLoading={isLoadingProfile}
              />
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value='addresses'>
              <AddressSection
                addresses={addresses}
                onAddAddress={handleAddAddress}
                onEditAddress={handleEditAddress}
                onDeleteAddress={handleDeleteAddress}
                onSetDefault={handleSetDefaultAddress}
              />
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value='orders'>
              <OrdersSection orders={orders} />
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value='wishlist'>
              <WishlistSection wishlist={wishlist} setWishlist={setWishlist} />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value='settings'>
              <div className='rounded-lg border border-border bg-card p-8'>
                <h2 className='mb-6 text-2xl font-bold text-foreground'>
                  Account Settings
                </h2>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50'>
                    <div>
                      <h3 className='font-medium text-foreground'>
                        Email Notifications
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Receive updates about your orders and offers
                      </p>
                    </div>
                    <Button variant='outline' size='sm'>
                      Manage
                    </Button>
                  </div>

                  <div className='flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50'>
                    <div>
                      <h3 className='font-medium text-foreground'>
                        Privacy Settings
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Control your data and privacy preferences
                      </p>
                    </div>
                    <Button variant='outline' size='sm'>
                      Manage
                    </Button>
                  </div>

                  <div className='flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50'>
                    <div>
                      <h3 className='font-medium text-foreground'>
                        Change Password
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Update your account password
                      </p>
                    </div>
                    <Button variant='outline' size='sm'>
                      Change
                    </Button>
                  </div>

                  <div className='flex items-center justify-between rounded-lg border border-destructive/20 p-4 transition-colors hover:bg-destructive/5'>
                    <div>
                      <h3 className='font-medium text-destructive'>
                        Delete Account
                      </h3>
                      <p className='text-sm text-destructive/80'>
                        Permanently delete your account and data
                      </p>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      className='bg-transparent text-destructive hover:text-destructive'
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
