import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  TransformArrayItem,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const CoreConcepts = () => {
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedRef = useAnimatedRef<Animated.View>();

  const opacity = useDerivedValue(() => {
    return Math.sin((rotation.value * Math.PI) / 180) / 2 + 0.5;
  });

  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value }, // Horizontal translation
        { rotate: `${rotation.value}deg` }, // Rotation in degrees
        { scale: scale.value }, // Scaling
      ] as TransformArrayItem["transform"],
      opacity: opacity.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: 1 / scale.value, // Inverse scaling for text
        },
      ],
    };
  });

  const handleStartAnimation = () => {
    offset.value = withSpring(Math.random() * 200 - 100); // Random translateX

    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1, // Infinite repetition
      false // Don't reverse the animation
    );

    scale.value = withRepeat(
      withTiming(1.5, { duration: 1000 }),
      -1, // Infinite repetition
      true // Reverse the animation
    );
  };

  const handleStopAnimation = () => {
    cancelAnimation(offset);
    cancelAnimation(rotation);
    cancelAnimation(scale);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reanimated Core Concepts</Text>

      <Animated.View style={[styles.box, boxStyle]} ref={animatedRef}>
        <Animated.Text style={[styles.boxText, textStyle]}>
          Animated Box
        </Animated.Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleStartAnimation}>
          <Text style={styles.buttonText}>Start Animation</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleStopAnimation}>
          <Text style={styles.buttonText}>Stop Animation</Text>
        </Pressable>
      </View>
    </View>
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
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    backgroundColor: "#0EAB79",
  },
  boxText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f2f2f2",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1470F0",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CoreConcepts;
