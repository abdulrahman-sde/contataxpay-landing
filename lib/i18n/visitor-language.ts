import { cookies } from "next/headers"
import { LANGUAGE_COOKIE, defaultLanguage, parseLanguage, type Language } from "./config"

/** The visitor's language from the cookie (server only; call inside Suspense). */
export async function visitorLanguage(): Promise<Language> {
  return parseLanguage((await cookies()).get(LANGUAGE_COOKIE)?.value) ?? defaultLanguage
}
