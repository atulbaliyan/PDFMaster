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

console.log("formatDate =", formatDate);


export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [pdfs, setPdfs] = useState<PDFFile[]>([]);
  useEffect(() => {
  async function getPDFs() {
    const storedPDFs = await loadPDFs();
    setPdfs(storedPDFs);
  }

  getPDFs();
}, []);


useEffect(() => {
  savePDFs(pdfs);
}, [pdfs]);

const [renameVisible, setRenameVisible] = useState(false);
const [selectedPDF, setSelectedPDF] = useState<PDFFile | null>(null);

const showPDFOptions = (id: string) => {
  Alert.alert(
    "PDF Options",
    "What would you like to do?",
    [
     {
        text: "Rename",
        onPress: () => {
        const pdf = pdfs.find((item) => item.id === id);

        if (!pdf) return;

        setSelectedPDF(pdf);
        setRenameVisible(true);
  },
},
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
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
                onPress: () => {
                  setPdfs((prev) =>
                    prev.filter((pdf) => pdf.id !== id)
                  );
                },
              },
            ]
          );
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]
  );
};


  return (
    <SafeAreaView style={styles.container}>
      
      
      
     <FlatList
  data={pdfs}
  keyExtractor={(item) => item.id}
  ListHeaderComponent={
    <>
      <HomeHeader userName="Atul" />

      <SearchBar />

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
  onPDFSelected={(pdf) => {
    console.log("Home received:", pdf);

    setPdfs((prev) => [
      {
        id: Date.now().toString(),
        name: pdf.name,
        uri: pdf.uri,
        size: pdf.size ?? 0,
        date: formatDate(Date.now()),
      },
      ...prev,
    ]);
  }}
/>


<RenameModal
  visible={renameVisible}
  currentName={selectedPDF?.name ?? ""}
  onClose={() => {
    setRenameVisible(false);
    setSelectedPDF(null);
  }}
  onSave={(newName) => {
  if (!selectedPDF) return;

  // Prevent empty names
  if (!newName.trim()) {
    Alert.alert("Invalid Name", "PDF name cannot be empty.");
    return;
  }

  setPdfs((prev) =>
    prev.map((pdf) =>
      pdf.id === selectedPDF.id
        ? {
            ...pdf,
            name: newName.trim(),
          }
        : pdf
    )
  );

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