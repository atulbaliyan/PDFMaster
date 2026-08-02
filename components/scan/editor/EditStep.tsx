import { View, StyleSheet } from "react-native";
import { ScanImage } from "../../../types/scan";

import EditorHeader from "./EditorHeader";
import ImageCanvas from "./ImageCanvas";
import BottomToolbar from "./BottomToolbar";

import AdjustmentSlider from "./AdjustmentSlider";
import EditorCanvas from "./canvas";
import useEditorTransform from "./hooks/useEditorTransform";
import { FilterType } from "../../../types/filter";
import FilterPicker from "./FilterPicker";
import {
  useState,
  useRef,
} from "react";
import type { EditorCanvasRef } from "./canvas/EditorCanvas";

interface EditStepProps {
  page: ScanImage;
  onSave: (page: ScanImage) => void;
  onCancel: () => void;
}

export default function EditStep({
  page,
  onSave,
  onCancel,
}: EditStepProps) {
  
 
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [filter, setFilter] = useState<FilterType>("original");

  const [activeTool, setActiveTool] = useState<
  "rotate" | "filter" | "brightness" | "contrast" | null
>(null);
const {
  zoom,
  translationX,
  translationY,
  rotation,
} = useEditorTransform();
const editorCanvasRef = useRef<EditorCanvasRef>(null);
 

  return (
    <View style={styles.container}>

   <EditorHeader
  title="Edit"
  onBack={onCancel}
  onSave={async () => {
    const uri = await editorCanvasRef.current?.saveImage();

    if (!uri) return;

    onSave({
      ...page,
      uri,
    });
  }}
/>
  <EditorCanvas
  ref={editorCanvasRef}
  page={page}
  zoom={zoom}
  translationX={translationX}
  translationY={translationY}
  rotation={rotation}
  brightness={brightness}
  contrast={contrast}
  filter={filter}
/>

      {activeTool === "brightness" && (
       <AdjustmentSlider
        title="Brightness"
        value={brightness}
        onValueChange={setBrightness}
        />
      )}

      {activeTool === "contrast" && (
       <AdjustmentSlider
       title="Contrast"
       value={contrast}
       onValueChange={setContrast}
       />
      )}
      {activeTool === "filter" && (
      <FilterPicker
       value={filter}
       onChange={setFilter}
       />
      )}

     <BottomToolbar
  activeTool={activeTool}
  onToolPress={(tool) => {
    if (tool === "rotate") {
      rotation.value += Math.PI / 2;
    } else {
      setActiveTool(tool);
    }
  }}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});