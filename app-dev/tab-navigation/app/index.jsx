import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Index Page</Text>
      <Link href="/(tabs)/home" style={styles.linkText}>
        Tabs
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    justifyContent: "center",
    fontWeight: "bold",
  },
  linkText: {
    color: "#030BF6",
    textDecorationLine: "underline",
  },
});

export default Index;
