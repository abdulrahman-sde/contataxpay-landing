"use client"

/*
 * Port of the shadcn studio "BeamConnection" + "AnimatedBeam" used by the design-mine illustrations
 * (design-mine/public/shadcn-illustrations, chunk 60365). Same props and maths; the gradient beam
 * is animated with SVG <animate> instead of the motion library, so no extra dependency.
 */
import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react"
import { cn } from "@/lib/utils"
import "./illustrations.css"

type Point = { x: number; y: number }

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  pathType?: "solid" | "dashed"
  pathDash?: number
  curvature?: number
  beamType?: "gradient" | "dash" | "dot" | "none"
  beamColor?: string
  beamSize?: number
  gradientStartColor?: string
  gradientStopColor?: string
  duration?: number
  delay?: number
  travelRatio?: number
  reverse?: boolean
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

/** Undo the container's own transform (the .illu-scale scaling) on a point. */
function inverseOf(el: HTMLElement) {
  const t = getComputedStyle(el).transform
  if (!t || t === "none") return null
  const { m11: a, m12: b, m21: c, m22: d } = new DOMMatrix(t)
  const det = a * d - c * b
  if (!det) return null
  return (x: number, y: number): Point => ({ x: (d * x - c * y) / det, y: (-b * x + a * y) / det })
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  pathColor = "currentColor",
  pathWidth = 1,
  pathOpacity = 0.2,
  pathType = "solid",
  pathDash = 4,
  curvature = 0,
  beamType = "gradient",
  beamColor = "var(--btn-primary)",
  beamSize,
  gradientStartColor = "#a5b8f5",
  gradientStopColor = "currentColor",
  duration = 4,
  delay = 0,
  travelRatio = 1,
  reverse = false,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const pathRef = useRef<SVGPathElement>(null)
  const [d, setD] = useState("")
  const [length, setLength] = useState(0)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => {
      const box = containerRef.current
      const from = fromRef.current
      const to = toRef.current
      if (!box || !from || !to) return
      setSize({ width: box.offsetWidth, height: box.offsetHeight })
      const c = box.getBoundingClientRect()
      const a = from.getBoundingClientRect()
      const b = to.getBoundingClientRect()
      const cx = c.left + c.width / 2
      const cy = c.top + c.height / 2
      let sx = a.left + a.width / 2 - cx
      let sy = a.top + a.height / 2 - cy
      let ex = b.left + b.width / 2 - cx
      let ey = b.top + b.height / 2 - cy
      const inv = inverseOf(box)
      if (inv) {
        ;({ x: sx, y: sy } = inv(sx, sy))
        ;({ x: ex, y: ey } = inv(ex, ey))
      }
      sx += box.offsetWidth / 2 + startXOffset
      sy += box.offsetHeight / 2 + startYOffset
      ex += box.offsetWidth / 2 + endXOffset
      ey += box.offsetHeight / 2 + endYOffset
      const dx = ex - sx
      const dy = ey - sy
      setD(`M ${sx},${sy} C ${sx + dx * 0.5},${sy + dy * 0.5 - curvature} ${ex - dx * 0.5},${ey - dy * 0.5 - curvature} ${ex},${ey}`)
    }
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener("resize", update)
    update()
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  useEffect(() => {
    if (pathRef.current && d) setLength(pathRef.current.getTotalLength())
  }, [d])

  const dot = beamSize ?? 3
  const dashLen = beamSize ?? Math.min(0.4 * length, Math.max(12, 0.12 * length))
  const g = reverse
    ? { x1: "90%;-10%", x2: "100%;0%" }
    : { x1: "10%;110%", x2: "0%;100%" }

  return (
    <svg
      fill="none"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={d}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        strokeDasharray={pathType === "dashed" ? pathDash : undefined}
      />
      {beamType === "gradient" && d && (
        <>
          <path d={d} stroke={`url(#${id})`} strokeWidth={pathWidth} strokeLinecap="round" />
          <defs>
            <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0%" x2="0%" y1="0%" y2="0%">
              <animate attributeName="x1" values={g.x1} dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="x2" values={g.x2} dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
              <stop stopColor={gradientStartColor} stopOpacity="0" />
              <stop stopColor={gradientStartColor} />
              <stop offset="32.5%" stopColor={gradientStopColor} />
              <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
            </linearGradient>
          </defs>
        </>
      )}
      {beamType === "dash" && length > 0 && (
        <path
          d={d}
          stroke={beamColor}
          strokeWidth={Math.max(1, pathWidth + 0.5)}
          strokeLinecap="round"
          strokeDasharray={`${dashLen} ${Math.max(1, length - dashLen)}`}
          className="illu-beam-dash-move"
          style={
            {
              "--duration": `${duration}s`,
              "--beam-dash-from": reverse ? 0 : length,
              "--beam-dash-to": reverse ? length : 0,
              animationDelay: `${delay}s`,
            } as React.CSSProperties
          }
        />
      )}
      {beamType === "dot" && length > 0 && (
        <g fill={beamColor} style={{ opacity: 0, animation: `illu-reveal 0.01s linear ${delay}s forwards` }}>
          {[2 * dot, dot].map((r, i) => (
            <circle key={i} r={r} fillOpacity={i === 0 ? 0.15 : 1}>
              <animateMotion
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
                path={d}
                {...(reverse || travelRatio < 1
                  ? {
                      keyPoints: travelRatio < 1 ? (reverse ? "1;0;0" : "0;1;1") : reverse ? "1;0" : "0;1",
                      keyTimes: travelRatio < 1 ? `0;${travelRatio};1` : "0;1",
                      calcMode: "linear",
                    }
                  : {})}
              />
            </circle>
          ))}
        </g>
      )}
    </svg>
  )
}

/** Container that hands its ref to the beams; optional "ripple" background behind the centre. */
export function BeamContainer({
  className,
  background = "none",
  children,
}: {
  className?: string
  background?: "none" | "ripple"
  children: (ctx: { containerRef: RefObject<HTMLDivElement | null> }) => ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={containerRef} className={cn("illu-root illu-scale relative", className)}>
      {background === "ripple" && (
        <div className="absolute left-1/2 top-1/2 size-full max-h-88 max-w-88 -translate-x-1/2 -translate-y-1/2">
          <div className="illu-ping absolute left-1/2 top-1/2 -z-1 size-18 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 opacity-70" />
          <div className="illu-ping absolute left-1/2 top-1/2 -z-1 size-15 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 [animation-delay:0.3s]" />
        </div>
      )}
      {children({ containerRef })}
    </div>
  )
}
