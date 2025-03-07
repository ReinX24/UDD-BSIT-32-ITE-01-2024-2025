import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image
        source={require("../../assets/profile.png")}
        style={styles.photo}
      />
    </View>
  );
};

export default Profile;

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
  photo: {
    height: 500,
    width: 300,
  },
});
