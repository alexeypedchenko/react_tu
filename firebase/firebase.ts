// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5TdSdt_Y0rVwVpPDRxTaFYDrFMy56w4c",
  authDomain: "social-netw-app.firebaseapp.com",
  projectId: "social-netw-app",
  storageBucket: "social-netw-app.appspot.com",
  messagingSenderId: "122899444749",
  appId: "1:122899444749:web:2b1bb701f3bf5139f6d144"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app