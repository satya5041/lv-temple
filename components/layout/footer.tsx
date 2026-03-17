import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Youtube, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#8b1a1a] flex items-center justify-center text-white text-xl font-bold">
                ॐ
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">LV Temple</div>
                <div className="text-stone-400 text-xs">Lakshmi Venkateswara Temple</div>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-5">
              Serving the devotee community in the Pacific Northwest with devotion, culture, and community spirit.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#8b1a1a] transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#8b1a1a] transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#8b1a1a] transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About & Deities", href: "/about" },
                { label: "Upcoming Events", href: "/events" },
                { label: "Book a Service", href: "/services" },
                { label: "Make a Donation", href: "/donations" },
                { label: "Volunteer Portal", href: "/volunteer" },
                { label: "Community & Media", href: "/community" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-[#c9a227] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Temple Services</h3>
            <ul className="space-y-2.5">
              {[
                "Archana",
                "Abhishekam",
                "Homam (Havan)",
                "Hindu Wedding Ceremony",
                "Gruhapravesam",
                "E-Puja (Virtual)",
                "Naming Ceremony",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-stone-400 hover:text-[#c9a227] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact & Hours</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[#c9a227] mt-0.5 shrink-0" />
                <span className="text-stone-400">
                  1234 Temple Way<br />Redmond, WA 98052
                </span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone className="h-4 w-4 text-[#c9a227] mt-0.5 shrink-0" />
                <span className="text-stone-400">(425) 555-0100</span>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail className="h-4 w-4 text-[#c9a227] mt-0.5 shrink-0" />
                <a href="mailto:info@lvtemple.org" className="text-stone-400 hover:text-[#c9a227] transition-colors">
                  info@lvtemple.org
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <Clock className="h-4 w-4 text-[#c9a227] mt-0.5 shrink-0" />
                <div className="text-stone-400 space-y-0.5">
                  <div>Mon–Fri: 8AM–12PM, 6–8:30PM</div>
                  <div>Weekends: 8AM–8:30PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Lakshmi Venkateswara Temple, Redmond. All rights reserved.
            <span className="ml-2">501(c)(3) Non-Profit Organization</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">Terms of Use</Link>
            <Link href="/accessibility" className="hover:text-stone-300 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
