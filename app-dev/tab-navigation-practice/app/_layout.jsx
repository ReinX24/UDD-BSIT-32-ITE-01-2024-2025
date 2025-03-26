import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen
        name="destination1"
        options={{ headerShown: true, headerTitle: "Boracay Beach" }}
      ></Stack.Screen>
      <Stack.Screen
        name="destination2"
        options={{ headerShown: true, headerTitle: "Vigan City" }}
      ></Stack.Screen>
      <Stack.Screen
        name="destination3"
        options={{ headerShown: true, headerTitle: "Burnham Park" }}
      ></Stack.Screen>
      <Stack.Screen name="confirm"></Stack.Screen>
      <StatusBar style="auto"></StatusBar>
    </Stack>
  );
}
