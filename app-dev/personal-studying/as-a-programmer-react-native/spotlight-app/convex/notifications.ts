import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const getNotifications = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    // Get all the notifications received by the currently logged in user
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_receiver", (q) => {
        return q.eq("receiverId", currentUser._id);
      })
      .order("desc")
      .collect();

    const notificationInfo = await Promise.all(
      notifications.map(async (notification) => {
        // ()! means that this can never be null
        const sender = (await ctx.db.get(notification.senderId))!;

        let post = null;
        let comment = null;

        // Get the associated post with the notification
        if (notification.postId) {
          post = await ctx.db.get(notification.postId);
        }

        // Check if the notification is a type of comment
        if (notification.type === "comment" && notification.commentId) {
          comment = await ctx.db.get(notification.commentId);
        }

        return {
          ...notification,
          sender: {
            _id: sender._id,
            username: sender.username,
            image: sender.image,
          },
        };
      })
    );

    return notifications;
  },
});
