// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZE0xRxKF5aLz7MXOLoWGUEUUufMuuyoY",
  authDomain: "winvestor-b0681.firebaseapp.com",
  projectId: "winvestor-b0681",
  storageBucket: "winvestor-b0681.appspot.com",
  messagingSenderId: "390142275987",
  appId: "1:390142275987:web:0b431577b4e0eb482ef866",
  measurementId: "G-FFZX10Z7X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
