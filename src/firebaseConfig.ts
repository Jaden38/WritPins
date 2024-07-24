// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlGM3hPllz03iT9yl6tptuLhDNG_mgzGY",
  authDomain: "writpins-5cc36.firebaseapp.com",
  projectId: "writpins-5cc36",
  storageBucket: "writpins-5cc36.appspot.com",
  messagingSenderId: "442644073466",
  appId: "1:442644073466:web:be583c143d9b6312a63243",
  measurementId: "G-MB95EV3D5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


export { auth, db, googleProvider };
