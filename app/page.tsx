import { Suspense } from "react"
import { cookies } from "next/headers"
import { LandingPage } from "@/components/landing/landing-page"
import { LANGUAGE_COOKIE, defaultLanguage, parseLanguage } from "@/lib/i18n/config"

export default function Home() {
  return (
    <Suspense fallback={null}>
      <LandingInVisitorLanguage />
    </Suspense>
  )
}

/** Reads the visitor's language from the cookie, then renders the (cached) page in it. */
async function LandingInVisitorLanguage() {
  const language = parseLanguage((await cookies()).get(LANGUAGE_COOKIE)?.value) ?? defaultLanguage
  return <LandingPage language={language} />
}
