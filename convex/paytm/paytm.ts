import { mutation } from "../_generated/server";
import { v } from "convex/values";

// Skeleton Convex mutations for Paytm integration.
// These are example server-side functions demonstrating where to
// create a Paytm order and verify callbacks. Replace demo logic
// with real Paytm SDK/API calls and secure credential handling.

export const createPaytmOrder = mutation({
    // Consider making this 'internal' and calling it from a server route
    args: {
        orderId: v.string(),
        amount: v.number(),
        currency: v.optional(v.string()),
        metadata: v.optional(v.any()),
        createdAt: v.number(),
    },
    handler: async (ctx, args) => {
        // Demo: in a real implementation you'd call Paytm's order creation API
        // using your merchant credentials on the server and return the token/order id.
        const demoPaytmOrderId = `PAYTM_DEMO_${args.orderId}_${args.createdAt}`;
        const demoTxnToken = `DEMO_TOKEN_${args.createdAt}`;

        // Optionally store a pending payment record in Convex payments table
        await ctx.db.insert('payments', {
            orderId: args.orderId,
            userId: '', // ctx.auth.getUserIdentity() if available
            gateway: 'paytm',
            transactionId: demoPaytmOrderId,
            status: 'created',
            amount: args.amount,
            currency: args.currency || 'INR',
            method: 'paytm',
            details: {
                demo: true,
                metadata: args.metadata || null,
            },
            createdAt: args.createdAt,
            updatedAt: args.createdAt,
        });

        return {
            paytmOrderId: demoPaytmOrderId,
            txnToken: demoTxnToken,
        };
    },
});

export const verifyPaytmPayment = mutation({
    args: {
        orderId: v.string(),
        transactionId: v.string(),
        payload: v.any(),
        createdAt: v.number(),
    },
    handler: async (ctx, args) => {
        // Demo verification: replace with Paytm signature verification logic
        // Example steps:
        // 1. Verify signature using Paytm SDK or HMAC logic
        // 2. Lookup payment record by transactionId and update status
        // 3. Update orders table status to 'confirmed' or 'failed'

        const isValid = true; // TODO: implement real verification

        if (!isValid) {
            // store failed verification
            await ctx.db.insert('analytics', {
                type: 'paytm_verification_failed',
                data: { orderId: args.orderId, payload: args.payload },
                createdAt: args.createdAt,
            });
            throw new Error('Invalid Paytm signature');
        }

        // Update payment record
        const payments = await ctx.db.query('payments').filter((q) =>
            q.eq(q.field('transactionId'), args.transactionId)
        ).collect();

        if (payments.length > 0) {
            const payment = payments[0];
            await ctx.db.patch(payment._id, {
                status: 'success',
                updatedAt: args.createdAt,
                details: args.payload,
            });
        }

        // Update order status
        const orders = await ctx.db.query('orders').filter((q) =>
            q.eq(q.field('paymentId'), args.transactionId)
        ).collect();

        if (orders.length > 0) {
            const order = orders[0];
            await ctx.db.patch(order._id, {
                status: 'confirmed',
                updatedAt: args.createdAt,
                shipmentStatus: 'pending',
            });
        }

        return { ok: true };
    },
});
