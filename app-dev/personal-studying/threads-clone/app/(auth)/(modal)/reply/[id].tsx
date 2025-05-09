import Thread from "@/components/Thread";
import ThreadComposer from "@/components/ThreadComposer";
import { COLORS } from "@/constants/COLORS";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: Id<"messages"> }>();
  const thread = useQuery(api.messages.getThreadById, {
    messageId: id as Id<"messages">,
  });

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to the bottom when the thread is loaded
    if (scrollViewRef.current && thread) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [thread]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {thread ? (
          <Thread
            thread={
              thread as Doc<"messages"> & {
                creator: Doc<"users">;
                isLiked: boolean;
              }
            }
          ></Thread>
        ) : (
          <ActivityIndicator />
        )}
        <View style={{ paddingBottom: 200 }}>
          <ThreadComposer
            isReply
            threadId={id as Id<"messages">}
            disablePress={true}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
