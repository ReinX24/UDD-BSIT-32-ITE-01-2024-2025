import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const addThreadMessage = mutation({
  args: {
    content: v.string(),
    mediaFiles: v.optional(v.array(v.string())),
    websiteUrl: v.optional(v.string()),
    threadId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db.insert("messages", {
      ...args,
      userId: user._id,
      likeCount: 0,
      commentCount: 0,
      retweetCount: 0,
    });

    // TODO: Do this later
    if (args.threadId) {
    }
  },
});

export const getThreads = query({
  args: {
    paginationOptions: paginationOptsValidator,
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    let threads;

    // For viewing threads created by a specific user
    if (args.userId) {
      threads = await ctx.db
        .query("messages")
        .filter((q) => {
          return q.eq(q.field("userId"), args.userId);
        })
        .order("desc")
        .paginate(args.paginationOptions);
    } else {
      threads = await ctx.db
        .query("messages")
        .filter((q) => {
          // Just gets parent threads, no replies to threads
          return q.eq(q.field("threadId"), undefined);
        })
        .order("desc")
        .paginate(args.paginationOptions);
    }

    const messagesWithCreator = await Promise.all(
      threads.page.map(async (thread) => {
        const creator = await getMessageCreator(ctx, thread.userId);

        return {
          ...thread,
          creator,
        };
      })
    );

    return {
      ...threads,
      page: messagesWithCreator,
    };
  },
});

const getMessageCreator = async (ctx: QueryCtx, userId: Id<"users">) => {
  const user = await ctx.db.get(userId);

  // If the user does not have a set profile picture (has google or facebook account photo)
  if (!user?.imageUrl || user.imageUrl.startsWith("http")) {
    return user;
  }

  // If the image is set and in storage by convex
  const imageUrl = await ctx.storage.getUrl(user.imageUrl as Id<"_storage">);

  return {
    ...user,
    imageUrl,
  };
};

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    // Checking if the current user is authenticated or logged in
    await getCurrentUserOrThrow(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});
