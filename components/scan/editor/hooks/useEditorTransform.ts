import { useState } from "react";

export default function useEditorTransform() {
  const [zoom, setZoom] = useState(1);

  const [translation, setTranslation] = useState({
    x: 0,
    y: 0,
  });

  const [rotation, setRotation] = useState(0);

  return {
    zoom,
    setZoom,

    translation,
    setTranslation,

    rotation,
    setRotation,
  };
}