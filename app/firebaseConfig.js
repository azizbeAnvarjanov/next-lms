// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC45rZ1iOznBBWldJ0p5snXLEOCE2gqbEs",
  authDomain: "new-pr-65936.firebaseapp.com",
  projectId: "new-pr-65936",
  storageBucket: "new-pr-65936.appspot.com",
  messagingSenderId: "178566900704",
  appId: "1:178566900704:web:470ec46fc943fee4829985",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
