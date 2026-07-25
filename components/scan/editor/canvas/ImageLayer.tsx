import { Image, useImage } from "@shopify/react-native-skia";
import { ScanImage } from "../../../../types/scan";
import useImageTransform from "../hooks/useImageTransform";

import type { SharedValue } from "react-native-reanimated";

interface ImageLayerProps {
  page: ScanImage;

  canvasWidth: number;
  canvasHeight: number;

  zoom: SharedValue<number>;

  translationX: SharedValue<number>;
  translationY: SharedValue<number>;

  rotation: SharedValue<number>;
}

export default function ImageLayer({
  page,
  canvasWidth,
  canvasHeight,
  zoom,
  translationX,
  translationY,
  rotation,
}: ImageLayerProps) {
  const image = useImage(page.uri);

 const { x, y, width, height } = useImageTransform({
  imageWidth: image?.width() ?? 1,
  imageHeight: image?.height() ?? 1,
  canvasWidth,
  canvasHeight,
  zoom,
  translationX,
  translationY,
  rotation,
});

  if (!image) {
    return null;
  }

  return (
    <Image
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
}