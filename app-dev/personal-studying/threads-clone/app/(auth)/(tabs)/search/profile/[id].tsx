import Profile from "@/components/Profile";
import { Id } from "@/convex/_generated/dataModel";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <Profile userId={id as Id<"users">} showBackButton={true} />;
};

export default Page;

const styles = StyleSheet.create({});
