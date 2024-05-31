import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Keys
const key1 = import.meta.env.VITE_API_KEY;
const key2 = import.meta.env.VITE_AUTH_DOMAIN;
const key3 = import.meta.env.VITE_PROJECT_ID;
const key4 = import.meta.env.VITE_STORAGE_BUCKET;
const key5 = import.meta.env.VITE_MESSAGING_SENDER_ID;
const key6 = import.meta.env.VITE_APP_ID;
const key7 = import.meta.env.VITE_MEASUREMENT_ID;

// Initialize Firebase
const firebaseConfig = {
  apiKey: key1,
  authDomain: key2,
  projectId: key3,
  storageBucket: key4,
  messagingSenderId: key5,
  appId: key6,
  measurementId: key7,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, provider, db };

