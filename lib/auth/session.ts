// Who is signed in, read from the same browser storage the app writes (lib/auth-system.ts).
// The landing only needs to know whether to show "Login / Signup" or "Go to the accounting system".
// When the landing moves back into the app, replace this file's callers with `authSystem`.

export type UserRole = "client" | "accountant" | "superadmin" | "assistant" | string

export interface SessionUser {
  id: string
  email: string
  role?: UserRole
}

const STORAGE_KEY = "auth_current_user"

export function getCurrentUser(): SessionUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const user = JSON.parse(raw) as Partial<SessionUser> | null
    return user?.id && user.email ? (user as SessionUser) : null
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

/** Local sign-out: forget the stored user and tell open pages (same events the app listens to). */
export function logout(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    window.localStorage.removeItem("token")
  } catch {
    // storage unavailable
  }
  window.dispatchEvent(new Event("authLogout"))
}

/** Dashboard path by role: client, accountant, superadmin, assistant. */
export function getDashboardPath(role?: UserRole): string {
  switch (role) {
    case "accountant":
      return "/accountant"
    case "superadmin":
      return "/super-admin"
    case "assistant":
      return "/assistant"
    default:
      return "/dashboard"
  }
}

/** Events after which the sign-in state may have changed (also fired from other tabs by the app). */
export const AUTH_EVENTS = ["authUpdate", "authLogout", "logout"] as const
