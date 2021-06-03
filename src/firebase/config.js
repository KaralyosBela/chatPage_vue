import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAjebPvmN7elqHdAFPLp5mdAnWqxj2KD-I",
  authDomain: "chatroom-95257.firebaseapp.com",
  projectId: "chatroom-95257",
  storageBucket: "chatroom-95257.appspot.com",
  messagingSenderId: "193616284960",
  appId: "1:193616284960:web:0e9aa45e053f1e254e9b45",
  measurementId: "G-LEKGL4VH98"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export default firebase;
export {auth, db, storage};
