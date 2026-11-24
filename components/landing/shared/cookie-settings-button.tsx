"use client"

import { openCookieSettings } from "@/lib/legal/cookie-consent"

export function CookieSettingsButton({ className, label }: { className?: string; label: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {label}
    </button>
  )
}
