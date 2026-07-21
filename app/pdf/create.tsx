import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PDFTitleInput from "../../components/pdf/PDFTitleInput";
import PDFContentInput from "../../components/pdf/PDFContentInput";
import SavePDFButton from "../../components/pdf/SavePDFButton";
import CreatePDFHeader from "../../components/pdf/CreatePDFHeader";
import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { createPDF } from "../../services/pdf/createPDF";
import { addPDF } from "../../services/storage/pdfStorage";
import { router } from "expo-router";

export default function CreatePDFScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
  if (!title.trim()) {
    alert("Please enter a title.");
    return;
  }

  if (!content.trim()) {
    alert("Please enter some content.");
    return;
  }

  try {
    const uri = await createPDF(title, content);

    
     await addPDF({
      id: Date.now().toString(),
      name: `${title}.pdf`,
      uri,
      size: 0,
      date: new Date().toLocaleDateString(),
    });

    router.back();
        console.log("PDF created:", uri);


  } catch (error) {
    console.error(error);
    alert("Failed to create PDF.");
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
          <CreatePDFHeader />

        <PDFTitleInput
          value={title}
          onChangeText={setTitle}
        />

        <PDFContentInput
          value={content}
          onChangeText={setContent}
        />

        <SavePDFButton
          onPress={handleSave}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  keyboard: {
    flex: 1,
    padding: Spacing.lg,
  },
});