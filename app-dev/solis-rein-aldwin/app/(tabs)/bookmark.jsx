import { View, Text, StyleSheet } from "react-native";

const bookmark = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bookmark</Text>
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
    fontSize: 36,
    fontWeight: "bold",
  },
});

export default bookmark;
