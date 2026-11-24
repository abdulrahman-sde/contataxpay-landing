"use client"

import { useCallback, useRef, useState, type PointerEvent } from "react"
import { cn } from "@/lib/utils"

interface Box {
  x: number
  y: number
  w: number
  h: number
}

/**
 * A highlight that glides from one hovered item to the next (position and size morph together).
 * Put `containerRef` on the positioned parent, `itemProps` on each item, and render
 * <MorphHighlight state={...} /> inside the parent.
 */
export function useMorphHover<T extends HTMLElement>() {
  const containerRef = useRef<T>(null)
  const [box, setBox] = useState<Box | null>(null)
  const [visible, setVisible] = useState(false)
  // When the highlight re-appears it jumps to the item instead of sliding in from the last one.
  const [instant, setInstant] = useState(true)

  const onItemEnter = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      const container = containerRef.current
      if (!container) return
      const c = container.getBoundingClientRect()
      const r = e.currentTarget.getBoundingClientRect()
      setInstant(!visible)
      setBox({ x: r.left - c.left, y: r.top - c.top, w: r.width, h: r.height })
      setVisible(true)
    },
    [visible],
  )

  const onLeave = useCallback(() => setVisible(false), [])

  return {
    containerRef,
    state: { box, visible, instant },
    itemProps: { onPointerEnter: onItemEnter },
    containerProps: { onPointerLeave: onLeave },
  }
}

export function MorphHighlight({
  state: { box, visible, instant },
  className,
}: {
  state: { box: Box | null; visible: boolean; instant: boolean }
  className?: string
}) {
  if (!box) return null
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-0 top-0 -z-10",
        instant
          ? "transition-opacity duration-200"
          : "transition-[transform,width,height,opacity] duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{ transform: `translate3d(${box.x}px, ${box.y}px, 0)`, width: box.w, height: box.h }}
    />
  )
}
