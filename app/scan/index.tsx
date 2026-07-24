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
import CropStep from "../../components/scan/CropStep";
import { addPage } from "../../services/scan/scanSession";
import PagesStep from "../../components/scan/PagesStep";


export default function ScanScreen() {
  const [step, setStep] = useState<ScanStep>("camera");

 const [scanImage, setScanImage] =useState<ScanImage | null>(null);
 const [scanImages, setScanImages] = useState<ScanImage[]>([]);
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

{/* CAMERA STEP */}
   {step === "camera" && (
  <CameraStep
    cameraRef={cameraRef}
    onCapture={takePicture}
  />
)}

{/* PREVIEW STEP */}
{step === "preview" && scanImage && (
  <PreviewStep
    image={scanImage}
    onRetake={() => {
      setScanImage(null);
      setStep("camera");
    }}
   onContinue={() => {
  setStep("crop");
}}
  />
)}

{/* CROP STEP */}
{step === "crop" && scanImage && (
  <CropStep
    image={scanImage}
   onComplete={(image) => {
  setScanImage(image);

  setScanImages((previousPages) =>
    addPage(previousPages, image)
  );

  console.log("Pages:", scanImages.length + 1);

  setStep("pages");
     }}
  />
 )}
{/* REnder pagestep        */}

{step === "pages" && (
  <PagesStep
    pages={scanImages}
    onAddPage={() => {
      setScanImage(null);
      setStep("camera");
    }}
    onFinish={() => {
      console.log("Document Finished ✅");
      console.log(scanImages);
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