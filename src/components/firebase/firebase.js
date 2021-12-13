import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyBc6BhVMWSE7CQEUg6V7wm3k_dLKm4JAsE",
  authDomain: "homebudget-853c5.firebaseapp.com",
  projectId: "homebudget-853c5",
  storageBucket: "homebudget-853c5.appspot.com",
  messagingSenderId: "1083002770015",
  appId: "1:1083002770015:web:4f415c6a6b09e18c6381ea"
};

let instance;

export default function getFirebase() {
    if (typeof window !== "undefined") {
        if (instance) return instance;
        instance = firebase.initializeApp(firebaseConfig);
        return instance;
    }

    return null;
}
