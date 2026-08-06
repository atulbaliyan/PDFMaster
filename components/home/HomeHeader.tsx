import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

import HomeMenu from "./HomeMenu";

import { logout } from "../../services/auth/authService";
import { router } from "expo-router";

interface HomeHeaderProps {
  userName: string;
}

export default function HomeHeader({
  userName,
}: HomeHeaderProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
  <View style={styles.container}>
    <View style={styles.topRow}>
      <View>
        <Text style={styles.greeting}>
          Good Evening 👋
        </Text>

        <Text style={styles.name}>
          {userName}
        </Text>
      </View>

      <Pressable
        onPress={() =>
          setMenuVisible(!menuVisible)
        }
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={28}
          color={Colors.textPrimary}
        />
      </Pressable>
    </View>

    <Text style={styles.subtitle}>
      Manage all your PDF documents in one place.
    </Text>

   <HomeMenu
  visible={menuVisible}
  onLogout={async () => {
    setMenuVisible(false);

    try {
      await logout();

      router.replace("/(auth)/login");
    } catch (error) {
      console.log(error);
    }
  }}
/>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  topRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

  greeting: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },

  name: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginTop: 4,
  },

  subtitle: {
    marginTop: Spacing.sm,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
});