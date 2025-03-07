import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import icons from "../../constants/icons";

// npm install twrnc
// import tw from "twrnc";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        // style={tw`w-6 h-6`}
        style={{
          width: 24,
          height: 24,
        }}
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Home"
                focused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarLabel: "Contact",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "people-circle" : "people-circle-outline"}
                size={24}
                color="black"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          tabBarLabel: "Bookmark",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "bookmark" : "bookmark-outline"}
                size={24}
                color="black"
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
