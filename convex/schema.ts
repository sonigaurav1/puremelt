import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // users: Stores user account details.
  users: defineTable({
    clerkUserId: v.string(), // External user ID from Clerk
    email: v.string(), // User email
    name: v.string(), // User full name
    phone: v.optional(v.string()), // User phone number
    imageUrl: v.optional(v.string()), // Profile image URL
    role: v.string(), // User role (e.g., customer, admin)
    status: v.string(), // Account status (active, suspended, etc.)
    provider: v.optional(v.string()), // Auth provider (optional)
    emailVerified: v.optional(v.boolean()), // Email verified (optional)
    createdBy: v.optional(v.string()), // Reference to creator (admin)
    updatedBy: v.optional(v.string()), // Reference to last updater (admin)
    createdAt: v.number(), // Timestamp when account was created
    updatedAt: v.number(), // Timestamp of last update
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()), // Hard delete timestamp (optional)
  })
    .index("by_clerkUserId", ["clerkUserId"])
    .index("by_email", ["email"])
    .index("by_isDeleted", ["isDeleted"]),

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
    deletedAt: v.optional(v.number()), // Hard delete timestamp (optional)
  }).index("by_userId", ["userId"]),

  // orders: Order records for purchases.
  orders: defineTable({
    userId: v.string(),
    merchantOrderId: v.optional(v.string()),
    addressId: v.optional(v.string()),
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
    status: v.string(), // Use enum in app logic for strictness
    subtotal: v.optional(v.float64()),
    total: v.float64(),
    totalWeight: v.optional(v.float64()),
    tax: v.optional(v.float64()), // Tax per order
    notes: v.optional(v.string()), // Customer/admin notes
    createdAt: v.float64(),
    updatedAt: v.float64(),
    isDeleted: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_userId_createdAt", ["userId", "createdAt"])
    .index("by_merchantOrderId", ["merchantOrderId"]),

  // products: Store product details.
  products: defineTable({
    name: v.string(), // Product name
    slug: v.string(), // SEO-friendly URL
    description: v.string(), // Product description
    images: v.array(v.string()), // Array of image URLs
    categoryId: v.string(), // Reference to categories table
    price: v.number(), // Base price
    currency: v.optional(v.string()), // Currency code (e.g., USD, INR)
    discount: v.optional(v.number()), // Discount percentage/amount
    stock: v.number(), // Current stock level
    sku: v.string(), // Stock keeping unit
    tags: v.optional(v.array(v.string())), // Product tags
    attributes: v.optional(v.any()), // Arbitrary attributes
    isActive: v.boolean(), // Whether product is visible to users
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
  }),

  // categories: Organize products.
  categories: defineTable({
    name: v.string(), // Category name
    slug: v.string(), // SEO-friendly URL
    parentId: v.optional(v.string()), // Reference to parent category (for hierarchy)
    image: v.optional(v.string()), // Category image
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
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
    deletedAt: v.optional(v.number()),
  }),

  // cart: Stores user cart.
  cart: defineTable({
    userId: v.string(), // Reference to users table
    items: v.any(), // Items in the cart
    total: v.number(), // Cart total
    discount: v.optional(v.number()), // Applied discount
    updatedAt: v.number(), // Last updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
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
    refunded: v.optional(v.boolean()), // Payment refunded
    refundAmount: v.optional(v.number()), // Amount refunded
    error: v.optional(v.string()), // Payment error message
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
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
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
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
    deletedAt: v.optional(v.number()),
  }),

  // inventory: Stock management data.
  inventory: defineTable({
    productId: v.string(), // Reference to products table
    variantId: v.optional(v.string()), // Reference to productVariants table
    stock: v.number(), // Current stock
    restockAt: v.optional(v.number()), // Next restock date
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
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
    deletedAt: v.optional(v.number()),
  }),

  // analytics: Store analytics data.
  analytics: defineTable({
    type: v.string(), // Type of analytics (sales, users, traffic)
    data: v.any(), // Analytics payload (flexible schema)
    userId: v.optional(v.string()), // Per-user analytics
    createdAt: v.number(), // Timestamp of record
  }),

  // notifications: User/system notifications.
  notifications: defineTable({
    userId: v.optional(v.string()), // Reference to users table (optional for system-wide notifications)
    type: v.string(), // Notification type
    message: v.string(), // Notification content
    status: v.string(), // Status (sent, read, pending)
    createdAt: v.number(), // Created timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
  }),

  // legal: Store legal docs.
  legal: defineTable({
    type: v.string(), // Document type (PrivacyPolicy, Terms)
    content: v.string(), // Document content
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
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
    deletedAt: v.optional(v.number()),
  }),

  // wishlists: User saved products.
  wishlists: defineTable({
    userId: v.string(), // Reference to users table
    productIds: v.array(v.string()), // Array of product IDs
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
  }),

  // coupons: Discount codes.
  coupons: defineTable({
    code: v.string(), // Coupon code
    discount: v.number(), // Discount amount/percentage
    expiresAt: v.number(), // Expiry timestamp
    isActive: v.boolean(), // Whether coupon is usable
    createdAt: v.number(), // Created timestamp
    updatedAt: v.number(), // Updated timestamp
    isDeleted: v.optional(v.boolean()), // Soft delete flag
    deletedAt: v.optional(v.number()),
  }),
});
