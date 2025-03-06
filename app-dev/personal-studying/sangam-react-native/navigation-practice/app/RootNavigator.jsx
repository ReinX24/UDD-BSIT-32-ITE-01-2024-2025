import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./stack/HomeScreen";
import ContactScreen from "./stack/ContactScreen";
import TabNavigator from "./tab/TabNavigator";
import DrawerNavigation from "./drawer/DrawerNavigation";

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Tab Navigator Demo" component={TabNavigator} />
      <Stack.Screen name="Drawer Navigator Demo" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
