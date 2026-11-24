// Public part of the app's Fraud & Verification API (lib/fraud-verification/api.ts).
// Texts, buttons and on/off come from the super admin; nothing is defined here.

// Same-origin path, forwarded to the backend by the rewrite in next.config.ts.
const BASE = "/backend/api/v1/fraud-verification"

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: "application/json" } })
  const json = (await res.json().catch(() => null)) as { data?: T } | null
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (json?.data ?? json) as T
}

export interface TickerData {
  enabled: boolean
  message?: string
  buttonText?: string
  action?: string
  opensNewTab?: boolean
}

export const fetchTicker = (lang: string) =>
  request<TickerData>(`/public/ticker?lang=${encodeURIComponent(lang)}&placement=homepage`)

export interface PageTexts {
  reportButtonText: string
  verifyButtonText: string
}

export const fetchPageTexts = (lang: string) =>
  request<{ page: PageTexts; available: boolean }>(`/public/page?lang=${encodeURIComponent(lang)}`)

/** Only same-site paths and http(s) links are followed. */
export function safeHref(url: string | null | undefined): string | null {
  if (!url) return null
  const s = url.trim()
  if (s.startsWith("/") && !s.startsWith("//")) return s
  if (/^https?:\/\//i.test(s)) return s
  return null
}
