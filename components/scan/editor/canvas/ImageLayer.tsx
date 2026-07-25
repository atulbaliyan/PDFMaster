import { Image, useImage } from "@shopify/react-native-skia";
import { ScanImage } from "../../../../types/scan";
import useImageTransform from "../hooks/useImageTransform";

interface ImageLayerProps {
  page: ScanImage;
  canvasWidth: number;
  canvasHeight: number;

  zoom: number;

  translation: {
    x: number;
    y: number;
  };

  rotation: number;
}

export default function ImageLayer({
  page,
  canvasWidth,
  canvasHeight,
  zoom,
  translation,
  rotation,
}: ImageLayerProps) {
  const image = useImage(page.uri);

 const { x, y, width, height } = useImageTransform({
  imageWidth: image?.width() ?? 1,
  imageHeight: image?.height() ?? 1,
  canvasWidth,
  canvasHeight,
  zoom,
  translation,
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