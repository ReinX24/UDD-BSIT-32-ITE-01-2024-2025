import HomeScreen from "./app/HomeScreen";
import AboutScreen from "./app/AboutScreen";
import ProfileScreen from "./app/ProfileScreen";
import ContactScreen from "./app/ContactScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerTitle: "Home" }}
                />
                <Stack.Screen
                    name="AboutScreen"
                    component={AboutScreen}
                    options={{ headerTitle: "About" }}
                />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ headerTitle: "Profile" }}
                />
                <Stack.Screen
                    name="ContactScreen"
                    component={ContactScreen}
                    options={{ headerTitle: "Contact" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
