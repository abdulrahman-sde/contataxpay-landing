"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useTransition, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { type Language, writeLanguageCookie } from "./config"
import type { LandingDictionary } from "./get-dictionary"

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: LandingDictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/** Event the app uses to keep several language providers in step (contexts/language-context.tsx). */
const LANGUAGE_EVENT = "ctp:language-change"

/**
 * Gives client components the language and texts the server rendered with.
 * Changing the language writes the cookie and re-renders the page on the server,
 * so the HTML is always produced in the visitor's language (no flip after load).
 */
export function LanguageProvider({
  language,
  dictionary,
  children,
}: {
  language: Language
  dictionary: LandingDictionary
  children: ReactNode
}) {
  const router = useRouter()
  const [, startTransition] = useTransition()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback(
    (next: Language) => {
      writeLanguageCookie(next)
      try {
        // The app still reads the choice from localStorage as well.
        localStorage.setItem("language", next)
      } catch {
        // storage unavailable (private mode): the cookie is enough
      }
      window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: next }))
      startTransition(() => router.refresh())
    },
    [router],
  )

  const value = useMemo(() => ({ language, setLanguage, t: dictionary }), [language, setLanguage, dictionary])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used inside <LanguageProvider>")
  return context
}
