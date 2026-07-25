import { View, Pressable, Text, StyleSheet } from "react-native";

interface Props {
  

  onRetake: () => void;

  onContinue: () => void;
}

export default function PreviewActions({
  
  onRetake,
  onContinue,
}: Props) {
  return (
    <View style={styles.container}>
     <Pressable
    style={styles.button}
    onPress={onRetake}
>
        <Text style={styles.text}>Retake</Text>
      </Pressable>

     <Pressable
    style={styles.button}
    onPress={onContinue}
>
        <Text style={styles.text}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 24,
    backgroundColor: "#111",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});