import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Pdf from "react-native-pdf";

export default function PDFViewerScreen() {
  const { uri } = useLocalSearchParams<{
    uri: string;
  }>();

  return (
    <SafeAreaView style={styles.container}>
      <Pdf
        source={{ uri: uri as string }}
        style={styles.pdf}
        trustAllCerts={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  pdf: {
    flex: 1,
    width: "100%",
  },
});