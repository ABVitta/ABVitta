
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// Ensure these are defined in your .env.local file
const firebaseConfigValues = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

let app: FirebaseApp | undefined;
let authService: Auth | undefined;

const essentialKeys = ['apiKey', 'authDomain', 'projectId'] as const;
const missingEssentialKeys = essentialKeys.filter(
  (key) => !firebaseConfigValues[key] // A key is "missing" if its value is an empty string after the OR assignment.
);

if (missingEssentialKeys.length === 0) {
  // All essential keys have non-empty values.
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfigValues);
    } else {
      app = getApp();
    }
  } catch (e: any) {
    console.error(
      `Firebase app initialization error: ${e.message}. Please ensure your Firebase configuration values in .env.local are correct for your project.`,
      e
    );
    // app will remain undefined
  }

  if (app) {
    try {
      authService = getAuth(app);
    } catch (e: any) {
      let detailMessage = `Firebase Auth initialization error: ${e.message}.`;
      if (e.code === 'auth/configuration-not-found') {
        detailMessage += ` This often means the apiKey, authDomain, or projectId in your .env.local file are present but are incorrect or not recognized by Firebase for this project. Please double-check these values against your Firebase project settings.`;
      } else if (e.code === 'auth/invalid-api-key') {
        detailMessage += ` The API key (NEXT_PUBLIC_FIREBASE_API_KEY) in your .env.local file is invalid. Please verify it in the Firebase console.`;
      } else {
        detailMessage += ` Please review your Firebase project setup and the Firebase configuration in your .env.local file.`;
      }
      console.error(detailMessage, e);
      // authService will remain undefined
    }
  } else if (missingEssentialKeys.length === 0) {
    // This case means app initialization failed, even though essential keys seemed present.
    // The try-catch around initializeApp would have logged the specific error.
    // We add a general message here.
     if (typeof window !== 'undefined') {
        console.error(
            `Firebase app failed to initialize even though essential environment variables (apiKey, authDomain, projectId) seemed to have values. Check the console for a specific Firebase app initialization error and verify all Firebase config values in .env.local.`
        );
     }
  }
} else {
  // Essential keys are missing (i.e., they were empty strings).
  // This error message is primarily for client-side debugging.
  if (typeof window !== 'undefined') {
    console.error(
      `Firebase configuration is missing or incomplete. Essential Auth keys (${missingEssentialKeys.join(
        ', '
      )}) are not set or are empty in environment variables (e.g., NEXT_PUBLIC_FIREBASE_API_KEY). Firebase Auth services will not be initialized. Please create or check your .env.local file and ensure all NEXT_PUBLIC_FIREBASE_... variables are correctly set.`
    );
  }
}

export const firebaseApp = app; // Export the app instance (might be undefined)
export const auth = authService; // Export the auth instance (might be undefined)

// Default export for compatibility if some files import it as default.
// It's better to use named exports for clarity.
export default app;
