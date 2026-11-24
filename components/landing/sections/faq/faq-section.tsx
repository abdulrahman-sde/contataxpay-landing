import { sections } from "@/lib/landing/routes"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { FaqAccordion } from "./faq-accordion"

/** FAQ: title on the left (plain, second line muted), the accordion card on the right. Stacks on phones. */
export function FaqSection({ t }: { t: LandingDictionary }) {
  return (
    <section id={sections.faq} style={{ scrollMarginTop: "100px" }} className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
        <h2 className="text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
          {t.landing.faq.title} <br className="hidden md:block" />
          <span className="text-slate-400">{t.landing.faq.questions}</span>
        </h2>
        <FaqAccordion items={t.landing.faq.items} />
      </div>
    </section>
  )
}
