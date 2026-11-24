"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { routes } from "@/lib/landing/routes"
import { SCROLL_TARGET_KEY, rememberScrollTarget, scrollToElementWhenReady } from "@/lib/landing/scroll"

/**
 * A link to a section of the landing page. On the landing it scrolls there smoothly;
 * from another page it opens the landing, which then scrolls (see ScrollToSectionOnLoad).
 */
export function SectionLink({ section, className, children }: { section: string; className?: string; children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Link
      href={routes.landing}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        if (pathname === routes.landing) {
          scrollToElementWhenReady(section, undefined, 15, 100)
          return
        }
        rememberScrollTarget(SCROLL_TARGET_KEY, section)
        router.push(routes.landing)
      }}
    >
      {children}
    </Link>
  )
}
