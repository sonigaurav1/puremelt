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
            phonepe_payment_id: v.string(),
            phonepe_order_id: v.optional(v.string()),
            phonepe_signature: v.optional(v.string()),
        }),
        addressId: v.optional(v.string()),
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
            merchantOrderId: args.payment.phonepe_order_id ?? args.payment.phonepe_payment_id,
            items: args.cartItems,
            total: args.total,
            status: "pending",
            ...(args.addressId ? { addressId: args.addressId } : {}),
            paymentId: args.payment.phonepe_payment_id,
            paymentStatus: "paid",
            shipmentStatus: "pending",
            isDeleted: false,
            deletedAt: undefined,
            pincode: args.pincode,
            shipping: args.shipping,
            subtotal: args.subtotal,
            savings: args.savings,
            totalWeight: args.totalWeight,
            payment: args.payment,
            tax: 0, // default, update as needed
            notes: '', // default, update as needed
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

// Admin website

export const getAllOrders = query({
    args: {},
    handler: async (ctx) => {
        const orders = await ctx.db
            .query('orders')
            .filter((q) => q.eq(q.field('isDeleted'), false))
            .collect();
        return orders;
    },
});

// Cursor-based pagination for orders
export const getOrdersPage = query({
    args: {
        // filters (all optional)
        status: v.optional(v.string()),
        paymentStatus: v.optional(v.string()),
        search: v.optional(v.string()), // server-side search applied BEFORE pagination
        dateFrom: v.optional(v.number()), // ms timestamp
        dateTo: v.optional(v.number()),
        minAmount: v.optional(v.number()),
        maxAmount: v.optional(v.number()),
        // Provided by usePaginatedQuery
        paginationOpts: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const numItems: number = args.paginationOpts?.numItems ?? 20;
        let cursor: string | null = args.paginationOpts?.cursor ?? null;

        // If no search string, defer to built-in paginate for efficiency.
        if (!args.search) {
            const page = await ctx.db
                .query("orders")
                .withIndex("by_createdAt")
                .filter((q) => q.eq(q.field("isDeleted"), false))
                .filter((q) => (args.status ? q.eq(q.field("status"), args.status) : true))
                .filter((q) => (args.paymentStatus ? q.eq(q.field("paymentStatus"), args.paymentStatus) : true))
                .filter((q) => (args.dateFrom ? q.gte(q.field("createdAt"), args.dateFrom) : true))
                .filter((q) => (args.dateTo ? q.lte(q.field("createdAt"), args.dateTo) : true))
                .filter((q) => (args.minAmount ? q.gte(q.field("total"), args.minAmount) : true))
                .filter((q) => (args.maxAmount ? q.lte(q.field("total"), args.maxAmount) : true))
                .paginate(args.paginationOpts ?? { cursor: null, numItems });
            return {
                page: page.page,
                isDone: page.isDone,
                continueCursor: page.continueCursor,
            };
        }

        // SERVER-SIDE SEARCH BEFORE PAGINATION
        const searchLower = args.search.toLowerCase();
        const collected: any[] = [];
        let isDone = false;
        while (collected.length < numItems && !isDone) {
            const batch = await ctx.db
                .query("orders")
                .withIndex("by_createdAt")
                .filter((q) => q.eq(q.field("isDeleted"), false))
                .filter((q) => (args.status ? q.eq(q.field("status"), args.status) : true))
                .filter((q) => (args.paymentStatus ? q.eq(q.field("paymentStatus"), args.paymentStatus) : true))
                .filter((q) => (args.dateFrom ? q.gte(q.field("createdAt"), args.dateFrom) : true))
                .filter((q) => (args.dateTo ? q.lte(q.field("createdAt"), args.dateTo) : true))
                .filter((q) => (args.minAmount ? q.gte(q.field("total"), args.minAmount) : true))
                .filter((q) => (args.maxAmount ? q.lte(q.field("total"), args.maxAmount) : true))
                .paginate({ cursor, numItems });

            for (const o of batch.page) {
                const merchant = o.merchantOrderId?.toLowerCase?.() ?? "";
                const custName = (o as any).customerName?.toLowerCase?.() ?? ""; // may be absent / denormalized later
                const custEmail = (o as any).customerEmail?.toLowerCase?.() ?? ""; // may be absent
                if (
                    merchant.includes(searchLower) ||
                    custName.includes(searchLower) ||
                    custEmail.includes(searchLower)
                ) {
                    collected.push(o);
                    if (collected.length >= numItems) break;
                }
            }

            cursor = batch.isDone ? null : batch.continueCursor;
            isDone = batch.isDone && cursor === null;
            if (batch.isDone && cursor === null) break; // exhausted underlying data
        }

        return {
            page: collected,
            isDone,
            continueCursor: cursor,
        };
    },
});

// Paginated orders for a specific userId (used on User Profile page)
export const getOrdersByUserId = query({
    args: {
        userId: v.string(),
        paginationOpts: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const page = await ctx.db
            .query("orders")
            .withIndex("by_userId_createdAt", (q) => q.eq("userId", args.userId))
            .filter((q) => q.eq(q.field("isDeleted"), false))
            .paginate(args.paginationOpts ?? { cursor: null, numItems: 20 });

        return {
            page: page.page,
            isDone: page.isDone,
            continueCursor: page.continueCursor,
        };
    },
});
