import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  Easing,
  TransformArrayItem,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimationTypes = () => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          scale: scale.value,
        },
        {
          rotate: `${rotate.value}deg`,
        },
      ] as TransformArrayItem["transform"],
    };
  });

  // Timing animation
  const handleTimingAnimation = () => {
    translateX.value = withTiming(150, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };

  // Spring animation
  const handleSpingAnimation = () => {
    scale.value = withSpring(1.5, {
      damping: 10,
      stiffness: 100,
    });
  };

  // Reset animation
  const handleResetAnimation = () => {
    translateX.value = withTiming(0); // reset to original position
    scale.value = withTiming(1); // reset to default scale
    rotate.value = withTiming(0);
  };

  // Decay animation
  const handleDecayAnimation = () => {
    translateX.value = withDecay({
      velocity: 200,
      clamp: [0, 300],
    });
  };

  // Sequence animation
  const handleSequenceAnimation = () => {
    // Rotates the square 180 degrees and returns to original position
    rotate.value = withSequence(
      withTiming(360, { duration: 1000 }),
      withTiming(0, { duration: 1000 })
    );
  };

  // Repeat animation
  const handleRepeatAnimation = () => {
    // Each pulse and reset counts as 2, pulses 3 times if 6
    scale.value = withRepeat(withTiming(1.2, { duration: 500 }), 6, true);
  };

  // Delay animation
  const handleDelayAnimation = () => {
    translateX.value = withDelay(1000, withSpring(200));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reanimated Animation Types</Text>

      <Animated.View style={[styles.box, boxStyle]} />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleTimingAnimation}>
          <Text style={styles.buttonText}>Timing</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSpingAnimation}>
          <Text style={styles.buttonText}>Spring</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleDecayAnimation}>
          <Text style={styles.buttonText}>Decay</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSequenceAnimation}>
          <Text style={styles.buttonText}>Sequence</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleRepeatAnimation}>
          <Text style={styles.buttonText}>Repeat</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleDelayAnimation}>
          <Text style={styles.buttonText}>Delay</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleResetAnimation}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
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
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap",
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
    textAlign: "center",
  },
});

export default AnimationTypes;
