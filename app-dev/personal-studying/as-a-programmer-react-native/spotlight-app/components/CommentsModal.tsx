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
} from "react-native";
import Loader from "./Loader";

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

  const handleAddComment = async () => {};

  return (
    <Modal
      visible={visible}
      animationType="fade"
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
        {/* TODO: continue @347 - 11:50 */}
        {comments === undefined ? <Loader /> : <></>}
      </KeyboardAvoidingView>
    </Modal>
  );
}
