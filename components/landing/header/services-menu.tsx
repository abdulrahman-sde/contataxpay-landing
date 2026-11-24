"use client"

import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { routes } from "@/lib/landing/routes"
import { useLanguage } from "@/lib/i18n/language-provider"
import { MorphHighlight, useMorphHover } from "./morph-highlight"
import { SERVICE_LINKS } from "./nav-items"
import { useSectionNavigation } from "./use-section-navigation"
import { navItemClass } from "./site-header"

/** "Services" in the navbar: a card that opens on hover / focus, with a gliding highlight inside. */
export function ServicesMenu({ label }: { label: string }) {
  const { t } = useLanguage()
  const { scrollToServiceSection } = useSectionNavigation()
  const { containerRef: morphRef, state: morphState, itemProps: morphItem, containerProps: morphContainer } = useMorphHover<HTMLUListElement>()

  return (
    <div className="group/services relative">
      <Link href={routes.services} className={navItemClass}>
        {label}
        <ChevronDown className="ml-1.5 size-3 opacity-60 transition-transform duration-300 group-hover/services:rotate-180 group-focus-within/services:rotate-180" />
      </Link>

      {/* pt-3 keeps the hover alive while the pointer travels from the trigger to the card */}
      <div
        className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/services:visible group-focus-within/services:opacity-100 group-hover/services:visible group-hover/services:opacity-100"
      >
        <div className="w-[24rem] origin-top translate-y-1 scale-[0.98] overflow-hidden rounded-2xl bg-white ring-1 ring-slate-900/[0.06] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-16px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-focus-within/services:translate-y-0 group-focus-within/services:scale-100 group-hover/services:translate-y-0 group-hover/services:scale-100">
          <ul ref={morphRef} {...morphContainer} className="relative isolate p-2">
            <MorphHighlight state={morphState} className="rounded-[10px] bg-slate-900/[0.04]" />
            {SERVICE_LINKS.map((service) => {
              const item = t.landing.services.items[service.index]
              return (
                <li key={service.id} {...morphItem}>
                  <Link
                    href={routes.services}
                    onClick={(e) => scrollToServiceSection(service.id, e)}
                    className="block rounded-[10px] px-3 py-2.5 outline-hidden"
                  >
                    <span className="block min-w-0">
                      <span className="block text-sm font-medium text-slate-900">{item?.title}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{item?.desc}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <Link
            href={routes.services}
            className="group/all flex items-center justify-between border-t border-slate-900/[0.06] bg-slate-50/80 px-4 py-3 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            {t.landing.services.title}
            <ArrowRight className="size-3.5 transition-transform group-hover/all:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
