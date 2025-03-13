import TaskList from "../screens/TaskList";
import Projects from "../screens/Projects";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const RootNavigation: React.FC = () => {
  return (
    <Tab.Navigator id={undefined}>
      <Tab.Screen name="Tasks" component={TaskList} />
      <Tab.Screen name="Projects" component={Projects} />
    </Tab.Navigator>
  );
};

export default RootNavigation;
