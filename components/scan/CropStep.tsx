import { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { ScanImage } from "../../types/scan";
import { cropImage } from "../../services/scan/cropImage";

interface CropStepProps {
  image: ScanImage;
  onComplete: (image: ScanImage) => void;
}

export default function CropStep({
  image,
  onComplete,
}: CropStepProps) {
  useEffect(() => {
    const startCrop = async () => {
      const cropped = await cropImage(image);

      onComplete(cropped);
    };

    startCrop();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});