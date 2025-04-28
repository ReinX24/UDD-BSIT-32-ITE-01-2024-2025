import { Id } from "@/convex/_generated/dataModel";
import { StyleSheet, Text, View } from "react-native";

type ThreadComposerProps = {
  isPreview?: boolean;
  isReply?: boolean;
  threadId?: Id<"messages">;
};

const ThreadComposer = () => {
  return (
    <View>
      <Text>ThreadComposer</Text>
    </View>
  );
};

export default ThreadComposer;

const styles = StyleSheet.create({});
