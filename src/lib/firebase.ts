import { FirebaseApp, initializeApp, getApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

type FirebaseConfigKeys =
  | "VITE_FIREBASE_API_KEY"
  | "VITE_FIREBASE_AUTH_DOMAIN"
  | "VITE_FIREBASE_PROJECT_ID"
  | "VITE_FIREBASE_STORAGE_BUCKET"
  | "VITE_FIREBASE_MESSAGING_SENDER_ID"
  | "VITE_FIREBASE_APP_ID"
  | "VITE_FIREBASE_MEASUREMENT_ID";

const requiredEnvVars: Record<FirebaseConfigKeys, string | undefined> = {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const missingKeys = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  console.warn(
    `Firebase configuration is incomplete. Missing environment variables: ${missingKeys.join(
      ", ",
    )}`,
  );
}

const firebaseConfig = {
  apiKey: requiredEnvVars.VITE_FIREBASE_API_KEY,
  authDomain: requiredEnvVars.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: requiredEnvVars.VITE_FIREBASE_PROJECT_ID,
  storageBucket: requiredEnvVars.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: requiredEnvVars.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: requiredEnvVars.VITE_FIREBASE_APP_ID,
  measurementId: requiredEnvVars.VITE_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp: FirebaseApp;

try {
  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
} catch (error) {
  console.error("Failed to initialise Firebase app", error);
  throw error;
}

export const app = firebaseApp;
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

const shouldUseEmulator =
  import.meta.env.MODE === "development" &&
  import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true";

if (shouldUseEmulator) {
  const authPort = Number(import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_PORT ?? 9099);
  const firestorePort = Number(
    import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT ?? 8080,
  );
  const storagePort = Number(
    import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_PORT ?? 9199,
  );

  connectAuthEmulator(auth, `http://127.0.0.1:${authPort}`, {
    disableWarnings: true,
  });
  connectFirestoreEmulator(db, "127.0.0.1", firestorePort);
  connectStorageEmulator(storage, "127.0.0.1", storagePort);
}

export const FIREBASE_FEATURES = {
  auth,
  db,
  storage,
};

