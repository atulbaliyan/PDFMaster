import * as FileSystem from "expo-file-system/legacy";
import { fromByteArray } from "base64-js";

import { PDFFile } from "../../types/pdf";
import { GeneratePdfResult } from "./generatePdf";

export async function savePdf(
  pdf: GeneratePdfResult,
  fileName?: string
): Promise<PDFFile> {
 const now = new Date();

const name =
  fileName ??
  `Scan_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`;

  const uri =
    FileSystem.documentDirectory +
    `${name}.pdf`;

  const base64 = fromByteArray(pdf.pdfBytes);

  await FileSystem.writeAsStringAsync(
    uri,
    base64,
    {
      encoding: FileSystem.EncodingType.Base64,
    }
  );

  return {
    id: Date.now().toString(),

    name,

    uri,

    size: pdf.pdfBytes.length,

    date: new Date().toISOString(),
  };
}