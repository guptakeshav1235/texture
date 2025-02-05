import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    Auth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBqIrnDaUvdsxpXUgNTRCH3Es_hJY7rZS8",
    authDomain: "texture-84510.firebaseapp.com",
    projectId: "texture-84510",
    storageBucket: "texture-84510.firebasestorage.app",
    messagingSenderId: "478442784836",
    appId: "1:478442784836:web:3d597b9759437c49191411",
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };