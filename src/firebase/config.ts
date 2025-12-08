import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 👇 PASTE KONFIGURASI DARI FIREBASE CONSOLE DI SINI
const firebaseConfig = {
  apiKey: "AIzaSyBvvk-5g7KJx53I7xk9PJoM2dg_oGbqxio",
  authDomain: "lspi-system.firebaseapp.com",
  projectId: "lspi-system",
  storageBucket: "lspi-system.firebasestorage.app",
  messagingSenderId: "421390270894",
  appId: "1:421390270894:web:2c3449d20971a15795c83f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;