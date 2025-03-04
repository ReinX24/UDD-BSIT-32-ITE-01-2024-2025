import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./components/RootNavigator";

export default function App() {
    return (
        <NavigationContainer>
            <RootNavigator></RootNavigator>
        </NavigationContainer>
    );
}
