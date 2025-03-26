import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function confirm() {
  return (
    <View style={styles.container}>
      <Text>Thank you for booking!</Text>
      <Link href={"/"} style={styles.confirmButton}>
        Return Home
      </Link>
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
  confirmButton: {
    marginTop: 16,
    textAlign: "center",
    borderWidth: 2,
    padding: 8,
    borderRadius: 16,
  },
});
