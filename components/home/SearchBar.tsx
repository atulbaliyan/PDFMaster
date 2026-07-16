import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Theme } from "../../constants/theme";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={22}
        color={Colors.textSecondary}
      />

      <TextInput
        placeholder="Search PDFs..."
        placeholderTextColor={Colors.textSecondary}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F5F6FA",

    borderRadius: Theme.borderRadius.lg,

    paddingHorizontal: Spacing.md,

    height: 56,

    marginBottom: Spacing.xl,
  },

  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});