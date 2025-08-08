// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-Rhvajn9lv5J4azz8ubtU7H4DV0K2G2s",
  authDomain: "campus-events-4aec8.firebaseapp.com",
  projectId: "campus-events-4aec8",
  storageBucket: "campus-events-4aec8.firebasestorage.app",
  messagingSenderId: "294430857950",
  appId: "1:294430857950:web:b071dc9dbe7ef390c1c04f",
  measurementId: "G-JM07SW3D65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };


