import { Image, useImage } from "@shopify/react-native-skia";
import { ScanImage } from "../../../../types/scan";

interface ImageLayerProps {
  page: ScanImage;
  canvasWidth: number;
  canvasHeight: number;
}

export default function ImageLayer({ page, canvasWidth, canvasHeight }: ImageLayerProps) {
  const image = useImage(page.uri);

  if (!image) {return null; }
  const imageWidth = image.width();
const imageHeight = image.height();

const scale = Math.min(
  canvasWidth / imageWidth,
  canvasHeight / imageHeight
);

const width = imageWidth * scale;
const height = imageHeight * scale;

const x = (canvasWidth - width) / 2;
const y = (canvasHeight - height) / 2;

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