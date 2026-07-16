import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
  <BottomSheetModalProvider>
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  </BottomSheetModalProvider>
</GestureHandlerRootView>
  );
}