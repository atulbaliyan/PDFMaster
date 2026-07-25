

interface UseImageTransformProps {
  imageWidth: number;
  imageHeight: number;

  canvasWidth: number;
  canvasHeight: number;

  zoom: number;

  translation: {
    x: number;
    y: number;
  };

  rotation: number;
}

export default function useImageTransform({
  imageWidth,
  imageHeight,
  canvasWidth,
  canvasHeight,
  zoom,
  translation,
  rotation,
}: UseImageTransformProps) {

  
const baseScale = Math.min(
  canvasWidth / imageWidth,
  canvasHeight / imageHeight
);
const scale = baseScale * zoom;
  const width = imageWidth * scale;
  const height = imageHeight * scale;

  const x = (canvasWidth - width) / 2 + translation.x;
const y = (canvasHeight - height) / 2 + translation.y;

  


  return {
  x,
  y,
  width,
  height,
  scale,

  
};

}