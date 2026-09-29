/**
 * Server-side auth helpers for Convex functions.
 *
 * Security note: Never trust frontend role checks. Always validate roles
 * server-side using ctx.auth.getUserIdentity() (or your auth provider's
 * server-side identity method). Frontend checks are only UX; they are not
 * authoritative.
 */
import { MutationCtx, QueryCtx } from "../_generated/server";

export async function requireAdmin(ctx: MutationCtx | QueryCtx) {
    // ctx.auth.getUserIdentity is a Convex server-side helper that queries
    // the identity (populated by the auth provider, e.g., Clerk). Use it to
    // verify server-side that the caller is an admin.
    const user = await ctx.auth.getUserIdentity();

    // Depending on your auth provider wiring, `user` may contain a top-level
    // `role` property or a `publicMetadata` object with a `role` field.
    // The most secure approach is to map/normalize trusted attributes
    // server-side when issuing tokens. Here we accept either shape but
    // require the resolved role to be `admin`.
    const role = (user as any)?.role ?? (user as any)?.publicMetadata?.role;

    if (!user || role !== "admin") {
        throw new Error("Unauthorized");
    }

    return user;
}

export async function getServerUser(ctx: MutationCtx | QueryCtx) {
    return ctx.auth.getUserIdentity();
}
