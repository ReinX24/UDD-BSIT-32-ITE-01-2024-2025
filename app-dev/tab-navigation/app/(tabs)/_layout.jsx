import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
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
        name="contact"
        options={{
          headerTitle: "Contact",
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
    </Tabs>
  );
};

export default RootLayout;
