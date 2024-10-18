import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "redx-admin-user.firebaseapp.com",
  projectId: "redx-admin-user",
  storageBucket: "redx-admin-user.appspot.com",
  messagingSenderId: "644818530872",
  appId: "1:644818530872:web:14ab3c684dbcad829e6ccd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);