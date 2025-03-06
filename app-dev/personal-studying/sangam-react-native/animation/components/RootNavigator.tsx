import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import BasicAnimation from "./screens/BasicAnimation";
import InterpolationDemo from "./screens/InterpolationDemo";

export type RootStackParamList = {
  HomeScreen: undefined;
  BasicAnimation: undefined;
  InterpolationDemo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ cardStyle: { flex: 1 } }}>
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
      <Stack.Screen
        name="InterpolationDemo"
        component={InterpolationDemo}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootNavigator;
