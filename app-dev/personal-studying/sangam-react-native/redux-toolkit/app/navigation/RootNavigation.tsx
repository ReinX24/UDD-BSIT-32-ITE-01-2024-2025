import TaskList from "../screens/TaskList";
import Projects from "../screens/Projects";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const RootNavigation: React.FC = () => {
  // TODO: make outline when not selected
  // TODO: make projects page
  return (
    <Tab.Navigator id={undefined}>
      <Tab.Screen
        name="Tasks"
        component={TaskList}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Ionicons name="list" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <Ionicons name="build" size={24} color="black" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigation;
