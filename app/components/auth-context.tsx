"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    pincode: string
  }
}

interface Order {
  id: string
  date: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  items: Array<{
    name: string
    size: string
    quantity: number
    price: number
  }>
  total: number
  trackingId?: string
}

interface AuthContextType {
  user: User | null
  orders: Order[]
  wishlist: string[]
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "id">) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  addOrder: (order: Omit<Order, "id" | "date">) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful login
    setUser({
      id: "1",
      name: "John Doe",
      email: email,
      phone: "+91 98765 43210",
      address: {
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
      },
    })

    // Mock orders
    setOrders([
      {
        id: "ORD001",
        date: "2024-01-15",
        status: "delivered",
        items: [{ name: "PureMelt Premium Nut Butter", size: "500g", quantity: 2, price: 599 }],
        total: 1198,
        trackingId: "TRK123456789",
      },
      {
        id: "ORD002",
        date: "2024-01-20",
        status: "shipped",
        items: [{ name: "PureMelt Premium Nut Butter", size: "1kg", quantity: 1, price: 1099 }],
        total: 1099,
        trackingId: "TRK987654321",
      },
    ])

    return true
  }

  const register = async (userData: Omit<User, "id">): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUser({
      id: Date.now().toString(),
      ...userData,
    })
    return true
  }

  const logout = () => {
    setUser(null)
    setOrders([])
    setWishlist([])
  }

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const addToWishlist = (productId: string) => {
    setWishlist((prev) => [...prev, productId])
  }

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
  }

  const addOrder = (order: Omit<Order, "id" | "date">) => {
    const newOrder: Order = {
      ...order,
      id: `ORD${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    }
    setOrders((prev) => [newOrder, ...prev])
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        wishlist,
        login,
        register,
        logout,
        updateProfile,
        addToWishlist,
        removeFromWishlist,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
