
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence, FirestoreError } from "firebase/firestore";

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
const db = getFirestore(app);

// Enable offline persistence
try {
    enableIndexedDbPersistence(db)
        .catch((err: FirestoreError) => {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled in one tab at a time.
                console.warn('Firestore persistence failed: multiple tabs open.');
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the features required to enable persistence
                console.warn('Firestore persistence not available in this browser.');
            }
        });
} catch (error) {
    console.error("Error enabling Firestore persistence: ", error);
}


export { app, auth, db };
