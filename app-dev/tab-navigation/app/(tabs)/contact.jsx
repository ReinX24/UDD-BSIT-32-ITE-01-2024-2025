import { View, Text, StyleSheet } from "react-native";

const contact = () => {
  return (
    <View style={styles.container}>
      <Text>Contact Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default contact;
