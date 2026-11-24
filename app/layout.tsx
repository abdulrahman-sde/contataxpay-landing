import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

// Inter, self-hosted (latin subset, variable weight 300–700), same file and CSS variable as the app.
const inter = localFont({
  src: "./fonts/Inter-latin-variable.woff2",
  weight: "300 700",
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Contataxpay - Modern Accounting Platform",
  description: "Professional accounting software for entrepreneurs and accountants",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The language provider updates `lang` to the visitor's language after load.
    <html lang="de" className={inter.variable} suppressHydrationWarning>
      <body className="font-inter">{children}</body>
    </html>
  )
}
