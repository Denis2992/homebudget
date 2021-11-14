import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyC1zOYssPElRwn5D5YKnY8DX2UK1_MBwq4",
    authDomain: "home-budget-e28b5.firebaseapp.com",
    projectId: "home-budget-e28b5",
    storageBucket: "home-budget-e28b5.appspot.com",
    messagingSenderId: "233095909452",
    appId: "1:233095909452:web:8c6eca8a9cd1480f0064e9"
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
