"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { fetchPageTexts } from "@/lib/api/fraud-verification"
import { routes } from "@/lib/landing/routes"
import { useLanguage } from "@/lib/i18n/language-provider"

/**
 * "Verify representative" / "Report a suspicious person" link. The label comes from the API
 * (set by the super admin) in the selected language; nothing renders until it is known.
 */
export function FraudReportLink({ className, kind = "report" }: { className?: string; kind?: "report" | "verify" }) {
  const { language } = useLanguage()
  const [label, setLabel] = useState("")

  useEffect(() => {
    let cancelled = false
    fetchPageTexts(language)
      .then((res) => {
        if (!cancelled) setLabel((kind === "verify" ? res.page?.verifyButtonText : res.page?.reportButtonText) || "")
      })
      .catch(() => {
        if (!cancelled) setLabel("")
      })
    return () => {
      cancelled = true
    }
  }, [language, kind])

  if (!label) return null
  return (
    <Link href={kind === "verify" ? routes.verifyRepresentative : routes.reportSuspicious} className={className}>
      {label}
    </Link>
  )
}
