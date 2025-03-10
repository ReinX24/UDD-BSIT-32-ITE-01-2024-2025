import { View, Text, StyleSheet, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import { Pressable } from "react-native";
import { useState } from "react";

const FormValidation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (text: string) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!text) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(text)) {
      setEmailError("Invalid Email Format");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);

    // Validate the email
    const isValidEmail = validateEmail(text);
  };

  const handlePasswordChange = () => {};

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer]}>
        <TextInput
          style={styles.inputComponent}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={handleEmailChange}
        />
        <Animated.View style={[styles.checkmark]}>
          <Text style={styles.checkmarkText}></Text>
        </Animated.View>
      </Animated.View>

      <Animated.Text style={styles.errorText}>Email Error</Animated.Text>

      <Animated.View style={[styles.inputContainer]}>
        <TextInput
          style={styles.inputComponent}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Animated.View style={[styles.checkmark]}>
          <Text style={styles.checkmarkText}></Text>
        </Animated.View>
      </Animated.View>

      <Animated.Text style={styles.errorText}>Password Error</Animated.Text>

      <Pressable style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: "#f2f2f2",
    shadowColor: "#2f2f2f",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  inputComponent: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  checkmark: {
    position: "absolute",
    right: 16,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  checkmarkText: {
    color: "#40ad44",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff5255",
    fontSize: 14,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  submitButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#f2f2f2",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default FormValidation;
