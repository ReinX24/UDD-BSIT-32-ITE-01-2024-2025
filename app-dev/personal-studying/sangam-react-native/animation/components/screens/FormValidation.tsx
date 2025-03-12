import { View, Text, StyleSheet, TextInput } from "react-native";
import Animated, {
  TransformArrayItem,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { useState } from "react";

const FormValidation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Shake the form input if there are errors
  const emailShake = useSharedValue(0);
  const passwordShake = useSharedValue(0);

  // For showing the checkmarks
  const emailCheckMark = useSharedValue(0);
  const passwordCheckMark = useSharedValue(0);

  // For showing the error fields if there are errors
  const emailErrorHeight = useSharedValue(0);
  const passwordErrorHeight = useSharedValue(0);

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

    // Checkmark will appear if the email is valid
    emailCheckMark.value = withSpring(isValidEmail ? 1 : 0);

    if (!isValidEmail) {
      emailShake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );

      emailErrorHeight.value = withSpring(20);
    } else {
      emailErrorHeight.value = withSpring(0);
    }
  };

  const validatePassword = (text: string) => {
    if (!text) {
      setPasswordError("Password is required.");
      return false;
    } else if (text.length < 6) {
      setPasswordError("Password must at least be 6 characters.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    // Validate the password
    const isValidPassword = validatePassword(text);

    // Checkmark will appear if the password is valid
    passwordCheckMark.value = withSpring(isValidPassword ? 1 : 0);

    if (!isValidPassword) {
      passwordShake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );

      passwordErrorHeight.value = withSpring(20);
    } else {
      passwordErrorHeight.value = withSpring(0);
    }
  };

  const onSubmit = (email: string, password: string) => {
    console.log("ONSUBMIT TRIGGERED");
  };

  const handleFormSubmit = () => {
    const isValidEmail = validateEmail(email);

    const isValidPassword = validateEmail(password);

    // If both the password and email are valid
    if (isValidEmail && isValidPassword) {
      onSubmit(email, password);
      // API call from here and whatever things you want to do
    } else {
      if (!isValidEmail) {
        emailShake.value = withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 100 }),
          withTiming(0, { duration: 50 })
        );

        emailErrorHeight.value = withSpring(20);
      }

      if (!isValidPassword) {
        passwordShake.value = withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 100 }),
          withTiming(0, { duration: 50 })
        );

        passwordErrorHeight.value = withSpring(20);
      }
    }
  };

  const emailAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: emailShake.value,
        },
      ],
    };
  });

  const passwordAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: passwordShake.value,
        },
      ],
    };
  });

  const emailCheckMarkStyle = useAnimatedStyle(() => {
    return {
      opacity: emailCheckMark.value,
      transform: [
        {
          scale: emailCheckMark.value,
        },
        {
          rotate: `${emailCheckMark.value * 360}deg`,
        },
      ] as TransformArrayItem["transform"],
    };
  });

  const passwordCheckMarkStyle = useAnimatedStyle(() => {
    return {
      opacity: passwordCheckMark.value,
      transform: [
        {
          scale: passwordCheckMark.value,
        },
        {
          rotate: `${passwordCheckMark.value * 360}deg`,
        },
      ] as TransformArrayItem["transform"],
    };
  });

  const emailErrorStye = useAnimatedStyle(() => {
    return {
      height: emailErrorHeight.value,
      // If height is 0, do not show error
      opacity: emailErrorHeight.value === 0 ? 0 : 1,
      transform: [
        {
          translateY: withSpring(emailErrorHeight.value / 2),
        },
      ],
    };
  });

  const passwordErrorStye = useAnimatedStyle(() => {
    return {
      height: passwordErrorHeight.value,
      // If height is 0, do not show error
      opacity: passwordErrorHeight.value === 0 ? 0 : 1,
      transform: [
        {
          translateY: withSpring(passwordErrorHeight.value / 2),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, emailAnimationStyle]}>
        <TextInput
          style={styles.inputComponent}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={handleEmailChange}
        />
        <Animated.View style={[styles.checkmark, emailCheckMarkStyle]}>
          <Text style={styles.checkmarkText}></Text>
        </Animated.View>
      </Animated.View>

      <Animated.Text style={[styles.errorText, emailErrorStye]}>
        {emailError}
      </Animated.Text>

      <Animated.View style={[styles.inputContainer, passwordAnimationStyle]}>
        <TextInput
          style={styles.inputComponent}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Animated.View style={[styles.checkmark, passwordCheckMarkStyle]}>
          <Text style={styles.checkmarkText}></Text>
        </Animated.View>
      </Animated.View>

      <Animated.Text style={[styles.errorText, passwordErrorStye]}>
        {passwordError}
      </Animated.Text>

      <Pressable style={styles.submitButton} onPress={handleFormSubmit}>
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
    marginBottom: 24,
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
