
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "adfun-rewards-dl24p",
  appId: "1:334398680055:web:768bd863f8d54780205cf2",
  storageBucket: "adfun-rewards-dl24p.firebasestorage.app",
  apiKey: "AIzaSyDAOjQziyoVzeqHFfOQIXld-7LF4-nLAp4",
  authDomain: "adfun-rewards-dl24p.firebaseapp.com",
  messagingSenderId: "334398680055",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
