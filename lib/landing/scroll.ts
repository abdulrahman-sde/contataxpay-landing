// Smooth scrolling to a landing section, also from other pages.
// From another page the target is remembered in sessionStorage and the landing scrolls there on load
// (no #hash in the URL, so the browser does not jump first).

export const SCROLL_TARGET_KEY = "landingScrollTo"
export const SERVICES_SCROLL_TARGET_KEY = "servicesScrollTo"

/** Space kept above a section so the sticky header does not cover its title. */
const HEADER_OFFSET = 100

export function scrollToElement(id: string): boolean {
  const el = document.getElementById(id)
  if (!el) return false
  const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET
  window.scrollTo({ top: y, behavior: "smooth" })
  return true
}

/** Retries for a while: sections far down the page may not be in the DOM yet. */
export function scrollToElementWhenReady(id: string, onDone?: () => void, attempts = 20, delay = 150): () => void {
  let cancelled = false
  let timer: ReturnType<typeof setTimeout>
  const attempt = (n: number) => {
    if (cancelled) return
    if (scrollToElement(id)) onDone?.()
    else if (n < attempts) timer = setTimeout(() => attempt(n + 1), delay)
  }
  timer = setTimeout(() => attempt(0), 80)
  return () => {
    cancelled = true
    clearTimeout(timer)
  }
}

export function rememberScrollTarget(key: string, id: string): void {
  try {
    window.sessionStorage.setItem(key, id)
  } catch {
    // storage unavailable: the page opens at the top
  }
}
