import { Modal, View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Typography } from "../../constants/typography";
import { Spacing } from "../../constants/spacing";
import { useState, useEffect } from "react";

interface RenameModalProps {
  visible: boolean;
  currentName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}

export default function RenameModal({
  visible,
  currentName,
  onClose,
  onSave,
}: RenameModalProps) {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Rename PDF</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter PDF name"
            autoFocus
          />

          <View style={styles.buttons}>
            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={styles.saveButton}
              onPress={() => onSave(name.trim())}
            >
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modal: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.xl,
  },

  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    marginBottom: Spacing.lg,
    color: Colors.textPrimary,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: Typography.fontSize.base,
    marginBottom: Spacing.xl,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  cancelButton: {
    marginRight: 16,
  },

  cancelText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },

  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  saveText: {
    color: Colors.white,
    fontWeight: "700",
  },
});