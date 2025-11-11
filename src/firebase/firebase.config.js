
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA92mN3WUypvD3GyhY7aGrAey26qLckaRA",
  authDomain: "assignment-10-bc0d1.firebaseapp.com",
  projectId: "assignment-10-bc0d1",
  storageBucket: "assignment-10-bc0d1.firebasestorage.app",
  messagingSenderId: "994639990592",
  appId: "1:994639990592:web:fdba270a9a76d6833ef4a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);