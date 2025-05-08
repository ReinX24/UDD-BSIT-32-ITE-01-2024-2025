import Thread from "@/components/Thread";
import ThreadComposer from "@/components/ThreadComposer";
import { COLORS } from "@/constants/COLORS";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { usePaginatedQuery } from "convex/react";
import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import {
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FeedIndex = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    {
      initialNumItems: 4,
    }
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();

  // Animation
  const navigation = useNavigation();
  const scrollOffSet = useSharedValue(0);
  const tabBarHeight = useBottomTabBarHeight();
  const isFocused = useIsFocused();

  const updateTabBar = () => {
    let newMarginBottom = 0;

    if (scrollOffSet.value >= 0 && scrollOffSet.value <= tabBarHeight) {
      newMarginBottom = -scrollOffSet.value;
    } else if (scrollOffSet.value > tabBarHeight) {
      newMarginBottom = -tabBarHeight;
    }

    // console.log(newMarginBottom);

    navigation.getParent()?.setOptions({
      tabBarStyle: {
        marginBottom: newMarginBottom,
      },
    });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      // console.log(event.contentOffset.y);
      if (isFocused) {
        scrollOffSet.value = event.contentOffset.y;
        // runOnJS(updateTabBar)();
      }
    },
  });

  const onLoadMore = () => {
    loadMore(5);
  };

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // console.log(results);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Animated.FlatList
        // onScroll={scrollHandler}
        scrollEventThrottle={16}
        data={results}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Link
              href={
                `/(auth)/(tabs)/feed/${item._id}` as "/(auth)/(tabs)/feed/[id]"
              }
              asChild
            >
              <TouchableOpacity>
                <Thread
                  thread={
                    item as Doc<"messages"> & {
                      creator: Doc<"users">;
                      isLiked: boolean;
                    }
                  }
                />
              </TouchableOpacity>
            </Link>
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
        // contentContainerStyle={{ paddingVertical: top }}
        ListHeaderComponent={
          <View style={{ paddingBottom: 16 }}>
            <Image
              source={require("@/assets/images/threads-logo-black.png")}
              style={{ width: 40, height: 40, alignSelf: "center" }}
            />
            <ThreadComposer isPreview={true} />
          </View>
        }
        style={{
          backgroundColor: COLORS.background,
        }}
      />
    </View>
  );
};

export default FeedIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
