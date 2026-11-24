import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { sections } from "@/lib/landing/routes"
import { FeatureCard } from "./feature-card"
import {
  ArchiveIllustration,
  CategorizationIllustration,
  MultiClientIllustration,
  OcrIllustration,
  ReportsIllustration,
  TaxDeclarationIllustration,
} from "./feature-illustrations"

/** In the order of t.benefits.items. */
const featureIllustrations = [
  MultiClientIllustration,
  OcrIllustration,
  ArchiveIllustration,
  CategorizationIllustration,
  ReportsIllustration,
  TaxDeclarationIllustration,
]
import { WorldwideBanner } from "./worldwide-banner"

export function FeaturesSection({ t }: { t: LandingDictionary }) {
  return (
    <div id={sections.features} style={{ scrollMarginTop: "100px" }}>
      <div className="pt-12 px-4 md:px-8 lg:px-12">
        <div aria-hidden="true" className="mx-auto mb-12 h-px max-w-3xl bg-linear-to-r from-transparent via-slate-200 to-transparent md:mb-16" />
        <h1 className="text-2xl md:text-3xl lg:text-[36px] text-center font-normal mb-8 md:mb-12">{t.benefits.exploreAll}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 max-w-7xl mx-auto">
          {featureIllustrations.map((Illustration, index) => {
            const text = t.benefits.items[index]
            return (
              <FeatureCard
                key={index}
                Illustration={Illustration}
                title={text?.title ?? ""}
                description={text?.description ?? ""}
              />
            )
          })}
        </div>
      </div>

      <WorldwideBanner t={t} />
    </div>
  )
}
