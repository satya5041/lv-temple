import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { headers } from "next/headers"

export const metadata: Metadata = {
  title: {
    default: "LV Temple – Lakshmi Venkateswara Temple Redmond",
    template: "%s | LV Temple Redmond",
  },
  description:
    "The Lakshmi Venkateswara Temple in Redmond, WA — serving the devotee community with spiritual services, events, and community programs.",
  keywords: ["Hindu temple", "Redmond", "Venkateswara", "Balaji", "temple", "Washington"],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || ""
  const isAdminRoute = pathname.startsWith("/admin")

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {!isAdminRoute && <Header />}
        <main className="min-h-screen">{children}</main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  )
}
