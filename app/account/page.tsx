"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Eye,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../components/auth-context";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";

export default function AccountPage() {
  const { user, orders, wishlist, login, register, logout, updateProfile } =
    useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState(
    user || {
      name: "",
      email: "",
      phone: "",
      address: { street: "", city: "", state: "", pincode: "" },
    }
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData.email, loginData.password);
    if (success) {
      router.push("/account");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const success = await register({
      name: registerData.name,
      email: registerData.email,
    });
    if (success) {
      router.push("/account");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-amber-100 text-amber-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-2xl font-bold text-secondary-color">
                  {process.env.NEXT_PUBLIC_BRAND_NAME}
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-secondary-color hover:text-amber-700 font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/product"
                  className="text-secondary-color hover:text-amber-700 font-medium"
                >
                  Our Product
                </Link>
                <Link
                  href="/about"
                  className="text-secondary-color hover:text-amber-700 font-medium"
                >
                  About Us
                </Link>
                <Link
                  href="/recipes"
                  className="text-secondary-color hover:text-amber-700 font-medium"
                >
                  Recipes
                </Link>
                <Link
                  href="/contact"
                  className="text-secondary-color hover:text-amber-700 font-medium"
                >
                  Contact
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <Link href="/cart">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-200 text-secondary-color hover:bg-amber-50 bg-transparent"
                  >
                    Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Login/Register Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-md">
            <Card className="border-amber-200">
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-secondary-color">
                        Welcome Back
                      </h2>
                      <p className="text-amber-700">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-secondary-color font-medium mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          className="border-amber-200 focus:border-amber-600"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-secondary-color font-medium mb-2">
                          Password
                        </label>
                        <Input
                          type="password"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          className="border-amber-200 focus:border-amber-600"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Sign In
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-secondary-color">
                        Create Account
                      </h2>
                      <p className="text-amber-700">
                        Join the {process.env.NEXT_PUBLIC_BRAND_NAME} family
                      </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label className="block text-secondary-color font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          value={registerData.name}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              name: e.target.value,
                            })
                          }
                          className="border-amber-200 focus:border-amber-600"
                          placeholder="Your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-secondary-color font-medium mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              email: e.target.value,
                            })
                          }
                          className="border-amber-200 focus:border-amber-600"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-secondary-color font-medium mb-2">
                          Password
                        </label>
                        <Input
                          type="password"
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              password: e.target.value,
                            })
                          }
                          className="border-amber-200 focus:border-amber-600"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-secondary-color font-medium mb-2">
                          Confirm Password
                        </label>
                        <Input
                          type="password"
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="border-amber-200 focus:border-amber-600"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Create Account
                      </Button>
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <Header />

      {/* Account Dashboard */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-secondary-color">
                My Account
              </h1>
              <p className="text-amber-700">Welcome back, {user.name}!</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger
                value="profile"
                className="flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="flex items-center space-x-2"
              >
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger
                value="tracking"
                className="flex items-center space-x-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Order</span>
              </TabsTrigger>
              <TabsTrigger
                value="wishlist"
                className="flex items-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="border-amber-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-secondary-color mb-6">
                    Profile Information
                  </h2>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-secondary-color font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              name: e.target.value,
                            })
                          }
                          className="border-amber-200 focus:border-amber-600"
                        />
                      </div>
                      <div>
                        <label className="block text-secondary-color font-medium mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="border-amber-200 focus:border-amber-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-secondary-color font-medium mb-2">
                        Phone
                      </label>
                      <Input
                        value={profileData.phone || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        className="border-amber-200 focus:border-amber-600"
                        placeholder="+91 12345 67890"
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-secondary-color">
                        Address
                      </h3>
                      <div>
                        <label className="block text-secondary-color font-medium mb-2">
                          Street Address
                        </label>
                        <Input
                          value={profileData.address?.street || ""}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              address: {
                                street: e.target.value,
                                city: profileData.address?.city || "",
                                state: profileData.address?.state || "",
                                pincode: profileData.address?.pincode || "",
                              },
                            })
                          }
                          className="border-amber-200 focus:border-amber-600"
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-secondary-color font-medium mb-2">
                            City
                          </label>
                          <Input
                            value={profileData.address?.city || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: {
                                  street: profileData.address?.street || "",
                                  city: e.target.value,
                                  state: profileData.address?.state || "",
                                  pincode: profileData.address?.pincode || "",
                                },
                              })
                            }
                            className="border-amber-200 focus:border-amber-600"
                          />
                        </div>
                        <div>
                          <label className="block text-secondary-color font-medium mb-2">
                            State
                          </label>
                          <Input
                            value={profileData.address?.state || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: {
                                  street: profileData.address?.street || "",
                                  city: profileData.address?.city || "",
                                  state: e.target.value,
                                  pincode: profileData.address?.pincode || "",
                                },
                              })
                            }
                            className="border-amber-200 focus:border-amber-600"
                          />
                        </div>
                        <div>
                          <label className="block text-secondary-color font-medium mb-2">
                            Pincode
                          </label>
                          <Input
                            value={profileData.address?.pincode || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: {
                                  street: profileData.address?.street || "",
                                  city: profileData.address?.city || "",
                                  state: profileData.address?.state || "",
                                  pincode: e.target.value,
                                },
                              })
                            }
                            className="border-amber-200 focus:border-amber-600"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => updateProfile(profileData)}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Update Profile
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="border-amber-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-secondary-color mb-6">
                    Order History
                  </h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border-amber-100">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-secondary-color">
                                Order #{order.id}
                              </h3>
                              <p className="text-amber-700">
                                Placed on {order.date}
                              </p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-amber-700">
                                  {item.name} ({item.size}) x {item.quantity}
                                </span>
                                <span className="text-secondary-color font-medium">
                                  ₹{item.price * item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>

                          <Separator className="my-4" />

                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-secondary-color">
                              Total: ₹{order.total}
                            </span>
                            <div className="space-x-2">
                              {order.trackingId && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-amber-200 bg-transparent"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Track Order
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-amber-200 bg-transparent"
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

            <TabsContent value="tracking">
              <Card className="border-amber-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-secondary-color mb-6">
                    Track Your Order
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-secondary-color font-medium mb-2">
                        Order ID or Tracking Number
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter order ID or tracking number"
                          className="border-amber-200 focus:border-amber-600"
                        />
                        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                          Track
                        </Button>
                      </div>
                    </div>

                    {/* Sample tracking info */}
                    <div className="bg-amber-50 p-6 rounded-lg">
                      <h3 className="font-bold text-secondary-color mb-4">
                        Order #ORD002 - Tracking ID: TRK987654321
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-secondary-color">
                              Order Confirmed
                            </p>
                            <p className="text-sm text-amber-700">
                              Jan 20, 2024 - 10:30 AM
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-secondary-color">
                              Order Shipped
                            </p>
                            <p className="text-sm text-amber-700">
                              Jan 21, 2024 - 2:15 PM
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
                          <div>
                            <p className="font-medium text-secondary-color">
                              Out for Delivery
                            </p>
                            <p className="text-sm text-amber-700">
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

            <TabsContent value="wishlist">
              <Card className="border-amber-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-secondary-color mb-6">
                    My Wishlist
                  </h2>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-secondary-color mb-2">
                        Your wishlist is empty
                      </h3>
                      <p className="text-amber-700 mb-6">
                        Save items you love for later
                      </p>
                      <Link href="/product">
                        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                          Browse Products
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Wishlist items would be rendered here */}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="border-amber-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-secondary-color mb-6">
                    Account Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-amber-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-secondary-color">
                          Email Notifications
                        </h3>
                        <p className="text-sm text-amber-700">
                          Receive updates about your orders and offers
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-200 bg-transparent"
                      >
                        Manage
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-amber-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-secondary-color">
                          Privacy Settings
                        </h3>
                        <p className="text-sm text-amber-700">
                          Control your data and privacy preferences
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-200 bg-transparent"
                      >
                        Manage
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-amber-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-secondary-color">
                          Change Password
                        </h3>
                        <p className="text-sm text-amber-700">
                          Update your account password
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-200 bg-transparent"
                      >
                        Change
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-red-600">
                          Delete Account
                        </h3>
                        <p className="text-sm text-red-500">
                          Permanently delete your account and data
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
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
  );
}
