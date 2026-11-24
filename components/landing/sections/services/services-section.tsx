import { serviceSlugs } from "@/lib/landing/data"
import { sections } from "@/lib/landing/routes"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { ServiceCard } from "./service-card"

/** "Our Services": three cards on the first row, the last two centred below. Background = the worldwide banner's glow. */
export function ServicesSection({ t }: { t: LandingDictionary }) {
  const items = t.landing.services.items
  const cards = serviceSlugs.map((slug, index) => ({ slug, ...items[index] }))

  return (
    <section
      id={sections.services}
      style={{
        scrollMarginTop: "100px",
        // Same soft blue / lilac glow as the "Accessible Worldwide" banner: strongest at the top, fading to white at the bottom.
        background:
          "radial-gradient(45% 60% at 18% 25%, rgb(199 210 254 / 0.45), transparent 70%), radial-gradient(40% 60% at 85% 20%, rgb(191 219 254 / 0.6), transparent 70%), linear-gradient(180deg, #f4f7ff 0%, #eef3ff 45%, #ffffff 100%)",
      }}
      className="relative"
    >
      <div className="relative mx-auto max-w-[76rem] px-4 py-20 sm:px-6 md:py-28">
        <h2 className="text-center text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">{t.landing.services.title}</h2>

        <div className="mt-12 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {cards.slice(0, 3).map((card, i) => (
            <ServiceCard key={card.slug} index={i} title={card.title ?? ""} desc={card.desc ?? ""} lists={card.lists ?? []} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:mx-auto lg:w-2/3">
          {cards.slice(3, 5).map((card, i) => (
            <ServiceCard key={card.slug} index={i + 3} title={card.title ?? ""} desc={card.desc ?? ""} lists={card.lists ?? []} />
          ))}
        </div>
      </div>
    </section>
  )
}
