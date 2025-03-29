import { styles } from "@/styles/feed.styles";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, StatusBarAnimation } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { toggleLike } from "@/convex/posts";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import CommentsModal from "./CommentsModal";

type PostProps = {
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

export default function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [commentsCount, setCommentsCount] = useState(post.comments);

  // The comments inside a modal are hidden by default
  const [showComments, setShowComments] = useState(false);

  const toggleLike = useMutation(api.posts.toggleLike);

  const handleLike = async () => {
    try {
      // Returns whether the post is liked or not
      const newIsLiked = await toggleLike({ postId: post._id });
      // Set isLiked
      setIsLiked(newIsLiked);
    } catch (error) {
      console.log("Error toggling like:", error);
    }
  };

  return (
    <View style={styles.post}>
      {/* POST HEADER */}
      <View style={styles.postHeader}>
        <Link href={"/(tabs)/notifications"}>
          <TouchableOpacity style={styles.postHeader}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />
            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>
        </Link>

        {/* SHOW DELETE BUTTON IF OWNER TODO: do this later */}
        {/* <TouchableOpacity>
          <Ionicons
            name={"ellipsis-horizontal"}
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Ionicons name={"trash-outline"} size={20} color={COLORS.primary} />
        </TouchableOpacity>
        {/* END OF SHOW DELETE BUTTON */}
      </View>
      {/* END OF POST HEADER */}

      {/* IMAGE */}
      <Image
        source={post.imageUrl}
        style={styles.postImage}
        contentFit="cover"
        transition={200}
        cachePolicy={"memory-disk"}
      />
      {/* END OF IMAGE */}

      {/* POST ACTIONS */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? COLORS.primary : COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name={"chatbubble-outline"}
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name={"bookmark-outline"}
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* END OF POST ACTIONS */}

      {/* POST INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>
          {post.likes > 0
            ? `${post.likes.toLocaleString()} ${post.likes == 1 ? "like" : "likes"}`
            : "Be the first to like"}
        </Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}

        <TouchableOpacity>
          <Text style={styles.commentText}>View all 2 comments</Text>
        </TouchableOpacity>

        <Text style={styles.timeAgo}>2 hours age</Text>
      </View>
      {/* END OF POST INFO */}

      {/* COMMENTS MODAL */}
      <CommentsModal
        postId={post._id}
        visible={showComments}
        onClose={() => {
          return setShowComments(false);
        }}
        onCommentAdded={() => {
          setCommentsCount((prev) => prev + 1);
        }}
      />
      {/* END OF COMMENTS MODAL */}
    </View>
  );
}
