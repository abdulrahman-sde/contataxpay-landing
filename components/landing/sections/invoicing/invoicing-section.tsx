import Link from "next/link"
import Bank from "reicon-react/icons/Bank"
import Globe from "reicon-react/icons/Globe"
import Headset from "reicon-react/icons/Headset"
import LanguageSquare from "reicon-react/icons/LanguageSquare"
import PercentCircle from "reicon-react/icons/PercentCircle"
import Store from "reicon-react/icons/Store"
import type { IconComponent } from "reicon-react/createIcon"
import { Button } from "@/components/ui/button"
import { routes } from "@/lib/landing/routes"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { cn } from "@/lib/utils"

/*
 * E-invoicing bento: centred header; six cards with the production title + text and one filled
 * Reicon icon. Each card has its own icon colour on a soft grey card.
 * lg: 3 columns, the wide card switches sides each row. md: 2 columns. Phones: 1 column.
 */

type Tone = { tile: string }
const tones = {
  blue: { tile: "bg-blue-50 text-blue-600 ring-blue-600/10" },
  violet: { tile: "bg-violet-50 text-violet-600 ring-violet-600/10" },
  emerald: { tile: "bg-emerald-50 text-emerald-600 ring-emerald-600/10" },
  sky: { tile: "bg-sky-50 text-sky-600 ring-sky-600/10" },
  amber: { tile: "bg-amber-50 text-amber-600 ring-amber-600/10" },
  rose: { tile: "bg-rose-50 text-rose-600 ring-rose-600/10" },
} satisfies Record<string, Tone>

/** Index = position in t.landing.invoicing.items. */
const tiles: { index: number; Icon: IconComponent; tone: Tone; wide?: boolean }[] = [
  { index: 1, Icon: PercentCircle, tone: tones.blue, wide: true },
  { index: 0, Icon: LanguageSquare, tone: tones.violet },
  { index: 2, Icon: Headset, tone: tones.emerald },
  { index: 3, Icon: Globe, tone: tones.sky, wide: true },
  { index: 5, Icon: Bank, tone: tones.amber, wide: true },
  { index: 4, Icon: Store, tone: tones.rose },
]

export function InvoicingSection({ t }: { t: LandingDictionary }) {
  const { invoicing } = t.landing

  return (
    <section className="px-4 pb-20 sm:px-6 md:pb-28">
      <div className="mx-auto max-w-5xl">
        <div aria-hidden="true" className="mx-auto mb-16 h-px max-w-3xl bg-linear-to-r from-transparent via-slate-200 to-transparent md:mb-24" />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">{invoicing.title}</h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-slate-500">{invoicing.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {tiles.map(({ index, Icon, tone, wide }) => {
            const item = invoicing.items[index]
            return (
              <article
                key={index}
                className={cn("min-w-0 rounded-2xl bg-slate-50/80 p-6 ring-1 ring-slate-900/[0.07] sm:p-7", wide && "lg:col-span-2")}
              >
                <span aria-hidden="true" className={cn("grid size-10 place-content-center rounded-xl ring-1", tone.tile)}>
                  <Icon size={20} weight="Filled" />
                </span>
                <h3 className="mt-6 text-slate-900">{item?.title}</h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-500">{item?.desc}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Button asChild className="h-11 w-full px-5 sm:w-auto">
            <Link href={routes.register}>{invoicing.cta}</Link>
          </Button>
          <p className="text-center text-sm text-slate-500">{invoicing.disclaimer}</p>
        </div>
      </div>
    </section>
  )
}
