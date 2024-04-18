
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "ama-clone-99e82.firebaseapp.com",
  projectId: "ama-clone-99e82",
  storageBucket: "ama-clone-99e82.appspot.com",
  messagingSenderId: "33034535076",
  appId: "1:33034535076:web:06ff9a8c603dc0dc4f6631"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const db = getFirestore()

export const storage = getStorage()

