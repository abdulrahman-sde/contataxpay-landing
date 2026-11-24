// Front-end switches (same as the app's lib/feature-flags.ts).
// Unset or empty means on; "false" / "0" / "off" / "no" switches the feature off.
const readSwitch = (raw: string | undefined): boolean => {
  const value = raw?.trim().toLowerCase()
  if (!value) return true
  return !["false", "0", "off", "no"].includes(value)
}

/** Pricing section and pricing links. Matches the backend's BILLING_ENABLED. */
export const SUBSCRIPTIONS_UI_ENABLED = readSwitch(process.env.NEXT_PUBLIC_BILLING_ENABLED)
