import { useEffect, useRef, useState } from "react";
import {  StyleSheet, View } from "react-native";
import { CameraView as ExpoCameraView, useCameraPermissions } from "expo-camera";
import CameraView from "../../components/scan/CameraView";
import CaptureButton from "../../components/scan/CaptureButton";
import ScanHeader from "../../components/scan/ScanHeader";
import { ScanStep } from "../../types/scanStep";

import { ScanImage } from "../../types/scan";
import CameraStep from "../../components/scan/CameraStep";
import PreviewStep from "../../components/scan/PreviewStep";


export default function ScanScreen() {
  const [step, setStep] = useState<ScanStep>("camera");

 const [scanImage, setScanImage] =
  useState<ScanImage | null>(null);
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

setScanImage({
  id: Date.now().toString(),
  uri: photo.uri,
  rotation: 0,
  brightness: 0,
  contrast: 0,
  filter: "original",
  cropped: false,
});

setStep("preview");

  };

  if (!permission?.granted) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ScanHeader />

   {step === "camera" && (
  <CameraStep
    cameraRef={cameraRef}
    onCapture={takePicture}
  />
)}

{step === "preview" && scanImage && (
  <PreviewStep
    image={scanImage}
    onRetake={() => {
      setScanImage(null);
      setStep("camera");
    }}
    onContinue={() => {
      console.log("Continue clicked");
    }}
  />
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