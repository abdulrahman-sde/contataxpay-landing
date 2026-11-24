"use client"

import { useMemo, useState } from "react"
import { Bar, ChartDefs, GridLines, mix, useChartIds } from "@/components/ingot/chart-kit"
import { useLanguage } from "@/lib/i18n/language-provider"

/*
 * Mini BWA dashboard: revenue / expenses / profit for the chosen month on top, and revenue vs
 * expenses per month as paired bars (ingot-ui bar finish) below. Sample figures; hover a month
 * to see its numbers. Month names and euro amounts follow the page language.
 */
const REVENUE = [41200, 35600, 44800, 38900, 46100, 48200]
const EXPENSES = [29400, 31800, 27600, 33100, 28900, 30500]
const COLOR = "#3563e9"
const W = 560
const H = 150

export function BwaChart() {
  const { language, t } = useLanguage()
  const ids = useChartIds()
  const last = REVENUE.length - 1
  const [sel, setSel] = useState(last)

  const months = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(language, { month: "short" })
    return REVENUE.map((_, i) => fmt.format(new Date(2026, i, 1)))
  }, [language])
  const euro = useMemo(() => new Intl.NumberFormat(language, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }), [language])

  const revenue = REVENUE[sel] ?? 0
  const expenses = EXPENSES[sel] ?? 0
  const profit = revenue - expenses
  const prevProfit = sel > 0 ? (REVENUE[sel - 1] ?? 0) - (EXPENSES[sel - 1] ?? 0) : profit
  const change = prevProfit ? Math.round(((profit - prevProfit) / prevProfit) * 100) : 0

  const group = (W - 40) / REVENUE.length
  const bw = group * 0.26
  const max = 60000 // round top of the scale: grid lines at 0 / 20k / 40k / 60k
  const LEFT = 40
  const h = (v: number) => (v / max) * H

  const figures = [
    { label: t.landing.hero.bwaRevenue, value: euro.format(revenue), dot: COLOR },
    { label: t.landing.hero.bwaExpenses, value: euro.format(expenses), dot: mix(COLOR, 0.72) },
    { label: t.landing.hero.bwaProfit, value: euro.format(profit), dot: "#10b981", change },
  ]

  return (
    <div>
      <dl className="grid grid-cols-3 gap-3">
        {figures.map((f) => (
          <div key={f.label} className="min-w-0">
            <dt className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="size-2 shrink-0 rounded-[3px]" style={{ background: f.dot }} />
              <span className="truncate">{f.label}</span>
            </dt>
            <dd className="mt-1 flex flex-wrap items-baseline gap-x-1.5 text-base font-medium tabular-nums text-slate-900 md:text-lg">
              {f.value}
              {f.change !== undefined && f.change !== 0 && (
                <span className={f.change > 0 ? "text-xs text-emerald-600" : "text-xs text-rose-600"}>
                  {f.change > 0 ? "▲" : "▼"} {Math.abs(f.change)}%
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <svg
        viewBox={`0 0 ${W} ${H + 22}`}
        className="mt-5 w-full overflow-visible"
        aria-hidden="true"
        onMouseLeave={() => setSel(last)}
      >
        <ChartDefs ids={ids} colors={{ a: COLOR }} />
        <GridLines width={W} height={H} rows={3} left={LEFT - 6} />
        {[0, 1, 2, 3].map((k) => (
          <text key={k} x={0} y={H - (H / 3) * k + 4} fontSize="10" fill="#94a3b8">
            {k === 0 ? "0" : `${k * 20}k`}
          </text>
        ))}
        {REVENUE.map((rv, i) => {
          const x = LEFT + i * group + (group - bw * 2 - 4) / 2
          const ex = EXPENSES[i] ?? 0
          return (
            <g key={i} onMouseEnter={() => setSel(i)} className="cursor-pointer">
              {i === sel && <rect x={LEFT + i * group + 4} y={0} width={group - 8} height={H} fill="#0d0d12" opacity={0.035} rx={8} />}
              <Bar x={x} y={H - h(rv)} w={bw} h={h(rv)} r={5} color={COLOR} ids={ids} gradKey="a" />
              <Bar x={x + bw + 4} y={H - h(ex)} w={bw} h={h(ex)} r={5} color={COLOR} ids={ids} gradKey="a" tint />
              <text x={LEFT + i * group + group / 2} y={H + 17} textAnchor="middle" fontSize="11" fill={i === sel ? "#0f172a" : "#64748b"}>
                {months[i]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
