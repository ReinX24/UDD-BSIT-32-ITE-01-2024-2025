import { useOAuth, useSSO } from "@clerk/clerk-expo";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  // const { startOAuthFlow } = useOAuth({ strategy: "oauth_facebook" });
  // const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
  //   strategy: "oauth_google",
  // });

  const { startSSOFlow } = useSSO();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.loginImage}
      />
      <ScrollView></ScrollView>
      <Text>Hello, threads.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
  },
  loginImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
});
