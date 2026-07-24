import { View, Text, Pressable, StyleSheet } from "react-native";
import { ScanImage } from "../../types/scan";
import { FlatList } from "react-native";
import PageCard from "./PageCard";

interface PagesStepProps {
    pages: ScanImage[];

    onAddPage: () => void;

    onFinish: () => void;

    onDeletePage: (id: string) => void;

    onEditPage: (page: ScanImage) => void;
}

export default function PagesStep({
    pages,
    onAddPage,
    onFinish,
    onDeletePage,
    onEditPage,
}: PagesStepProps){



  return (
   <View style={styles.container}>

  <Text style={styles.title}>
    Scanned Pages ({pages.length})
  </Text>

  {/* Scrollable list */}
  <FlatList
    data={pages}
    keyExtractor={(item) => item.id}
    renderItem={({ item, index }) => (
     <PageCard
    page={item}
    index={index}
    onDelete={onDeletePage}
    onEdit={onEditPage}
/>
    )}
    style={styles.list}
    contentContainerStyle={{ paddingBottom: 20 }}
  />

  {/* Fixed footer */}
  <View style={styles.footer}>
    <Pressable
      style={styles.button}
      onPress={onAddPage}
    >
      <Text style={styles.buttonText}>
        Add Another Page
      </Text>
    </Pressable>

    <Pressable
      style={styles.button}
      onPress={onFinish}
    >
      <Text style={styles.buttonText}>
        Create PDF
      </Text>
    </Pressable>
  </View>

</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  list: {
    flex: 1,
  },

  footer: {
    paddingTop: 12,
    paddingBottom: 10,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});