import { COLORS } from "@/constants/theme";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@react-navigation/native";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import InitialLayout from "@/components/InitialLayout";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  return (
    // SafeAreaProvider and SafeAreaView makes sure that the content stays
    // on screen
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <InitialLayout />
          {/* <Stack
            screenOptions={{
              headerShown: false,
            }}
          > */}
          {/* <Stack.Screen name="index" /> */}
          {/* <Stack.Screen name="old_index" /> */}
          {/* </Stack> */}
        </SafeAreaView>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
