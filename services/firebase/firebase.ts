import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtms1ECOKEb6eSnBn2oF6yfSpPAAOZ8k8",
  authDomain: "pdf-master-d4649.firebaseapp.com",
  projectId: "pdf-master-d4649",
  storageBucket: "pdf-master-d4649.firebasestorage.app",
  messagingSenderId: "380247639102",
  appId: "1:380247639102:web:85f70e10fee9625cdfbd6f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);