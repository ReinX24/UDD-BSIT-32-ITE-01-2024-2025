import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
                // headerTitleAlign: "center",
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: "absolute",
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        // <IconSymbol size={28} name="house.fill" color={color} />
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={28}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="contact"
                options={{
                    title: "Contact Us",
                    tabBarIcon: ({ color, focused }) => (
                        // <IconSymbol
                        //     size={28}
                        //     name={focused ? "people.fill" : "people.outline"}
                        //     color={color}
                        // />
                        <Ionicons
                            name={focused ? "people" : "people-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
