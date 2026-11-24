/**
 * Ingot chart kit (from the ingot-ui MCP) — the bar "finish" every chart shares:
 * vertical gradient (top ~13% lighter), barely-visible inside stroke, 1px top highlight,
 * tiny drop shadow. Colours here use the landing's slate palette instead of the --fu-* tokens.
 */
import { useId } from "react"

export function mix(hex: string, amount: number, to = "#ffffff") {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const a = p(hex)
  const b = p(to)
  return "#" + a.map((v, i) => Math.round(v + ((b[i] ?? 0) - v) * amount).toString(16).padStart(2, "0")).join("")
}

export function useChartIds() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "")
  return { grad: (k: string) => "g" + id + k, shadow: "s" + id }
}
export type ChartIds = ReturnType<typeof useChartIds>

export function ChartDefs({ ids, colors }: { ids: ChartIds; colors: Record<string, string> }) {
  return (
    <defs>
      {Object.entries(colors).map(([k, c]) => (
        <linearGradient key={k} id={ids.grad(k)} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={mix(c, 0.13)} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
      ))}
      <filter id={ids.shadow} x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="1" stdDeviation="0.7" floodColor="#0d0d12" floodOpacity="0.09" />
      </filter>
    </defs>
  )
}

export interface BarProps {
  x: number
  y: number
  w: number
  h: number
  r?: number
  color: string
  ids: ChartIds
  gradKey: string
  tint?: boolean
}

/** One finished bar. */
export function Bar({ x, y, w, h, r = 4, color, ids, gradKey, tint }: BarProps) {
  if (h <= 0 || w <= 0) return null
  const rr = Math.min(r, w / 2, h / 2)
  const stroke = tint ? mix(color, 0.05, "#000000") : mix(color, 0.22, "#000000")
  return (
    <g filter={`url(#${ids.shadow})`}>
      <rect x={x} y={y} width={w} height={h} rx={rr} fill={tint ? mix(color, 0.72) : `url(#${ids.grad(gradKey)})`} />
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={Math.max(rr - 0.5, 0)} fill="none" stroke={stroke} strokeOpacity={tint ? 0.2 : 0.38} />
      {h > 3 && w > 2 * rr && <line x1={x + rr} x2={x + w - rr} y1={y + 1.5} y2={y + 1.5} stroke="#fff" strokeOpacity={tint ? 0.55 : 0.3} />}
    </g>
  )
}

export function GridLines({ width, height, rows, left = 0 }: { width: number; height: number; rows: number; left?: number }) {
  return (
    <g>
      {Array.from({ length: rows + 1 }, (_, i) => {
        const y = (height / rows) * i
        const base = i === rows
        return <line key={i} x1={left} x2={width} y1={y} y2={y} stroke={base ? "#e2e8f0" : "#eef2f7"} strokeDasharray={base ? undefined : "3 3"} />
      })}
    </g>
  )
}
