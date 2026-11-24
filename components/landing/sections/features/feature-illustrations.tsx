"use client"

/*
 * The six feature illustrations, ported from design-mine's shadcn studio illustrations and adapted to
 * what each feature says. Engine: components/landing/illustrations (beams, ripple, letter glitch).
 *   1 Multi-client      <- "Team Sync" (beam-illustrations-10)
 *   2 OCR               <- document scan (user's reference: PDF in a scan frame, bar sweeping down)
 *   3 Archive           <- "Secure Access Shield" (miscellaneous-07)
 *   4 Categorisation    <- "File Export" (beam-illustrations-23)
 *   5 Reports           <- beam connection: bookings flowing into a report
 *   6 Tax declaration   <- "Sync" (beam-illustrations-37)
 */
import Image from "next/image"
import { useRef } from "react"
import { ArrowLeftRight, Landmark, Receipt, Wallet } from "lucide-react"
import { AnimatedBeam, BeamContainer } from "@/components/landing/illustrations/animated-beam"
import { avatarLooks, CartoonAvatar } from "@/components/landing/illustrations/cartoon-avatar"
import { LetterGlitch } from "@/components/landing/illustrations/letter-glitch"
import { ShieldGraphic } from "@/components/landing/illustrations/shield-graphic"
import "@/components/landing/illustrations/illustrations.css"
import { assets } from "@/lib/landing/assets"
import { cn } from "@/lib/utils"

const card = "bg-white ring-1 ring-slate-900/[0.07] shadow-sm"

function Logo({ className, imgClassName = "size-8" }: { className?: string; imgClassName?: string }) {
  return (
    <span className={cn("flex items-center justify-center bg-white", className)}>
      <Image src={assets.logo} alt="" width={40} height={40} className={imgClassName} />
    </span>
  )
}

/* 1 ------------------------------------------------------------------------------------------- */
export function MultiClientIllustration() {
  const hub = useRef<HTMLSpanElement>(null)
  const refs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)]
  const Company = ({ i }: { i: number }) => (
    <span ref={refs[i]} className="flex size-10 items-center justify-center rounded-full shadow-sm ring-2 ring-white">
      <CartoonAvatar look={avatarLooks[i]} className="size-10" />
    </span>
  )
  return (
    <BeamContainer background="ripple" className="flex w-[300px] flex-col justify-center gap-8">
      {({ containerRef }) => (
        <>
          <div className="mx-9 flex items-center justify-between">
            <Company i={0} />
            <Company i={3} />
          </div>
          <div className="flex items-center justify-between">
            <Company i={1} />
            <span ref={hub}>
              <Logo className={cn("size-14 rounded-2xl", card)} />
            </span>
            <Company i={4} />
          </div>
          <div className="mx-9 flex items-center justify-between">
            <Company i={2} />
            <Company i={5} />
          </div>
          {[42, 0, -42].map((curve, i) => (
            <AnimatedBeam key={`l${i}`} containerRef={containerRef} fromRef={refs[i]} toRef={hub} className="-z-1 text-primary" duration={3} curvature={curve} />
          ))}
          {[42, 0, -42].map((curve, i) => (
            <AnimatedBeam key={`r${i}`} containerRef={containerRef} fromRef={refs[i + 3]} toRef={hub} className="-z-1 text-primary" duration={3} curvature={curve} reverse />
          ))}
        </>
      )}
    </BeamContainer>
  )
}

/* 2 ------------------------------------------------------------------------------------------- */
export function OcrIllustration() {
  const corner = "absolute size-4 border-slate-400"
  return (
    <div className="illu-root illu-scale relative h-[184px] w-[156px] rounded-md bg-slate-100/80">
      <span className={cn(corner, "-left-px -top-px rounded-tl-md border-l-2 border-t-2")} />
      <span className={cn(corner, "-right-px -top-px rounded-tr-md border-r-2 border-t-2")} />
      <span className={cn(corner, "-bottom-px -left-px rounded-bl-md border-b-2 border-l-2")} />
      <span className={cn(corner, "-bottom-px -right-px rounded-br-md border-b-2 border-r-2")} />

      {/* the PDF */}
      <div className={cn("absolute inset-x-4 bottom-4 top-4 rounded-2xl p-4", card, "shadow-md")}>
        <div className="flex items-center gap-2">
          <span className="size-3.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-12 rounded-full bg-slate-200" />
        </div>
        <div className="mt-4 space-y-2">
          {[
            ["w-4", "w-10"],
            ["w-4", "w-10"],
          ].map((row, i) => (
            <div key={i} className="flex gap-2">
              {row.map((w, j) => (
                <span key={j} className={cn("h-1.5 rounded-full bg-slate-200", w)} />
              ))}
            </div>
          ))}
          <span className="block h-1.5 w-full rounded-full bg-slate-200" />
          <div className="flex gap-2">
            <span className="h-1.5 w-12 rounded-full bg-slate-200" />
            <span className="h-1.5 w-7 rounded-full bg-slate-200" />
          </div>
          <span className="block h-1.5 w-4/5 rounded-full bg-slate-200" />
        </div>
        <span className="absolute bottom-5 left-4 h-0.5 w-8 rounded-full bg-slate-800" />
      </div>
      <span className="absolute -right-4 bottom-9 rounded-md bg-rose-500 px-2 py-1 text-[11px] font-semibold tracking-wide text-white shadow-md shadow-rose-500/30">
        PDF
      </span>

      {/* scan bar: glow above a thin line, sweeping top -> bottom */}
      <div className="illu-scan-down pointer-events-none absolute -inset-x-1 top-2 h-0" style={{ "--scan-distance": "168px" } as React.CSSProperties}>
        <span className="absolute inset-x-3 bottom-0 h-10 rounded-t-xl bg-linear-to-b from-transparent to-primary/30 blur-[1px]" />
        <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-slate-800" />
      </div>
    </div>
  )
}

/* 3 ------------------------------------------------------------------------------------------- */
export function ArchiveIllustration() {
  return (
    <div className="illu-root illu-scale relative h-[184px] w-[320px]">
      {/* Letters fade out towards the edges and leave a clear hole for the shield (masks, so the glow behind shows through). */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "radial-gradient(ellipse 50% 50% at center, transparent 24%, black 46%, rgb(0 0 0 / 0.5) 62%, transparent 82%)",
          WebkitMaskImage: "radial-gradient(ellipse 50% 50% at center, transparent 24%, black 46%, rgb(0 0 0 / 0.5) 62%, transparent 82%)",
        }}
      >
        <LetterGlitch glitchSpeed={150} glitchColors={["#64748b80", "#64748b4d"]} />
      </div>
      <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-content-center">
        <ShieldGraphic className="h-[112px] w-auto" />
      </div>
    </div>
  )
}

/* 4 ------------------------------------------------------------------------------------------- */
const accounts = [
  { code: "4400", badge: "bg-emerald-500" },
  { code: "1576", badge: "bg-primary" },
  { code: "6815", badge: "bg-amber-500" },
]

export function CategorizationIllustration() {
  const source = useRef<HTMLSpanElement>(null)
  const hub = useRef<HTMLSpanElement>(null)
  const outs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)]
  return (
    <BeamContainer className="z-1 flex w-[340px] items-center justify-between gap-6">
      {({ containerRef }) => (
        <>
          <span ref={source} className="shrink-0">
            <div className={cn("flex w-28 flex-col gap-2.5 rounded-xl p-3", card)}>
              <span className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-slate-800">
                <Receipt className="size-3.5 text-primary" />
                119,00 €
              </span>
              <div className="flex flex-col gap-1.5">
                <div className="h-1.5 w-full rounded-full bg-slate-100" />
                <div className="h-1.5 w-3/4 rounded-full bg-slate-100" />
              </div>
            </div>
          </span>
          <span ref={hub} className="-ml-6 shrink-0">
            <Logo className="z-1 size-14 rounded-full border border-slate-200" imgClassName="size-8" />
          </span>
          <div className="flex flex-col gap-5">
            {accounts.map((a, i) => (
              <span key={a.code} ref={outs[i]} className="shrink-0">
                <span className={cn("flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-3", card)}>
                  <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-white", a.badge)}>{a.code}</span>
                  <span className="flex flex-col gap-1">
                    <span className="h-1 w-9 rounded-full bg-slate-200" />
                    <span className="h-1 w-6 rounded-full bg-slate-100" />
                  </span>
                </span>
              </span>
            ))}
          </div>
          <AnimatedBeam containerRef={containerRef} fromRef={source} toRef={hub} className="-z-1 text-primary" beamType="dot" pathType="dashed" duration={3} travelRatio={0.5} />
          {[45, 0, -45].map((curve, i) => (
            <AnimatedBeam key={i} containerRef={containerRef} fromRef={hub} toRef={outs[i]} className="-z-1 text-primary" beamType="dot" pathType="dashed" duration={3} travelRatio={0.5} delay={1.5} curvature={curve} />
          ))}
        </>
      )}
    </BeamContainer>
  )
}

/* 5 ------------------------------------------------------------------------------------------- */
export function ReportsIllustration() {
  const target = useRef<HTMLSpanElement>(null)
  const sources = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)]
  const icons = [Receipt, Landmark, Wallet]
  const bars = [40, 62, 48, 74, 90]
  return (
    <BeamContainer className="z-1 flex w-[320px] items-center justify-between gap-5">
      {({ containerRef }) => (
        <>
          <div className="z-1 flex flex-col gap-4">
            {icons.map((Icon, i) => (
              <span key={i} ref={sources[i]} className={cn("grid size-10 place-content-center rounded-xl", card)}>
                <Icon className="size-4 text-slate-600" strokeWidth={1.75} />
              </span>
            ))}
          </div>
          <span ref={target} className={cn("z-1 w-[132px] rounded-xl p-3", card, "shadow-md")}>
            <span className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-800">BWA</span>
              <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">+12 %</span>
            </span>
            <span className="mt-3 flex h-12 items-end gap-1.5">
              {bars.map((h, i) => (
                <span key={i} className={cn("flex-1 rounded-t-[3px]", i === bars.length - 1 ? "bg-primary" : "bg-primary/20")} style={{ height: `${h}%` }} />
              ))}
            </span>
          </span>
          {[0, 1, 2].map((i) => (
            <AnimatedBeam key={i} containerRef={containerRef} fromRef={sources[i]} toRef={target} className="-z-1 text-primary" duration={3} delay={i * 0.4} />
          ))}
        </>
      )}
    </BeamContainer>
  )
}

/* 6 ------------------------------------------------------------------------------------------- */
export function TaxDeclarationIllustration() {
  const app = useRef<HTMLDivElement>(null)
  const mid = useRef<HTMLDivElement>(null)
  const elster = useRef<HTMLDivElement>(null)
  return (
    <BeamContainer className="illu-scale-wide z-1 flex w-[360px] items-center justify-center gap-8 py-2">
      {({ containerRef }) => (
        <>
          <div ref={app} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5">
            <Logo className="size-8 rounded-lg bg-sky-600/10" imgClassName="size-5" />
            <span className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800">UStVA</span>
              <span className="text-xs text-slate-500">Contataxpay</span>
            </span>
          </div>
          <div ref={mid} className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-primary">
            <ArrowLeftRight className="size-4" />
          </div>
          <div ref={elster} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600/15 text-emerald-700">
              <Landmark className="size-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800">ELSTER</span>
              <span className="text-xs text-slate-500">Finanzamt</span>
            </span>
          </div>
          <AnimatedBeam containerRef={containerRef} fromRef={app} toRef={elster} className="-z-1 text-primary" beamType="dash" beamColor="#7dbbe8" beamSize={14} duration={1.5} startXOffset={-6} startYOffset={-6} endXOffset={-6} endYOffset={-6} />
          <AnimatedBeam containerRef={containerRef} fromRef={app} toRef={elster} className="-z-1 text-primary" beamType="dash" beamColor="#89d2b7" beamSize={14} duration={1.5} startXOffset={6} startYOffset={6} endXOffset={6} endYOffset={6} reverse />
        </>
      )}
    </BeamContainer>
  )
}
