import * as FileSystem from "expo-file-system/legacy";
import { toByteArray } from "base64-js";

export async function readImageBytes(
  uri: string
): Promise<Uint8Array> {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return toByteArray(base64);
}