
import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : null;

const adminApp = !getApps().length
  ? serviceAccount
    ? initializeApp({
        credential: cert(serviceAccount)
      })
    : initializeApp()
  : getApp();


const adminDb = getFirestore(adminApp);

export { adminApp, adminDb };
