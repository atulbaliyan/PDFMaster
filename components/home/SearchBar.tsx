import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Theme } from "../../constants/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={22}
        color={Colors.textSecondary}
      />

     <TextInput
  value={value}
  onChangeText={(text) => {
    console.log("Typed:", text);
    onChangeText(text);
  }}
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