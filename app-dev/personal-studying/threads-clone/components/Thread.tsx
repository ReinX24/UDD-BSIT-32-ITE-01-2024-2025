import { COLORS } from "@/constants/COLORS";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { asObjectValidator } from "convex/values";
import { Link, RelativePathString } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ThreadProps = {
  thread: Doc<"messages"> & {
    creator: Doc<"users">;
    isLiked: boolean;
  };
};

const Thread = ({ thread }: ThreadProps) => {
  // console.log(thread.mediaUrls);
  const {
    content,
    mediaFiles,
    likeCount,
    commentCount,
    retweetCount,
    creator,
  } = thread;

  const likeThread = useMutation(api.messages.likeThread);

  return (
    <View style={styles.container}>
      <Image source={{ uri: creator.imageUrl }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Link href={`/(auth)/(tabs)/feed/profile/${creator._id}`} asChild>
              <Text style={styles.headerTextName}>
                {creator.first_name} {creator.last_name}
              </Text>
            </Link>
            <Text style={styles.timestamp}>
              {new Date(thread._creationTime).toLocaleDateString()}
            </Text>
          </View>

          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={COLORS.border}
          />
        </View>

        <Text style={styles.content}>{content}</Text>

        {mediaFiles && mediaFiles?.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mediaContainer}
          >
            {mediaFiles.map((imageUrl, index) => {
              return (
                <Link
                  href={
                    `/(modal)/image/${encodeURIComponent(imageUrl)}` as RelativePathString
                  }
                  key={index}
                  asChild
                >
                  <TouchableOpacity>
                    <Image
                      key={index}
                      source={{ uri: imageUrl }}
                      style={styles.mediaImage}
                    />
                  </TouchableOpacity>
                </Link>
              );
            })}
          </ScrollView>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              likeThread({ threadId: thread._id });
            }}
          >
            <Ionicons
              name={thread.isLiked ? "heart" : "heart-outline"}
              size={24}
              color="black"
            />
            {likeCount > 0 && (
              <Text style={styles.actionText}>{likeCount}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
            <Text style={styles.actionText}>{commentCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="repeat-outline" size={24} color="black" />
            <Text style={styles.actionText}>{retweetCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="send" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Thread;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextName: {
    fontWeight: "bold",
    marginRight: 5,
    gap: 5,
    alignItems: "center",
    fontSize: 16,
  },
  timestamp: {
    color: COLORS.border,
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 14,
  },
  mediaImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    // marginRight: 10,
  },
  mediaContainer: {
    paddingRight: 10,
    gap: 14,
  },
});
