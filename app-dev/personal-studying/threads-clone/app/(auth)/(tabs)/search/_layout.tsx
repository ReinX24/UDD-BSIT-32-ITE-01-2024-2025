import { COLORS } from "@/constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen
        name="profile/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
