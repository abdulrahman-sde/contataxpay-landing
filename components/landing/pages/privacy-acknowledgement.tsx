"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-provider"
import { routes } from "@/lib/landing/routes"

interface PrivacyAcknowledgementProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  /** Shows the "please confirm" message under the checkbox. */
  showError?: boolean
  className?: string
  /** Light text for dark form backgrounds. */
  dark?: boolean
}

/**
 * Copied from the app's components/legal/privacy-acknowledgement.tsx; texts come from the
 * landing dictionary (`consent`, taken from the app's lib/legal/legal-ui-text.ts).
 */
export function PrivacyAcknowledgement({ id, checked, onChange, showError, className = "", dark = false }: PrivacyAcknowledgementProps) {
  const { t } = useLanguage()
  const text = t.consent
  return (
    <div className={className}>
      <div className="flex items-start gap-2">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={showError ? true : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#3563e9]"
        />
        <label htmlFor={id} className={`text-xs leading-relaxed sm:text-sm ${dark ? "text-white/90" : "text-slate-600"}`}>
          {text.privacyPrefix}{" "}
          <Link href={routes.privacy} target="_blank" rel="noopener noreferrer" className={dark ? "text-blue-200 underline" : "text-[#3563e9] underline underline-offset-2"}>
            {text.privacyLink}
          </Link>{" "}
          {text.privacySuffix}
        </label>
      </div>
      {showError && !checked && <p className={`mt-1 text-xs ${dark ? "text-red-200" : "text-red-600"}`}>{text.required}</p>}
    </div>
  )
}
