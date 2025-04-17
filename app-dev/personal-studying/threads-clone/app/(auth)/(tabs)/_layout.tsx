import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const CreateTabIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => {
  // TODO: continue @1:30:45
};

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={focused ? "add" : "add-outline"}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default Layout;
