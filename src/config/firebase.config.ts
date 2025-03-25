/**
 * Firebase Configuration
 * This file initializes and exports the Firebase application instance
 * and Firestore database connection
 */

import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase Configuration Object
 * Contains all necessary Firebase configuration parameters
 * Loaded from environment variables for security
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app if it hasn't been initialized yet
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

export { db };
