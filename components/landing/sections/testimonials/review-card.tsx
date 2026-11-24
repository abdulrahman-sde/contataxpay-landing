/** One customer review (each card has its own very light colour): stars, quote, then avatar + name + role (same order as before). */
export function ReviewCard({
  stars,
  quote,
  name,
  role,
  starsLabel,
  tint,
}: {
  stars: number
  quote: string
  name: string
  role: string
  starsLabel: string
  tint: string
}) {
  return (
    <figure
      className={`flex h-full w-72 flex-col overflow-hidden rounded-xl border border-gray-950/[.08] p-5 ${tint}`}
    >
      <div className="text-sm tracking-wide text-amber-500" aria-label={starsLabel}>
        {"★".repeat(stars)}
        <span className="text-slate-300">{"★".repeat(5 - stars)}</span>
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">&ldquo;{quote}&rdquo;</blockquote>
      <div className="mt-5 flex items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative avatar from avatar.vercel.sh, as in the Magic UI demo */}
        <img className="rounded-full" width="32" height="32" alt="" src={`https://avatar.vercel.sh/${encodeURIComponent(name)}`} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-slate-900">{name}</figcaption>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </figure>
  )
}
