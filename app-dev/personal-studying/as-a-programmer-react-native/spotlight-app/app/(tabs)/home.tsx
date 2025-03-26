import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/feed.styles";
import { useAuth } from "@clerk/clerk-expo";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Signout
        </Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
          {/* TODO: resume @344 - 1:21 */}
      </View>
    </View>
  );
}
