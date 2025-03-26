import { View, Text, StyleSheet } from "react-native";

export default function profile() {
  return (
    <View style={styles.container}>
      <Text>Rein Aldwin E. Solis</Text>
      <Text>32-ITE-01</Text>
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
