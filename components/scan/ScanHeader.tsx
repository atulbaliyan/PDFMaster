import { View, Text, StyleSheet } from "react-native";

export default function ScanHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Document</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});