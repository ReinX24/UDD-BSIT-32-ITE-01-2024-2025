import Loader from "@/components/Loader";
import Post from "@/components/Post";
import Stories from "@/components/Stories";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/feed.styles";

export default function Home() {
  const { signOut } = useAuth();
  // const [refreshing, setRefreshing] = useState(false);

  const posts = useQuery(api.posts.getFeedPosts);

  // If a query is undefined in convex, then it is in the loading state
  if (posts === undefined) {
    // Return a loader component
    return <Loader />;
  }

  if (posts.length === 0) {
    return <NoPostsFound />;
  }

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 200);
  // };

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
        // ListHeaderComponent={<Stories />}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     tintColor={COLORS.primary}
        //   />
        // }
      />
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
