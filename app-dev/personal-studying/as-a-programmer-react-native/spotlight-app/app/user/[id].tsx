import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";

// For viewing profiles of other users
export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();

  const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> });
  const posts = useQuery(api.posts.getPostsByUser, {
    userId: id as Id<"users">,
  });
  // Shows if the currently logged in user follows the user
  const isFollowing = useQuery(api.users.isFollowing, {
    followingId: id as Id<"users">,
  });

  const toggleFollow = useMutation(api.users.toggleFollow);

  const handleBack = () => {};

  if (
    profile === undefined ||
    posts === undefined ||
    isFollowing === undefined
  ) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {/* PAGE HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{profile.username}</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* END OF PAGE HEADER */}

      {/* CONTENTS OF THE PAGE */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* USER PROFILE */}
        <View style={styles.profileInfo}>
          {/* AVATAR AND STATS */}
          <View style={styles.avatarAndStats}>
            {/* AVATAR */}
            <Image
              source={profile.image}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy={"memory-disk"}
            />
            {/* END OF AVATAR */}
            {/* STATS */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
            {/* END OF STATS */}
          </View>
          {/* END OF AVATAR AND STATS */}

          {/* NAME AND BIO */}
          <Text style={styles.name}>{profile.fullname}</Text>
          {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
          {/* END OF NAME AND BIO */}

          {/* FOLLOW BUTTON */}
          <Pressable
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={() => {
              toggleFollow({ followingId: id as Id<"users"> });
            }}
          >
            <Text
              style={[
                styles.followButtonText,
                isFollowing && styles.followingButtonText,
              ]}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>
          {/* END OF FOLLOW BUTTON */}
        </View>
        {/* END OF USER PROFILE */}

        {/* PHOTOS GRID */}
        <View style={styles.postsGrid}>
          {posts.length === 0 ? (
            <View style={styles.noPostsContainer}>
              <Ionicons name="images-outline" size={48} color={COLORS.grey} />
              <Text style={styles.noPostsText}>No posts yet</Text>
            </View>
          ) : (
            <FlatList
              data={posts}
              numColumns={3}
              scrollEnabled={false}
              renderItem={({ item }: any) => {
                return (
                  <TouchableOpacity
                    style={styles.gridItem}
                    onPress={() => {
                      // setSelectedPost(item);
                    }}
                  >
                    <Image
                      source={item.imageUrl}
                      style={styles.gridImage}
                      contentFit="cover"
                      transition={200}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
        {/* END OF PHOTOS GRID */}
      </ScrollView>
      {/* END OF CONTENTS OF THE PAGE */}
    </View>
  );
}
