import Link from "next/link"
import type { CSSProperties } from "react"
import { ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { assets } from "@/lib/landing/assets"
import { cn } from "@/lib/utils"
import { routes, sections } from "@/lib/landing/routes"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { FraudReportLink } from "../../shared/fraud-report-link"
import { SectionLink } from "../../shared/section-link"
import { HeroBenefits } from "./hero-benefits"

// Phone and desktop backgrounds are switched by CSS (no JavaScript), so the server HTML is already right.
const backgrounds = {
  "--hero-bg": `url(${assets.heroBgMobile.src})`,
  "--hero-bg-md": `url(${assets.heroBg.src})`,
  "--hero-stars": `url(${assets.smallStarMobile.src})`,
  "--hero-stars-md": `url(${assets.smallStar.src})`,
} as CSSProperties

/**
 * Type hierarchy follows the app's page headers: one dark headline with tight leading,
 * a muted supporting line, then actions in order of importance (primary, secondary, text link).
 */
export function HeroSection({ t }: { t: LandingDictionary }) {
  const firstLine = `${t.hero.title} ${t.hero.titleHighlight}`
  return (
    <>
      <section
        style={{
          ...backgrounds,
          // Soft blue / lilac glow in the page palette, fading to white at the bottom (no pink edges or band).
          background:
            "radial-gradient(50% 40% at 15% 10%, rgb(199 210 254 / 0.45), transparent 70%), radial-gradient(45% 40% at 85% 12%, rgb(191 219 254 / 0.55), transparent 70%), linear-gradient(180deg, #f4f7ff 0%, #f7f9ff 55%, #ffffff 100%)",
        }}
        className="w-full overflow-hidden"
      >
        <div className="relative isolate w-full">
          {/* The ring image on its own layer, so only it fades out at the bottom (not the content). */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-(image:--hero-stars) mask-b-from-80% md:bg-(image:--hero-stars-md)"
          />
          <div className="mx-auto max-w-6xl px-6 pt-40 text-center sm:pt-44 lg:pt-56">
            {/* Always two lines on desktop: line 1 = title + highlight, kept together.
                Long translations (e.g. Russian) step down one size so line 1 still fits. */}
            <h1
              className={cn(
                "mx-auto text-balance text-4xl font-medium leading-[1.1] tracking-tight text-slate-900 sm:text-5xl",
                firstLine.length > 36 ? "lg:text-5xl" : "lg:text-[3.5rem]",
              )}
            >
              <span className="lg:whitespace-nowrap">
                {t.hero.title} <span className="text-primary">{t.hero.titleHighlight}</span>
              </span>
              <br className="hidden sm:block" /> {t.hero.readyToWork}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-500 sm:text-lg">
              {t.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="h-11 w-full px-5 sm:w-auto">
                <Link href={routes.register}>{t.hero.ctaPrimary}</Link>
              </Button>
              {/* "Verify representative": label comes from the super admin, in the selected language */}
              <FraudReportLink kind="verify" className={cn(buttonVariants({ variant: "secondary" }), "h-11 w-full px-5 sm:w-auto")} />
            </div>

            <SectionLink
              section={sections.faq}
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              {t.hero.ctaSecondary}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </SectionLink>
          </div>

          <HeroBenefits t={t} />
        </div>
      </section>

    </>
  )
}
