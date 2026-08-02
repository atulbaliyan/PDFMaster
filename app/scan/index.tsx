import { useEffect, useRef, useState } from "react";
import {  StyleSheet, View } from "react-native";
import { CameraView as ExpoCameraView, useCameraPermissions } from "expo-camera";
import ScanHeader from "../../components/scan/ScanHeader";
import { ScanStep } from "../../types/scanStep";
import { ScanImage } from "../../types/scan";
import CameraStep from "../../components/scan/CameraStep";
import PreviewStep from "../../components/scan/PreviewStep";
import CropStep from "../../components/scan/CropStep";
import { addPage } from "../../services/scan/scanSession";
import PagesStep from "../../components/scan/PagesStep";
import { Alert } from "react-native";
import { removePage } from "../../services/scan/scanSession";
import EditStep from "../../components/scan/editor/EditStep";
import { generatePdf } from "../../services/pdf/generatePdf";
import { savePdf } from "../../services/pdf/savePdf";
import { addPDF } from "../../services/storage/pdfStorage";
import { router } from "expo-router";


export default function ScanScreen() {
  const [step, setStep] = useState<ScanStep>("camera");

 const [scanImage, setScanImage] =useState<ScanImage | null>(null);
 const [scanImages, setScanImages] = useState<ScanImage[]>([]);
 const [selectedPage, setSelectedPage] = useState<ScanImage | null>(null);

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
{["camera", "preview", "crop", "pages"].includes(step) && (
  <ScanHeader />
)}
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


 onFinish={async () => {
  try {
    console.log("Generating PDF...");

    const pdf = await generatePdf({
      imageUris: scanImages.map((page) => page.uri),
    });

    console.log("PDF Generated");

    const pdfFile = await savePdf(pdf);

    console.log("PDF Saved:", pdfFile);

    await addPDF(pdfFile);

    console.log("Added to AsyncStorage");

    // Reset scanner
setScanImages([]);
setScanImage(null);
setSelectedPage(null);

// Start from camera next time
setStep("camera");

// Navigate to Home
router.replace("/(tabs)");

  } catch (error) {
    console.error("Create PDF Error:", error);
  }
}}



 onEditPage={(page) => {
  setSelectedPage(page);
  setStep("edit");
}}
  onDeletePage={(id) => {
    Alert.alert(
      "Delete Page",
      "Are you sure you want to remove this page?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setScanImages((pages) =>
              removePage(pages, id)
            );
          },
        },
      ]
    );
  }}
/>
)}

{/* EDIT STEP */}
{step === "edit" && selectedPage && (
  <EditStep
    page={selectedPage}
    onSave={(updatedPage: ScanImage) => {
      setScanImages((pages) =>
        pages.map((page) =>
          page.id === updatedPage.id ? updatedPage : page
        )
      );

      setSelectedPage(null);
      setStep("pages");
    }}
    onCancel={() => {
      setSelectedPage(null);
      setStep("pages");
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