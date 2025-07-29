import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDEo5fBWwPyEQa31U6GEzpwLyrJFqvXOU",
  authDomain: "team1-2c9b9.firebaseapp.com",
  projectId: "team1-2c9b9",
  storageBucket: "team1-2c9b9.appspot.com",
  messagingSenderId: "2335568031",
  appId: "1:2335568031:web:381abd9c495781826f72aa"
};

// ✅ 이미 초기화된 앱이 있으면 재사용
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
