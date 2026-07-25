import { View, StyleSheet } from "react-native";
import { ScanImage } from "../../../types/scan";

import EditorHeader from "./EditorHeader";
import ImageCanvas from "./ImageCanvas";
import BottomToolbar from "./BottomToolbar";
import { useState } from "react";
import AdjustmentSlider from "./AdjustmentSlider";
import EditorCanvas from "./canvas";

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

  const [activeTool, setActiveTool] = useState<
  "rotate" | "filter" | "brightness" | "contrast" | null
>(null);

  return (
    <View style={styles.container}>

      <EditorHeader
        title="Edit"
        onBack={onCancel}
        onSave={() => onSave(page)}
      />

      <EditorCanvas page={page} />

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

       <BottomToolbar
       activeTool={activeTool}
       onToolPress={setActiveTool}
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