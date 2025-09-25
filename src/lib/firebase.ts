
// THIS FILE IS FOR SERVER-SIDE FIREBASE (ADMIN) ONLY

import { getApps as getAdminApps, getApp as getAdminApp, initializeApp as initializeAdminApp, type App as AdminApp, cert } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : null;

// Initialize Firebase Admin SDK
const adminApp: AdminApp = !getAdminApps().length
  ? serviceAccount
    ? initializeAdminApp({ credential: cert(serviceAccount) })
    : initializeAdminApp()
  : getAdminApp();

const adminDb = getAdminFirestore(adminApp);

export { adminApp, adminDb };
