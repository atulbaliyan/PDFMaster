import { StyleSheet, Pressable, Text, View } from "react-native";

interface HomeMenuProps {
  visible: boolean;
  onLogout: () => void;
}

export default function HomeMenu({
  visible,
  onLogout,
}: HomeMenuProps) {
  if (!visible) return null;

 return (
  <Pressable
    style={styles.container}
    onPress={(event) => {
      event.stopPropagation();
    }}
  >
      <Pressable
        style={styles.item}
        onPress={onLogout}
      >
        <Text style={styles.text}>
          Logout
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 55,
    right: 0,

    backgroundColor: "#fff",

    borderRadius: 12,

    elevation: 8,

    minWidth: 150,

    overflow: "hidden",
  },

  item: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },

  text: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
});