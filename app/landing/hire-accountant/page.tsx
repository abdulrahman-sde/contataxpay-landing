import { Suspense } from "react"
import { LandingShell } from "@/components/landing/landing-shell"
import { HireAccountantPage } from "@/components/landing/pages/hire-accountant/hire-accountant-page"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { visitorLanguage } from "@/lib/i18n/visitor-language"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <InVisitorLanguage />
    </Suspense>
  )
}

async function InVisitorLanguage() {
  const language = await visitorLanguage()
  return (
    <LandingShell language={language}>
      <HireAccountantPage t={getDictionary(language)} />
    </LandingShell>
  )
}
