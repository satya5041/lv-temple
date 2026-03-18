import { cookies } from "next/headers";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("lv_session");

  let user = null;
  if (sessionCookie?.value) {
    try {
      user = JSON.parse(sessionCookie.value);
    } catch {}
  }

  // Login page — render without admin chrome
  if (!user || user.role !== "admin") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Admin Top Bar */}
      <header className="bg-[#3d0a0a] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl" style={{ color: "#f0c040" }}>ॐ</span>
            <div>
              <div className="font-bold text-sm">LV Temple Admin</div>
              <div className="text-xs text-stone-400">Management Dashboard</div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/admin", label: "📊 Dashboard" },
              { href: "/admin/events", label: "🎉 Events" },
              { href: "/admin/donations", label: "💛 Donations" },
              { href: "/admin/users", label: "👥 Users" },
              { href: "/admin/volunteers", label: "🤝 Volunteers" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded text-sm hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-300">
              {user.firstName} {user.lastName}
            </span>
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-white border border-stone-600 px-2 py-1 rounded transition-colors"
            >
              View Site ↗
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="text-xs bg-white/10 hover:bg-red-600 px-3 py-1.5 rounded transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
