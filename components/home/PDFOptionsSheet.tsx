import {BottomSheetBackdrop,BottomSheetModal,BottomSheetView,} from "@gorhom/bottom-sheet";
import React, {forwardRef,useMemo,} from "react";
import { StyleSheet, Text,TouchableOpacity,} from "react-native";

interface PDFOptionsSheetProps {
  onRename: () => void;
  onShare: () => void;
  onDelete: () => void;
}

const PDFOptionsSheet = forwardRef<
  BottomSheetModal,
  PDFOptionsSheetProps
>(({ onRename, onShare, onDelete }, ref) => {
  const snapPoints = useMemo(() => ["35%"], []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>PDF Options</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={onRename}
        >
          <Text style={styles.optionText}>✏️ Rename</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={onShare}
        >
          <Text style={styles.optionText}>📤 Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={onDelete}
        >
          <Text style={styles.deleteText}>🗑 Delete</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default PDFOptionsSheet;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  option: {
    paddingVertical: 18,
  },

  optionText: {
    fontSize: 18,
  },

  deleteText: {
    fontSize: 18,
    color: "red",
  },
});