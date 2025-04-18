import { COLORS } from "@/constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/create"
        options={{
          presentation: "modal",
          title: "New Thread",
          headerLeft: () => {
            // Removes back button
            // TODO: resume @1:36:57
            return null;
          },
          headerRight: () => {
            return (
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal-circle" size={24} />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
