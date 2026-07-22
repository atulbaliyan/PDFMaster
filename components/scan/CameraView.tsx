import { CameraView as ExpoCameraView } from "expo-camera";
import { StyleSheet } from "react-native";

interface CameraViewProps {
  cameraRef: React.RefObject<ExpoCameraView | null>;
}

export default function CameraView({ cameraRef }: CameraViewProps) {
  return (
    <ExpoCameraView
      ref={cameraRef}
      style={styles.camera}
      facing="back"
    />
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});