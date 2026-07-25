import { Canvas } from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import ImageLayer from "./ImageLayer";
import { ScanImage } from "../../../../types/scan";

interface EditorCanvasProps {
    page: ScanImage;
}



export default function EditorCanvas({
    page,

}: EditorCanvasProps) {
    const [canvasSize, setCanvasSize] = useState({
  width: 0,
  height: 0,
});

  return (
    <View
       style={styles.container}
       onLayout={(event) => {
       const { width, height } = event.nativeEvent.layout;

       setCanvasSize({
       width,
       height,
       });
     }}
   >
    <Canvas style={styles.canvas}>
    <ImageLayer
  page={page}
  canvasWidth={canvasSize.width}
  canvasHeight={canvasSize.height}
/>
   </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
});