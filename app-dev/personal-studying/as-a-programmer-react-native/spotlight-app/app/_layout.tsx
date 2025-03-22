import { COLORS } from "@/constants/theme";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {
  return (
    // SafeAreaProvider and SafeAreaView makes sure that the content stays
    // on screen
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          {/* <Stack.Screen name="old_index" /> */}
        </Stack>
      </SafeAreaView>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
