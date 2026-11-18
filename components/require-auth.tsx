'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'

/**
 * Client-side auth gate for the dashboard group.
 * Redirects to /login when there is no authenticated Firebase user.
 * (The backend additionally enforces auth on every endpoint.)
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { firebaseUser, loading, configured } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !firebaseUser) router.replace('/login')
  }, [loading, firebaseUser, router])

  if (!configured) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-sm text-slate-500">
        Firebase auth is not configured. Set NEXT_PUBLIC_FIREBASE_* in .env.local.
      </div>
    )
  }

  if (loading || !firebaseUser) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-400">
        Loading…
      </div>
    )
  }

  return <>{children}</>
}
