import { ExpoDocumentScanner } from "@platox/expo-document-scanner";
import { ScanImage } from "../../types/scan";

export async function cropImage(
  image: ScanImage
): Promise<ScanImage> {
  const result = await ExpoDocumentScanner.cropImage(image.uri, {
    enableImageEnhancement: true,
  });
console.log(result);
  if (result.cancelled) {
    return image;
  }

  return {
    ...image,
    uri: result.uri,
    cropped: true,
  };
}