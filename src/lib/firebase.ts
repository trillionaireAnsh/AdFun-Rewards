
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "adfun-rewards-dl24p",
  "appId": "1:334398680055:web:768bd863f8d54780205cf2",
  "apiKey": "AIzaSyDAOjQziyoVzeqHFfOQIXld-7LF4-nLAp4",
  "authDomain": "adfun-rewards-dl24p.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "334398680055",
  "storageBucket": "adfun-rewards-dl24p.appspot.com"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Initialize Firestore with offline persistence
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

export { app, auth, db };
