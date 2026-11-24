import Link from "next/link"
import { routes } from "@/lib/landing/routes"

/*
 * A service card: text on top, a soft coloured fade over the lower part; height = content. Index = position in serviceSlugs.
 */
/** Bottom fade colour per card, in the order of serviceSlugs. */
const fades = ["to-blue-100/80", "to-violet-100/80", "to-emerald-100/80", "to-sky-100/80", "to-amber-100/80"]

export function ServiceCard({ title, desc, lists, index }: { title: string; desc: string; lists: string[]; index: number }) {
  const fade = fades[index] ?? fades[0]

  return (
    <Link
      href={routes.services}
      className={`group flex flex-col overflow-hidden rounded-[20px] bg-slate-50/90 bg-linear-to-b from-transparent from-70% ${fade} shadow-sm shadow-black/[0.04] ring-1 ring-slate-900/[0.06] transition-shadow hover:shadow-md`}
    >
      <div className="p-6">
        <h3 className="text-lg text-slate-900">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{desc}</p>
        <ul className="mt-5 space-y-2 border-t border-dashed border-slate-200 pt-5">
          {lists.map((item, i) => (
            <li key={i} className="flex gap-2.5 break-words text-[13px] leading-5 text-slate-500">
              <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-slate-300" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
