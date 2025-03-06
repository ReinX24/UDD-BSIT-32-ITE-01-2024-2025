import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";

const HomeScreen = () => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressableItem}
        onPress={() => {
          navigator.navigate("Home");
        }}
      >
        <Text>Home</Text>
      </Pressable>

      <Pressable
        style={styles.pressableItem}
        onPress={() => {
          navigator.navigate("Contact", {
            name: "Rein",
          });
        }}
      >
        <Text>Contact</Text>
      </Pressable>

      <Pressable
        style={styles.pressableItem}
        onPress={() => {
          navigator.navigate("Tab Navigator Demo");
        }}
      >
        <Text>Tab Navigator Demo</Text>
      </Pressable>

      <Pressable
        style={styles.pressableItem}
        onPress={() => {
          navigator.navigate("Drawer Navigator Demo");
        }}
      >
        <Text>Drawer Navigator Demo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pressableItem: {
    borderWidth: 1,
    padding: 16,
    marginVertical: 4,
  },
});

export default HomeScreen;
