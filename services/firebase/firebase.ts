import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtms1ECOKEb6eSnBn2oF6yfSpPAAOZ8k8",
  authDomain: "pdf-master-d4649.firebaseapp.com",
  projectId: "pdf-master-d4649",
  storageBucket: "pdf-master-d4649.firebasestorage.app",
  messagingSenderId: "380247639102",
  appId: "1:380247639102:web:85f70e10fee9625cdfbd6f",
};

const app = initializeApp(firebaseConfig);

console.log("Firebase file loaded");

console.log("initializeAuth =", typeof initializeAuth);
console.log(
  "getReactNativePersistence =",
  typeof getReactNativePersistence
);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(
    AsyncStorage
  ),
});

console.log("Auth initialized");