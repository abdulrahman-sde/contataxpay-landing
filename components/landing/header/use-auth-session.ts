"use client"

import { useEffect, useState } from "react"
import { AUTH_EVENTS, getCurrentUser, type SessionUser } from "@/lib/auth/session"

/** Sign-in state, kept in sync with the app (including sign-out from another tab). Null until mounted. */
export function useAuthSession(): SessionUser | null {
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    const update = () => setUser(getCurrentUser())
    update()
    AUTH_EVENTS.forEach((name) => window.addEventListener(name, update))
    return () => AUTH_EVENTS.forEach((name) => window.removeEventListener(name, update))
  }, [])

  return user
}
