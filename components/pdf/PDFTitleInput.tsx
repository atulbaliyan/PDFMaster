import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

interface PDFTitleInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function PDFTitleInput({
  value,
  onChangeText,
}: PDFTitleInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>

      <TextInput
        placeholder="Enter document title"
        placeholderTextColor={Colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  label: {
    fontSize: Typography.fontSize.base,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.textPrimary,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
});