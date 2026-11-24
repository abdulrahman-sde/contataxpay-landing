import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { BwaChart } from "./bwa-chart"
import { CoinsArt, GdprArt, GrowthArt, LockArt, TrustBadge } from "./trust-badge"

/** "Everything you need for your accounting": four trust cards (small illustrations) and the mini BWA dashboard card (ingot-ui bars). */
export function HeroBenefits({ t }: { t: LandingDictionary }) {
  const badges = {
    encrypted: { art: <LockArt />, label: t.hero.trustBadges.encrypted },
    gdpr: { art: <GdprArt />, label: t.hero.trustBadges.gdpr },
    currency: { art: <CoinsArt />, label: t.landing.hero.multiCurrency },
    scalable: { art: <GrowthArt />, label: t.landing.hero.scalable },
  }

  return (
    <div className="relative mt-16 pb-12 lg:mt-20">

      {/* Phones and tablets: heading, then a 2x2 grid */}
      <h2 className="relative z-10 mt-10 px-6 text-center text-2xl font-medium tracking-tight text-slate-900 lg:hidden">
        {t.benefits.title}
      </h2>
      <div className="mx-4 mt-6 grid auto-rows-fr grid-cols-2 gap-3 sm:gap-4 md:mx-7 md:gap-6 lg:hidden">
        <TrustBadge {...badges.encrypted} />
        <TrustBadge {...badges.gdpr} />
        <TrustBadge {...badges.currency} />
        <TrustBadge {...badges.scalable} />
      </div>

      {/* Desktop: cards around the heading */}
      <div className="hidden lg:block">
        {/* Two stacked badges each side, edges lined up; the heading sits in the true centre column
            (lines up with the chart card) and in the middle of the two rows. */}
        <div className="mx-20 -mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="flex flex-col items-start gap-5">
            <TrustBadge {...badges.encrypted} />
            <TrustBadge {...badges.currency} />
          </div>
          <h2 className="text-center text-3xl font-medium tracking-tight text-slate-900">{t.benefits.title}</h2>
          <div className="flex flex-col items-end gap-5">
            <TrustBadge {...badges.gdpr} />
            <TrustBadge {...badges.scalable} />
          </div>
        </div>
      </div>

      {/* Soft glow behind the chart card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[min(760px,100%)] -translate-x-1/2"
        style={{ background: "radial-gradient(closest-side, rgb(165 180 252 / 0.35), transparent)" }}
      />

      {/* Graph card */}
      <div className="flex justify-center mt-12">
        <div
          className="bg-white/80 p-5 sm:p-[25px] rounded-[16px] w-[calc(100%-2rem)] max-w-[550px] shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]"
          style={{ zIndex: 1 }}
        >
          <h3 className="text-base font-medium text-slate-900">{t.landing.hero.precision}</h3>
          <div className="mt-6">
            <BwaChart />
          </div>
        </div>
      </div>
    </div>
  )
}
