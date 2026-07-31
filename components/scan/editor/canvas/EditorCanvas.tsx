import { Canvas } from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import ImageLayer from "./ImageLayer";
import { ScanImage } from "../../../../types/scan";

import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import { runOnJS } from "react-native-reanimated";
import useEditorTransform from "../hooks/useEditorTransform";
import { FilterType } from "../../../../types/filter";


interface EditorCanvasProps {
  page: ScanImage;

  zoom: SharedValue<number>;
  translationX: SharedValue<number>;
  translationY: SharedValue<number>;
  rotation: SharedValue<number>;

  brightness: number;
  contrast: number;// <-- Add this
  filter: FilterType;
}
export default function EditorCanvas({
  page,
  zoom,
  translationX,
  translationY,
  rotation,
  brightness, // <-- Add this
  contrast,
  filter, // <-- Add this
}: EditorCanvasProps) {
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  // Debug state to force React re-render
  const [, forceUpdate] = useState(0);

 

  // Debug: print SharedValue every second
  useEffect(() => {
    const id = setInterval(() => {
      console.log(
        "Shared Values ->",
        "X:",
        translationX.value,
        "Y:",
        translationY.value
      );
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const startX = useSharedValue(0);
const startY = useSharedValue(0);

const panGesture = Gesture.Pan()
  .onBegin(() => {
    startX.value = translationX.value;
    startY.value = translationY.value;
  })
  .onUpdate((event) => {
    translationX.value = startX.value + event.translationX;
    translationY.value = startY.value + event.translationY;
  });



  const startZoom = useSharedValue(1);
  const pinchGesture = Gesture.Pinch()
  .onBegin(() => {
    startZoom.value = zoom.value;
  })
  .onUpdate((event) => {
    zoom.value = startZoom.value * event.scale;
  });
  const gesture = Gesture.Simultaneous(
  panGesture,
  pinchGesture
);


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
     <GestureDetector gesture={gesture}>
        <Canvas style={styles.canvas}>
          <ImageLayer
            page={page}
            canvasWidth={canvasSize.width}
            canvasHeight={canvasSize.height}
            zoom={zoom}
            translationX={translationX}
            translationY={translationY}
            rotation={rotation}
            brightness={brightness}
            contrast={contrast}
            filter={filter}
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