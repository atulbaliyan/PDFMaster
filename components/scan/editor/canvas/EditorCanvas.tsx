import { Canvas } from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import ImageLayer from "./ImageLayer";
import { ScanImage } from "../../../../types/scan";
import useEditorTransform from "../hooks/useEditorTransform";

interface EditorCanvasProps {
    page: ScanImage;
}



export default function EditorCanvas({ page,}: EditorCanvasProps) {
   
    const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
});
const {
  zoom,
  setZoom,
  translation,
  setTranslation,
  rotation,
  setRotation,
} = useEditorTransform();

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
  zoom={zoom}
  translation={translation}
  rotation={rotation}
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