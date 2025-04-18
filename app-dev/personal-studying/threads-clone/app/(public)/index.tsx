import { COLORS } from "@/constants/COLORS";
import { api } from "@/convex/_generated/api";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleFacebookLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_facebook",
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.replace("/(auth)/(tabs)/feed");
      }
    } catch (error) {
      console.log("OAuth Error: ", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.replace("/(auth)/(tabs)/feed");
      }
    } catch (error) {
      console.log("OAuth Error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.loginImage}
      />
      <ScrollView
        contentContainerStyle={[styles.scrollViewContainer, { flexGrow: 1 }]}
      >
        <Text style={styles.title}>How would you like to use Threads?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleFacebookLogin}
          >
            <View style={styles.loginButtonContent}>
              <Image
                source={require("@/assets/images/instagram_icon.webp")}
                style={styles.loginButtonIcon}
              />
              <Text style={styles.loginButtonText}>
                Continue with Instagram
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.border}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              Log in or create a Threads profile with your Instagram account.
              With a profile, you can post, interact, and get personalized
              recommendations.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleGoogleSignIn}
          >
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Continue with Google</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.border}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}>
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Use without a profile</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.border}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              You can browse Threads without a profile, but won't be able to
              post, interact, or get personalized recommendations.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.switchAccountsButtonText}>Switch accounts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "DMSans_400Regular",
    flex: 1,
    gap: 20,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  scrollViewContainer: {
    fontFamily: "DMSans_400Regular",
    gap: 20,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loginImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
    lineHeight: 32,
    textAlign: "center",
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 20,
  },
  loginButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loginButtonIcon: {
    width: 50,
    height: 50,
  },
  loginButtonText: {
    // Takes up entire available width
    flex: 1,
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
  },
  loginButtonSubtitle: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    marginTop: 8,
    color: COLORS.border,
  },
  switchAccountsButtonText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
    color: COLORS.border,
    alignSelf: "center",
    marginBottom: 20,
  },
});
