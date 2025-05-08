import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen name="profile/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
