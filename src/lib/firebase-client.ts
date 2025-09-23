// THIS FILE IS FOR CLIENT-SIDE FIREBASE ONLY

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

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

// Initialize Firestore with persistence for the client
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

export { app, auth, db };
