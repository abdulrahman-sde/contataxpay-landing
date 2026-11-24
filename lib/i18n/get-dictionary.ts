// Server side: the landing texts for one language.
import type { Language } from "./config"
import { de } from "./dictionaries/de"
import { en, type LandingDictionary } from "./dictionaries/en"
import { ro } from "./dictionaries/ro"
import { ru } from "./dictionaries/ru"

export type { LandingDictionary }

const dictionaries: Record<Language, LandingDictionary> = { de, en, ro, ru }

export function getDictionary(language: Language): LandingDictionary {
  return dictionaries[language]
}
