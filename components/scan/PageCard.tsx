import { View, Text, StyleSheet ,Image} from "react-native";
import PageActions from "./PageActions";
import { ScanImage } from "../../types/scan";

interface PageCardProps {
    page: ScanImage;
    index: number;

    onEdit: (page: ScanImage) => void;

    onDelete: (id: string) => void;
}

export default function PageCard({ page, index, onEdit, onDelete }: PageCardProps) {
  return (
   <View style={styles.card}>

  <Image
    source={{ uri: page.uri }}
    style={styles.thumbnail}
  />

  <View style={styles.info}>

    <View style={styles.header}>

      <Text style={styles.title}>
        Page {index + 1}
      </Text>

      <PageActions
    onEdit={() => onEdit(page)}
    onDelete={() => onDelete(page.id)}
/>

    </View>

    <Text style={styles.subtitle}>
      Cropped
    </Text>

  </View>

</View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  thumbnail: {
    width: 70,
    height: 90,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },

  // ⭐ Add this
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 4,
  },
});