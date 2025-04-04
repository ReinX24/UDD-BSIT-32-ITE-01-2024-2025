import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/notifications.styles";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type NotificationProps = {
  notification: {
    receiverId: Id<"users">;
    senderId: Id<"users">;
    type: string;
    postId: Id<"posts">;
    commentId: Id<"comments">;
    _creationTime: string;
    sender: {
      _id: Id<"users">;
      username: string;
      image: string;
    };
    comment: string;
    post: {
      _id: Id<"posts">;
      imageUrl: string;
      caption?: string;
      likes: number;
      comments: number;
      _creationTime: number;
      isLiked: boolean;
      isBookmarked: boolean;
      author: {
        _id: Id<"users">;
        username: string;
        image: string;
      };
    };
  };
};

export default function Notification({ notification }: NotificationProps) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        {/* TODO: fix later */}
        <Link href={`/notifications`} asChild>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.iconBadge}>
              {notification.type === "like" ? (
                // Liked your post
                <Ionicons name="heart" size={14} color={COLORS.primary} />
              ) : notification.type == "follow" ? (
                // New follower
                <Ionicons name="person-add" size={14} color={"#8B5CF6"} />
              ) : (
                // Commented on your post
                <Ionicons name="chatbubble" size={14} color={"#3B82F6"} />
              )}
            </View>
          </TouchableOpacity>
        </Link>

        {/* NOTIFICATION INFO */}
        <View style={styles.notificationInfo}>
          {/* TODO: fix later */}
          <Link href={`/notifications`} asChild>
            <TouchableOpacity>
              <Text style={styles.username}>
                {notification.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.action}>
            {notification.type === "follow"
              ? "started following you"
              : notification.type === "like"
                ? "liked your post"
                : `commented: "${notification.comment}"`}
          </Text>

          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime, {
              addSuffix: true,
            })}
          </Text>
        </View>
        {/* END OF NOTIFICATION INFO */}
      </View>

      {/* SHOW POST PHOTO IF RELATED TO A POST */}
      {notification.post && (
        <Image
          source={notification.post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
        />
      )}
    </View>
  );
}
