import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface EditorHeaderProps {
  title: string;
  onBack: () => void;
  onSave: () => void;
}

export default function EditorHeader({
  title,
  onBack,
  onSave,
}: EditorHeaderProps) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <MaterialIcons
          name="arrow-back-ios-new"
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onSave}>
        <MaterialIcons
          name="check"
          size={28}
          color="#4CAF50"
        />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#000",
    },

    container: {
        height: 60,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#000",
    },

    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
});