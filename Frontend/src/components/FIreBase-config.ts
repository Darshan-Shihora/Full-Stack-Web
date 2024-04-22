import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY7zGQrqpG6t0tBmMPHG71ZLFIWvAyLm8",
  authDomain: "blog-website-c5959.firebaseapp.com",
  databaseURL: "https://blog-website-c5959-default-rtdb.firebaseio.com",
  projectId: "blog-website-c5959",
  storageBucket: "blog-website-c5959.appspot.com",
  messagingSenderId: "324837052526",
  appId: "1:324837052526:web:a3a81a1b4dc0ea76e8d67f",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider,app };
