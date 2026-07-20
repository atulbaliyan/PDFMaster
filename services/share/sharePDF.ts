import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

export async function sharePDF(uri: string) {
  try {
    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert(
        "Sharing Not Available",
        "Sharing is not supported on this device."
      );
      return;
    }

    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Share PDF",
    });
  } catch (error) {
    console.error("Error sharing PDF:", error);

    Alert.alert(
      "Error",
      "Something went wrong while sharing the PDF."
    );
  }
}