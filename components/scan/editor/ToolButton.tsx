import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ToolButtonProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  active?: boolean;
  onPress: () => void;
}

export default function ToolButton({
  icon,
  label,
  active = false,
  onPress,
}: ToolButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={26}
        color={active ? "#4F8EF7" : "#FFFFFF"}
      />

      <Text
        style={[
          styles.label,
          active && styles.activeLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    minWidth: 70,
  },

  label: {
    marginTop: 6,
    fontSize: 12,
    color: "#AAAAAA",
    fontWeight: "500",
  },

  activeLabel: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});