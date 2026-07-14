import { View, Text } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>🎉 Welcome to PDFMaster!</Text>
      <Text>You are logged in.</Text>
    </View>
  );
}