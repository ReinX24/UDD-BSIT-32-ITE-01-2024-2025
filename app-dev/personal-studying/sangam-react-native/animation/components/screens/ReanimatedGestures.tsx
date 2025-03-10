import { View, Text, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  TransformArrayItem,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const ReanimatedGestures: React.FC = () => {
  const translateXOffset = useSharedValue<number>(0);
  const translateYOffset = useSharedValue<number>(0);
  const boxScale = useSharedValue<number>(1);
  const boxColor = useSharedValue<string>("blue");

  const panGestureHandler = Gesture.Pan()
    .onBegin(() => {
      boxScale.value = 1.2;
      boxColor.value = "red";
    })
    .onChange((event) => {
      translateXOffset.value = event.translationX;
      translateYOffset.value = event.translationY;
    })
    .onFinalize(() => {
      translateXOffset.value = withSpring(0);
      translateYOffset.value = withSpring(0);
      boxScale.value = 1;
      boxColor.value = "blue";
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateXOffset.value },
        { translateY: translateYOffset.value },
        { scale: withTiming(boxScale.value) },
      ] as TransformArrayItem["transform"],
      backgroundColor: boxColor.value,
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Reanimated Gestures</Text>
        <Text>Drag the box below and release it</Text>
      </View>
      <GestureDetector gesture={panGestureHandler}>
        <Animated.View style={[styles.box, animatedStyles]}></Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "blue",
    borderRadius: 18,
    marginTop: 20,
  },
});

export default ReanimatedGestures;
