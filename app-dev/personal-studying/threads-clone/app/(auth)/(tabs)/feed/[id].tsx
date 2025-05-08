import { COLORS } from "@/constants/COLORS";
import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar hidden />
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
