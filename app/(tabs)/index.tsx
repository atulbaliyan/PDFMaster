import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Alert, FlatList } from "react-native";
import HomeHeader from "../../components/home/HomeHeader";
import { Colors } from "../../constants/colors";
import SearchBar from "../../components/home/SearchBar";
import PDFCard from "../../components/home/PDFCard";
import FloatingButton from "../../components/home/FloatingButton";
import { useRef ,useEffect ,useState} from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ActionSheet from "../../components/home/ActionSheet";
import { PDFFile } from "../../types/pdf";
import { savePDFs, loadPDFs } from "../../services/storage/pdfStorage";
import { formatFileSize } from "../../utils/formatFileSize";
import { formatDate } from "../../utils/formatDate";
import { router } from "expo-router";
import RenameModal from "../../components/home/RenameModal";
import { sharePDF } from "../../services/share/sharePDF";
import PDFOptionsSheet from "../../components/home/PDFOptionsSheet";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { addPDF } from "../../services/storage/pdfStorage";
import {
  deletePDF,
  renamePDF,
} from "../../services/storage/pdfStorage";
console.log("formatDate =", formatDate);


export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const pdfOptionsSheetRef = useRef<BottomSheetModal>(null);
  const [pdfs, setPdfs] = useState<PDFFile[]>([]);
 
 
  useFocusEffect(
  useCallback(() => {
    async function getPDFs() {
      const storedPDFs = await loadPDFs();
      setPdfs(storedPDFs);
    }

    getPDFs();
  }, [])
);




const [searchQuery, setSearchQuery] = useState("");

const [renameVisible, setRenameVisible] = useState(false);
const [selectedPDF, setSelectedPDF] = useState<PDFFile | null>(null);

const showPDFOptions = (id: string) => {
  const pdf = pdfs.find((item) => item.id === id);

  if (!pdf) return;

  setSelectedPDF(pdf);

  pdfOptionsSheetRef.current?.present();
};



const filteredPDFs = pdfs.filter((pdf) =>
  pdf.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
);

console.log("Search:", searchQuery);
console.log("PDF Names:", pdfs.map((p) => p.name));
console.log("Filtered:", filteredPDFs.map((p) => p.name));



  return (
    <SafeAreaView style={styles.container}>
      
      
      
     <FlatList
  data={filteredPDFs}
  keyExtractor={(item) => item.id}
  ListHeaderComponent={
    <>
      <HomeHeader userName="Atul" />

      <SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
/>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 16,
        }}
      >
        Recent PDFs
      </Text>
    </>
  }
  renderItem={({ item }) => (
    <PDFCard
      title={item.name}
      size={formatFileSize(item.size)}
      date={item.date}
      onPress={() =>
        router.push({
          pathname: "/pdf/viewer",
          params: {
            uri: item.uri,
            name: item.name,
          },
        })
      }
      onLongPress={() => showPDFOptions(item.id)}
    />
  )}
  contentContainerStyle={{
    paddingBottom: 120,
  }}
  ListEmptyComponent={
  <Text
    style={{
      textAlign: "center",
      color: Colors.textSecondary,
      marginTop: 40,
      fontSize: 16,
    }}
  >
    No PDFs found.
  </Text>
}
/>




{/* Floating Button and Action Sheet */}
<FloatingButton
  onPress={() => {
    console.log("Opening Sheet 🚀");
    bottomSheetRef.current?.present();
  }}
/>

<ActionSheet
  ref={bottomSheetRef}
  onPDFSelected={async (pdf) => {
  console.log("Home received:", pdf);

  const newPDF: PDFFile = {
    id: Date.now().toString(),
    name: pdf.name,
    uri: pdf.uri,
    size: pdf.size ?? 0,
    date: formatDate(pdf.lastModified ?? Date.now()),
  };

  // Save to AsyncStorage
  await addPDF(newPDF);

  // Reload all PDFs from storage
  const storedPDFs = await loadPDFs();
  setPdfs(storedPDFs);
}}
onCreateBlankPDF={() => {
    router.push("/pdf/create");
  }}
  onScanDocument={() => {
    router.push("/scan");
  }}
/>


<PDFOptionsSheet
  ref={pdfOptionsSheetRef}
  onRename={() => {
    if (!selectedPDF) return;

    pdfOptionsSheetRef.current?.dismiss();

    setTimeout(() => {
      setRenameVisible(true);
    }, 250);
  }}
  onShare={async () => {
    if (!selectedPDF) return;

    pdfOptionsSheetRef.current?.dismiss();

    setTimeout(async () => {
      await sharePDF(selectedPDF.uri);
    }, 250);
  }}

  onDelete={() => {
  if (!selectedPDF) return;

  pdfOptionsSheetRef.current?.dismiss();

  setTimeout(() => {
    Alert.alert(
      "Delete PDF",
      "Are you sure you want to delete this PDF?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
  await deletePDF(selectedPDF.id);

  const storedPDFs = await loadPDFs();

  setPdfs(storedPDFs);
},
        },
      ]
    );
  }, 250);
}}
/>



<RenameModal
  visible={renameVisible}
  currentName={selectedPDF?.name ?? ""}
  onClose={() => {
    setRenameVisible(false);
    setSelectedPDF(null);
  }}
  onSave={async (newName) => {
  if (!selectedPDF) return;

  if (!newName.trim()) {
    Alert.alert(
      "Invalid Name",
      "PDF name cannot be empty."
    );
    return;
  }

  await renamePDF(
    selectedPDF.id,
    newName.trim()
  );

  const storedPDFs = await loadPDFs();

  setPdfs(storedPDFs);

  setRenameVisible(false);
  setSelectedPDF(null);
}}
/>

   
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
  },
});