import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Small card: a tiny illustration and a short label (encrypted, GDPR, ...). */
export function TrustBadge({ art, label, className }: { art: ReactNode; label: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative z-[1] flex min-h-14 min-w-0 items-center gap-2.5 rounded-2xl bg-white py-2 pr-3 pl-2 sm:gap-3 sm:pr-4 sm:pl-2.5 lg:h-14 lg:py-0 shadow-[0_10px_30px_-10px_rgba(53,99,233,0.22)]",
        className,
      )}
    >
      <span aria-hidden="true" className="grid size-9 shrink-0 place-content-center overflow-hidden rounded-[10px] [&>svg]:size-9">
        {art}
      </span>
      <span className="min-w-0 text-[13px] leading-snug font-medium text-slate-700 sm:text-sm lg:whitespace-nowrap">{label}</span>
    </div>
  )
}

/** Padlock on a soft green tile. */
export function LockArt() {
  return (
    <svg viewBox="0 0 44 44" className="size-11">
      <rect width="44" height="44" rx="12" fill="#ecfdf5" />
      <path d="M16 20v-3.5a6 6 0 0 1 12 0V20" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="12.5" y="19.5" width="19" height="14" rx="3.5" fill="#10b981" />
      <rect x="12.5" y="19.5" width="19" height="5" rx="2.5" fill="#34d399" opacity=".55" />
      <circle cx="22" cy="25.8" r="1.9" fill="#fff" />
      <rect x="21.1" y="26.5" width="1.8" height="3.6" rx=".9" fill="#fff" />
    </svg>
  )
}

/** GDPR seal as commonly used: blue disc, ring of twelve EU-gold stars, white padlock in the middle. */
export function GdprArt() {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    return { x: 22 + Math.sin(a) * 13.2, y: 22 - Math.cos(a) * 13.2 }
  })
  return (
    <svg viewBox="0 0 44 44" className="size-11">
      <rect width="44" height="44" rx="12" fill="#eff6ff" />
      <g transform="translate(22 22) scale(0.78) translate(-22 -22)">
      <circle cx="22" cy="22" r="21" fill="#1d4ed8" />
      <circle cx="22" cy="22" r="21" fill="url(#gdpr-shine)" />
      <defs>
        <linearGradient id="gdpr-shine" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {stars.map((s, i) => (
        <path
          key={i}
          transform={`translate(${s.x.toFixed(2)} ${s.y.toFixed(2)}) scale(1.15)`}
          d="M0 -1.9 L0.56 -0.6 L1.8 -0.6 L0.8 0.25 L1.15 1.55 L0 0.8 L-1.15 1.55 L-0.8 0.25 L-1.8 -0.6 L-0.56 -0.6 Z"
          fill="#fcd34d"
        />
      ))}
      <path d="M18.6 21.2 V19.2 a3.4 3.4 0 0 1 6.8 0 V21.2" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="16.8" y="20.8" width="10.4" height="8" rx="1.8" fill="#fff" />
      <circle cx="22" cy="24.2" r="1.1" fill="#1d4ed8" />
      <rect x="21.45" y="24.6" width="1.1" height="2.1" rx=".55" fill="#1d4ed8" />
      </g>
    </svg>
  )
}

/** Three overlapping coins: €, $, £. */
export function CoinsArt() {
  const coin = (cx: number, fill: string, ring: string, sign: string) => (
    <g>
      <circle cx={cx} cy={22} r={8.5} fill={fill} stroke={ring} strokeWidth="1.5" />
      <text x={cx} y={25.6} textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff" fontFamily="Inter, system-ui, sans-serif">
        {sign}
      </text>
    </g>
  )
  return (
    <svg viewBox="0 0 44 44" className="size-11">
      <rect width="44" height="44" rx="12" fill="#fffbeb" />
      {coin(13.5, "#a3a3f5", "#fff", "£")}
      {coin(30.5, "#34d399", "#fff", "$")}
      {coin(22, "#f59e0b", "#fff", "€")}
    </svg>
  )
}

/** Rising bars with an arrow. */
export function GrowthArt() {
  return (
    <svg viewBox="0 0 44 44" className="size-11">
      <rect width="44" height="44" rx="12" fill="#eef2ff" />
      <rect x="11" y="26" width="5" height="8" rx="1.5" fill="#c7d2fe" />
      <rect x="19.5" y="21" width="5" height="13" rx="1.5" fill="#a5b4fc" />
      <rect x="28" y="15" width="5" height="19" rx="1.5" fill="#6366f1" />
      <path d="M10 21.5 L19 14.5 L23.5 17.5 L32 10" fill="none" stroke="#3563e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28.2 9.6 L32.4 9.6 L32.4 13.8" fill="none" stroke="#3563e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Verified: blue rosette with a white check. */
export function VerifiedArt() {
  return (
    <svg viewBox="0 0 44 44" className="size-11">
      <rect width="44" height="44" rx="12" fill="#eff6ff" />
      <path
        d="M22 9.5l3.1 2.2 3.8-.2 1.2 3.6 3.1 2.2-1.2 3.6 1.2 3.6-3.1 2.2-1.2 3.6-3.8-.2L22 32.3l-3.1-2.2-3.8.2-1.2-3.6-3.1-2.2 1.2-3.6-1.2-3.6 3.1-2.2 1.2-3.6 3.8.2z"
        fill="#3563e9"
      />
      <path d="M17.6 21.3l3 3 5.8-6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
