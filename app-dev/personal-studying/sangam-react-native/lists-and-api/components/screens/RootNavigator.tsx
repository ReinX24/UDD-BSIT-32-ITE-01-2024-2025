import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import FlatListScreen from "./FlatListScreen";
import SectionListScreen from "./SectionListScreen";
import TouchableScreen from "./TouchableScreen";
import ModalScreen from "./ModalScreen";
import PullToRefesh from "./PullToRefresh";
import DataFetching from "./DataFetching";
import AxiosScreen from "./AxiosScreen";
import ThemeScreen from "./ThemeScreen";

export type RootStackParamList = {
    Home: undefined;
    FlatListDemo: undefined;
    SectionListDemo: undefined;
    TouchableScreenDemo: undefined;
    ModalDemo: undefined;
    PullToRefreshDemo: undefined;
    DataFetchingDemo: undefined;
    AxiosDemo: undefined;
    ThemeDemo: undefined;
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
            <Stack.Screen name="ModalDemo" component={ModalScreen} />
            <Stack.Screen name="PullToRefreshDemo" component={PullToRefesh} />
            <Stack.Screen name="DataFetchingDemo" component={DataFetching} />
            <Stack.Screen name="AxiosDemo" component={AxiosScreen} />
            <Stack.Screen name="ThemeDemo" component={ThemeScreen} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
