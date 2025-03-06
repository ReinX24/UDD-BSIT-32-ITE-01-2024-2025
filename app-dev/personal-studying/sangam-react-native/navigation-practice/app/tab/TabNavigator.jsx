import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ContactScreen from "./ContactScreen";
import { Ionicons } from "@expo/vector-icons";
import AboutScreen from "./AboutScreen";
import SettingScreen from "./SettingScreen";

const TabNavigator = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
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
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={
                  focused ? "information-circle" : "information-circle-outline"
                }
                size={24}
                color="black"
              />
            );
          },
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "build" : "build-outline"}
                size={24}
                color="black"
              />
            );
          },
        }}
      ></BottomTab.Screen>
    </BottomTab.Navigator>
  );
};

export default TabNavigator;
