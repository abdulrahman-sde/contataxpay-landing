import type { LandingDictionary } from "@/lib/i18n/get-dictionary"
import { routes, sections } from "@/lib/landing/routes"
import { SUBSCRIPTIONS_UI_ENABLED } from "@/lib/landing/feature-flags"

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "section"; label: string; section: string }
  | { kind: "services"; label: string }

/** Main navigation, in display order. */
export function getNavItems(t: LandingDictionary): NavItem[] {
  return [
    { kind: "link", label: t.nav.home, href: routes.landing },
    { kind: "link", label: t.nav.hireAccountant, href: routes.hireAccountant },
    { kind: "section", label: t.nav.features, section: sections.features },
    { kind: "services", label: t.nav.services },
    ...(SUBSCRIPTIONS_UI_ENABLED ? [{ kind: "link" as const, label: t.nav.pricing, href: routes.pricing }] : []),
    { kind: "link", label: t.nav.contact, href: routes.contact },
  ]
}

/** Services in the dropdown: the anchor id on the services page + the dictionary entry. */
export const SERVICE_LINKS = [
  { id: "consulting", index: 0 },
  { id: "bookkeeping", index: 1 },
  { id: "payroll", index: 2 },
  { id: "business-formation", index: 3 },
  { id: "insolvency", index: 4 },
] as const
