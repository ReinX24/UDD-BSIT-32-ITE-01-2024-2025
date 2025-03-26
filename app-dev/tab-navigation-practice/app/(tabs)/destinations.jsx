import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function destinations() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.destinationItem}>
          <Image
            source={require("../../assets/images/boracay.png")}
            style={styles.image}
          ></Image>
          <Text>Vigan</Text>
          <Link href={"/destination1"} style={styles.destinationLink}>
            Book Now
          </Link>
        </View>
        <View style={styles.destinationItem}>
          <Image
            source={require("../../assets/images/vigan.jpg")}
            style={styles.image}
          ></Image>
          <Text>Vigan</Text>
          <Link href={"/destination2"} style={styles.destinationLink}>
            Book Now
          </Link>
        </View>
        <View style={styles.destinationItem}>
          <Image
            source={require("../../assets/images/burnham.jpg")}
            style={styles.image}
          ></Image>
          <Text>Burnham</Text>
          <Link href={"/destination3"} style={styles.destinationLink}>
            Book Now
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  destinationItem: {
    flexDirection: "column",
    borderWidth: 2,
    marginVertical: 16,
    padding: 16,
    borderRadius: 16,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  destinationLink: {
    marginTop: 16,
    textAlign: "center",
    borderWidth: 2,
    padding: 8,
    borderRadius: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});
