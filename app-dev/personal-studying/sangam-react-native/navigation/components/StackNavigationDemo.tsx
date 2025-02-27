import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import StackScreen1 from "./StackScreen1";
import StackScreen2 from "./StackScreen2";

const Stack = createStackNavigator();

const StackNavigationDemo: React.FC = () => {
    return (
        <Stack.Navigator id={undefined}>
            <Stack.Screen
                name="StackScreen1"
                component={StackScreen1}
                options={{ headerTitle: "Stack Screen One" }}
            />
            <Stack.Screen
                name="StackScreen2"
                component={StackScreen2}
                options={{ headerTitle: "Stack Screen Two" }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigationDemo;
