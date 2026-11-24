"use client"

import { useEffect, useRef } from "react"

/** Port of the LetterGlitch canvas behind design-mine's "Secure Access Shield". */
export function LetterGlitch({
  glitchColors = ["#73737399"],
  glitchSpeed = 150,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
}: {
  glitchColors?: string[]
  glitchSpeed?: number
  characters?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const chars = Array.from(characters)
    const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]
    let cells: { char: string; color: string }[] = []
    let columns = 0
    let frame = 0
    let last = 0
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Sizes come from offsetWidth/offsetHeight: the illustration is shrunk with a CSS transform, and
    // getBoundingClientRect would return the shrunk size (canvas too small, old letters never cleared).
    const CELL_W = 9
    const CELL_H = 15
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace"
      ctx.textBaseline = "top"
      cells.forEach((cell, i) => {
        ctx.fillStyle = cell.color
        ctx.fillText(cell.char, (i % columns) * CELL_W, CELL_H * Math.floor(i / columns))
      })
    }
    const setup = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const ratio = window.devicePixelRatio || 1
      const width = parent.offsetWidth
      const height = parent.offsetHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      columns = Math.ceil(width / CELL_W)
      const rows = Math.ceil(height / CELL_H)
      cells = Array.from({ length: columns * rows }, () => ({ char: pick(chars), color: pick(glitchColors) }))
      draw()
    }
    const tick = (now: number) => {
      if (now - last >= glitchSpeed) {
        const n = Math.max(1, Math.floor(0.05 * cells.length))
        for (let i = 0; i < n; i++) {
          const cell = cells[Math.floor(Math.random() * cells.length)]
          if (cell) {
            cell.char = pick(chars)
            cell.color = pick(glitchColors)
          }
        }
        draw()
        last = now
      }
      frame = requestAnimationFrame(tick)
    }

    setup()
    if (!reduce) frame = requestAnimationFrame(tick)
    window.addEventListener("resize", setup)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", setup)
    }
  }, [characters, glitchColors, glitchSpeed])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
