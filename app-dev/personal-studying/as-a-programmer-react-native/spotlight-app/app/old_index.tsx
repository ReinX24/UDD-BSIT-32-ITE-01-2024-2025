import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/auth.styles";

export default function old_index() {
  return (
    <View style={styles.container}>
      <Text>old_index</Text>

      <Image
        source={require("../assets/images/icon.png")}
        style={{
          width: 100,
          height: 100,
        }}
      />

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1726064855870-9a438a9517bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{
          width: 200,
          height: 200,
          resizeMode: "cover",
        }}
      />

      <Text style={styles.titleText}>Hello, World!</Text>

      <TouchableOpacity
        onPress={() => {
          alert("Hello from TouchableOpacity!");
        }}
      >
        <Text>Press me (TouchableOpacity)</Text>
      </TouchableOpacity>

      <Pressable
        onPress={() => {
          alert("Hello from Pressable!");
        }}
      >
        <Text>Press me (Pressable)</Text>
      </Pressable>
    </View>
  );
}
