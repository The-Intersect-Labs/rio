'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Auth provider — wraps Firebase client auth + the API's /auth/sync handshake.
//
// Flow:
//   1. Firebase client SDK authenticates (email/password, Google, …).
//   2. On every auth-state change we POST the ID token to /auth/sync so the
//      backend registers/updates the user row (idempotent).
//   3. `setTokenGetter` wires the live ID token into the API client so every
//      request carries a fresh `Authorization: Bearer <idToken>`.
// ─────────────────────────────────────────────────────────────────────────────
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth'
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/client'
import { setTokenGetter } from '@/lib/api/client'
import { authApi, sessionsApi } from '@/lib/api/endpoints'
import type { SyncedUser } from '@/lib/api/types'

interface AuthContextValue {
  firebaseUser: FirebaseUser | null
  /** Backend user record returned by /auth/sync (null until synced). */
  appUser: SyncedUser | null
  loading: boolean
  syncing: boolean
  configured: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [appUser, setAppUser] = useState<SyncedUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Wire the token getter once — the API client reads it on every request.
  useEffect(() => {
    setTokenGetter(async () => {
      const auth = getFirebaseAuth()
      const u = auth?.currentUser
      return u ? await u.getIdToken() : null
    })
  }, [])

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) {
      setLoading(false)
      return
    }
    // Completes the signInWithRedirect fallback flow (returns null otherwise).
    getRedirectResult(auth).catch((e) => setError((e as Error).message))
    const unsub = onAuthStateChanged(auth, async (u) => {
      setFirebaseUser(u)
      if (!u) {
        setAppUser(null)
        setLoading(false)
        return
      }
      // Sync the user into the SQL database on every login.
      setSyncing(true)
      try {
        const token = await u.getIdToken()
        const synced = await authApi.sync(token)
        setAppUser(synced)
        setError(null)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setSyncing(false)
        setLoading(false)
      }
    })
    return () => unsub()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth()
    if (!auth) throw new Error('Firebase is not configured')
    setError(null)
    await signInWithEmailAndPassword(auth, email, password)
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth()
    if (!auth) throw new Error('Firebase is not configured')
    setError(null)
    await createUserWithEmailAndPassword(auth, email, password)
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const auth = getFirebaseAuth()
    if (!auth) throw new Error('Firebase is not configured')
    setError(null)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      // Browsers with third-party storage / popup blocking break the popup flow.
      // Fall back to a full-page redirect, which works everywhere.
      const code = (e as { code?: string }).code
      if (
        code === 'auth/popup-blocked' ||
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/operation-not-supported-in-this-environment' ||
        code === 'auth/web-storage-unsupported'
      ) {
        await signInWithRedirect(auth, provider)
        return
      }
      throw e
    }
  }, [])

  const signOut = useCallback(async () => {
    const auth = getFirebaseAuth()
    // Best-effort server-side blocklist, then clear client session.
    try {
      await sessionsApi.logout()
    } catch {
      /* ignore — logout must never be blocked by a failed blocklist call */
    }
    if (auth) await firebaseSignOut(auth)
    setAppUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser,
      appUser,
      loading,
      syncing,
      configured: isFirebaseConfigured,
      error,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
    }),
    [firebaseUser, appUser, loading, syncing, error, signIn, signUp, signInWithGoogle, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
