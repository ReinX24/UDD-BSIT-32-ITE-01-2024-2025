import { View, Text, StyleSheet } from "react-native";

export default function home() {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>A travel application made for customers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
