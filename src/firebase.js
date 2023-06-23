// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ4sQJcNOKzkShAKdwFrcBMVBwesi_Ras",
  authDomain: "at-compras-infnet.firebaseapp.com",
  projectId: "at-compras-infnet",
  storageBucket: "at-compras-infnet.appspot.com",
  messagingSenderId: "537693501217",
  appId: "1:537693501217:web:c378f2d7c9c09330c63060",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
