// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkOKoC9Jqk7pz0NJ6leidiVXdLRMxchiM",
  authDomain: "bookstore-3ea4c.firebaseapp.com",
  projectId: "bookstore-3ea4c",
  storageBucket: "bookstore-3ea4c.appspot.com",
  messagingSenderId: "515743768777",
  appId: "1:515743768777:web:038a4d2a476a95c20fad18",
  measurementId: "G-ZDSTW3F3RG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
