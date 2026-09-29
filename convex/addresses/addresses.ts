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
            deletedAt: undefined,
        };

        // If setting as default, unset others for this user
        if (addressDoc.isDefault) {
            const existing = await ctx.db
                .query('addresses')
                .filter((q) => q.eq(q.field('userId'), userId))
                .collect();
            await Promise.all(
                existing
                    .filter((a) => !a.isDeleted)
                    .map((a) => ctx.db.patch(a._id, { isDefault: false }))
            );
        }

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
            .filter((q) => q.and(
                q.eq(q.field('userId'), userId),
                q.or(q.eq(q.field('isDeleted'), false), q.eq(q.field('isDeleted'), undefined))
            ))
            .collect();
        return addresses;
    },
});

// Update an address by id
export const updateAddress = mutation({
    args: {
        addressId: v.id('addresses'),
        label: v.optional(v.string()),
        addressLine1: v.optional(v.string()),
        addressLine2: v.optional(v.string()),
        city: v.optional(v.string()),
        state: v.optional(v.string()),
        postalCode: v.optional(v.string()),
        country: v.optional(v.string()),
        phone: v.optional(v.string()),
        isDefault: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) throw new Error('Not authenticated');
        const userId = identify.subject;

        const existing = await ctx.db.get(args.addressId);
        if (!existing || existing.userId !== userId || existing.isDeleted) {
            throw new Error('Address not found');
        }

        // If toggling default on, unset others
        if (args.isDefault) {
            const all = await ctx.db
                .query('addresses')
                .filter((q) => q.eq(q.field('userId'), userId))
                .collect();
            await Promise.all(
                all
                    .filter((a) => !a.isDeleted && a._id !== args.addressId)
                    .map((a) => ctx.db.patch(a._id, { isDefault: false }))
            );
        }

        await ctx.db.patch(args.addressId, {
            ...(args.label !== undefined && { label: args.label }),
            ...(args.addressLine1 !== undefined && { addressLine1: args.addressLine1 }),
            ...(args.addressLine2 !== undefined && { addressLine2: args.addressLine2 }),
            ...(args.city !== undefined && { city: args.city }),
            ...(args.state !== undefined && { state: args.state }),
            ...(args.postalCode !== undefined && { postalCode: args.postalCode }),
            ...(args.country !== undefined && { country: args.country }),
            ...(args.phone !== undefined && { phone: args.phone }),
            ...(args.isDefault !== undefined && { isDefault: args.isDefault }),
            updatedAt: Date.now(),
        });

        return { success: true };
    },
});

// Soft delete an address
export const deleteAddress = mutation({
    args: { addressId: v.id('addresses') },
    handler: async (ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) throw new Error('Not authenticated');
        const userId = identify.subject;

        const existing = await ctx.db.get(args.addressId);
        if (!existing || existing.userId !== userId || existing.isDeleted) {
            throw new Error('Address not found');
        }

        await ctx.db.patch(args.addressId, { isDeleted: true, deletedAt: Date.now(), updatedAt: Date.now() });
        return { success: true };
    },
});

// Set an address as default for the user
export const setDefaultAddress = mutation({
    args: { addressId: v.id('addresses') },
    handler: async (ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if (!identify) throw new Error('Not authenticated');
        const userId = identify.subject;

        const target = await ctx.db.get(args.addressId);
        if (!target || target.userId !== userId || target.isDeleted) {
            throw new Error('Address not found');
        }

        const all = await ctx.db
            .query('addresses')
            .filter((q) => q.eq(q.field('userId'), userId))
            .collect();
        await Promise.all(
            all
                .filter((a) => !a.isDeleted)
                .map((a) => ctx.db.patch(a._id, { isDefault: a._id === args.addressId }))
        );
        return { success: true };
    },
});

export const getAllAddresses = query({
    args: {},
    handler: async (ctx) => {
        const addresses = await ctx.db
            .query('addresses')
            .filter((q) => q.eq(q.field('isDeleted'), false))
            .collect();
        return addresses;
    },
});
