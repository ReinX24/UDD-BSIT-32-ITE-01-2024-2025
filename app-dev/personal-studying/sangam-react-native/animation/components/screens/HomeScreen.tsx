import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

const screens = [
  {
    id: 1,
    title: "Home Screen",
    screen: "HomeScreen",
  },
  {
    id: 2,
    title: "Basic Animation Demo",
    screen: "BasicAnimation",
  },
  {
    id: 3,
    title: "Interpolation Demo",
    screen: "InterpolationDemo",
  },
  {
    id: 4,
    title: "Combined Animation Demo",
    screen: "CombinedAnimationDemo",
  },
  {
    id: 5,
    title: "Gesture Animation Demo",
    screen: "GestureAnimationDemo",
  },
  {
    id: 6,
    title: "Reanimated Core Concepts Demo",
    screen: "CoreConceptsDemo",
  },
  {
    id: 7,
    title: "Animation Types Demo (Reanimated)",
    screen: "AnimationTypesDemo",
  },
  {
    id: 8,
    title: "Gesture Handler Demo (Reanimated)",
    screen: "ReanimatedGesturesDemo",
  },
  {
    id: 9,
    title: "Form Validation Demo (Reanimated)",
    screen: "FormValidationDemo",
  },
];

type ScreenProps = {
  item: {
    id: number;
    title: string;
    screen: string;
  };
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleRenderItem = ({ item }: ScreenProps) => {
    return (
      <TouchableOpacity
        style={styles.topicButton}
        onPress={() => {
          navigation.navigate(item.screen as keyof RootStackParamList);
        }}
      >
        <Text style={styles.topicText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <FlatList data={screens} renderItem={handleRenderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  topicButton: {
    backgroundColor: "#e1e1e1",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  topicText: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#2f2f2f",
  },
});

export default HomeScreen;
