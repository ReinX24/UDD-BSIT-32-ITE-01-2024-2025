import { StatusBar } from "expo-status-bar";
import { Component, useState, Fragment } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
} from "react-native";

import { Link } from "expo-router";

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rein Aldwin E. Solis</Text>
      <Text>32 - ITE - 01</Text>
      <StatusBar style="auto" />

      <Link href="/(tabs)/home" style={{ color: "blue" }}>
        Go to Home
      </Link>

      <Link href="/task" style={{ color: "blue" }}>
        Go to Todo List
      </Link>
    </View>
  );
}

export default App;

const Counter = () => {
  const [countValue, setCount] = useState(0);
  return (
    <View>
      <Text style={({ textAlign: "center" }, styles.title)}>{countValue}</Text>
      <Button
        onPress={() => {
          setCount(countValue + 1);
        }}
        title={"+"}
      ></Button>
      <Button
        onPress={() => {
          setCount(countValue - 1);
        }}
        title={"-"}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",

    // borderWidth: 4,
    // borderColor: "#000000",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",

    // borderWidth: 4,
    // borderColor: "#000000",
  },
});
