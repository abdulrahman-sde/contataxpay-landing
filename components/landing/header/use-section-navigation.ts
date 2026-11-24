"use client"

import type { MouseEvent } from "react"
import { usePathname, useRouter } from "next/navigation"
import { routes } from "@/lib/landing/routes"
import {
  SCROLL_TARGET_KEY,
  SERVICES_SCROLL_TARGET_KEY,
  rememberScrollTarget,
  scrollToElement,
} from "@/lib/landing/scroll"

/** Links that scroll to a landing section, or to a section of the services page, from any page. */
export function useSectionNavigation(onNavigate?: () => void) {
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = (sectionId: string, e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onNavigate?.()

    if (pathname !== routes.landing) {
      rememberScrollTarget(SCROLL_TARGET_KEY, sectionId)
      router.push(routes.landing)
      return
    }

    // Small delay so an open dropdown can finish closing first.
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  const scrollToServiceSection = (sectionId: string, e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (pathname === routes.services) {
      setTimeout(() => scrollToElement(sectionId), 100)
      return
    }
    rememberScrollTarget(SERVICES_SCROLL_TARGET_KEY, sectionId)
    router.push(routes.services)
  }

  return { scrollToSection, scrollToServiceSection }
}
