import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import Loader from "./Loader";
import Comment from "./Comment";

type CommentsModalProps = {
  postId: Id<"posts">;
  visible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
};

export default function CommentsModal({
  onClose,
  onCommentAdded,
  postId,
  visible,
}: CommentsModalProps) {
  const [newComment, setNewComment] = useState("");
  const comments = useQuery(api.comments.getComments, { postId: postId });
  const addComment = useMutation(api.comments.addComment);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      return;
    }

    try {
      // Add comment to our convex database
      await addComment({
        content: newComment,
        postId: postId,
      });

      // Reset the contents of the comment
      setNewComment("");

      // Call onCommentAdded, increments comment count
      onCommentAdded();
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        {/* MODAL HEADER WITH CLOSE BUTTON */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Comments</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* END OF MODAL HEADER WITH CLOSE BUTTON */}

        {/* If the comments are undefined, they are being loaded */}
        {comments === undefined ? (
          <Loader />
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }: any) => {
              return <Comment comment={item} />;
            }}
            contentContainerStyle={styles.commentsList}
          />
        )}

        {/* TEXT INPUT FOR NEW COMMENT */}
        <View style={styles.commentInput}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            placeholderTextColor={COLORS.grey}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />

          {/* Post button */}
          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Text
              style={[
                styles.postButton,
                !newComment.trim() && styles.postButtonDisabled,
              ]}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
        {/* END OF TEXT INPUT FOR NEW COMMENT */}
      </KeyboardAvoidingView>
    </Modal>
  );
}
