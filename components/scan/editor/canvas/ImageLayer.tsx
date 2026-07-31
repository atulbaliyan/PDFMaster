import {
  Group,
  Image,
  ColorMatrix,
  useImage,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";
import { ScanImage } from "../../../../types/scan";
import useImageTransform from "../hooks/useImageTransform";

import type { SharedValue } from "react-native-reanimated";
import {
  brightnessMatrix,
  contrastMatrix,
  filterMatrix,
  multiplyMatrices,
} from "../utils/colorMatrices";
import { FilterType } from "../../../../types/filter";

interface ImageLayerProps {
  page: ScanImage;

  canvasWidth: number;
  canvasHeight: number;

  zoom: SharedValue<number>;
  translationX: SharedValue<number>;
  translationY: SharedValue<number>;
  rotation: SharedValue<number>;

  brightness: number;// <-- NEW
  contrast: number;
  filter: FilterType;
}

export default function ImageLayer({
  page,
  canvasWidth,
  canvasHeight,
  zoom,
  translationX,
  translationY,
  rotation,
  brightness,
   contrast,// <-- NEW
  filter,
}: ImageLayerProps) {
  const image = useImage(page.uri);

 const { x, y, width, height } = useImageTransform({
  imageWidth: image?.width() ?? 1,
  imageHeight: image?.height() ?? 1,
  canvasWidth,
  canvasHeight,
 
});
const centerX = x + width / 2;
const centerY = y + height / 2;

 const transform = useDerivedValue(() => [
  { translateX: translationX.value },
  { translateY: translationY.value },
  { scale: zoom.value },
  { rotate: rotation.value },
]);

const matrix = multiplyMatrices(
    filterMatrix(filter),
    multiplyMatrices(
        brightnessMatrix(brightness),
        contrastMatrix(contrast)
    )
);
 if (!image) {
    return null;
  }
 return (
 <Group
  origin={{ x: centerX, y: centerY }}
  transform={transform}
>
  <Image
  image={image}
  x={x}
  y={y}
  width={width}
  height={height}
>
  <ColorMatrix matrix={matrix} />
</Image>
</Group>

);
}


