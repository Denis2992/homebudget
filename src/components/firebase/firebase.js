import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyBY0bX5Ap7kggCaeXNuFj_-pL3Qsn51QVE",
    authDomain: "home-budget-9d519.firebaseapp.com",
    projectId: "home-budget-9d519",
    storageBucket: "home-budget-9d519.appspot.com",
    messagingSenderId: "1006546133697",
    appId: "1:1006546133697:web:ff6dd5fa7f3d84e76fea40"
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
