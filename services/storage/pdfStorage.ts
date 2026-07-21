import AsyncStorage from "@react-native-async-storage/async-storage";
import { PDFFile } from "../../types/pdf";

const STORAGE_KEY = "PDF_MASTER_FILES";

export async function savePDFs(pdfs: PDFFile[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pdfs));
    console.log("Saved to AsyncStorage:", pdfs);
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

export async function addPDF(pdf: PDFFile) {
  const pdfs = await loadPDFs();

  console.log("Before Add:", pdfs);

  pdfs.unshift(pdf);

  console.log("After Add:", pdfs);

  await savePDFs(pdfs);

  console.log("Saved Successfully");
}

export async function deletePDF(id: string) {
  const pdfs = await loadPDFs();

  const updated = pdfs.filter((pdf) => pdf.id !== id);

  await savePDFs(updated);
}

export async function renamePDF(id: string, newName: string) {
  const pdfs = await loadPDFs();

  const updated = pdfs.map((pdf) =>
    pdf.id === id
      ? {
          ...pdf,
          name: newName,
        }
      : pdf
  );

  await savePDFs(updated);
}