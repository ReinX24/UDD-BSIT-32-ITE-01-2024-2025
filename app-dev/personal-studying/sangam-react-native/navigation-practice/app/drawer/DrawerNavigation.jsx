import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerScreen1 = () => {
  return (
    <View>
      <Text>Drawer Screen 1</Text>
    </View>
  );
};

const DrawerScreen2 = () => {
  return (
    <View>
      <Text>Drawer Screen 2</Text>
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="DrawerScreen1"
        component={DrawerScreen1}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="DrawerScreen2"
        component={DrawerScreen2}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
