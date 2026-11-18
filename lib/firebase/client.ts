// ─────────────────────────────────────────────────────────────────────────────
// Firebase client SDK init (browser only).
// Values come from NEXT_PUBLIC_FIREBASE_* env vars — see .env.local.example.
// The API verifies the resulting Firebase ID token (AUTH_PROVIDER=firebase).
// ─────────────────────────────────────────────────────────────────────────────
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
)

let app: FirebaseApp | null = null
let authInstance: Auth | null = null

/** Lazily initialise Firebase so the app still boots without env configured. */
export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null
  if (!app) app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  return app
}

export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseConfigured) return null
  if (!authInstance) authInstance = getAuth(getFirebaseApp()!)
  return authInstance
}
