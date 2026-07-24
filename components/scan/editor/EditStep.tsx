import { View, Text, Button, StyleSheet } from "react-native";
import { ScanImage } from "../../../types/scan";

interface EditStepProps {
  page: ScanImage;
  onSave: (page: ScanImage) => void;
  onCancel: () => void;
}

export default function EditStep({
  page,
  onSave,
  onCancel,
}: EditStepProps) {
  return (
    <View style={styles.container}>
      <Text>Edit Page</Text>

      <Button
        title="Save"
        onPress={() => onSave(page)}
      />

      <Button
        title="Cancel"
        onPress={onCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});