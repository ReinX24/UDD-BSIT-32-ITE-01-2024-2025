import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import FlatListScreen from "./FlatListScreen";

type RootStackParamList = {
    Home: undefined;
    FlatListScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator id={undefined}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Home" component={FlatListScreen} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
