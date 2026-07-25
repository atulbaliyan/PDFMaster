import { Canvas } from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import ImageLayer from "./ImageLayer";
import { ScanImage } from "../../../../types/scan";
import useEditorTransform from "../hooks/useEditorTransform";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

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
  translationX,
  translationY,
  rotation,
} = useEditorTransform();

const panGesture = Gesture.Pan().onUpdate((event) => {
  translationX.value = event.translationX;
  translationY.value = event.translationY;
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
    <GestureDetector gesture={panGesture}>
    <Canvas style={styles.canvas}>
      <ImageLayer
        page={page}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        zoom={zoom}
translationX={translationX}
translationY={translationY}
rotation={rotation}
      />
    </Canvas>
  </GestureDetector>
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