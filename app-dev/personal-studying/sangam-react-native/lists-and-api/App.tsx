import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./components/screens/RootNavigator";
import { ThemeProvider } from "./components/context/ThemeContext";

export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </ThemeProvider>
    );
}
