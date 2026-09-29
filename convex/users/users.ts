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
        phone: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        role: v.optional(v.string()),
        status: v.optional(v.string()),
        provider: v.optional(v.string()),
        emailVerified: v.optional(v.boolean()),
        createdBy: v.optional(v.string()),
        updatedBy: v.optional(v.string()),
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
            phone: args.phone ?? '',
            imageUrl: args.imageUrl,
            role: args.role ?? 'customer',
            status: args.status ?? 'active',
            provider: args.provider,
            emailVerified: args.emailVerified ?? false,
            createdBy: args.createdBy,
            updatedBy: args.updatedBy,
            createdAt: now,
            updatedAt: now,
            isDeleted: false,
            deletedAt: undefined,
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
        phone: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        role: v.optional(v.string()),
        status: v.optional(v.string()),
        provider: v.optional(v.string()),
        emailVerified: v.optional(v.boolean()),
        updatedBy: v.optional(v.string()),
    },
    /**
     * @param {import('convex/server').MutationCtx} ctx
     * @param {{ userId: string, email?: string, name?: string, imageUrl?: string }} args
     */
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user || user.isDeleted) throw new Error("User not found");
        await ctx.db.patch(args.userId, {
            ...(args.email !== undefined && { email: args.email }),
            ...(args.name !== undefined && { name: args.name }),
            ...(args.phone !== undefined && { phone: args.phone }),
            ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
            ...(args.role !== undefined && { role: args.role }),
            ...(args.status !== undefined && { status: args.status }),
            ...(args.provider !== undefined && { provider: args.provider }),
            ...(args.emailVerified !== undefined && { emailVerified: args.emailVerified }),
            ...(args.updatedBy !== undefined && { updatedBy: args.updatedBy }),
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
            deletedAt: Date.now(),
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

// Upsert user by clerk id (create if not exists, update name/email/image if changed)
export const upsertUserByClerkId = mutation({
    args: {
        clerkUserId: v.string(),
        email: v.string(),
        name: v.string(),
        phone: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        role: v.optional(v.string()),
        status: v.optional(v.string()),
        provider: v.optional(v.string()),
        emailVerified: v.optional(v.boolean()),
        createdBy: v.optional(v.string()),
        updatedBy: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query('users')
            .filter(q => q.eq(q.field('clerkUserId'), args.clerkUserId))
            .collect();
        const user = existing.find(u => !u.isDeleted);
        const now = Date.now();
        if (!user) {
            const id = await ctx.db.insert('users', {
                clerkUserId: args.clerkUserId,
                email: args.email,
                name: args.name,
                phone: args.phone ?? '',
                imageUrl: args.imageUrl,
                role: args.role ?? 'customer',
                status: args.status ?? 'active',
                provider: args.provider,
                emailVerified: args.emailVerified ?? false,
                createdBy: args.createdBy,
                updatedBy: args.updatedBy,
                createdAt: now,
                updatedAt: now,
                isDeleted: false,
                deletedAt: undefined,
            });
            return { created: true, userId: id };
        }
        await ctx.db.patch(user._id, {
            email: args.email,
            name: args.name,
            ...(args.phone !== undefined && { phone: args.phone }),
            ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
            ...(args.role !== undefined && { role: args.role }),
            ...(args.status !== undefined && { status: args.status }),
            ...(args.provider !== undefined && { provider: args.provider }),
            ...(args.emailVerified !== undefined && { emailVerified: args.emailVerified }),
            ...(args.updatedBy !== undefined && { updatedBy: args.updatedBy }),
            updatedAt: now,
        });
        return { created: false, userId: user._id };
    }
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
        const q = ctx.db.query("users").filter(q => q.eq(q.field("isDeleted"), false));
        if (args.offset || args.limit) {
            const offset = args.offset ?? 0;
            const limit = args.limit ?? 100;
            const users = await q.take(limit);
            return users.slice(offset, offset + limit);
        }
        return await q.collect();
    },
});

export const getAllUsers = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("isDeleted"), false))
            .collect();
        return users;
    },
});