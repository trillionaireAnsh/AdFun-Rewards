// THIS FILE IS FOR CLIENT-SIDE FIREBASE ONLY

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// IMPORTANT: Do NOT enable persistence here, as it conflicts with Next.js's
// server-rendering environment and causes the "transport errored" issue.
// The app will function in a stable, online-only mode.

const firebaseConfig = {
    apiKey: "AIzaSyDAOjQziyoVzeqHFfOQIXld-7LF4-nLAp4",
    authDomain: "adfun-rewards-dl24p.firebaseapp.com",
    projectId: "adfun-rewards-dl24p",
    storageBucket: "adfun-rewards-dl24p.appspot.com",
    messagingSenderId: "334398680055",
    appId: "1:334398680055:web:768bd863f8d54780205cf2"
};

// Initialize Firebase for the client
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
