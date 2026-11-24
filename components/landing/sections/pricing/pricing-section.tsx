import { sections } from "@/lib/landing/routes"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"

/*
 * "Flexible pricing" as a horizontal pricing table: one card, one row per plan.
 *  - Left column (grey): plan label and the price ("0 €" / "On request").
 *  - Right column (white): plan name and the full original text.
 * Rows stack into one column on phones. No bold weights.
 */
function PlanRow({
  label,
  price,
  name,
  text,
}: {
  label: string
  price: string
  name: string
  text: string
}) {
  return (
    <div className="grid md:grid-cols-[16rem_1fr]">
      <div className="flex flex-col bg-slate-50 p-6 sm:p-8">
        <span className="w-fit rounded-full bg-white px-2.5 py-1 text-xs text-slate-600 ring-1 ring-slate-900/[0.08]">
          {label}
        </span>
        <p className="mt-5 text-3xl font-medium tracking-tight text-slate-900">{price}</p>
      </div>

      <div className="min-w-0 p-6 sm:p-8">
        <h3 className="text-lg font-normal tracking-tight text-slate-900">{name}</h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-500">{text}</p>
      </div>
    </div>
  )
}

export function PricingSection({ t }: { t: LandingDictionary }) {
  const s = t.landing.services

  return (
    <section id={sections.pricing} style={{ scrollMarginTop: "100px" }} className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-balance text-center text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
          {s.pricingTitle}
        </h2>

        <div className="mt-10 divide-y divide-slate-200/80 overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.08] md:mt-12">
          <PlanRow
            label={s.freeBadge}
            price={s.freePrice}
            name={s.freeTitle}
            text={s.freeDescription1}
          />
          <PlanRow
            label={s.paidBadge}
            price={s.paidPrice}
            name={s.paidTitle}
            text={s.freeDescription2}
          />
        </div>
      </div>
    </section>
  )
}
