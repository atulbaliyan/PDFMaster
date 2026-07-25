import { Image, StyleSheet, View } from "react-native";
import { ScanImage } from "../../../types/scan";

interface ImageCanvasProps {
  page: ScanImage;
}

export default function ImageCanvas({
  page,
}: ImageCanvasProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: page.uri }}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});