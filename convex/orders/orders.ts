import { mutation } from "../_generated/server";
import { query } from "../_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    cartItems: v.array(v.object({
      id: v.string(),
      name: v.string(),
      price: v.number(),
      originalPrice: v.number(),
      quantity: v.number(),
      image: v.optional(v.string()),
      weight: v.optional(v.number()),
      size: v.optional(v.string()),
    })),
    total: v.number(),
    shipping: v.number(),
    subtotal: v.number(),
    savings: v.number(),
    pincode: v.optional(v.string()),
    totalWeight: v.number(),
    payment: v.object({
      razorpay_payment_id: v.string(),
      razorpay_order_id: v.optional(v.string()),
      razorpay_signature: v.optional(v.string()),
    }),
    user: v.optional(v.any()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const identify = await ctx.auth.getUserIdentity();
    if (!identify) {
      throw new Error('Not authenticated');
    }
    const userId = identify.subject;

    // Map incoming data to required schema
    const orderDoc = {
      createdAt: args.createdAt,
      updatedAt: args.createdAt,
      userId,
      items: args.cartItems,
      total: args.total,
      status: "pending", // or set as needed
      addressId: "", // set from user/address if available
      paymentId: args.payment.razorpay_payment_id,
      paymentStatus: "paid",
      shipmentStatus: "pending",
      isDeleted: false,
      // Add other fields as needed
      pincode: args.pincode,
      shipping: args.shipping,
      subtotal: args.subtotal,
      savings: args.savings,
      totalWeight: args.totalWeight,
      payment: args.payment,
    };

    const orderId = await ctx.db.insert("orders", orderDoc);
    return orderId;
  },
});

export const getOrderByClerkId = query({
  args: {},
  handler: async (ctx) => {
    const identify = await ctx.auth.getUserIdentity();
    if (!identify) {
      throw new Error('Not authenticated');
    }
    const userId = identify.subject;
    const orders = await ctx.db
      .query("orders")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();
    return orders;
  },
});