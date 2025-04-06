import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProdivder from "@/providers/ClerkAndConvexProdivder";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { Platform, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";

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

  // Runs when the application starts, updates the navigation bar on android
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#000000");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

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
