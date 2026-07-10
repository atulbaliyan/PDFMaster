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
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signup } from "../../services/auth/authService";
import { Alert } from "react-native";

import AuthInput from "../../components/ui/AuthInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import { Theme } from "../../constants/theme";
import { validateSignup } from "../../utils/validation";

interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupScreen() {
    const [errors, setErrors] = useState<SignupErrors>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
  const validationErrors = validateSignup(
    name,
    email,
    password,
    confirmPassword
  );

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    setLoading(true);

    await signup(
      email.trim(),
      password
    );

    Alert.alert(
      "Success 🎉",
      "Account created successfully!"
    );

    router.replace("/(auth)/login");

  } catch (error: any) {

    let message = "Something went wrong.";

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "This email is already registered.";
        break;

      case "auth/invalid-email":
        message = "Invalid email address.";
        break;

      case "auth/weak-password":
        message = "Password should be at least 6 characters.";
        break;

      default:
        message = error.message;
    }

    Alert.alert("Signup Failed", message);

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
        automaticallyAdjustKeyboardInsets
      >
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.textPrimary}
          />
        </Pressable>

        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons
              name="document-text"
              size={34}
              color={Colors.white}
            />
          </View>

          <Text style={styles.appName}>PDF Master</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Create account</Text>

          <Text style={styles.subtitle}>
            Create your account and start managing your documents.
          </Text>
        </View>

        <View style={styles.form}>
          <AuthInput
            label="Full Name"
            placeholder="Enter your full name"
            icon="person-outline"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
            error={errors.name}
          />

          <AuthInput
            label="Email"
            placeholder="Enter your email"
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            error={errors.email}
          />

          <AuthInput
            label="Password"
            placeholder="Create a password"
            icon="lock-closed-outline"
            isPassword
            value={password}
            onChangeText={setPassword}
            returnKeyType="next"
            error={errors.password}

          />

          <AuthInput
            label="Confirm Password"
            placeholder="Enter your password again"
            icon="shield-checkmark-outline"
            isPassword
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            returnKeyType="done"
            error={errors.confirmPassword}
          />

          <PrimaryButton
            title="Create Account"
            onPress={handleSignup}
            loading={loading}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
          </Text>

          <Pressable onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.loginLink}>Sign In</Text>
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

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: Theme.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    marginBottom: Spacing.sm,
  },

  appName: {
    fontSize: Typography.fontSize.lg,
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

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xl,
  },

  loginText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },

  loginLink: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
});