import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../app/HomeScreen";
import ContactScreen from "../app/ContactScreen";
import StackNavigationDemo from "./stack/StackNavigationDemo";
import TabNavigationDemo from "./tab/TabNavigationDemo";
import DrawerNavigationDemo from "./drawer/DrawerNavigationDemo";

export type RootStackParamsList = {
    Home: undefined;
    Contact: undefined;
    StackDemo: undefined;
    TabDemo: undefined;
    DrawerDemo: undefined;
};

// Create a stack navigator here
const Stack = createStackNavigator<RootStackParamsList>();

const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator id={undefined}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="StackDemo" component={StackNavigationDemo} />
            <Stack.Screen name="TabDemo" component={TabNavigationDemo} />
            <Stack.Screen name="DrawerDemo" component={DrawerNavigationDemo} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
