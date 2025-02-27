// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers/getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
  VITE_MEASUREMENTID
} = getEnvironments()



// Your web app's Firebase configuration
// dev/Production
// const firebaseConfig = {
//   apiKey: "AIzaSyB05UV8v1aIDpw9d1VNEeOaUZfC165Qlj4",
//   authDomain: "journal-app-c8bfa.firebaseapp.com",
//   projectId: "journal-app-c8bfa",
//   storageBucket: "journal-app-c8bfa.firebasestorage.app",
//   messagingSenderId: "312901558999",
//   appId: "1:312901558999:web:917721981b549abe4f8692"
// };
// Testing
//  const firebaseConfig = {
//    apiKey: "AIzaSyDbwBWHLzRfeMY83F-gPvycg0J8_fB7QLI",
//    authDomain: "journal-test-a6db3.firebaseapp.com",
//    projectId: "journal-test-a6db3",
//    storageBucket: "journal-test-a6db3.firebasestorage.app",
//    messagingSenderId: "418724212455",
//    appId: "1:418724212455:web:a567ef63c8444bb403bc42",
//    measurementId: "G-Z277X1ZP12"
//  };
  const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID,
    measurementId: VITE_MEASUREMENTID
  };
  console.log(firebaseConfig);
  
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig); // 
export const FirebaseAuth = getAuth( FirebaseApp ) // todas las funcionalidades de authenticacion
export const firebaseDB = getFirestore( FirebaseApp ) // configuracion para la BD