import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import { Theme } from "../../constants/theme";

interface PDFCardProps {
  title: string;
  size: string;
  date: string;
  onPress?: () => void;
  onLongPress?: () => void;
}

export default function PDFCard({
  title,
  size,
  date,
  onPress,
  onLongPress,
}: PDFCardProps) {

  
  return (

<Pressable
  style={styles.card}
  onPress={() => {
    console.log("PDF Card Pressed");
    onPress?.();
  }}
  onLongPress={onLongPress}
  delayLongPress={500}
>
        <View style={styles.iconContainer}>
        <Ionicons
          name="document-text"
          size={30}
          color={Colors.primary}
        />
      </View>

      <View style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Text style={styles.details}>
          {size} • {date}
        </Text>
      </View>


    

      <Ionicons
        name="chevron-forward"
        size={22}
        color={Colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.white,

    borderRadius: Theme.borderRadius.lg,

    padding: Spacing.md,

    marginBottom: Spacing.md,

    elevation: 2,
  },

  iconContainer: {
    width: 52,
    height: 52,

    borderRadius: 16,

    backgroundColor: "#EEF4FF",

    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },

  title: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },

  details: {
    marginTop: 4,
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
});