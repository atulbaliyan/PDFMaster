import { PDFDocument } from "pdf-lib";

import { readImageBytes } from "./imageReader";
import { isPng } from "./imageType";

export interface GeneratePdfOptions {
  imageUris: string[];

  fileName?: string;

  pageSize?: "A4" | "Original";
}

export interface GeneratePdfResult {
  pdfBytes: Uint8Array;

  pageCount: number;
}

export async function generatePdf(
  options: GeneratePdfOptions
): Promise<GeneratePdfResult> {
  const { imageUris } = options;

  const pdf = await PDFDocument.create();

  for (const uri of imageUris) {
    const bytes = await readImageBytes(uri);

    const image = isPng(uri)
      ? await pdf.embedPng(bytes)
      : await pdf.embedJpg(bytes);

    const page = pdf.addPage([
      image.width,
      image.height,
    ]);

    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdf.save();

  return {
    pdfBytes,
    pageCount: imageUris.length,
  };
}