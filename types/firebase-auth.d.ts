import type { Persistence, ReactNativeAsyncStorage } from "firebase/auth";

// Firebase 12.17.0's public declarations omit this React Native runtime export.
// Match the signature shipped in @firebase/auth's dist/rn declarations.
// Recheck this augmentation when upgrading Firebase; it adds no runtime code.
declare module "firebase/auth" {
  export function getReactNativePersistence(
    storage: ReactNativeAsyncStorage
  ): Persistence;
}
