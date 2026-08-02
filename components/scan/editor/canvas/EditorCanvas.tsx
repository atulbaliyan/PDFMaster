import { Canvas, useCanvasRef } from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import ImageLayer from "./ImageLayer";
import { ScanImage } from "../../../../types/scan";

import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import {
  SharedValue,
  useSharedValue,
} from "react-native-reanimated";

import { FilterType } from "../../../../types/filter";
import * as FileSystem from "expo-file-system/legacy";

interface EditorCanvasProps {
  page: ScanImage;

  zoom: SharedValue<number>;
  translationX: SharedValue<number>;
  translationY: SharedValue<number>;
  rotation: SharedValue<number>;

  brightness: number;
  contrast: number;

  filter: FilterType;
}
export interface EditorCanvasRef {
  saveImage: () => Promise<string>;
}
const EditorCanvas = forwardRef<
  EditorCanvasRef,
  EditorCanvasProps
>(function EditorCanvas(
  {
    page,
    zoom,
    translationX,
    translationY,
    rotation,
    brightness,
    contrast,
    filter,
  },
  ref
) {
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const canvasRef = useCanvasRef();
  useImperativeHandle(ref, () => ({
  async saveImage() {
    console.log("Taking snapshot...");



// for saving, we need to reset the zoom and translation to default values
 const oldZoom = zoom.value;
const oldX = translationX.value;
const oldY = translationY.value;

zoom.value = 1;
translationX.value = 0;
translationY.value = 0; 
await new Promise((resolve) =>
  requestAnimationFrame(() => resolve(null))
);


    const snapshot =
      await canvasRef.current?.makeImageSnapshotAsync();

    if (!snapshot) {
      throw new Error("Snapshot failed.");
    }

   const base64 = snapshot.encodeToBase64();




   // restore the zoom and translation values and save the image with filter, brightness, and contrast applied

const uri =
  FileSystem.documentDirectory +
  `edited_${Date.now()}.png`;

await FileSystem.writeAsStringAsync(
  uri,
  base64,
  {
    encoding: FileSystem.EncodingType.Base64,
  }
);

zoom.value = oldZoom;
translationX.value = oldX;
translationY.value = oldY;

console.log("Saved at:", uri);

return uri;
  },
}));

  useEffect(() => {
    const id = setInterval(() => {
      console.log(
        "Shared Values ->",
        translationX.value,
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
        <Canvas
          ref={canvasRef}
          style={styles.canvas}
        >
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  canvas: {
    flex: 1,
  },
});

export default EditorCanvas;