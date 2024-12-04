
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkxwYfMyZpy5jX4fauaM8RWqBdt06PwWQ",
  authDomain: "sparkle-b5122.firebaseapp.com",
  projectId: "sparkle-b5122",
  storageBucket: "sparkle-b5122.firebasestorage.app",
  messagingSenderId: "1087234267649",
  appId: "1:1087234267649:web:c642a56bd815c543717e00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();