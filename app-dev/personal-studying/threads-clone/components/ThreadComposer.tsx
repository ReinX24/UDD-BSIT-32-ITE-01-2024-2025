import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { addThreadMessage } from "@/convex/messages";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useMutation } from "convex/react";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ThreadComposerProps = {
  isPreview?: boolean;
  isReply?: boolean;
  threadId?: Id<"messages">;
};

const ThreadComposer = ({
  isPreview,
  isReply,
  threadId,
}: ThreadComposerProps) => {
  const router = useRouter();
  const [threadContent, setThreadContent] = useState("");
  const { userProfile } = useUserProfile();
  const [mediaFiles, setMediaFiles] = useState<string[]>();
  const addThread = useMutation(api.messages.addThreadMessage);

  const handleSubmit = async () => {
    addThread({
      threadId,
      content: threadContent,
    });

    setThreadContent("");
    setMediaFiles([]);
    router.dismiss();
  };

  const removeThread = () => {
    setThreadContent("");
    setMediaFiles([]);
  };

  const handleCancel = async () => {
    // TODO
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={handleCancel}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <View style={styles.topRow}>
        <Image
          source={{ uri: userProfile?.imageUrl as string }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

export default ThreadComposer;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});
