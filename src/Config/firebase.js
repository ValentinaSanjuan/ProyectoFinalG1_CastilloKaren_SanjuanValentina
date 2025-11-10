import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyATWeeE_iJ5eQ5LXE8kEpW4ucKg_r3YoXc",
    authDomain: "notisphere-da641.firebaseapp.com",
    projectId: "notisphere-da641",
    storageBucket: "notisphere-da641.firebasestorage.app",
    messagingSenderId: "637356735305",
    appId: "1:637356735305:web:345e464ef73f0ee32f7898"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;