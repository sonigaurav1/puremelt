import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // users: Stores user account details.
  users: defineTable({
    clerkUserId: v.string(), // External user ID from Clerk
    email: v.string(), // User email
    name: v.string(), // User full name
    imageUrl: v.optional(v.string()), // Profile image URL
    createdAt: v.number(), // Timestamp when account was created
    updatedAt: v.number(), // Timestamp of last update
    isDeleted: v.optional(v.boolean()), // Soft delete flag
  }),

  // addresses: User shipping/billing addresses.
  addresses: defineTable({
    userId: v.string(), // Reference to users table
    label: v.string(), // Address label (e.g., Home, Office)
    addressLine1: v.string(), // Primary address line
    addressLine2: v.optional(v.string()), // Secondary address line
    city: v.string(), // City
    state: v.string(), // State/Province
    postalCode: v.string(), // ZIP or postal code
    country: v.string(), // Country
    phone: v.string(), // Contact number
    isDefault: v.boolean(), // Whether this is the default address
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
  }),

  // orders: Order records for purchases.
  orders: defineTable({
    userId: v.string(),
    merchantOrderId: v.optional(v.string()),
    addressId: v.optional(v.string()),
    // Array of cart item objects captured at time of order
    items: v.array(v.object({
      id: v.string(),
      name: v.string(),
      price: v.number(),
      originalPrice: v.number(),
      quantity: v.number(),
      image: v.optional(v.string()),
      weight: v.optional(v.number()),
      size: v.optional(v.string()),
    })),
    payment: v.optional(v.any()),
    paymentId: v.optional(v.string()),
    paymentStatus: v.optional(v.string()),
    pincode: v.optional(v.string()),
    savings: v.optional(v.float64()),
    shipping: v.optional(v.float64()),
    shipmentStatus: v.optional(v.string()),
    status: v.string(),
    subtotal: v.optional(v.float64()), // Add this if you send subtotal
    total: v.float64(),
    totalWeight: v.optional(v.float64()), // Add this if you send totalWeight

    createdAt: v.float64(),
    updatedAt: v.float64(),
    isDeleted: v.optional(v.boolean()),
  }),

  // products: Store product details.
  products: defineTable({
    name: v.string(), // Product name
    description: v.string(), // Product description
    images: v.array(v.string()), // Array of image URLs
    categoryId: v.string(), // Reference to categories table
    price: v.number(), // Base price
    currency: v.optional(v.string()), // Currency code (e.g., USD, INR)
    discount: v.optional(v.number()), // Discount percentage/amount
    stock: v.number(), // Current stock level
    sku: v.string(), // Stock keeping unit
    isActive: v.boolean(), // Whether product is visible to users
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
  }),

  // categories: Organize products.
  categories: defineTable({
    name: v.string(), // Category name
    parentId: v.optional(v.string()), // Reference to parent category (for hierarchy)
    image: v.optional(v.string()), // Category image
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
  }),

  // productVariants: Variations of a product.
  productVariants: defineTable({
    productId: v.string(), // Reference to products table
    label: v.string(), // Variant label (e.g., Size)
    value: v.string(), // Variant value (e.g., XL, Red)
    price: v.optional(v.number()), // Variant-specific price
    stock: v.optional(v.number()), // Variant stock
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
  }),

  // cart: Stores user cart.
  cart: defineTable({
    userId: v.string(), // Reference to users table
    items: v.any(), // Items in the cart
    total: v.number(), // Cart total
    discount: v.optional(v.number()), // Applied discount
    updatedAt: v.number(), // Last updated timestamp
  }),

  // payments: Payment transactions.
  payments: defineTable({
    orderId: v.string(), // Reference to orders table
    userId: v.string(), // Reference to users table
    gateway: v.string(), // Payment gateway (e.g., Stripe, eSewa)
    transactionId: v.string(), // Unique transaction ID
    status: v.string(), // Transaction status
    amount: v.number(), // Paid amount
    currency: v.optional(v.string()), // Currency
    method: v.string(), // Payment method (card, wallet, etc.)
    details: v.optional(v.any()), // Extra details (e.g., raw gateway response)
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
  }),

  // logistics: Shipment/courier info.
  logistics: defineTable({
    orderId: v.string(), // Reference to orders table
    courier: v.string(), // Courier name
    trackingId: v.string(), // Tracking number
    status: v.string(), // Delivery status
    deliveryCharge: v.number(), // Delivery fee
    estimatedDelivery: v.string(), // Estimated delivery date
    details: v.optional(v.any()), // Extra metadata
    updatedAt: v.number(), // Updated timestamp
  }),

  // admin: Admin user details.
  admin: defineTable({
    email: v.string(), // Admin email
    name: v.string(), // Admin name
    role: v.string(), // Role (superadmin, manager, etc.)
    passwordHash: v.string(), // Hashed password
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    createdBy: v.optional(v.string()), // Reference to creator (admin)
    updatedBy: v.optional(v.string()), // Reference to last updater (admin)
    isDeleted: v.optional(v.boolean()), // Soft delete flag
  }),

  // inventory: Stock management data.
  inventory: defineTable({
    productId: v.string(), // Reference to products table
    variantId: v.optional(v.string()), // Reference to productVariants table
    stock: v.number(), // Current stock
    restockAt: v.optional(v.number()), // Next restock date
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
  }),

  // banners: Promotional banners.
  banners: defineTable({
    image: v.string(), // Banner image URL
    link: v.optional(v.string()), // Click redirect link
    title: v.optional(v.string()), // Banner title/text
    isActive: v.boolean(), // Whether banner is active
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
  }),

  // analytics: Store analytics data.
  analytics: defineTable({
    type: v.string(), // Type of analytics (sales, users, traffic)
    data: v.any(), // Analytics payload (flexible schema)
    createdAt: v.number(), // Timestamp of record
  }),

  // notifications: User/system notifications.
  notifications: defineTable({
    userId: v.optional(v.string()), // Reference to users table (optional for system-wide notifications)
    type: v.string(), // Notification type
    message: v.string(), // Notification content
    status: v.string(), // Status (sent, read, pending)
    createdAt: v.number(), // Created timestamp
  }),

  // legal: Store legal docs.
  legal: defineTable({
    type: v.string(), // Document type (PrivacyPolicy, Terms)
    content: v.string(), // Document content
    updatedAt: v.number(), // Updated timestamp
  }),

  // reviews: Product reviews.
  reviews: defineTable({
    productId: v.string(), // Reference to products table
    userId: v.string(), // Reference to users table
    rating: v.number(), // Rating value (1–5)
    comment: v.optional(v.string()), // Review text
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
  }),

  // wishlists: User saved products.
  wishlists: defineTable({
    userId: v.string(), // Reference to users table
    productIds: v.array(v.string()), // Array of product IDs
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
  }),

  // coupons: Discount codes.
  coupons: defineTable({
    code: v.string(), // Coupon code
    discount: v.number(), // Discount amount/percentage
    expiresAt: v.number(), // Expiry timestamp
    isActive: v.boolean(), // Whether coupon is usable
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
  }),
});
