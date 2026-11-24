import Image from "next/image"
import { Globe } from "lucide-react"
import { CartoonAvatar, avatarLooks, type AvatarLook } from "@/components/landing/illustrations/cartoon-avatar"
import { assets } from "@/lib/landing/assets"
import { WORLD_MAP_DOTS } from "@/lib/landing/world-map"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"

/** Tear-drop map pin (Tailark "map" illustration): the sharp corner points at the spot. */
function Pin({ left, top, children, size = "size-8" }: { left: string; top: string; children: React.ReactNode; size?: string }) {
  return (
    <div className="absolute z-10 -translate-x-1/2 -translate-y-[115%]" style={{ left, top }}>
      <div className={`${size} rotate-45 rounded-l-full rounded-t-full bg-white p-0.5 shadow-md shadow-black/15 ring-1 ring-slate-900/5`}>
        <div className="relative size-full -rotate-45 overflow-hidden rounded-full">{children}</div>
      </div>
    </div>
  )
}

const people: { look: AvatarLook; left: string; top: string }[] = [
  { look: avatarLooks[1], left: "27%", top: "38%" },
  { look: avatarLooks[4], left: "76%", top: "34%" },
  { look: avatarLooks[2], left: "58%", top: "66%" },
]

/** "Accessible Worldwide": dotted world map with pins, then the compliance headline. */
export function WorldwideBanner({
  t,
  texts,
  className = "mt-16 md:mt-24",
}: {
  t: LandingDictionary
  /** Other page's wording for the same banner (Hire Accountant uses its own "launched" texts). */
  texts?: { accessibleWorldwide: string; title: string; subtitle: string; description: string }
  className?: string
}) {
  const { accessibleWorldwide, title, subtitle, description } = texts ?? t.landing.feature

  return (
    <section
      className={`overflow-hidden px-4 pb-16 pt-14 md:pb-24 md:pt-20 ${className}`}
      style={{
        // Soft blue / lilac glow, drawn in CSS so it always covers the whole section at every width.
        background:
          "radial-gradient(45% 60% at 18% 45%, rgb(199 210 254 / 0.45), transparent 70%), radial-gradient(40% 60% at 85% 50%, rgb(191 219 254 / 0.6), transparent 70%), linear-gradient(180deg, #f4f7ff 0%, #eef3ff 60%, #ffffff 100%)",
      }}
    >
      <div aria-hidden="true" className="relative mx-auto aspect-2/1 w-full max-w-4xl text-slate-500">
        <svg
          viewBox="0 0 120 60"
          className="absolute inset-0 size-full opacity-80"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        >
          <path d={WORLD_MAP_DOTS} fill="currentColor" />
        </svg>

        {/* Germany: where the books are kept */}
        <div className="absolute" style={{ left: "52.5%", top: "27%" }}>
          <span className="absolute left-0 top-0 size-3 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/40" />
          <span className="absolute left-0 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-white" />
        </div>
        <Pin left="52.5%" top="27%" size="size-10">
          <span className="flex size-full items-center justify-center bg-white">
            <Image src={assets.logo} alt="" width={28} height={28} className="size-6" />
          </span>
        </Pin>

        {people.map((p) => (
          <Pin key={p.left} left={p.left} top={p.top}>
            <CartoonAvatar look={p.look} className="size-full" />
          </Pin>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-3xl text-center md:mt-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-900/5 backdrop-blur">
          <Globe className="size-3.5 text-primary" />
          {accessibleWorldwide}
        </span>
        <h2 className="mb-4 mt-5 text-balance text-2xl font-medium leading-tight tracking-tight text-slate-900 md:mb-5 md:text-4xl md:leading-[1.15]">
          {title}
          <br />
          {subtitle}
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">{description}</p>
      </div>
    </section>
  )
}
