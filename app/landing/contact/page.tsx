import { Suspense } from "react"
import { LandingShell } from "@/components/landing/landing-shell"
import { ContactPage } from "@/components/landing/pages/contact/contact-page"
import { visitorLanguage } from "@/lib/i18n/visitor-language"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <InVisitorLanguage />
    </Suspense>
  )
}

async function InVisitorLanguage() {
  return (
    <LandingShell language={await visitorLanguage()}>
      <ContactPage />
    </LandingShell>
  )
}
