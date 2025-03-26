import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  // If any of the dependencies below change, run this again
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    // Check if the current screen is in the auth screen
    const inAuthScreen = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthScreen) {
      // If the user is not signed and not in the authentication screen, go to
      // login screen
      router.replace("/(auth)/login");
    } else if (isSignedIn && inAuthScreen) {
      // Return the user to the home page if they are already signed in and
      // they try to go back to the sign in page
      router.replace("/(tabs)/home");
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
