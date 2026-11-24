// Languages of the landing, and the cookie that carries the visitor's choice to the server.
// Same cookie as the app (lib/language-cookie.ts on feature/ui-standardization): `ctp_lang`.
// The cookie lets the server render the page in the chosen language, so nothing flips after load.

export type Language = "de" | "en" | "ro" | "ru"

export const languages: Record<Language, string> = {
  de: "Deutsch",
  en: "English",
  ro: "Română",
  ru: "Русский",
}

export const defaultLanguage: Language = "de"

export const LANGUAGE_COOKIE = "ctp_lang"

const LANGUAGE_CODES = Object.keys(languages) as Language[]

export function parseLanguage(value: unknown): Language | null {
  return typeof value === "string" && (LANGUAGE_CODES as string[]).includes(value) ? (value as Language) : null
}

/** Browser only: remember the language for the server's next render (one year, whole site). */
export function writeLanguageCookie(lang: Language): void {
  if (typeof document === "undefined") return
  try {
    const secure = window.location.protocol === "https:" ? "; secure" : ""
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax${secure}`
  } catch {
    // cookies blocked: the page still works, the server just renders the default language
  }
}
