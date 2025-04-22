import { COLORS } from "@/constants/COLORS";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const { signOut } = useAuth();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlatList
        data={[]}
        renderItem={({ item }) => {
          return <Text>Test</Text>;
        }}
        ListEmptyComponent={<Text>No data</Text>}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              {showBackButton ? (
                <Text>BACK</Text>
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
  headerIcons: {},
});
