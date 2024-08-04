// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvJn1B4q9Ja7HrjIHRBV_e4NOG2mcwzF0",
  authDomain: "pantry-tracker-e08c9.firebaseapp.com",
  projectId: "pantry-tracker-e08c9",
  storageBucket: "pantry-tracker-e08c9.appspot.com",
  messagingSenderId: "750025282700",
  appId: "1:750025282700:web:0c9715d80fd58e901957a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage}