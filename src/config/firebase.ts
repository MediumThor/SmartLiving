import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAGTGwS2I49B3gL2me1XGnhx03k3uBFcmI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "smart-living-d5133.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://smart-living-d5133-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "smart-living-d5133",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "smart-living-d5133.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "474876240874",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:474876240874:web:f704b0d2b1be2b21cf8893",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BNH2WH9SK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app;

