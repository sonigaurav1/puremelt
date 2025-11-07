import { mutation } from "../_generated/server";
import { query } from "../_generated/server";
import { v } from "convex/values";

// Create a new address for the authenticated user
export const createAddress = mutation({
    args: {
        label: v.string(),
        addressLine1: v.string(),
        addressLine2: v.optional(v.string()),
        city: v.string(),
        state: v.string(),
        postalCode: v.string(),
        country: v.string(),
        phone: v.string(),
        isDefault: v.optional(v.boolean()),
        createdAt: v.number(),
    },
    handler: async (ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) throw new Error('Not authenticated');
        const userId = identify.subject;
        const now = Date.now();

        const addressDoc = {
            userId,
            label: args.label,
            addressLine1: args.addressLine1,
            addressLine2: args.addressLine2 ?? undefined,
            city: args.city,
            state: args.state,
            postalCode: args.postalCode,
            country: args.country,
            phone: args.phone,
            isDefault: args.isDefault ?? false,
            createdAt: args.createdAt,
            updatedAt: now,
            isDeleted: false,
        };

        const addressId = await ctx.db.insert('addresses', addressDoc);
        return addressId;
    },
});

// Get addresses for the authenticated user
export const getAddressesForUser = query({
    args: {},
    handler: async (ctx) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) return [];
        const userId = identify.subject;
        const addresses = await ctx.db
            .query('addresses')
            .filter((q) => q.eq(q.field('userId'), userId))
            .collect();
        return addresses;
    },
});
