// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnvWbQ6XG-klg_MMoSS7OmR4i1mHFBrwI",
  authDomain: "todolist-react-f22cc.firebaseapp.com",
  projectId: "todolist-react-f22cc",
  storageBucket: "todolist-react-f22cc.appspot.com",
  messagingSenderId: "133297773374",
  appId: "1:133297773374:web:d2332e9b12d92032af2a6f",
  measurementId: "G-2DDYHBPV07"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

