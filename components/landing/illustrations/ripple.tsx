import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import "./illustrations.css"

/** Port of the shadcn studio Ripple, "pulse" mode: rings expanding out of the centre. */
export function Ripple({
  rings = 4,
  baseSize = 56,
  ringGap = 44,
  duration = 3,
  ringStyle = "stroke",
  className,
  children,
}: {
  rings?: number
  baseSize?: number
  ringGap?: number
  duration?: number
  ringStyle?: "stroke" | "dashed" | "soft"
  className?: string
  children: ReactNode
}) {
  const outer = baseSize + (rings - 1) * ringGap
  const box = Math.max(124, outer)
  const stagger = duration / rings
  return (
    <div style={{ height: box, width: box }} className={cn("illu-root relative flex items-center justify-center", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 mask-[radial-gradient(circle,#000_55%,transparent_100%)]">
        {Array.from({ length: rings }, (_, i) => (
          <span
            key={i}
            style={{ height: outer, width: outer, animationDelay: `${-(i * stagger)}s`, "--duration": `${duration}s` } as React.CSSProperties}
            className={cn(
              "illu-ripple-expand absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
              ringStyle === "soft" ? "bg-current/25" : cn("border border-current", ringStyle === "dashed" && "border-dashed"),
            )}
          />
        ))}
      </div>
      {children}
    </div>
  )
}
