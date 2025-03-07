import { useRef } from "react";
import { View, Text, StyleSheet, Animated, PanResponder } from "react-native";

const GestureAnimationDemo: React.FC = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
      onPanResponderRelease: () => {
        // When the user releases, it returns to the initial position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Gesture Animation</Text>
      <Text style={styles.headerText}>Drag the box</Text>

      <Animated.View
        style={[styles.box, pan.getLayout()]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.boxText}>Drag Me</Text>
      </Animated.View>
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
    backgroundColor: "#FFFC3B",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2f2f2f",
  },
});

export default GestureAnimationDemo;
