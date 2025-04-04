import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";

export default function Bookmarks() {
  // Getting the bookmarks of the currently logged in user
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);

  const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);

  // If bookmarkedPosts is undefined, this means that it is loading
  if (bookmarkedPosts === undefined) {
    return <Loader />;
  }

  // If there are no bookmarks, return no bookmarks found screen
  if (bookmarkedPosts.length === 0) {
    return <NoBookmarksFound />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>

      {/* BOOKMARKED POSTS */}
      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {bookmarkedPosts.map((post) => {
          if (!post) {
            return null;
          }

          return (
            <View key={post._id} style={{ width: "33.33%", padding: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedPost(post)
                }}
              >
                <Image
                  source={post.imageUrl}
                  style={{ width: "100%", aspectRatio: 1 }}
                  contentFit="cover"
                  transition={200}
                  cachePolicy={"memory-disk"}
                ></Image>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* END OF BOOKMARKED POSTS */}

      {/* SELECTED IMAGE MODAL */}
      <Modal
        visible={!!selectedPost}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setSelectedPost(null);
        }}
      >
        <View style={styles.modalBackdrop}>
          {selectedPost && (
            <View style={styles.postDetailContainer}>
              <View style={styles.postDetailHeader}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedPost(null);
                  }}
                >
                  <Ionicons name="close" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>

              <Image
                source={selectedPost.imageUrl}
                cachePolicy={"memory-disk"}
                style={styles.postDetailImage}
              />
            </View>
          )}
        </View>
      </Modal>
      {/* END OF SELECTED IMAGE MODAL */}
    </View>
  );
}

const NoBookmarksFound = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, color: COLORS.primary }}>
        No bookmarked posts yet
      </Text>
    </View>
  );
};
