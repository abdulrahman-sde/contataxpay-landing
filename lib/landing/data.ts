// The parts of each landing card that are not text (images, colours, ids).
// The texts come from the dictionary, matched by position.
import type { StaticImageData } from "next/image"
import { assets } from "./assets"

export const features: { id: number; image: StaticImageData }[] = [
  { id: 1, image: assets.feature1 },
  { id: 2, image: assets.feature2 },
  { id: 3, image: assets.feature3 },
  { id: 4, image: assets.feature4 },
  { id: 5, image: assets.feature5 },
  { id: 6, image: assets.feature6 },
]

/** E-invoicing cards: background colour per card. Odd ids sit lower on large screens. */
export const invoicingCards: { id: number; color: string }[] = [
  { id: 0, color: "#a4d1f8" },
  { id: 1, color: "#e1defd" },
  { id: 2, color: "#e9f3ff" },
  { id: 3, color: "#75aaf8" },
  { id: 4, color: "#a4d1f8" },
  { id: 5, color: "#e1defd" },
]

/** Services, in the order of the dictionary's landing.services.items. */
export const serviceSlugs = ["consulting", "bookkeeping", "payroll", "business-formation", "insolvency"] as const
