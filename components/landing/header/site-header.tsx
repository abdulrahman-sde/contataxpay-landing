"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDashboardPath, logout } from "@/lib/auth/session"
import { assets } from "@/lib/landing/assets"
import { routes } from "@/lib/landing/routes"
import { useLanguage } from "@/lib/i18n/language-provider"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "./language-switcher"
import { MorphHighlight, useMorphHover } from "./morph-highlight"
import { getNavItems } from "./nav-items"
import { ServicesMenu } from "./services-menu"
import { useAuthSession } from "./use-auth-session"
import { useSectionNavigation } from "./use-section-navigation"

/** Nav item: the hover background is the shared gliding highlight (MorphHighlight), not per item. */
export const navItemClass =
  "inline-flex h-8 w-max items-center justify-center rounded-[10px] px-3 max-xl:px-2.5 py-1 whitespace-nowrap text-sm font-medium text-slate-600 transition-colors duration-200 outline-hidden hover:text-slate-900 focus-visible:text-slate-900 focus-visible:ring-2 focus-visible:ring-primary/30"

const mobileItemClass = "block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-foreground/5"

/**
 * Floating header: see-through over the hero; once the page scrolls it narrows into a
 * frosted white pill. From 1280px the links sit centred; from 1100px (1200px in German, whose
 * labels are longer) they sit next to the logo; below that the menu opens as a frosted sheet.
 */
const COMPACT_NAV_MIN = { default: 1100, de: 1200 } as const
export function SiteHeader() {
  const { t, language } = useLanguage()
  const longLabels = language === "de"
  const navMin = longLabels ? COMPACT_NAV_MIN.de : COMPACT_NAV_MIN.default
  const router = useRouter()
  const user = useAuthSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const { scrollToSection } = useSectionNavigation(closeMenu)
  const items = getNavItems(t)
  const dashboardPath = getDashboardPath(user?.role)
  const { containerRef: morphRef, state: morphState, itemProps: morphItem, containerProps: morphContainer } = useMorphHover<HTMLUListElement>()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => window.innerWidth >= navMin && setMenuOpen(false)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [navMin])

  // No page scrolling behind the open menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const go = (href: string) => {
    closeMenu()
    router.push(href)
  }
  const onLogout = () => {
    logout()
    closeMenu()
    router.push(routes.landing)
  }

  const actions = user ? (
    <>
      <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-foreground hover:bg-foreground/5">
        {t.nav.logout}
      </Button>
      <Button size="sm" asChild>
        <Link href={dashboardPath} onClick={closeMenu}>
          {t.nav.goToAccounting}
        </Link>
      </Button>
    </>
  ) : (
    <>
      <Button variant="ghost" size="sm" onClick={() => go(routes.login)} className="text-muted-foreground hover:text-foreground hover:bg-foreground/5">
        {t.nav.login}
      </Button>
      <Button size="sm" onClick={() => go(routes.register)}>
        {t.nav.signup}
      </Button>
    </>
  )

  return (
    <header data-scrolled={scrolled} data-state={menuOpen ? "open" : "closed"} data-long-labels={longLabels} className="group/header">
      <div
        className="fixed inset-x-0 top-0 z-50 px-2 pt-2 lg:px-4 lg:pt-3 group-data-[state=open]/header:h-dvh group-data-[state=open]/header:bg-background/60 group-data-[state=open]/header:backdrop-blur"
        style={{ top: "var(--fraud-ticker-h, 0px)" }}
      >
        {/* Hairline under the bar while it sits at the top; fades out when the bar turns into the floating pill. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-slate-900/10 to-transparent transition-opacity duration-500 group-data-[scrolled=true]/header:opacity-0 group-data-[state=open]/header:opacity-0"
        />
        <div
          className={cn(
            "mx-auto w-full max-w-7xl rounded-2xl border border-transparent px-4 ring-1 ring-transparent transition-[max-width,background-color,box-shadow,padding,backdrop-filter] duration-500 ease-in-out lg:px-5",
            // Floating pill: frosted glass (see-through white + strong blur + a touch more colour), thin white edge.
            "group-data-[scrolled=true]/header:max-w-6xl group-data-[scrolled=true]/header:border-white/60 group-data-[scrolled=true]/header:bg-white/55 group-data-[scrolled=true]/header:shadow-lg group-data-[scrolled=true]/header:shadow-black/[0.06] group-data-[scrolled=true]/header:ring-slate-900/[0.06] group-data-[scrolled=true]/header:backdrop-blur-xl group-data-[scrolled=true]/header:backdrop-saturate-150",
            "group-data-[state=open]/header:bg-white/80 group-data-[state=open]/header:backdrop-blur-xl group-data-[state=open]/header:shadow-lg group-data-[state=open]/header:shadow-black/[0.06] group-data-[state=open]/header:ring-foreground/5",
          )}
        >
          <div className="relative flex h-14 items-center justify-between gap-6 lg:h-16 xl:grid xl:grid-cols-[1fr_auto_1fr]">
            {/* Brand */}
            <Link href={routes.landing} aria-label="Contataxpay home" className="flex shrink-0 items-center gap-2.5 justify-self-start" onClick={closeMenu}>
              <Image src={assets.logo} alt="" width={32} height={32} className="size-8" priority />
              <span className="text-base font-semibold tracking-tight text-foreground">Contataxpay</span>
            </Link>

            {/* Desktop navigation (centred) */}
            <nav className="hidden min-[1100px]:block max-xl:mr-auto group-data-[long-labels=true]/header:max-[1200px]:hidden" aria-label="Main">
              <ul ref={morphRef} {...morphContainer} className="relative isolate flex items-center gap-0.5 xl:gap-1">
                <MorphHighlight
                  state={morphState}
                  className="rounded-[10px] bg-slate-900/[0.05] ring-1 ring-slate-900/[0.04] group-data-[scrolled=true]/header:bg-slate-900/[0.06]"
                />
                {items.map((item) => (
                  <li key={item.label} {...morphItem}>
                    {item.kind === "services" ? (
                      <ServicesMenu label={item.label} />
                    ) : item.kind === "section" ? (
                      <Link href={routes.landing} onClick={(e) => scrollToSection(item.section, e)} className={navItemClass}>
                        {item.label}
                      </Link>
                    ) : (
                      <Link href={item.href} className={navItemClass}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center justify-self-end gap-2 min-[1100px]:flex group-data-[long-labels=true]/header:max-[1200px]:hidden">
              <LanguageSwitcher />
              {actions}
            </div>

            {/* Mobile: language + menu button */}
            <div className="flex items-center gap-1 min-[1100px]:hidden group-data-[long-labels=true]/header:max-[1200px]:flex">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={t.nav.toggleMenu}
                aria-expanded={menuOpen}
                className="-mr-1 inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/5"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="border-t border-foreground/5 pb-4 pt-2">
              <nav aria-label="Main">
                <ul className="flex flex-col">
                  {items.map((item) => (
                    <li key={item.label}>
                      {item.kind === "section" ? (
                        <Link href={routes.landing} onClick={(e) => scrollToSection(item.section, e)} className={mobileItemClass}>
                          {item.label}
                        </Link>
                      ) : (
                        <Link href={item.kind === "services" ? routes.services : item.href} onClick={closeMenu} className={mobileItemClass}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-foreground/5 pt-4 [&>*]:w-full">{actions}</div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
