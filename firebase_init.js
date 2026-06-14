// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo2qCN-620Cb36JgUsb1cLAZlMKv5Hh5Y",
  authDomain: "vaju-makwana.firebaseapp.com",
  projectId: "vaju-makwana",
  storageBucket: "vaju-makwana.firebasestorage.app",
  messagingSenderId: "219332245212",
  appId: "1:219332245212:web:9b95a980a6e17ab6316619",
  measurementId: "G-WH5E8BB5S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
