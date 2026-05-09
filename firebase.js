// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "order-karo-6c428.firebaseapp.com",
  projectId: "order-karo-6c428",
  storageBucket: "order-karo-6c428.firebasestorage.app",
  messagingSenderId: "712476438945",
  appId: "1:712476438945:web:e160263f03091d0e4f1be0",
  measurementId: "G-K7S8V3RZF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();