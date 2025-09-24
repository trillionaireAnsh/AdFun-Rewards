
// THIS FILE IS FOR CLIENT-SIDE FIREBASE ONLY

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// IMPORTANT: Do NOT enable persistence here, as it conflicts with Next.js's
// server-rendering environment and causes the "transport errored" issue.
// The app will function in a stable, online-only mode.

const firebaseConfig = {
    projectId: "adfun-rewards-dl24p",
    appId: "1:334398680055:web:768bd863f8d54780205cf2",
    apiKey: "AIzaSyDAOjQziyoVzeqHFfOQIXld-7LF4-nLAp4",
    authDomain: "adfun-rewards-dl24p.firebaseapp.com",
    storageBucket: "adfun-rewards-dl24p.appspot.com",
    measurementId: "",
    messagingSenderId: "334398680055"
};


// Initialize Firebase for the client
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
