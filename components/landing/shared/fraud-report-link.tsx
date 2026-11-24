"use client"

import Link from "next/link"
import type { Language } from "@/lib/i18n/config"
import { routes } from "@/lib/landing/routes"
import { useLanguage } from "@/lib/i18n/language-provider"

/** Same texts the super admin set in production (fraud-verification page settings). */
const labels: Record<"verify" | "report", Record<Language, string>> = {
  verify: {
    en: "Verify Representative",
    de: "Vertreter überprüfen",
    ro: "Verifică reprezentantul",
    ru: "Проверить представителя",
  },
  report: {
    en: "Report a Suspicious Person",
    de: "Verdächtige Person melden",
    ro: "Raportează o persoană suspectă",
    ru: "Сообщить о подозрительном лице",
  },
}

/** "Verify representative" / "Report a suspicious person" link. Always shown, in the selected language. */
export function FraudReportLink({ className, kind = "report" }: { className?: string; kind?: "report" | "verify" }) {
  const { language } = useLanguage()

  return (
    <Link href={kind === "verify" ? routes.verifyRepresentative : routes.reportSuspicious} className={className}>
      {labels[kind][language]}
    </Link>
  )
}
