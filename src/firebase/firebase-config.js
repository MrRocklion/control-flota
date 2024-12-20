// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA9hQh66za8lGZATqr1KWtK1LxeIR3rUw",
  authDomain: "ctucl-db.firebaseapp.com",
  projectId: "ctucl-db",
  storageBucket: "ctucl-db.firebasestorage.app",
  messagingSenderId: "646146551174",
  appId: "1:646146551174:web:8145f805edb637f2cdd007",
  measurementId: "G-F6KLLF0K8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{app,db}