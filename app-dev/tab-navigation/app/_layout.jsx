import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Home" }}
      ></Stack.Screen>
      <Stack.Screen
        name="(tabs)"
        options={{ headerTitle: "Tabs" }}
      ></Stack.Screen>
    </Stack>
  );
};

export default RootLayout;
