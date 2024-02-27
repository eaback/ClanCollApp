// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseConfig = {
  apiKey: "AIzaSyBQ3682fwnRnwr20igIPKaRr3uTUfKf_ic",
  authDomain: "clancollapp.firebaseapp.com",
  projectId: "clancollapp",
  storageBucket: "clancollapp.appspot.com",
  messagingSenderId: "1075914723120",
  appId: "1:1075914723120:web:e2fcd88ed691a4507282f5",
  measurementId: "G-ZGEQ8LZ3EL"
};
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);