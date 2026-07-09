import { StyleSheet, View } from "react-native";
import { useState } from "react";

import AuthInput from "../components/ui/AuthInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
import { Spacing } from "../constants/spacing";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <AuthInput
        label="Email"
        placeholder="Enter your email"
        icon="mail-outline"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <AuthInput
        label="Password"
        placeholder="Enter your password"
        icon="lock-closed-outline"
        isPassword
        value={password}
        onChangeText={setPassword}
      />

      <PrimaryButton
        title="Continue"
        onPress={() => console.log({ email, password })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.background,
  },
});