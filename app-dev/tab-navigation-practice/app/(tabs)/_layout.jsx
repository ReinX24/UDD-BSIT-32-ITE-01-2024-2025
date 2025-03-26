import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color="black"
              />
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="destinations"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "airplane" : "airplane-outline"}
                size={24}
                color="black"
              />
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                size={24}
                color="black"
              />
            );
          },
        }}
      ></Tabs.Screen>
      <StatusBar style="auto" />
    </Tabs>
  );
}
