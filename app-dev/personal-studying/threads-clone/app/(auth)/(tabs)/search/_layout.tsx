import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  );
};

export default Layout;
