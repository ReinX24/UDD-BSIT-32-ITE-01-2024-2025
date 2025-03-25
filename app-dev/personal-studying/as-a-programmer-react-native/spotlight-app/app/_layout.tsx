import { COLORS } from "@/constants/theme";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProdivder from "@/providers/ClerkAndConvexProdivder";

export default function RootLayout() {
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
