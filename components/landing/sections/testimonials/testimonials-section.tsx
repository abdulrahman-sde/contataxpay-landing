import { Marquee } from "@/components/ui/marquee"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { ReviewCard } from "./review-card"

/** Very light card colours, one per review in turn. */
const TINTS = ["bg-blue-50/70", "bg-violet-50/70", "bg-emerald-50/70", "bg-amber-50/70", "bg-sky-50/70", "bg-rose-50/70"]

/** "What our customers say": the Magic UI marquee demo (one row, faded edges, pauses on hover). */
export function TestimonialsSection({ t }: { t: LandingDictionary }) {
  const reviews = t.landing.reviews.items

  return (
    <section
      style={{
        // Same fading glow as Our Services: strongest at the top, white at the bottom.
        background:
          "radial-gradient(45% 60% at 18% 25%, rgb(199 210 254 / 0.45), transparent 70%), radial-gradient(40% 60% at 85% 20%, rgb(191 219 254 / 0.6), transparent 70%), linear-gradient(180deg, #f4f7ff 0%, #eef3ff 45%, #ffffff 100%)",
      }}
      className="pt-20 md:pt-28"
    >
      <h2 className="px-4 text-center text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">{t.testimonials.title}</h2>

      <div
        className="relative mx-auto mt-12 flex w-full max-w-7xl flex-col items-center justify-center overflow-hidden md:mt-14"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <Marquee pauseOnHover className="[--duration:60s]">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.name}
              {...review}
              tint={TINTS[index % TINTS.length] ?? TINTS[0]!}
              starsLabel={t.landing.reviews.starsAriaLabel.replace("{stars}", String(review.stars))}
            />
          ))}
        </Marquee>
      </div>

      <div aria-hidden="true" className="mx-auto mt-20 h-px max-w-3xl bg-linear-to-r from-transparent via-slate-200 to-transparent md:mt-28" />
    </section>
  )
}
