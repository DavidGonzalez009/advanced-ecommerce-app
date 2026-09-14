// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5j2hPp2Xo8QwiJXPtwNtL3_G0FglAxgw",
  authDomain: "advanced-commerce-app.firebaseapp.com",
  projectId: "advanced-commerce-app",
  storageBucket: "advanced-commerce-app.firebasestorage.app",
  messagingSenderId: "79254262632",
  appId: "1:79254262632:web:5f4e84830c3cfb65123cdd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
