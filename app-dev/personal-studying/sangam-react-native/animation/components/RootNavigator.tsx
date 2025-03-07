import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import BasicAnimation from "./screens/BasicAnimation";
import InterpolationDemo from "./screens/InterpolationDemo";
import CombinedAnimationDemo from "./screens/CombinedAnimation";
import GestureAnimationDemo from "./screens/GestureAnimation";

export type RootStackParamList = {
  HomeScreen: undefined;
  BasicAnimation: undefined;
  InterpolationDemo: undefined;
  CombinedAnimationDemo: undefined;
  GestureAnimationDemo: undefined;
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
      <Stack.Screen
        name="CombinedAnimationDemo"
        component={CombinedAnimationDemo}
      ></Stack.Screen>
      <Stack.Screen
        name="GestureAnimationDemo"
        component={GestureAnimationDemo}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootNavigator;
