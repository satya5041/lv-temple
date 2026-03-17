"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, Heart, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About & Deities", href: "/about" },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Upcoming Events", href: "/events" },
      { label: "Book a Service", href: "/services" },
      { label: "Calendar", href: "/events/calendar" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Donations", href: "/donations" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200"
          : "bg-transparent"
      )}
    >
      {/* Top strip */}
      <div className="bg-[#8b1a1a] text-white text-xs py-1.5 text-center hidden md:block">
        <span className="opacity-80">ॐ</span>
        {" "}Lakshmi Venkateswara Temple – Redmond, WA{" "}
        <span className="opacity-80">ॐ</span>
        <span className="ml-4 opacity-80">Temple Hours: Mon–Fri 8AM–12PM, 6–8:30PM | Weekends 8AM–8:30PM</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#8b1a1a] flex items-center justify-center text-white text-lg font-bold shadow-md group-hover:bg-[#5c1111] transition-colors">
              ॐ
            </div>
            <div>
              <div className="text-sm font-bold text-[#8b1a1a] leading-tight">LV Temple</div>
              <div className="text-xs text-stone-500 leading-tight hidden sm:block">Redmond, WA</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-[#8b1a1a] bg-[#8b1a1a]/8"
                      : "text-stone-700 hover:text-[#8b1a1a] hover:bg-stone-100"
                  )}
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3 w-3" />}
                </Link>

                {link.children && activeDropdown === link.href && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-10">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-stone-700 hover:text-[#8b1a1a] hover:bg-stone-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/donate-quick">
                <Heart className="h-4 w-4" />
                Donate
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/login">
                <User className="h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-[#8b1a1a] bg-[#8b1a1a]/8"
                    : "text-stone-700 hover:text-[#8b1a1a] hover:bg-stone-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/donate-quick">
                  <Heart className="h-4 w-4" /> Donate
                </Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href="/auth/login">
                  <User className="h-4 w-4" /> Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
