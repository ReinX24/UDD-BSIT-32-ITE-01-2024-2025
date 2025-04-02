import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthorized");
  }
  return await ctx.storage.generateUploadUrl();
});

// Creating a new post from our current logged in user
// This is a mutation context
export const createPost = mutation({
  args: {
    caption: v.optional(v.string()),
    storageId: v.id("_storage"),
  },

  handler: async (ctx, args) => {
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

    // If the current user is not found
    if (!currentUser) {
      throw new Error("User not found");
    }

    const imageUrl = await ctx.storage.getUrl(args.storageId);

    if (!imageUrl) {
      throw new Error("Image not found");
    }

    // Create post
    const postId = await ctx.db.insert("posts", {
      userId: currentUser._id,
      imageUrl: imageUrl,
      storageId: args.storageId,
      caption: args.caption,
      likes: 0,
      comments: 0,
    });

    // Increment the user's post count by 1
    await ctx.db.patch(currentUser._id, {
      posts: currentUser.posts + 1,
    });

    return postId;
  },
});

export const getFeedPosts = query({
  handler: async (ctx) => {
    // Getting the currently logged in user
    // This is a query context
    const currentUser = await getAuthenticatedUser(ctx);

    // Get all posts
    const posts = await ctx.db.query("posts").order("desc").collect();

    if (posts.length === 0) {
      return [];
    }

    // Enhance post with user data and interaction status
    const postsWithInfo = await Promise.all(
      posts.map(async (post) => {
        // Get the user who made the post (author)
        // ()! means that this will never be null
        const postAuthor = (await ctx.db.get(post.userId))!;

        // Get the posts that the user likes
        const like = await ctx.db
          .query("likes")
          .withIndex("by_user_and_post", (q) => {
            return q.eq("userId", currentUser._id).eq("postId", post._id);
          })
          .first();

        // Get the posts that the user has bookmarked
        const bookmark = await ctx.db
          .query("bookmarks")
          .withIndex("by_user_and_post", (q) => {
            return q.eq("userId", currentUser._id).eq("postId", post._id);
          })
          .first();

        return {
          ...post,
          author: {
            _id: postAuthor?._id,
            username: postAuthor?.username,
            image: postAuthor?.image,
          },
          // Converting the object into a boolean using !!
          isLiked: !!like,
          isBookmarked: !!bookmark,
        };
      })
    );

    return postsWithInfo;
  },
});

export const toggleLike = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const existing = await ctx.db
      .query("likes")
      .withIndex("by_user_and_post", (q) => {
        return q.eq("userId", currentUser._id).eq("postId", args.postId);
      })
      .first();

    const post = await ctx.db.get(args.postId);

    if (!post) {
      throw new Error("Post not found");
    }

    // If we already liked the post and clicked the like again, remove the like
    // Else, add the like to the post
    if (existing) {
      // remove like
      await ctx.db.delete(existing._id);
      await ctx.db.patch(args.postId, { likes: post.likes - 1 });
      return false; // like state is now false, unliked or not liked
    } else {
      // add like
      await ctx.db.insert("likes", {
        userId: currentUser._id,
        postId: args.postId,
      });
      await ctx.db.patch(args.postId, { likes: post.likes + 1 });

      // if the liked post is not my post, create a notification
      if (currentUser._id !== post.userId) {
        await ctx.db.insert("notifications", {
          receiverId: post.userId,
          senderId: currentUser._id,
          type: "like",
          postId: args.postId,
        });
      }

      return true; // liked post
    }
  },
});

export const deletePost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const post = await ctx.db.get(args.postId);

    if (!post) {
      throw new Error("Post not found");
    }

    // Verify ownership
    if (post.userId !== currentUser._id) {
      throw new Error("Not authorized to delete this post");
    }

    // Delete associated likes with the post
    const likes = await ctx.db
      .query("likes")
      .withIndex("by_post", (q) => {
        return q.eq("postId", args.postId);
      })
      .collect();

    for (const like of likes) {
      await ctx.db.delete(like._id);
    }

    // Delete associated comments
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => {
        return q.eq("postId", args.postId);
      })
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    // TODO: delete associated bookmarks for the post

    // Delete the storage file associated with the post
    await ctx.storage.delete(post.storageId);

    // Delete the post
    await ctx.db.delete(args.postId);

    // Decrement the user's post count by 1
    await ctx.db.patch(currentUser._id, {
      posts: Math.max(0, (currentUser.posts || 1) - 1),
    });
  },
});
