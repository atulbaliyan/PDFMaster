import { useEffect, useRef, useState } from "react";
import {  StyleSheet, View } from "react-native";
import { CameraView as ExpoCameraView, useCameraPermissions } from "expo-camera";
import CameraView from "../../components/scan/CameraView";
import CaptureButton from "../../components/scan/CaptureButton";
import ScanHeader from "../../components/scan/ScanHeader";
import { ScanStep } from "../../types/scanStep";
import PreviewActions from "../../components/scan/PreviewActions";
import PreviewImage from "../../components/scan/PreviewImage";

export default function ScanScreen() {
  const [step, setStep] = useState<ScanStep>("camera");

const [capturedImage, setCapturedImage] = useState<string | null>(null);
    
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<ExpoCameraView>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const takePicture = async () => {
    if (!cameraRef.current) return;

  const photo = await cameraRef.current.takePictureAsync({
  quality: 0.8,
});

if (!photo) return;

setCapturedImage(photo.uri);

setStep("preview");

  };

  if (!permission?.granted) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ScanHeader />

     {step === "camera" && (
  <>
    <CameraView cameraRef={cameraRef} />

    <View style={styles.footer}>
      <CaptureButton onPress={takePicture} />
    </View>
  </>
)}

{step === "preview" && capturedImage && (
  <View
    style={{
      flex: 1,
      backgroundColor: "black",
    }}
  >
    <PreviewImage uri={capturedImage} />

    <PreviewActions
      uri={capturedImage}
      onRetake={() => {
        setCapturedImage(null);
        setStep("camera");
      }}
     onContinue={() => {
  console.log("Continue clicked");
}}
    />
  </View>
)}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
});