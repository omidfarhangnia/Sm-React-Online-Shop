// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5KLhobm2gU76-S07WY5RAUyiFnS8fbU0",
  authDomain: "online-shop-6b06f.firebaseapp.com",
  projectId: "online-shop-6b06f",
  storageBucket: "online-shop-6b06f.appspot.com",
  messagingSenderId: "207956670635",
  appId: "1:207956670635:web:c5e11ed47d60dfd6431fee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);