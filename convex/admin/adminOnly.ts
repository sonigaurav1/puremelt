import { mutation } from "../_generated/server";
import { requireAdmin } from "../utils/auth";

/**
 * Example admin-only mutation.
 *
 * This demonstrates how to protect sensitive Convex mutations by verifying
 * the caller's role on the server using `ctx.auth.getUserIdentity()` via
 * the shared `requireAdmin` helper. Replace with real admin operations.
 */
export const adminPing = mutation({
    args: {},
    handler: async (ctx) => {
        // Throws if the caller is not a server-verified admin.
        const user = await requireAdmin(ctx);

        // Safe to proceed with admin work here.
        return {
            ok: true,
            adminId: (user as any).sub ?? (user as any).id ?? null
        };
    },
});