import { View, StyleSheet } from "react-native";
import { CameraView as ExpoCameraView } from "expo-camera";
import CameraView from "./CameraView";
import CaptureButton from "./CaptureButton";

interface CameraStepProps {
  cameraRef: React.RefObject<ExpoCameraView | null>;
  onCapture: () => void;
}

export default function CameraStep({
  cameraRef,
  onCapture,
}: CameraStepProps) {
  return (
    <>
      <CameraView cameraRef={cameraRef} />

      <View style={styles.footer}>
        <CaptureButton onPress={onCapture} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
});