import { v } from "convex/values";
import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { use } from "react";

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.union(v.string(), v.null()),
    bio: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    followersCount: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      ...args,
      username: args.username || `${args.first_name}${args.last_name}`,
    });

    return userId;
  },
});

export const getUserByClerkId = query({
  args: {
    clerkId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => {
        return q.eq(q.field("clerkId"), args.clerkId);
      })
      .unique();

    return getUserWithImageUrl(ctx, user);
  },
});

export const getUserById = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // return await ctx.db
    //   .query("users")
    //   .filter((q) => {
    //     return q.eq(q.field("_id"), args.userId);
    //   })
    //   .unique();
    const user = await ctx.db.get(args.userId);
    return getUserWithImageUrl(ctx, user);
  },
});

export const updateUser = mutation({
  args: {
    _id: v.id("users"),
    bio: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    imageUrl: v.optional(v.id("_storage")),
    pushToken: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Checking if the current user is authenticated or logged in
    await getCurrentUserOrThrow(ctx);

    // If a new image is chosen, delete the old imageUrl
    if (args.imageUrl) {
      // Get the user by their id
      const user = await ctx.db
        .query("users")
        .filter((q) => {
          return q.eq(q.field("_id"), args._id);
        })
        .unique();

      // Delete the existing imageUrl of the user
      await ctx.storage.delete(user?.imageUrl as Id<"_storage">);
    }

    return await ctx.db.patch(args._id, args);
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    // Checking if the current user is authenticated or logged in
    await getCurrentUserOrThrow(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const searchUsers = query({
  args: {
    searchQuery: v.string(),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withSearchIndex("searchUsers", (q) => {
        return q.search("username", args.searchQuery);
      })
      .collect();

    const usersWithImage = await Promise.all(
      users.map(async (user) => {
        return getUserWithImageUrl(ctx, user);
      })
    );

    return usersWithImage;
  },
});

// REUSABLE FUNCTIONS
const getUserWithImageUrl = async (
  ctx: QueryCtx,
  user: Doc<"users"> | null
) => {
  // If the user does not have an uploaded photo in convex
  if (!user?.imageUrl || user.imageUrl.startsWith("http")) {
    return user;
  }

  // If the user has an uploaded photo
  const imageUrl = await ctx.storage.getUrl(user.imageUrl as Id<"_storage">);

  return { ...user, imageUrl };
};

// IDENTITY CHECK
export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkId", (q) => q.eq("clerkId", externalId))
    .unique();
}
