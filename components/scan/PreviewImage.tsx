import { Image, StyleSheet, View, Text } from "react-native";

interface Props {
  uri?: string;
}

export default function PreviewImage({ uri }: Props) {
  console.log("IMAGE URI:", uri);

  if (!uri) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>No URI</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMode="contain"
      onLoad={() => console.log("✅ Image Loaded")}
      onError={(e) => console.log("❌ Image Error", e.nativeEvent)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  //  backgroundColor: "red", // temporary
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});