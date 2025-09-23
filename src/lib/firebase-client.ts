import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAOjQziyoVzeqHFfOQIXld-7LF4-nLAp4",
  authDomain: "adfun-rewards-dl24p.firebaseapp.com",
  projectId: "adfun-rewards-dl24p",
  storageBucket: "adfun-rewards-dl24p.appspot.com",
  messagingSenderId: "334398680055",
  appId: "1:334398680055:web:768bd863f8d54780205cf2"
};


// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Firestore instance variable
let db: Firestore;

// Function to get the Firestore instance (singleton)
function getDb() {
  if (!db) {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    });
  }
  return db;
}


export { app, auth, getDb };
