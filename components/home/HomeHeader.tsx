import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

interface HomeHeaderProps {
  userName: string;
}

export default function HomeHeader({
  userName,
}: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Good Evening 👋
      </Text>

      <Text style={styles.name}>
        {userName}
      </Text>

      <Text style={styles.subtitle}>
        Manage all your PDF documents in one place.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
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