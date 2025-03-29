import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
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
import { Id } from "@/convex/_generated/dataModel";

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

      {/* Using FlatList instead of ScrollView */}
      {/* FlatList: only loads needed data */}
      {/* ScrollView: loads all data */}
      <FlatList
        data={posts}
        renderItem={({ item }: any) => {
          return <Post post={item} />;
        }}
        keyExtractor={(item) => {
          return item._id;
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={<StoriesSection />}
      />
    </View>
  );
}

const StoriesSection = () => {
  return (
    // Using FlatList (only loads needed data)
    <FlatList
      data={STORIES}
      renderItem={({ item }: any) => {
        return <Story story={item} />;
      }}
      keyExtractor={(item) => {
        return item.id;
      }}
      horizontal
      showsVerticalScrollIndicator={false}
      style={styles.storiesContainer}
    />

    // Using ScrollView (loads all data at once)
    // <ScrollView
    //   horizontal
    //   showsVerticalScrollIndicator={false}
    //   style={[styles.storiesContainer]}
    // >
    //   {STORIES.map((story) => {
    //     return <Story key={story.id} story={story}></Story>;
    //   })}
    // </ScrollView>
  );
};

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
