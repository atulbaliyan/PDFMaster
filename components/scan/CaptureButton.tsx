import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  onPress: () => void;
}

export default function CaptureButton({ onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.outer}>
        <View style={styles.inner} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
});