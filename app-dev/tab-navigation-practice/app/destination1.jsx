import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function destination1() {
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={require("../assets/images/boracay.png")}
        style={styles.image}
      ></Image>

      {/* Name */}
      <Text>Boracay</Text>

      {/* Confirm */}
      <Link href={"/confirm"} style={styles.confirmButton}>
        Confirm
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  confirmButton: {
    marginTop: 16,
    textAlign: "center",
    borderWidth: 2,
    padding: 8,
    borderRadius: 16,
  },
});
