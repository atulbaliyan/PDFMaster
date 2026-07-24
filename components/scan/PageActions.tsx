import { Pressable, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface PageActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function PageActions({
  onEdit,
  onDelete,
}: PageActionsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.iconButton}
        onPress={onEdit}
      >
        <Feather
          name="edit-2"
          size={20}
          color="#2563EB"
        />
      </Pressable>

      <Pressable
        style={styles.iconButton}
        onPress={onDelete}
      >
        <Feather
          name="trash-2"
          size={20}
          color="#DC2626"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },

  iconButton: {
    padding: 8,
  },
});