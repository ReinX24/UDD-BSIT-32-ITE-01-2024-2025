import { COLORS } from "@/constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen name="profile/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Thread",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: "black",
          headerBackTitle: "Back",
          headerRight: () => {
            return (
              <Ionicons
                name="notifications-outline"
                size={24}
                color={"black"}
              />
            );
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
