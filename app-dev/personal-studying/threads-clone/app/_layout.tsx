import {
  ClerkLoaded,
  ClerkProvider,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import {
  Slot,
  Stack,
  useNavigationContainerRef,
  useRouter,
  useSegments,
} from "expo-router";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { LogBox, SafeAreaView, Text, View } from "react-native";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { usePush } from "@/hooks/usePush";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

if (!clerkPublishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys"]);

// import * as Sentry from "@sentry/react-native";
// import { isRunningInExpoGo } from "expo";

// const navigationIntegration = Sentry.reactNavigationIntegration({
//   enableTimeToInitialDisplay: !isRunningInExpoGo(),
// });

// Sentry.init({
//   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
//   attachScreenshot: true,
//   debug: false,
//   tracesSampleRate: 1.0,
//   _experiments: {
//     profileSampleRate: 1.0,
//     replaysSessionSampleRate: 1.0,
//     replaysOnErrorSampleRate: 1.0,
//   },
//   integrations: [navigationIntegration, Sentry.mobileReplayIntegration()],
//   // enableNativeFramesTracking: !isRunningInExpoGo(),
//   enableNativeFramesTracking: true,
// });

// Sentry.init({
//   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
//   integrations: [Sentry.mobileReplayIntegration()],
// });

// Prevent auto hide splash screen
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  usePush();

  // const user = useUser();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    // Checking if the current user is inside an auth screen
    const inAuthGroup = segments[0] === "(auth)";
    const inPublicGroup = segments[0] === "(public)";

    if (isSignedIn && !inAuthGroup) {
      // If the user is signed in and they try to access a screen outside the
      // auth screens
      router.replace("/(auth)/(tabs)/feed");
    } else if (!isSignedIn && !inPublicGroup) {
      // If the user tries to access a screen only for authenticated users,
      // return to login
      router.replace("/(public)");
    }
  }, [isLoaded, isSignedIn, segments]);

  // useEffect(() => {
  //   if (user && user.user) {
  //     Sentry.setUser({
  //       email: user.user.emailAddresses[0].emailAddress,
  //       id: user.user.id,
  //     });
  //   } else {
  //     Sentry.setUser(null);
  //   }
  // }, [user]);

  // return <Slot />;
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

const RootLayout = () => {
  // const ref = useNavigationContainerRef();
  // useEffect(() => {
  //   navigationIntegration.registerNavigationContainer(ref);
  // }, [ref]);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hides the splash screen once the fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      return await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <SafeAreaProvider>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: "black",
              }}
              onLayout={onLayoutRootView}
            >
              <InitialLayout />
              <StatusBar style="dark" />
            </SafeAreaView>
          </SafeAreaProvider>
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

// export default Sentry.wrap(RootLayout);
export default RootLayout;
