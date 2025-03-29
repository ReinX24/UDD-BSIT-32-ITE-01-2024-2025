import { Id } from "@/convex/_generated/dataModel";
import { View, Text } from "react-native";

type CommentsModalProps = {
  postId: Id<"posts">;
  visible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
};
1;
export default function CommentsModal(props: CommentsModalProps) {
  return (
    <View>
      <Text>CommentsModal</Text>
    </View>
  );
}
