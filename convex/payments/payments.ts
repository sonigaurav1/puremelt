import { v } from "convex/values";
import { mutation } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";

export const createPayment = mutation({
    args: {
        orderId: v.optional(v.string()),
        userId: v.optional(v.string()),
        gateway: v.string(),
        transactionId: v.string(),
        status: v.string(),
        amount: v.number(),
        currency: v.optional(v.string()),
        method: v.string(),
        details: v.optional(v.any()),
        createdAt: v.number(),
        updatedAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) {
            throw new Error('Not authenticated');
        }
        const userId = identify.subject;

        const now = Date.now();
        const payment = {
            ...args,
            userId,
            orderId: args.orderId ?? "",
            updatedAt: now,
        };

        await ctx.db.insert("payments", payment);
        return payment;
    },
});

export const updatePaymentStatusByTransactionId = mutation({
    args: {
        transactionId: v.string(),
        status: v.string(),
        details: v.optional(v.any()),
        updatedAt: v.optional(v.number()),
    },
    // Allow service role or authenticated user; do not enforce user identity here
    handler: async (ctx, args) => {
        const now = Date.now();
        const payments = await ctx.db
            .query("payments")
            .filter((q) => q.eq(q.field("transactionId"), args.transactionId))
            .collect();

        if (!payments || payments.length === 0) {
            return { updated: 0 };
        }

        const doc = payments[0] as Doc<"payments">;
        await ctx.db.patch(doc._id, {
            status: args.status,
            details: args.details ?? doc.details,
            updatedAt: args.updatedAt ?? now,
        });
        return { updated: 1 };
    },
});
