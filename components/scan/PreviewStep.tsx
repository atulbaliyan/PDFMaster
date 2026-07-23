import { View, StyleSheet } from "react-native";
import PreviewImage from "./PreviewImage";
import PreviewActions from "./PreviewActions";
import { ScanImage } from "../../types/scan";

interface PreviewStepProps {
  image: ScanImage;
  onRetake: () => void;
  onContinue: () => void;
}

export default function PreviewStep({
  image,
  onRetake,
  onContinue,
}: PreviewStepProps) {
  return (
    <View style={styles.container}>
      <PreviewImage uri={image.uri} />

      <PreviewActions
        onRetake={onRetake}
        onContinue={onContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});