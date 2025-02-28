import { StyleSheet, Text, View } from "react-native";

import Home from "./app/Home";
import Contact from "./app/Contact";
import About from "./app/About";
import Services from "./app/Services";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}></Stack.Screen>
                <Stack.Screen name="Contact" component={Contact}></Stack.Screen>
                <Stack.Screen name="About" component={About}></Stack.Screen>
                <Stack.Screen
                    name="Services"
                    component={Services}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
