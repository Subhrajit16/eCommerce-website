// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyACp6h0I8m5tmEVTY9PDuwJa98fiQP6JbM",
  authDomain: "ecommerce-auth-eecd8.firebaseapp.com",
  projectId: "ecommerce-auth-eecd8",
  storageBucket: "ecommerce-auth-eecd8.appspot.com",
  messagingSenderId: "650114599606",
  appId: "1:650114599606:web:574afc76f304d25af9b417"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()