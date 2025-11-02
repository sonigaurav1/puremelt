import { v } from "convex/values";
import { mutation, query } from './../_generated/server';

/**
 * Create a new user in the database.
 */
export const createUser = mutation({
    args: {
        clerkUserId: v.string(),
        email: v.string(),
        name: v.string(),
        imageUrl: v.optional(v.string()),
    },
    /**
     * @param {import('convex/server').MutationCtx} ctx
     * @param {{ clerkUserId: string, email: string, name: string, imageUrl?: string }} args
     */
    handler: async (ctx, args) => {
        const now = Date.now();
        const userId = await ctx.db.insert("users", {
            clerkUserId: args.clerkUserId,
            email: args.email,
            name: args.name,
            imageUrl: args.imageUrl,
            createdAt: now,
            updatedAt: now,
            isDeleted: false,
        });
        return { userId };
    },
});

/**
 * Update an existing user.
 */
export const updateUser = mutation({
    args: {
        userId: v.id("users"),
        email: v.optional(v.string()),
        name: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
    },
    /**
     * @param {import('convex/server').MutationCtx} ctx
     * @param {{ userId: string, email?: string, name?: string, imageUrl?: string }} args
     */
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user || user.isDeleted) throw new Error("User not found");
        await ctx.db.patch(args.userId, {
            ...(args.email && { email: args.email }),
            ...(args.name && { name: args.name }),
            ...(args.imageUrl && { imageUrl: args.imageUrl }),
            updatedAt: Date.now(),
        });
        return { success: true };
    },
});

/**
 * Soft delete a user.
 */
export const deleteUser = mutation({
    args: { userId: v.id("users") },
    /**
     * @param {import('convex/server').MutationCtx} ctx
     * @param {{ userId: string }} args
     */
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user || user.isDeleted) throw new Error("User not found");
        await ctx.db.patch(args.userId, {
            isDeleted: true,
            updatedAt: Date.now(),
        });
        return { success: true };
    },
});

/**
 * Get a user by ID.
 */
export const getUser = query({
    args: { userId: v.id("users") },
    /**
     * @param {import('convex/server').QueryCtx} ctx
     * @param {{ userId: string }} args
     */
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user || user.isDeleted) return null;
        return user;
    },
});

/**
 * Get a user by Clerk user ID.
 */
export const getUserByClerkId = query({
    args: { clerkUserId: v.string() },
    /**
     * @param {import('convex/server').QueryCtx} ctx
     * @param {{ clerkUserId: string }} args
     */
    handler: async (ctx, args) => {
        const users = await ctx.db.query("users").filter(q => q.eq(q.field("clerkUserId"), args.clerkUserId)).collect();
        const user = users.find(u => !u.isDeleted);
        return user || null;
    },
});

/**
 * List all users (optionally paginated).
 */
export const listUsers = query({
    args: {
        limit: v.optional(v.number()),
        offset: v.optional(v.number()),
    },
    /**
     * @param {import('convex/server').QueryCtx} ctx
     * @param {{ limit?: number, offset?: number }} args
     */
    handler: async (ctx, args) => {
        let q = ctx.db.query("users").filter(q => q.eq(q.field("isDeleted"), false));
        if (args.offset || args.limit) {
            const offset = args.offset ?? 0;
            const limit = args.limit ?? 100;
            const users = await q.take(limit);
            return users.slice(offset, offset + limit);
        }
        return await q.collect();
    },
});
