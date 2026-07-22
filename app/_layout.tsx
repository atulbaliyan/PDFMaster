import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ScanProvider } from "../contexts/ScanContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
  <BottomSheetModalProvider>
    <AuthProvider>
      <ScanProvider>
      <Stack screenOptions={{ headerShown: false }} />
      </ScanProvider>
    </AuthProvider>
  </BottomSheetModalProvider>
</GestureHandlerRootView>
  );
}