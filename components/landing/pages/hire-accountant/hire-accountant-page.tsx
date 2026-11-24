import Briefcase from "reicon-react/icons/Briefcase"
import EyeOpen from "reicon-react/icons/EyeOpen"
import FileCheck from "reicon-react/icons/FileCheck"
import MedalStar from "reicon-react/icons/MedalStar"
import ShieldTick from "reicon-react/icons/ShieldTick"
import Verified from "reicon-react/icons/Verified"
import type { IconComponent } from "reicon-react/createIcon"
import { buttonVariants } from "@/components/ui/button"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { cn } from "@/lib/utils"
import { WorldwideBanner } from "../../sections/features/worldwide-banner"
import { GdprArt, GrowthArt, TrustBadge, VerifiedArt } from "../../sections/hero/trust-badge"
import { HireAccountantForm } from "./hire-accountant-form"

/** Same soft glow as the home page's Services / Testimonials / Footer. */
const PAGE_GLOW =
  "radial-gradient(45% 60% at 18% 25%, rgb(199 210 254 / 0.45), transparent 70%), radial-gradient(40% 60% at 85% 20%, rgb(191 219 254 / 0.6), transparent 70%), linear-gradient(180deg, #f4f7ff 0%, #eef3ff 45%, #ffffff 100%)"

const DIVIDER = "mx-auto h-px max-w-3xl bg-linear-to-r from-transparent via-slate-200 to-transparent"

/**
 * Hire Accountant page (/landing/hire-accountant). Texts are the app's, unchanged.
 * Hero on the page glow with the three trust badges (home hero style), the benefit cards in
 * production's arrangement, the home "Accessible Worldwide" map banner, then the 8-step form.
 */
export function HireAccountantPage({ t }: { t: LandingDictionary }) {
  const h = t.landing.hireAccountant

  return (
    <div className="font-inter">
      {/* Hero */}
      <section style={{ background: PAGE_GLOW }} className="px-4 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl leading-tight font-medium tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            {h.hero.title} <br className="hidden md:block" />
            {h.hero.titleLine2}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            <span className="hidden md:inline">
              {h.hero.subtitle} {h.hero.subtitleLine2}
            </span>
            <span className="md:hidden">{h.hero.subtitleMobile}</span>
          </p>
          <a href="#fill-out-form" className={cn(buttonVariants(), "mt-8 h-11 w-full px-7 sm:w-auto")}>
            {h.hero.ctaButton}
          </a>
        </div>

        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-3 md:mt-20">
          <TrustBadge art={<VerifiedArt />} label={h.cards.verified} />
          <TrustBadge art={<GrowthArt />} label={h.cards.experts} />
          <TrustBadge art={<GdprArt />} label={h.cards.gdpr} />
        </div>
      </section>

      {/* Benefits: same arrangement as production (a card either side of the title, four cards below) */}
      <section aria-labelledby="hire-benefits-heading" className="px-4 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          {/* One 4-column grid: top row = card, title (2 columns), card; bottom row = four cards. Edges line up. */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            <div className="col-span-2 mb-4 text-center md:order-2 md:mb-0 md:self-center md:px-4">
              <h2 id="hire-benefits-heading" className="text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
                {h.benefits.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-balance text-slate-500">{h.benefits.subtitle}</p>
            </div>
            <BenefitCard label={h.benefits.certifiedProfessionals} tone={TONES[0]!} className="md:order-1" />
            <BenefitCard label={h.benefits.certifiedProfessionals} tone={TONES[1]!} className="md:order-3" />
            {h.benefits.items.map((item, index) => (
              <BenefitCard key={item.title} label={item.title.trim()} tone={TONES[index + 2] ?? TONES[0]!} className="md:order-4" />
            ))}
          </div>
        </div>
      </section>

      <WorldwideBanner t={t} texts={h.launched} className="mt-0" />

      {/* Form */}
      <section id="fill-out-form" className="scroll-mt-24 px-4 pt-20 pb-24 sm:px-6 md:pt-24 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">{h.form.title}</h2>
            <p className="mt-3 text-base text-slate-500">{h.form.subtitle}</p>
          </div>
          <div className="mt-10 md:mt-12">
            <HireAccountantForm />
          </div>
        </div>
      </section>

      <div aria-hidden="true" className={DIVIDER} />
    </div>
  )
}

/** Each benefit card: its own icon and a very light tint (same family as the review cards). */
type Tone = { icon: IconComponent; card: string; tile: string }
const TONES: Tone[] = [
  { icon: Verified, card: "bg-blue-50/70", tile: "bg-blue-100 text-blue-600" },
  { icon: MedalStar, card: "bg-violet-50/70", tile: "bg-violet-100 text-violet-600" },
  { icon: FileCheck, card: "bg-emerald-50/70", tile: "bg-emerald-100 text-emerald-600" },
  { icon: Briefcase, card: "bg-amber-50/70", tile: "bg-amber-100 text-amber-600" },
  { icon: ShieldTick, card: "bg-sky-50/70", tile: "bg-sky-100 text-sky-600" },
  { icon: EyeOpen, card: "bg-rose-50/70", tile: "bg-rose-100 text-rose-600" },
]

/** One benefit: icon on top, label below. */
function BenefitCard({ label, tone, className }: { label: string; tone: Tone; className?: string }) {
  const Icon = tone.icon
  return (
    <div
      className={cn(
        "flex min-h-40 flex-col items-center justify-center gap-4 rounded-2xl px-5 py-6 text-center ring-1 ring-slate-900/[0.06]",
        tone.card,
        className,
      )}
    >
      <span className={cn("flex size-11 items-center justify-center rounded-xl", tone.tile)}>
        <Icon size={22} weight="Filled" />
      </span>
      <p className="text-sm leading-snug text-slate-800">{label}</p>
    </div>
  )
}
