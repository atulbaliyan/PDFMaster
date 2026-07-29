import { useSharedValue } from "react-native-reanimated";

export default function useEditorTransform() {
  const zoom = useSharedValue(1);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const brightness = useSharedValue(0);
  const rotation = useSharedValue(0);

  return {
    zoom,
    translationX,
    translationY,
    rotation,
    
  };
}