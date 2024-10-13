// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD538wjPvyILYOc_Oq8qpsUKbff1YQwNgI",
  authDomain: "sketchbook-pinata.firebaseapp.com",
  projectId: "sketchbook-pinata",
  storageBucket: "sketchbook-pinata.appspot.com",
  messagingSenderId: "302515563782",
  appId: "1:302515563782:web:60d4bef736b1d962260287",
  measurementId: "G-XP6QR24WEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);