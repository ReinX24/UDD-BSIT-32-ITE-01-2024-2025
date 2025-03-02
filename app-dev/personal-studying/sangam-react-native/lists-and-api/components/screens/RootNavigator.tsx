import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import FlatListScreen from "./FlatListScreen";
import SectionListScreen from "./SectionListScreen";
import TouchableScreen from "./TouchableScreen";

export type RootStackParamList = {
    Home: undefined;
    FlatListDemo: undefined;
    SectionListDemo: undefined;
    TouchableScreenDemo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            id={undefined}
            screenOptions={{ cardStyle: { flex: 1 } }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="FlatListDemo" component={FlatListScreen} />
            <Stack.Screen
                name="SectionListDemo"
                component={SectionListScreen}
            />
            <Stack.Screen
                name="TouchableScreenDemo"
                component={TouchableScreen}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
