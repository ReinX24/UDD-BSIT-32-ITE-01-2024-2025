import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { styles } from "../../styles/feed.styles";
import { useAuth } from "@clerk/clerk-expo";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { STORIES } from "@/constants/mock-data";
import Story from "@/components/Story";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "@/components/Loader";
import Post from "@/components/Post";

export default function Home() {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  // If a query is undefined in convex, then it is in the loading state
  if (posts === undefined) {
    // Return a loader component
    return <Loader />;
  }

  if (posts.length === 0) {
    return <NoPostsFound />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>spotlight</Text>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color={COLORS.white}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          style={[styles.storiesContainer]}
        >
          {/* Stories */}
          {STORIES.map((story) => {
            return <Story key={story.id} story={story}></Story>;
          })}
          {/* End of Stories */}
        </ScrollView>

        {/* Posts */}
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
        {/* End of Posts */}
      </ScrollView>
    </View>
  );
}

const NoPostsFound = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, color: COLORS.primary }}>No posts yet</Text>
    </View>
  );
};
