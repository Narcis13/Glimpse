import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Simple token-based authentication
// In production, use a proper auth provider like Clerk, Auth0, etc.

// Create a session
export const createSession = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Generate a simple token (in production, use a secure token generator)
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    // Session expires in 30 days
    const expiresAt = Date.now() + (30 * 24 * 60 * 60 * 1000);

    const sessionId = await ctx.db.insert("sessions", {
      userId: args.userId,
      token,
      expiresAt,
      createdAt: Date.now(),
    });

    return { sessionId, token, expiresAt };
  },
});

// Validate session
export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) {
      return { valid: false, user: null };
    }

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      return { valid: false, user: null };
    }

    // Get user data
    const user = await ctx.db.get(session.userId);

    return { valid: true, user };
  },
});

// Delete session (logout)
export const deleteSession = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

// Clean up expired sessions
export const cleanupExpiredSessions = mutation({
  args: {},
  handler: async (ctx) => {
    const expiredSessions = await ctx.db
      .query("sessions")
      .filter((q) => q.lt(q.field("expiresAt"), Date.now()))
      .collect();

    for (const session of expiredSessions) {
      await ctx.db.delete(session._id);
    }

    return { deleted: expiredSessions.length };
  },
});