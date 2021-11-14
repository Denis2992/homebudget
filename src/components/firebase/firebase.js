import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyC0gc5metAKob5UL-JpSBp6QmvX584hPCc",
    authDomain: "home-budget-44efa.firebaseapp.com",
    projectId: "home-budget-44efa",
    storageBucket: "home-budget-44efa.appspot.com",
    messagingSenderId: "163550072392",
    appId: "1:163550072392:web:de9602f2f76a306d1dd27d"
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
