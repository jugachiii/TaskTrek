// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, serverTimestamp } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDra_1dlmvm4kfUyhvmEkdFu9OfTloyejw",
  authDomain: "tasktrek-28cbc.firebaseapp.com",
  databaseURL: "https://tasktrek-28cbc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tasktrek-28cbc",
  storageBucket: "tasktrek-28cbc.firebasestorage.app",
  messagingSenderId: "643547147420",
  appId: "1:643547147420:web:75682082eea0731e93d159",
  measurementId: "G-XGZY3JJGD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db, ref, set, push, serverTimestamp };