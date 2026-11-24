import type { Language } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LanguageProvider } from "@/lib/i18n/language-provider"
import { WhatsAppButton } from "./floating/whatsapp-button"
import { SiteFooter } from "./footer/site-footer"
import { SiteHeader } from "./header/site-header"
import { FaqSection } from "./sections/faq/faq-section"
import { FeaturesSection } from "./sections/features/features-section"
import { HeroSection } from "./sections/hero/hero-section"
import { InvoicingSection } from "./sections/invoicing/invoicing-section"
import { PricingSection } from "./sections/pricing/pricing-section"
import { ServicesSection } from "./sections/services/services-section"
import { TestimonialsSection } from "./sections/testimonials/testimonials-section"
import { ScrollToSectionOnLoad } from "./shared/scroll-to-section-on-load"

/**
 * The whole landing page in one language. Rendered on the server and cached per language;
 * only the header, the FAQ list, the review controls and the floating buttons run in the browser.
 */
export async function LandingPage({ language }: { language: Language }) {
  "use cache"

  const t = getDictionary(language)

  return (
    <LanguageProvider language={language} dictionary={t}>
      {/* overflow-x-clip (not hidden): hidden makes this a scroll container and breaks the sticky header. */}
      <div className="overflow-x-clip w-full">
        <SiteHeader />
        <main>
          <ScrollToSectionOnLoad />
          <HeroSection t={t} />
          <FeaturesSection t={t} />
          <InvoicingSection t={t} />
          <ServicesSection t={t} />
          <PricingSection t={t} />
          <div className="py-12 sm:py-16 md:py-20 lg:py-24">
            <TestimonialsSection t={t} />
            <FaqSection t={t} />
          </div>
        </main>
        <SiteFooter t={t} />
        <WhatsAppButton t={t} />
      </div>
    </LanguageProvider>
  )
}
