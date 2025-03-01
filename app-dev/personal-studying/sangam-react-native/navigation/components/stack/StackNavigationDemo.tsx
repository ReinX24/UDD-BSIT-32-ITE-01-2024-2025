import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import StackScreen1 from "./StackScreen1";
import StackScreen2 from "./StackScreen2";

export type StackParamsList = {
    StackScreen1: undefined;
    // Dynamic screen which accepts a itemId
    StackScreen2: { itemId: number };
};

const Stack = createStackNavigator<StackParamsList>();

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
                options={({ route }) => {
                    return {
                        title: `Stack Screen Two - Item ${route.params.itemId}`,
                    };
                }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigationDemo;
