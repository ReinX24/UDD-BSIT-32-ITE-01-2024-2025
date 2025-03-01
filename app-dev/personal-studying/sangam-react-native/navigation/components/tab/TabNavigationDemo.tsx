import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabScreen1 from "./TabScreen1";
import TabScreen2 from "./TabScreen2";

type BottomTabParamsList = {
    TabScreen1: undefined;
    TabScreen2: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamsList>();

const TabNavigationDemo: React.FC = () => {
    return (
        <BottomTab.Navigator id={undefined}>
            <BottomTab.Screen
                name="TabScreen1"
                component={TabScreen1}
            ></BottomTab.Screen>
            <BottomTab.Screen
                name="TabScreen2"
                component={TabScreen2}
            ></BottomTab.Screen>
        </BottomTab.Navigator>
    );
};

export default TabNavigationDemo;
