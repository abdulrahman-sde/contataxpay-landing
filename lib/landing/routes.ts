// Every address the landing links to, in one place.
// LANDING is "/" here; in the app the landing lives at "/landing" — change it there when merging back.
export const routes = {
  landing: "/",
  hireAccountant: "/landing/hire-accountant",
  services: "/landing/services",
  pricing: "/landing/pricing",
  contact: "/landing/contact",
  login: "/sign",
  register: "/register",
  impressum: "/impressum",
  terms: "/terms",
  privacy: "/datenschutz",
  security: "/security",
  verifyRepresentative: "/verify-representative",
  reportSuspicious: "/verify-representative?report=1",
} as const

/** Section ids on the landing page (also used as #anchors). */
export const sections = {
  features: "features",
  services: "services",
  pricing: "pricing",
  faq: "faq",
} as const

export const contact = {
  email: "info@contataxpay.com",
  phones: [
    { href: "tel:+4915568205116", label: "+49 155 68205116" },
    { href: "tel:+491630474573", label: "+49 163 0474573" },
  ],
  whatsappNumber: "491630474573",
  social: {
    tiktok: "https://www.tiktok.com/@contataxpay",
    instagram: "https://www.instagram.com/contataxpay/",
    facebook: "https://www.facebook.com/people/Contataxpay/61581001140023/",
  },
} as const
