import Thread from "@/components/Thread";
import { COLORS } from "@/constants/COLORS";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQuery } from "convex/react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: Id<"messages"> }>();
  const thread = useQuery(api.messages.getThreadById, { messageId: id });

  // {} makes sure that the variable is an object
  const { userProfile } = useUserProfile();

  // console.log(thread);

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar hidden />
      <ScrollView>
        {thread ? (
          <Thread
            thread={
              thread as Doc<"messages"> & {
                creator: Doc<"users">;
                isLiked: boolean;
              }
            }
          />
        ) : (
          <ActivityIndicator />
        )}
        <View style={styles.border} />
      </ScrollView>
      <Link href={`/(auth)/(modal)/reply/${id}`} asChild>
        <TouchableOpacity style={styles.replyButton}>
          <Image
            source={{ uri: userProfile?.imageUrl as string }}
            style={styles.profileImage}
          />
          <Text>Reply to {thread?.creator?.first_name}</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginVertical: 2,
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 10,
    borderRadius: 100,
    margin: 10,
    backgroundColor: COLORS.itemBackground,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
});
