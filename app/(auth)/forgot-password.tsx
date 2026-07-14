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

import AuthInput from "../../components/ui/AuthInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import { Theme } from "../../constants/theme";
import { validateForgotPassword } from "../../utils/validation";
import { resetPassword } from "../../services/auth/authService";
import { Alert } from "react-native";

interface ForgotPasswordErrors {
  email?: string;
}

export default function ForgotPasswordScreen() {
    const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

const handleResetPassword = async () => {
  const validationErrors = validateForgotPassword(email);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    setLoading(true);

    await resetPassword(email.trim());

    Alert.alert(
      "Email Sent 📧",
      "Password reset link has been sent to your email."
    );

    router.replace("/(auth)/login");

  } catch (error: any) {

    let message = "Failed to send reset email.";

    switch (error.code) {

      case "auth/user-not-found":
        message = "No account found with this email.";
        break;

      case "auth/invalid-email":
        message = "Invalid email address.";
        break;

      default:
        message = error.message;
    }

    Alert.alert("Error", message);

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
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.textPrimary}
          />
        </Pressable>

        <View style={styles.iconContainer}>
          <View style={styles.iconBox}>
            <Ionicons
              name="key-outline"
              size={38}
              color={Colors.primary}
            />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Forgot password?</Text>

          <Text style={styles.subtitle}>
            Enter the email address associated with your account and we'll send
            you a password reset link.
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
            value={email}
            onChangeText={setEmail}
            returnKeyType="done"
            error={errors.email}
          />

          <PrimaryButton
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={loading}
          />
        </View>

        <Pressable
          style={styles.backToLogin}
          onPress={() => router.replace("/(auth)/login")}
        >
          <Ionicons
            name="arrow-back"
            size={17}
            color={Colors.primary}
          />

          <Text style={styles.backToLoginText}>
            Back to Sign In
          </Text>
        </Pressable>
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
    marginBottom: Spacing.xl,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },

  iconBox: {
    width: 80,
    height: 80,
    borderRadius: Theme.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryLight,
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

  backToLogin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.xl,
  },

  backToLoginText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.primary,
  },
});