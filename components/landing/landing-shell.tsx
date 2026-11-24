import type { ReactNode } from "react"
import type { Language } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LanguageProvider } from "@/lib/i18n/language-provider"
import { WhatsAppButton } from "./floating/whatsapp-button"
import { SiteFooter } from "./footer/site-footer"
import { SiteHeader } from "./header/site-header"

/** Header, footer and floating buttons around a landing page, in one language. */
export function LandingShell({ language, children }: { language: Language; children: ReactNode }) {
  const t = getDictionary(language)
  return (
    <LanguageProvider language={language} dictionary={t}>
      {/* overflow-x-clip (not hidden): hidden makes this a scroll container and breaks the sticky header. */}
      <div className="overflow-x-clip w-full">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter t={t} />
        <WhatsAppButton t={t} />
      </div>
    </LanguageProvider>
  )
}
