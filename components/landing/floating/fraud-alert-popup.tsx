"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { fetchTicker, safeHref, type TickerData } from "@/lib/api/fraud-verification"
import { hasCookieDecision, subscribeConsent } from "@/lib/legal/cookie-consent"
import { routes } from "@/lib/landing/routes"
import { useLanguage } from "@/lib/i18n/language-provider"

// Neutral prefix on purpose: the app's logout wipes company_/user_/client_… keys, and "seen" must survive it.
const SEEN_KEY = "ctp.fraudAlert.seen.v1"

/** Bolds only the lead-in up to the first colon ("Fraud warning:"), whatever the language. */
function renderMessage(message: string) {
  const idx = message.indexOf(":")
  if (idx < 1 || idx > 40) return message
  return (
    <>
      <strong>{message.slice(0, idx + 1)}</strong>
      {message.slice(idx + 1)}
    </>
  )
}

function remember() {
  try {
    localStorage.setItem(SEEN_KEY, "1")
  } catch {
    // ignore
  }
}

/**
 * Fraud warning for the landing:
 *  - a pop-up that opens by itself on the first visit (after the cookie choice), and
 *  - a small red button above the WhatsApp button that opens the same message any time.
 * Text, button and on/off come from the super admin (API), in the selected language.
 */
export function FraudAlertPopup() {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const [data, setData] = useState<TickerData | null>(null)
  const [open, setOpen] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)
  // The cookie banner is a modal too; two modals at once block each other, so wait for the cookie choice.
  const [cookieDecided, setCookieDecided] = useState(false)
  const autoOpened = useRef(false)
  const onLanding = pathname === routes.landing
  const ui = t.fraud

  useEffect(() => {
    const sync = () => setCookieDecided(hasCookieDecision())
    sync()
    return subscribeConsent(sync)
  }, [])

  useEffect(() => {
    let cancelled = false
    fetchTicker(language)
      .then((result) => {
        if (!cancelled) setData(result?.enabled && result.message ? result : null)
      })
      .catch(() => {
        if (!cancelled) setData(null)
      })
    return () => {
      cancelled = true
    }
  }, [language])

  // First visit: open once, after the cookie choice.
  useEffect(() => {
    if (!onLanding || !cookieDecided || !data?.message || autoOpened.current) return
    let seen = false
    try {
      seen = localStorage.getItem(SEEN_KEY) === "1"
    } catch {
      // storage unavailable: show it, closing just works for this page view
    }
    if (seen) return
    autoOpened.current = true
    remember()
    setOpen(true)
  }, [onLanding, cookieDecided, data])

  const target = safeHref(data?.action) || routes.verifyRepresentative
  useEffect(() => {
    if (open && !/^https?:\/\//i.test(target)) router.prefetch(target)
  }, [open, target, router])

  // Close the bubble on an outside click or Escape.
  useEffect(() => {
    if (!bubbleOpen) return
    const onDown = (e: globalThis.MouseEvent | TouchEvent) => {
      const node = e.target as Node
      if (bubbleRef.current?.contains(node) || fabRef.current?.contains(node)) return
      setBubbleOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setBubbleOpen(false)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("touchstart", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("touchstart", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [bubbleOpen])

  // Navigate first; the pop-up disappears with the page. Closing it in the same click could cancel the navigation.
  const go = (e: MouseEvent) => {
    e.preventDefault()
    remember()
    router.push(target)
  }

  if (!data?.message) return null

  const external = !!data.opensNewTab || /^https?:\/\//i.test(target)
  const btn = "rounded-lg bg-[#B91C1C] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-[#991B1B]"
  const actionLink = (className: string) =>
    data.buttonText ? (
      external ? (
        <a href={target} target="_blank" rel="noopener noreferrer" onClick={remember} className={className}>
          {data.buttonText}
        </a>
      ) : (
        <Link href={target} onClick={go} className={className}>
          {data.buttonText}
        </Link>
      )
    ) : null

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        onClick={() => setBubbleOpen((v) => !v)}
        aria-expanded={bubbleOpen}
        aria-label={ui.ticker.ariaLabel}
        title={ui.ticker.ariaLabel}
        className="group fixed bottom-[6rem] right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#B91C1C] text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-[#991B1B] focus:outline-hidden focus:ring-4 focus:ring-red-300 sm:bottom-[6.25rem] sm:right-6"
      >
        <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        <span className="pointer-events-none absolute left-1/2 top-[calc(100%-0.7rem)] -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-white bg-[#B91C1C] px-2 py-0.5 text-[10px] font-bold leading-tight text-white shadow-md group-hover:bg-[#991B1B]">
          {ui.ticker.floatLabel}
        </span>
      </button>

      {bubbleOpen && (
        <div
          ref={bubbleRef}
          role="dialog"
          aria-label={ui.ticker.ariaLabel}
          className="fixed bottom-[10.5rem] right-5 z-[9999] w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-black/10 sm:bottom-[10.75rem] sm:right-6"
        >
          <div className="flex items-center gap-2 rounded-t-2xl bg-[#B91C1C] px-4 py-2.5 text-white">
            <AlertTriangle className="h-4 w-4 flex-none" aria-hidden="true" />
            <span className="flex-1 text-sm font-semibold">{ui.ticker.ariaLabel}</span>
            <button
              type="button"
              onClick={() => setBubbleOpen(false)}
              aria-label={ui.close}
              className="rounded-[0.25rem] p-0.5 text-white/90 hover:bg-white/15 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3 px-4 pb-4 pt-3">
            <p className="text-sm leading-relaxed text-slate-800">{renderMessage(data.message)}</p>
            {actionLink(`block ${btn}`)}
          </div>
          {/* Arrow pointing at the button */}
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 right-[1.4rem] h-3 w-3 rotate-45 bg-white ring-1 ring-black/10 [clip-path:polygon(100%_0,100%_100%,0_100%)]"
          />
        </div>
      )}

      <Dialog open={open} onOpenChange={(next) => !next && setOpen(false)}>
        <DialogContent
          size="sm"
          className="gap-0 overflow-hidden rounded-2xl border-0 bg-white p-0 text-slate-900 sm:p-0 sm:rounded-2xl [&>button.absolute]:right-3 [&>button.absolute]:top-3.5 [&>button.absolute]:z-10 [&>button.absolute]:text-white [&>button.absolute]:opacity-100 [&>button.absolute>svg]:h-5 [&>button.absolute>svg]:w-5"
        >
          <div className="flex items-center gap-2 bg-[#B91C1C] px-5 py-3 text-white">
            <AlertTriangle className="h-5 w-5 flex-none" aria-hidden="true" />
            <DialogTitle className="text-base font-semibold text-white">{ui.ticker.ariaLabel}</DialogTitle>
          </div>
          <div className="space-y-5 px-5 pb-5 pt-1">
            <DialogDescription className="text-sm leading-relaxed text-slate-800">{renderMessage(data.message)}</DialogDescription>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                {ui.close}
              </Button>
              {actionLink(btn)}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
