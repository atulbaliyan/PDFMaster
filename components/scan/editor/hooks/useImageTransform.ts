

interface UseImageTransformProps {
  imageWidth: number;
  imageHeight: number;

  canvasWidth: number;
  canvasHeight: number;
}

export default function useImageTransform({
  imageWidth,
  imageHeight,
  canvasWidth,
  canvasHeight,
}: UseImageTransformProps) {

  
const baseScale = Math.min(
  canvasWidth / imageWidth,
  canvasHeight / imageHeight
);
const scale = baseScale;
  const width = imageWidth * scale;
  const height = imageHeight * scale;

 const x = (canvasWidth - width) / 2;
const y = (canvasHeight - height) / 2;

  


  return {
  x,
  y,
  width,
  height,
  scale,

  
};

}