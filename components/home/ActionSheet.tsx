import {BottomSheetModal, BottomSheetView,} from "@gorhom/bottom-sheet";
import { forwardRef, useMemo, useRef, useImperativeHandle } from "react";
import {  StyleSheet,Text,Pressable,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { Typography } from "../../constants/typography";
import { Spacing } from "../../constants/spacing";
import { pickPDF } from "../../services/pdf/pdfPicker";
import { Alert } from "react-native";
import { DocumentPickerAsset } from "expo-document-picker";

interface ActionSheetProps {
  onPDFSelected: (pdf: DocumentPickerAsset) => void;
}

const ActionSheet = forwardRef<BottomSheetModal, ActionSheetProps>(
  ({ onPDFSelected }, ref) => {

    const modalRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => modalRef.current!);  
    const snapPoints = useMemo(
      () => ["45%"],[]);

    return (
     <BottomSheetModal
       ref={modalRef}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.container}>
          <Text style={styles.title}>
            Choose Action
          </Text>

          <Pressable
  style={styles.item}
  onPress={async () => {
  // Close the bottom sheet first
  modalRef.current?.dismiss();

  // Give the dismiss animation a moment to start
  setTimeout(async () => {
    const pdf = await pickPDF();

    if (!pdf) return;

    Alert.alert("Selected PDF", pdf.name);

    onPDFSelected(pdf);
  }, 250);
}}
  >
            <Ionicons
              name="document-text-outline"
              size={24}
              color={Colors.primary}
            />

            <Text style={styles.text}>
              Pick PDF
            </Text>
          </Pressable>

          <Pressable style={styles.item}>
            <Ionicons
              name="camera-outline"
              size={24}
              color={Colors.primary}
            />

            <Text style={styles.text}>
              Scan Document
            </Text>
          </Pressable>

          <Pressable style={styles.item}>
            <Ionicons
              name="images-outline"
              size={24}
              color={Colors.primary}
            />

            <Text style={styles.text}>
              Images → PDF
            </Text>
          </Pressable>

          <Pressable style={styles.item}>
            <Ionicons
              name="create-outline"
              size={24}
              color={Colors.primary}
            />

            <Text style={styles.text}>
              Create Blank PDF
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default ActionSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
  },

  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    marginBottom: Spacing.lg,
    color: Colors.textPrimary,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 18,
  },

  text: {
    marginLeft: 18,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
});