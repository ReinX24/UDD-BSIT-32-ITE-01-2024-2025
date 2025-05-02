import { COLORS } from "@/constants/COLORS";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
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
  const inputAccessoryViewID = "uniqueId";

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
    setThreadContent("");
    Alert.alert("Discard thread?", "", [
      {
        text: "Discard",
        style: "destructive",
        onPress: () => {
          router.dismiss();
        },
      },
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          return null;
        },
      },
    ]);
  };

  function selectImage(type: "library" | "camera") {
    console.log(type);
  }

  return (
    <View>
      <StatusBar hidden />
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
        {userProfile && (
          <Image
            source={{ uri: userProfile?.imageUrl as string }}
            style={styles.avatar}
          />
        )}
        <View style={styles.centerContainer}>
          <Text style={styles.name}>
            {userProfile?.first_name} {userProfile?.last_name}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={isReply ? "Reply to thread" : "What's new?"}
            value={threadContent}
            onChangeText={setThreadContent}
            multiline
            autoFocus={!isPreview}
            inputAccessoryViewID={inputAccessoryViewID}
          />

          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => selectImage("library")}
            >
              <Ionicons name="images-outline" size={24} color={COLORS.border} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => selectImage("camera")}
            >
              <Ionicons name="camera-outline" size={24} color={COLORS.border} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="gif" size={24} color={COLORS.border} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="mic-outline" size={24} color={COLORS.border} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome6 name="hashtag" size={24} color={COLORS.border} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="stats-chart-outline"
                size={24}
                color={COLORS.border}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.cancelButton,
            {
              opacity: isPreview ? 0 : 1,
            },
          ]}
          onPress={removeThread}
        >
          <Ionicons name="close" size={24} color={COLORS.border} />
        </TouchableOpacity>
      </View>

      <View nativeID={inputAccessoryViewID}>
        <View style={styles.keyboardAccessoryView}>
          <Text style={styles.keyboardAccessoryText}>
            {isReply
              ? "Everyone can reply and quote"
              : "Profiles that you follow can reply and quote"}
          </Text>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 16,
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignSelf: "flex-start",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  centerContainer: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    maxHeight: 100,
  },
  iconRow: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  iconButton: {
    marginRight: 16,
  },
  cancelButton: {
    marginLeft: 12,
    alignSelf: "flex-start",
  },
  keyboardAccessoryView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    paddingLeft: 64,
  },
  keyboardAccessoryText: {
    flex: 1,
    color: COLORS.border,
  },
  submitButton: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
