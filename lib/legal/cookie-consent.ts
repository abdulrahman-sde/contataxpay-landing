// The visitor's cookie decision, as stored by the app's cookie banner (lib/legal/cookie-consent.ts).
// The landing only reads it (the fraud pop-up waits for the decision) and can ask the banner to open.

const CONSENT_STORAGE_KEY = "ctp.consent.v1"
const CONSENT_VERSION = 1
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000
const CHANGE_EVENT = "ctp:consent-changed"
const OPEN_SETTINGS_EVENT = "ctp:open-cookie-settings"

/** True once the visitor has made a (still valid) cookie choice. */
export function hasCookieDecision(): boolean {
  if (typeof window === "undefined") return false
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return false
    const value = JSON.parse(raw) as { version?: number; decidedAt?: string }
    if (value.version !== CONSENT_VERSION || typeof value.decidedAt !== "string") return false
    const age = Date.now() - new Date(value.decidedAt).getTime()
    return Number.isFinite(age) && age <= CONSENT_MAX_AGE_MS
  } catch {
    return false
  }
}

export function subscribeConsent(listener: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, listener)
  window.addEventListener("storage", listener)
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener)
    window.removeEventListener("storage", listener)
  }
}

/** Opens the cookie settings panel (the banner lives in the app's root layout). */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}
