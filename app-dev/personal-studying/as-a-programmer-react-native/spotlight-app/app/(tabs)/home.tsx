import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/auth.styles";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Link href={"/notifications"}>Visit notifications screen</Link>
    </View>
  );
}
