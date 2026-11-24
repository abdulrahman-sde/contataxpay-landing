"use client"

import { useEffect } from "react"
import { SCROLL_TARGET_KEY, scrollToElementWhenReady } from "@/lib/landing/scroll"

/**
 * When the visitor clicked "Features", "FAQ", ... on another page, the target was remembered;
 * scroll to it once the landing is shown, then forget it.
 */
export function ScrollToSectionOnLoad({ storageKey = SCROLL_TARGET_KEY }: { storageKey?: string }) {
  useEffect(() => {
    let sectionId: string | null = null
    try {
      sectionId = window.sessionStorage.getItem(storageKey)
    } catch {
      return
    }
    if (!sectionId) return
    return scrollToElementWhenReady(sectionId, () => {
      try {
        window.sessionStorage.removeItem(storageKey)
      } catch {
        // storage unavailable
      }
    })
  }, [storageKey])

  return null
}
