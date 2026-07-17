import AsyncStorage from "@react-native-async-storage/async-storage";
import { PDFFile } from "../../types/pdf";

const STORAGE_KEY = "PDF_MASTER_FILES";

export async function savePDFs(pdfs: PDFFile[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pdfs));
  } catch (error) {
    console.log("Error saving PDFs:", error);
  }
}

export async function loadPDFs(): Promise<PDFFile[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data) {
      return JSON.parse(data);
    }

    return [];
  } catch (error) {
    console.log("Error loading PDFs:", error);
    return [];
  }
}