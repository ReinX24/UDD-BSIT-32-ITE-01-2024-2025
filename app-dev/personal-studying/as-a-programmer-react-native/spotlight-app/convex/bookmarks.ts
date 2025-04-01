import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";
import { createContext } from "react";

export const toggleBookmark = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    // Get existing bookmark by using the userId and postId
    // This is to check if the bookmark already exists and if the user chose
    // to remove their bookmark on the post
    const existing = await ctx.db
      .query("bookmarks")
      .withIndex("by_user_and_post", (q) => {
        return q.eq("userId", currentUser._id).eq("postId", args.postId);
      })
      .first();

    // If the bookmark already exists, remove the bookmark
    // This means that the user unbookmarks the post
    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("bookmarks", {
        userId: currentUser._id,
        postId: args.postId,
      });
      return true;
    }
  },
});

export const getBookmarkedPosts = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    // Get all of the bookmarks of the current user
    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_user", (q) => {
        return q.eq("userId", currentUser._id);
      })
      .collect();

    const bookmarksWithInfo = await Promise.all(
      bookmarks.map(async (bookmark) => {
        const post = await ctx.db.get(bookmark.postId);
        // TODO: continue @1:47
        return post;
      })
    );

    return bookmarksWithInfo;
  },
});
