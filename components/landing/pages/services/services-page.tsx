import Image, { type StaticImageData } from "next/image"
import { ArrowDown, Check } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { assets } from "@/lib/landing/assets"
import { serviceSlugs } from "@/lib/landing/data"
import { routes } from "@/lib/landing/routes"
import { SERVICES_SCROLL_TARGET_KEY } from "@/lib/landing/scroll"
import { cn } from "@/lib/utils"
import { FaqAccordion } from "../../sections/faq/faq-accordion"
import { ScrollToSectionOnLoad } from "../../shared/scroll-to-section-on-load"

/** Same soft glow as the home page's Services / Testimonials / Footer. */
const PAGE_GLOW =
  "radial-gradient(45% 60% at 18% 25%, rgb(199 210 254 / 0.45), transparent 70%), radial-gradient(40% 60% at 85% 20%, rgb(191 219 254 / 0.6), transparent 70%), linear-gradient(180deg, #f4f7ff 0%, #eef3ff 45%, #ffffff 100%)"

const DIVIDER = "mx-auto h-px max-w-3xl bg-linear-to-r from-transparent via-slate-200 to-transparent"

/** Very light background per benefit card (same family as the review cards). */
const TINTS = ["bg-blue-50/70", "bg-violet-50/70", "bg-emerald-50/70", "bg-amber-50/70", "bg-sky-50/70", "bg-rose-50/70"]

const PHOTOS: StaticImageData[] = [assets.service1, assets.service2, assets.service1, assets.service1, assets.service2]

/**
 * Services page (/landing/services). Texts are the app's, unchanged.
 * Hero on the page glow; each service as a row (text left, photo + checklist panel right);
 * benefits as six lightly tinted cards; the home FAQ list.
 */
export function ServicesPage({ t }: { t: LandingDictionary }) {
  const s = t.landing.services
  const titles = [s.consulting, s.bookkeeping, s.payroll, s.businessFormation, s.insolvencyTitle]

  return (
    <div className="font-inter">
      <ScrollToSectionOnLoad storageKey={SERVICES_SCROLL_TARGET_KEY} />

      {/* Hero */}
      <section style={{ background: PAGE_GLOW }} className="px-4 pt-40 pb-14 sm:px-6 sm:pt-44 md:pb-20 lg:pt-56">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl leading-tight font-medium tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            {s.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-balance text-slate-700 md:text-lg">{s.subtitle}</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-balance text-slate-500">{s.description}</p>
          <a
            href={`#${serviceSlugs[0]}`}
            className={cn(buttonVariants(), "group mt-8 h-11 w-full gap-2 px-6 sm:w-auto")}
          >
            {s.exploreServices}
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </section>

      {/* Services offered: numbered steps */}
      <section className="px-4 pt-6 sm:px-6 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">{s.servicesOffered}</h2>
            <p className="mt-3 text-base text-balance text-slate-500">{s.servicesOfferedDesc}</p>
          </div>

          {/* One row per service: number, title, text and button on the left; photo + checklist panel on the right. */}
          <ol className="mt-12 divide-y divide-slate-200/70 border-t border-slate-200/70 md:mt-16">
            {serviceSlugs.map((slug, index) => {
              const item = s.items[index]
              return (
                <li
                  key={slug}
                  id={slug}
                  className="grid scroll-mt-28 gap-8 py-12 md:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#3563e9] tabular-nums">0{index + 1}</span>
                    <h3 className="mt-3 text-2xl font-medium tracking-tight text-slate-900 md:text-[1.75rem]">{titles[index]}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-600 md:text-base">{item?.description ?? item?.desc}</p>
                    <Link
                      href={routes.contact}
                      className={cn(buttonVariants(), "mt-8 h-11 w-full px-6 sm:w-auto sm:self-start")}
                    >
                      {s.getProfessionalSupport}
                    </Link>
                  </div>

                  <div className="overflow-hidden rounded-2xl bg-slate-50/80 ring-1 ring-slate-900/[0.06]">
                    <div className="relative h-44 md:h-52">
                      <Image
                        src={PHOTOS[index]!}
                        alt={titles[index] ?? ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40rem"
                      />
                    </div>
                    <ul className="grid gap-x-6 gap-y-3 p-6 sm:grid-cols-2 md:p-7">
                      {(item?.lists ?? []).map((line) => (
                        <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#3563e9]" strokeWidth={2.25} />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <div aria-hidden="true" className={cn(DIVIDER, "mt-8 md:mt-12")} />

      {/* Benefits */}
      <section aria-labelledby="services-benefits-heading" className="px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 id="services-benefits-heading" className="text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
              {s.benefitsTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500">{s.benefitsSubtitle}</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-start md:mt-14">
            {s.benefitsItems.map((benefit, index) => (
              <div
                key={benefit.title}
                className={cn("flex flex-col rounded-2xl p-6 ring-1 ring-slate-900/[0.06]", TINTS[index % TINTS.length])}
              >
                <span className="text-sm font-medium text-[#3563e9] tabular-nums">0{index + 1}</span>
                <h3 className="mt-8 text-lg text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden="true" className={DIVIDER} />

      {/* FAQ: same layout as the home page */}
      <section className="px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
          <h2 className="text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
            {t.landing.faq.title} <br className="hidden md:block" />
            <span className="text-slate-400">{t.landing.faq.questions}</span>
          </h2>
          <FaqAccordion items={s.faqItems} />
        </div>
      </section>
    </div>
  )
}
