import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

interface PDFContentInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function PDFContentInput({
  value,
  onChangeText,
}: PDFContentInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Content</Text>

      <TextInput
        multiline
        textAlignVertical="top"
        placeholder="Start writing here..."
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
    flex: 1,
    marginBottom: Spacing.lg,
  },

  label: {
    fontSize: Typography.fontSize.base,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.textPrimary,
  },

  input: {
    flex: 1,
    minHeight: 250,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
});