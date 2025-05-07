import {
  View,
  Text,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Image,
} from "react-native";
import * as Sentry from "@sentry/react-native";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { COLORS } from "@/constants/COLORS";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThreadComposer from "@/components/ThreadComposer";
import Thread from "@/components/Thread";
import { Doc } from "@/convex/_generated/dataModel";

const FeedIndex = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    {
      initialNumItems: 5,
    }
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();

  const onLoadMore = () => {
    loadMore(5);
  };

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  console.log(results);

  return (
    <FlatList
      data={results}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <Thread
            thread={item as Doc<"messages"> & { creator: Doc<"users"> }}
          />
        );
      }}
      keyExtractor={(item) => {
        return item._id;
      }}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ItemSeparatorComponent={() => {
        return (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: COLORS.border,
            }}
          ></View>
        );
      }}
      contentContainerStyle={{ paddingVertical: top }}
      ListHeaderComponent={
        <View style={{ paddingBottom: 16 }}>
          <Image
            source={require("@/assets/images/threads-logo-black.png")}
            style={{ width: 40, height: 40, alignSelf: "center" }}
          />
          <ThreadComposer isPreview={true} />
        </View>
      }
    />
  );
};

export default FeedIndex;
