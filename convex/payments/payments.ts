import { v } from "convex/values";
import { mutation } from './../_generated/server';

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
