import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { validateLogin } from "../../utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AuthInput from "../../components/ui/AuthInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import { Theme } from "../../constants/theme";
import { login } from "../../services/auth/authService";
import { Alert } from "react-native";

interface LoginErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

const handleLogin = async () => {
  const validationErrors = validateLogin(email, password);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    setLoading(true);

    await login(email.trim(),password);

    Alert.alert("Welcome 🎉","Login Successful!");

    router.replace("/(tabs)");

    console.log("User Logged In");

  } catch (error: any) {

    let message = "Login failed.";

    switch (error.code) {

      case "auth/user-not-found":
        message = "No account found.";
        break;

      case "auth/wrong-password":
        message = "Incorrect password.";
        break;

      case "auth/invalid-credential":
        message =
          "Invalid email or password.";
        break;

      case "auth/invalid-email":
        message =
          "Invalid email address.";
        break;

      default:
        message = error.message;
    }

    Alert.alert(
      "Login Failed",
      message
    );

  } finally {
    setLoading(false);
  }
};

  return (
   <KeyboardAvoidingView
  style={styles.container}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={0}
>
     <ScrollView
  contentContainerStyle={styles.scrollContent}
  keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
  automaticallyAdjustKeyboardInsets={true}
>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons
              name="document-text"
              size={38}
              color={Colors.white}
            />
          </View>

          <Text style={styles.appName}>PDF Master</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>

          <Text style={styles.subtitle}>
            Sign in to continue managing your documents.
          </Text>
        </View>

        <View style={styles.form}>
          <AuthInput
            label="Email"
            placeholder="Enter your email"
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <AuthInput
            label="Password"
            placeholder="Enter your password"
            icon="lock-closed-outline"
            isPassword
            returnKeyType="done"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <Pressable
            style={styles.forgotPasswordContainer}
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            <Text style={styles.forgotPassword}>
              Forgot password?
            </Text>
          </Pressable>

          <PrimaryButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
          />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
          </Text>

          <Pressable
            onPress={() => router.push("/(auth)/signup")}
          >
            <Text style={styles.signupLink}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: Theme.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
  },

  appName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },

  header: {
    marginBottom: Spacing.xl,
  },

  title: {
    fontSize: Typography.fontSize.heading,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: 24,
  },

  form: {
    width: "100%",
  },

  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: -Spacing.sm,
    marginBottom: Spacing.lg,
  },

  forgotPassword: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.primary,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xl,
  },

  signupText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },

  signupLink: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
});