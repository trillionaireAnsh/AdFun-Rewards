// THIS FILE IS FOR CLIENT-SIDE FIREBASE ONLY

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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


export { app, auth, db };
