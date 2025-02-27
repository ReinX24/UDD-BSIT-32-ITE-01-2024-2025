import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../app/HomeScreen";
import ContactScreen from "../app/ContactScreen";
import StackNavigationDemo from "./StackNavigationDemo";

export type RootStackParamsList = {
    Home: undefined;
    Contact: undefined;
    StackDemo: undefined;
};

// Create a stack navigator here
const Stack = createStackNavigator<RootStackParamsList>();

const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator id={undefined}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="StackDemo" component={StackNavigationDemo} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
