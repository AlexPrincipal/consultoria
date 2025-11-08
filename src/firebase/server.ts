
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// This function ensures Firebase is initialized, but only once.
function initializeServerApp(): FirebaseApp {
    const apps = getApps();
    if (apps.length) {
        return apps[0];
    }
    return initializeApp(firebaseConfig);
}

const app: FirebaseApp = initializeServerApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
