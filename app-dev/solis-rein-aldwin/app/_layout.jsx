import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack } from "expo-router";

// const BottomTab = createBottomTabNavigator();

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: "Index" }}
      ></Stack.Screen>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: true, headerTitle: "Tabs" }}
      ></Stack.Screen>
    </Stack>
  );
};

export default RootLayout;
