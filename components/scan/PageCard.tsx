import { View, Text, StyleSheet } from "react-native";

interface PageCardProps {
  index: number;
}

export default function PageCard({ index }: PageCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>📄 Page {index + 1}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});