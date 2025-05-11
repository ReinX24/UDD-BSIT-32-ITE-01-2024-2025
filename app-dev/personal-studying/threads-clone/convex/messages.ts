import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";
import { internal } from "./_generated/api";

export const addThreadMessage = mutation({
  args: {
    content: v.string(),
    mediaFiles: v.optional(v.array(v.string())),
    websiteUrl: v.optional(v.string()),
    threadId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const message = await ctx.db.insert("messages", {
      ...args,
      userId: user._id,
      likeCount: 0,
      commentCount: 0,
      retweetCount: 0,
    });

    // If the new thread or messages is a reply to an existing one
    if (args.threadId) {
      const originalThread = await ctx.db.get(args.threadId);
      await ctx.db.patch(args.threadId, {
        commentCount: (originalThread?.commentCount || 0) + 1,
      });

      // If the user comments on a thread, send a push notification
      if (originalThread?.userId !== user._id) {
        const user = await ctx.db.get(originalThread?.userId as Id<"users">);
        const pushToken = user?.pushToken;

        if (!pushToken) {
          return;
        }

        await ctx.scheduler.runAfter(5000, internal.push.sendPushNotification, {
          pushToken: pushToken,
          threadId: args.threadId,
          messageTitle: "New comment",
          messageBody: args.content,
        });
      }
    }

    return message;
  },
});

export const getThreadComments = query({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const comments = await ctx.db
      .query("messages")
      .filter((q) => {
        return q.eq(q.field("threadId"), args.messageId);
      })
      .order("desc")
      .collect();

    const messagesWithCreator = await Promise.all(
      comments.map(async (comment) => {
        const creator = await getMessageCreator(ctx, comment.userId);
        const mediaUrls = await getMediaUrls(ctx, comment.mediaFiles);

        const like = await ctx.db
          .query("likes")
          .withIndex("byUserAndThread", (q) => {
            return q.eq("userId", user._id).eq("threadId", comment._id);
          })
          .first();

        return {
          ...comment,
          creator,
          mediaFiles: mediaUrls,
          isLiked: !!like,
        };
      })
    );

    return messagesWithCreator;
  },
});

export const getThreads = query({
  args: {
    paginationOpts: paginationOptsValidator,
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    let threads;

    const user = await getCurrentUserOrThrow(ctx);

    // For viewing threads created by a specific user
    if (args.userId) {
      threads = await ctx.db
        .query("messages")
        .filter((q) => {
          return q.eq(q.field("userId"), args.userId);
        })
        .order("desc")
        .paginate(args.paginationOpts);
    } else {
      // Gets all the threads if no userId is provided
      threads = await ctx.db
        .query("messages")
        .filter((q) => {
          // Just gets parent threads, no replies to threads
          return q.eq(q.field("threadId"), undefined);
        })
        .order("desc")
        .paginate(args.paginationOpts);
    }

    // Getting the threads with their creator information
    const messagesWithCreator = await Promise.all(
      threads.page.map(async (thread) => {
        const creator = await getMessageCreator(ctx, thread.userId);
        const mediaUrls = await getMediaUrls(ctx, thread.mediaFiles);

        const like = await ctx.db
          .query("likes")
          .withIndex("byUserAndThread", (q) => {
            return q.eq("userId", user._id).eq("threadId", thread._id);
          })
          .first();

        return {
          ...thread,
          creator,
          mediaFiles: mediaUrls,
          isLiked: !!like,
        };
      })
    );

    // messagesWithCreator overrides the return info as it is paginated
    return {
      ...threads,
      page: messagesWithCreator,
    };
  },
});

export const likeThread = mutation({
  args: {
    threadId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const existing = await ctx.db
      .query("likes")
      .withIndex("byUserAndThread", (q) => {
        return q.eq("userId", user._id).eq("threadId", args.threadId);
      })
      .first();

    const message = await ctx.db.get(args.threadId);

    if (!message) {
      throw new Error("Thread not found.");
    }

    // If the like already exists, delete the like in the database
    if (existing) {
      await ctx.db.delete(existing._id);
      await ctx.db.patch(args.threadId, {
        likeCount: (message?.likeCount || 0) - 1,
      });
      return false;
    } else {
      await ctx.db.insert("likes", {
        userId: user._id,
        threadId: args.threadId,
      });
      await ctx.db.patch(args.threadId, {
        likeCount: (message?.likeCount || 0) + 1,
      });
    }

    return true;
  },
});

export const getThreadById = query({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const thread = await ctx.db.get(args.messageId);

    if (!thread) {
      return null;
    }

    const creator = await getMessageCreator(ctx, thread.userId);
    const mediaUrls = await getMediaUrls(ctx, thread.mediaFiles);

    const like = await ctx.db
      .query("likes")
      .withIndex("byUserAndThread", (q) => {
        return q.eq("userId", user._id).eq("threadId", thread._id);
      })
      .first();

    return {
      ...thread,
      creator,
      mediaFiles: mediaUrls,
      isLiked: !!like,
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

const getMediaUrls = async (
  ctx: QueryCtx,
  mediaFiles: string[] | undefined
) => {
  if (!mediaFiles || mediaFiles.length === 0) {
    return [];
  }

  return await Promise.all(
    mediaFiles.map(async (file) => {
      let url: string | null = file;
      if (!file.startsWith("http")) {
        url = await ctx.storage.getUrl(file as Id<"_storage">);
      }
      return url;
    })
  );
};

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    // Checking if the current user is authenticated or logged in
    await getCurrentUserOrThrow(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});
