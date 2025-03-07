import { useRef } from "react";
import { View, Text, Animated, StyleSheet, Button } from "react-native";

const CombinedAnimationDemo = () => {
  const moveAndRotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const combinedAnimation = () => {
    moveAndRotateAnim.setValue(0);

    Animated.timing(moveAndRotateAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const pulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const moveX = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const moveY = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const rotate = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const backgroundColor = moveAndRotateAnim.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: ["#26E7C0", "#DD3311", "#B811DD", "#26E7C0"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Combined Animation</Text>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: moveX,
              },
              {
                translateY: moveY,
              },
              {
                rotate: rotate,
              },
              {
                scale: pulseAnim,
              },
            ],
            backgroundColor: backgroundColor,
          },
        ]}
      ></Animated.View>

      <View style={styles.buttonContainer}>
        <Button
          title="Move, rotate, & change color"
          onPress={combinedAnimation}
        />
        <Button title="Pulse" onPress={pulseAnimation} />
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
    backgroundColor: "#f2f2f2",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
});

export default CombinedAnimationDemo;
