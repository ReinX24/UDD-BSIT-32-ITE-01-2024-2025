import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ProfileProps = {
  userId: Id<"users">;
  showBackButton: boolean;
};

export default function Profile({
  userId,
  showBackButton = false,
}: ProfileProps) {
  const { userProfile } = useUserProfile();
  const { top } = useSafeAreaInsets();

  return (
    <View>
      <Text>Profile component</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
