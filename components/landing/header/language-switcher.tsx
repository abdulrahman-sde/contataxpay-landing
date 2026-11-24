"use client"

import { Check, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { languages, type Language } from "@/lib/i18n/config"
import { useLanguage } from "@/lib/i18n/language-provider"

/** Quiet language picker for the header: globe + code, opens a small white menu. */
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={`Language: ${languages[language]}`}
        className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium uppercase text-muted-foreground outline-hidden transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:bg-foreground/5 data-[state=open]:bg-foreground/5 data-[state=open]:text-foreground"
      >
        <Globe className="size-3.5" />
        {language}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-[10000] min-w-40 rounded-xl border-0 bg-white/95 p-1.5 shadow-xl shadow-black/5 ring-1 ring-foreground/5 backdrop-blur"
      >
        {(Object.entries(languages) as [Language, string][]).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => setLanguage(code)}
            className="cursor-pointer justify-between rounded-lg px-2.5 py-2 text-sm text-foreground focus:bg-foreground/[0.04]"
          >
            {name}
            {language === code && <Check className="size-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
