import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAyEhLIY2G4OKYgLWrxNUWgsMSHA43LKoQ",
    authDomain: "bookmyrail-e44e2.firebaseapp.com",
    projectId: "bookmyrail-e44e2",
    storageBucket: "bookmyrail-e44e2.firebasestorage.app",
    messagingSenderId: "384892516428",
    appId: "1:384892516428:web:ad74fe77bbe01e7c7b5ce9",
    measurementId: "G-32GMJHNVVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, collection, addDoc, getDocs, doc, setDoc };
