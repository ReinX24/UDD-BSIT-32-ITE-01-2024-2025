import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

// Create a new user
export const createUser = mutation({
  args: {
    username: v.string(),
    fullname: v.string(),
    image: v.string(),
    bio: v.optional(v.string()),
    email: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    // Checking if the user exists already
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => {
        return q.eq("clerkId", args.clerkId);
      })
      .first();

    // If the user already exists, terminate script by returning nothing
    if (existingUser) {
      return;
    }

    // Create a user in our database
    await ctx.db.insert("users", {
      username: args.username,
      fullname: args.fullname,
      email: args.email,
      bio: args.bio,
      image: args.image,
      followers: 0,
      following: 0,
      posts: 0,
      clerkId: args.clerkId,
    });
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => {
        return q.eq("clerkId", args.clerkId);
      })
      .unique();

    return user;
  },
});

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new Error("Unauthorized");
  }

  const currentUser = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => {
      return q.eq("clerkId", identity.subject);
    })
    .first();

  if (!currentUser) {
    throw new Error("User not found");
  }

  return currentUser;
}
