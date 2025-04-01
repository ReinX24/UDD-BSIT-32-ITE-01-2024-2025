import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const addComment = mutation({
  args: {
    content: v.string(),
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const post = await ctx.db.get(args.postId);

    if (!post) {
      throw new ConvexError("Post not found");
    }

    const commentId = await ctx.db.insert("comments", {
      userId: currentUser._id,
      postId: args.postId,
      content: args.content,
    });

    // Increment the comment count of the post by 1
    await ctx.db.patch(args.postId, { comments: post.comments + 1 });

    // Create a notification if it is not the current user's post
    if (post.userId !== currentUser._id) {
      await ctx.db.insert("notifications", {
        receiverId: post.userId,
        senderId: currentUser._id,
        type: "comment",
        postId: args.postId,
        commentId: commentId,
      });
    }

    return commentId;
  },
});

export const getComments = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => {
        return q.eq("postId", args.postId);
      })
      .order("desc")
      .collect();

    const commentsWithInfo = await Promise.all(
      comments.map(async (comment) => {
        const user = await ctx.db.get(comment.userId);
        // Return the comment with the user info
        return {
          ...comment,
          user: {
            fullname: user!.fullname,
            image: user!.image,
          },
        };
      })
    );

    return commentsWithInfo;
  },
});
