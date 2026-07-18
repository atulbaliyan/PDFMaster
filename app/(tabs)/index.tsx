import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Alert } from "react-native";
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
import { router } from "expo-router";


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


const deletePDF = (id: string) => {
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
          setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
        },
      },
    ]
  );
};


  return (
    <SafeAreaView style={styles.container}>
      
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
{pdfs.map((pdf) => (
 <PDFCard
  key={pdf.id}
  title={pdf.name}
  size={formatFileSize(pdf.size)}
  date={pdf.date}
  onPress={() =>
    router.push({
      pathname: "/pdf/viewer",
      params: {
        uri: pdf.uri,
        name: pdf.name,
      },
    })
  }
  onLongPress={() => deletePDF(pdf.id)}
/>
))}




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
        date: "Today",
      },
      ...prev,
    ]);
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