import {
  View,
  Text,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import * as Sentry from "@sentry/react-native";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { COLORS } from "@/constants/COLORS";

const FeedIndex = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    {
      initialNumItems: 5,
    }
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);

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
        return <Text>{item.content}</Text>;
      }}
      keyExtractor={(item) => {
        return item._id;
      }}
      onEndReached={onLoadMore}
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
    />
  );
};

export default FeedIndex;
