import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import HomeHeader from "../../components/home/HomeHeader";
import { Colors } from "../../constants/colors";
import SearchBar from "../../components/home/SearchBar";
import PDFCard from "../../components/home/PDFCard";
import { Text } from "react-native";
import FloatingButton from "../../components/home/FloatingButton";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ActionSheet from "../../components/home/ActionSheet";

export default function HomeScreen() {
  const bottomSheetRef =
  useRef<BottomSheetModal>(null);
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

<PDFCard
  title="Resume.pdf"
  size="2.4 MB"
  date="Today"
/>

<PDFCard
  title="College Notes.pdf"
  size="6.2 MB"
  date="Yesterday"
/>

<PDFCard
  title="Invoice.pdf"
  size="850 KB"
  date="3 Jul"
/>


{/* Floating Button and Action Sheet */}
<FloatingButton
  onPress={() => {
    bottomSheetRef.current?.present();
  }}
/>
<ActionSheet ref={bottomSheetRef} />


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