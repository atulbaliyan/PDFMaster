import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { FilterType } from "../../../types/filter";

interface FilterPickerProps {
  value: FilterType;
  onChange: (filter: FilterType) => void;
}

const filters: {
  label: string;
  value: FilterType;
}[] = [
  { label: "Org", value: "original" },
  { label: "Doc", value: "document" },
  { label: "Enh", value: "enhanced" },
  { label: "B&W", value: "bw" },
  { label: "Gray", value: "grayscale" },
];

export default function FilterPicker({
  value,
  onChange,
}: FilterPickerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {filters.map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => onChange(item.value)}
            style={[
              styles.button,
              value === item.value && styles.activeButton,
            ]}
          >
            <Text
              style={[
                styles.text,
                value === item.value && styles.activeText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },

  row: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 10,
  },

  button: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#111",
  },

  activeButton: {
    borderColor: "#2196F3",
    backgroundColor: "#2196F3",
    shadowColor: "#1E88E5",
shadowOpacity: 0.4,
shadowRadius: 6,
elevation: 5,
  },

  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  activeText: {
    color: "#fff",
  },
});