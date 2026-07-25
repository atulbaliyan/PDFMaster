import { StyleSheet, View } from "react-native";
import ToolButton from "./ToolButton";
import { EditorTool } from "./types";



interface BottomToolbarProps {
  activeTool: EditorTool;

  onToolPress: (
    tool: "rotate" | "filter" | "brightness" | "contrast"
  ) => void;
}

export default function BottomToolbar({
  activeTool,
  onToolPress,
}: BottomToolbarProps) {
  return (
    <View style={styles.container}>
      <ToolButton
        icon="rotate-right"
        label="Rotate"
        active={activeTool === "rotate"}
        onPress={() => onToolPress("rotate")}
      />

      <ToolButton
        icon="image-filter-center-focus"
        label="Filter"
        active={activeTool === "filter"}
        onPress={() => onToolPress("filter")}
      />

      <ToolButton
        icon="brightness-6"
        label="Light"
        active={activeTool === "brightness"}
        onPress={() => onToolPress("brightness")}
      />

      <ToolButton
        icon="contrast-circle"
        label="Contrast"
        active={activeTool === "contrast"}
        onPress={() => onToolPress("contrast")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingVertical: 12,
    paddingHorizontal: 8,

    borderTopWidth: 1,
    borderTopColor: "#222",

    backgroundColor: "#000",
  },
});