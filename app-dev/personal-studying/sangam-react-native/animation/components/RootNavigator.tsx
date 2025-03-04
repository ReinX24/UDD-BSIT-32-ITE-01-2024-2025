import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import BasicAnimation from "./screens/BasicAnimation";

export type RootStackParamList = {
    HomeScreen: undefined;
    BasicAnimation: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator id={undefined}>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerTitle: "Home",
                }}
            ></Stack.Screen>
            <Stack.Screen
                name="BasicAnimation"
                component={BasicAnimation}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};

export default RootNavigator;
