import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";
import { Theme } from "../../constants/theme";

interface FloatingButtonProps {
  onPress: () => void;
}

export default function FloatingButton({
  onPress,
}: FloatingButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
     onPress={() => {
  console.log("FAB CLICKED 🔥");
  onPress();
}}
    >
      <Ionicons
        name="add"
        size={34}
        color={Colors.white}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",

    bottom: 30,

    right: 24,

    width: 64,

    height: 64,

    borderRadius: 32,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center",

    elevation: 8,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.25,

    shadowRadius: 6,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});