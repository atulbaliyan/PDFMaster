import type { SharedValue } from "react-native-reanimated";

interface UseImageTransformProps {
  imageWidth: number;
  imageHeight: number;

  canvasWidth: number;
  canvasHeight: number;

  zoom: SharedValue<number>;

  translationX: SharedValue<number>;
  translationY: SharedValue<number>;

  rotation: SharedValue<number>;
}

export default function useImageTransform({
  imageWidth,
  imageHeight,
  canvasWidth,
  canvasHeight,
  zoom,
  
  translationX,
  translationY,
  rotation,
}: UseImageTransformProps) {

  
const baseScale = Math.min(
  canvasWidth / imageWidth,
  canvasHeight / imageHeight
);
const scale = baseScale * zoom.value;
  const width = imageWidth * scale;
  const height = imageHeight * scale;

  const x = (canvasWidth - width) / 2 + translationX.value;
const y = (canvasHeight - height) / 2 + translationY.value;

  


  return {
  x,
  y,
  width,
  height,
  scale,

  
};

}