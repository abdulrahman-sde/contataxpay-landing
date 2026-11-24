"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * FAQ list: each question its own soft card; the open one turns white and lifts.
 * Answers open with a smooth height animation (grid rows 0fr -> 1fr). One answer open at a time.
 */
export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2.5">
      {items.map((item, index) => {
        const open = openIndex === index
        return (
          <div
            key={`${item.question}-${index}`}
            className={cn(
              "rounded-2xl ring-1 transition-[background-color,box-shadow] duration-300",
              open
                ? "bg-white shadow-lg shadow-slate-900/[0.06] ring-slate-900/[0.08]"
                : "bg-slate-50/70 ring-slate-900/[0.05]",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-4 py-4 text-left sm:px-5"
            >
              <span className="text-[15px] font-medium text-slate-900">{item.question}</span>
              <span className="grid size-7 shrink-0 place-content-center rounded-full bg-white text-slate-500 ring-1 ring-slate-900/[0.08]">
                <ChevronDown
                  className={cn("size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]", open && "rotate-180")}
                />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm leading-relaxed text-slate-500 sm:px-5">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
