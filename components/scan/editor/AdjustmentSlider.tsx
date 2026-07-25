import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";

interface AdjustmentSliderProps {
  title: string;
  value: number;
  minimumValue?: number;
  maximumValue?: number;
  onValueChange: (value: number) => void;
}

export default function AdjustmentSlider({
  title,
  value,
  minimumValue = -100,
  maximumValue = 100,
  onValueChange,
}: AdjustmentSliderProps) {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

     <Slider
  style={styles.slider}
  minimumValue={minimumValue}
  maximumValue={maximumValue}
  value={value}
  onValueChange={onValueChange}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 16,

    borderTopWidth: 1,
    borderTopColor: "#222",
  },

  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "600",
  },

  slider: {
    width: "100%",
    height: 40,
  },
});