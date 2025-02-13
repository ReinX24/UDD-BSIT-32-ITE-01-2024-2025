import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <SafeAreaProvider>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{ title: "Index", headerShown: false }}
                    ></Stack.Screen>
                </Stack>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}
