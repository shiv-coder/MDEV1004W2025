// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLhUEEGMYwABy1pFzix_yTXg1z4r1D70w",
  authDomain: "fir-apiexample-2553a.firebaseapp.com",
  projectId: "fir-apiexample-2553a",
  storageBucket: "fir-apiexample-2553a.firebasestorage.app",
  messagingSenderId: "1013470825833",
  appId: "1:1013470825833:web:39f877e8aff6fe1678c1f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };