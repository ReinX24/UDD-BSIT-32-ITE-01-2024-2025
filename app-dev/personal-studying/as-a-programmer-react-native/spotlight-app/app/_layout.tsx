import { COLORS } from "@/constants/theme";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProdivder from "@/providers/ClerkAndConvexProdivder";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Loading custom fonts
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  // Once our fonts are loaded, we will hide the splash screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      return await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    // SafeAreaProvider and SafeAreaView makes sure that the content stays
    // on screen
    <ClerkAndConvexProdivder>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "black",
          }}
          onLayout={onLayoutRootView}
        >
          <InitialLayout />
          {/* <Stack
            screenOptions={{
              headerShown: false,
            }}
          > */}
          {/* <Stack.Screen name="index" /> */}
          {/* <Stack.Screen name="old_index" /> */}
          {/* </Stack> */}
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProdivder>
  );
}
