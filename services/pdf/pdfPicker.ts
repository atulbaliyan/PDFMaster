import * as DocumentPicker from "expo-document-picker";

export async function pickPDF() {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/pdf",
    copyToCacheDirectory: true,
  });

  console.log("RESULT:", JSON.stringify(result, null, 2));

  if (result.canceled) {
    console.log("User cancelled");
    return null;
  }

  console.log("PDF:", result.assets[0]);

  return result.assets[0];
}