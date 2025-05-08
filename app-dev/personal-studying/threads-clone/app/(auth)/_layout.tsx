import { COLORS } from "@/constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/create"
        options={{
          presentation: "modal",
          headerTitleAlign: "center",
          title: "New Thread",
          // headerLeft: () => {
          //   return null;
          // },
          headerRight: () => {
            return (
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal-circle" size={24} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="(modal)/edit-profile"
        options={{
          presentation: "modal",
          headerTitleAlign: "center",
          title: "Edit Profile",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.dismiss();
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="(modal)/image/[url]"
        options={{
          presentation: "fullScreenModal",
          headerTitleAlign: "center",
          title: "",
          headerStyle: {},
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.dismiss();
                }}
              >
                <Ionicons name="close" size={24} color={"white"} />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-horizontal-circle"
                  size={24}
                  color={"white"}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
