import { useRef } from "react";
import { View, Text, StyleSheet, Animated, Button } from "react-native";

const InterpolationDemo: React.FC = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const handleStartAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const animatedBackgroundColor = animation.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: ["#10A889", "#DD3311", "#B811DD", "#10A889"],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedBorderRadius = animation.interpolate({
    inputRange: [0, 0.3, 0.5, 0.7, 1],
    outputRange: [4, 50, 100, 50, 4],
  });

  const animatedSize = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [100, 200, 100],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Interpolation Demo</Text>
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor: animatedBackgroundColor,
            transform: [
              {
                rotate: rotate,
              },
            ],
            borderRadius: animatedBorderRadius,
            width: animatedSize,
            height: animatedSize,
          },
        ]}
      >
        <Text style={styles.boxText}>Interpolate Me!</Text>
      </Animated.View>
      <Button title="Start Animation here" onPress={handleStartAnimation} />
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
  },
  box: {
    width: 100,
    padding: 8,
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
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InterpolationDemo;
