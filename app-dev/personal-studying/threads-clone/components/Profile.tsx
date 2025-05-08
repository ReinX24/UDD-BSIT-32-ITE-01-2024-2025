import { COLORS } from "@/constants/COLORS";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Tabs from "./Tabs";
import UserProfile from "./UserProfile";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Thread from "./Thread";

type ProfileProps = {
  userId?: Id<"users">;
  showBackButton?: boolean;
};

export default function Profile({
  userId,
  showBackButton = false,
}: ProfileProps) {
  // Getting the currently logged in user
  const { userProfile } = useUserProfile();
  const { top } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const router = useRouter();

  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {
      userId: userId || userProfile?._id,
    },
    {
      initialNumItems: 4,
    }
  );

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlatList
        data={results}
        renderItem={({ item }) => {
          return (
            <Thread
              thread={
                item as Doc<"messages"> & {
                  creator: Doc<"users">;
                  isLiked: boolean;
                }
              }
            />
          );
        }}
        ListEmptyComponent={
          <Text style={styles.tabContentText}>
            You haven't posted anything yet
          </Text>
        }
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              {showBackButton ? (
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                  }}
                  style={styles.backButton}
                >
                  <Ionicons name="chevron-back" size={24} color="black" />
                  <Text>Back</Text>
                </TouchableOpacity>
              ) : (
                <MaterialCommunityIcons name="web" size={24} />
              )}
              <View style={styles.headerIcons}>
                <Ionicons name="logo-instagram" size={24} />
                <TouchableOpacity
                  onPress={() => {
                    return signOut();
                  }}
                >
                  <Ionicons name="log-out-outline" size={24} />
                </TouchableOpacity>
              </View>
            </View>

            {/* If viewing different user, userId */}
            {userId && <UserProfile userId={userId} />}

            {/* Else, userProfile which is the logged in user */}
            {!userId && userProfile && (
              <UserProfile userId={userProfile?._id} />
            )}

            {/* Tabs on user screen */}
            <Tabs onTabChange={() => {}}></Tabs>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabContentText: {
    fontSize: 14,
    color: COLORS.border,
    textAlign: "center",
    marginTop: 16,
  },
});
