import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: {
    default: "LV Temple – Lakshmi Venkateswara Temple Redmond",
    template: "%s | LV Temple Redmond",
  },
  description:
    "The Lakshmi Venkateswara Temple in Redmond, WA — serving the devotee community with spiritual services, events, and community programs.",
  keywords: ["Hindu temple", "Redmond", "Venkateswara", "Balaji", "temple", "Washington"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
