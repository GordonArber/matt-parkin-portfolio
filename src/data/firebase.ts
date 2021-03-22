import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdL5kz3fSgcAj8QFWg-MPa8kZy36wQ1C8",
  authDomain: "artist-portfolios.firebaseapp.com",
  projectId: "artist-portfolios",
  storageBucket: "artist-portfolios.appspot.com",
  messagingSenderId: "928985922276",
  appId: "1:928985922276:web:75aeb3c65976acbc244af1",
  measurementId: "G-VQLR63LJ8X",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
