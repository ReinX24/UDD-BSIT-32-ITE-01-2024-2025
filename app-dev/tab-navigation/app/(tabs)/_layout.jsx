import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import icons from "../../constants/icons";
import { View, Image } from "react-native";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{
          width: 24,
          height: 24,
        }}
      />
    </View>
  );
};

const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
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
