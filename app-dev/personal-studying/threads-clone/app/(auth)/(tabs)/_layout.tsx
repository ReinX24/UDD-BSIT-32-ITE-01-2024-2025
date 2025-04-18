import { COLORS } from "@/constants/COLORS";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CreateTabIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <View style={styles.createIconContainer}>
      <Ionicons name="add" color={color} size={size} />
    </View>
  );
};

const Layout = () => {
  const { signOut } = useAuth();
  const router = useRouter();

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
            return <CreateTabIcon color={color} size={size} />;
          },
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            // Haptics.selectionAsync();
            router.push("/(auth)/(modal)/create");
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
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  signOut();
                }}
              >
                <Ionicons name="log-out" size={24} />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  createIconContainer: {
    backgroundColor: COLORS.itemBackground,
    padding: 2,
    borderRadius: 8,
  },
});

export default Layout;
