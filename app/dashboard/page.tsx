import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatCurrency } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  registered: "bg-green-100 text-green-700",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("lv_session");

  if (!session?.value) redirect("/auth/login");

  const user = JSON.parse(session.value);
  const supabase = createAdminClient();

  const [{ data: bookings }, { data: registrations }, { data: donations }] = await Promise.all([
    supabase
      .from("bookings")
      .select("*, services(name)")
      .eq("user_id", user.id)
      .order("booking_date", { ascending: true })
      .limit(5),
    supabase
      .from("registrations")
      .select("*, events(title, event_date, start_time, location)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("donations")
      .select("*, campaigns(title)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalDonated = (donations ?? []).reduce((sum, d) => sum + Number(d.amount), 0);
  const upcomingBookings = [
    ...(bookings ?? []).map((b) => ({
      id: b.id,
      type: "Service",
      title: b.services?.name ?? "Service",
      date: b.booking_date,
      time: b.booking_time ?? "",
      location: "Main Sanctum",
      status: b.status,
      qrCode: b.qr_code ?? "",
    })),
    ...(registrations ?? []).map((r) => ({
      id: r.id,
      type: "Event",
      title: r.events?.title ?? "Event",
      date: r.events?.event_date ?? "",
      time: r.events?.start_time?.slice(0, 5) ?? "",
      location: r.events?.location ?? "",
      status: r.status,
      qrCode: r.qr_code ?? "",
    })),
  ].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#fdfcf8] pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              Namaste, {user.firstName || user.email.split("@")[0]}! 🙏
            </h1>
            <p className="text-stone-500">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="px-3 py-1 text-sm" style={{ backgroundColor: "#c9a227", color: "white" }}>
              ⭐ Devotee
            </Badge>
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" size="sm" type="submit">Sign Out</Button>
            </form>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Upcoming Bookings", value: upcomingBookings.length.toString(), icon: "📅", color: "bg-blue-50 border-blue-100" },
            { label: "Total Donated", value: formatCurrency(totalDonated), icon: "💛", color: "bg-yellow-50 border-yellow-100" },
            { label: "Registrations", value: (registrations?.length ?? 0).toString(), icon: "🎉", color: "bg-purple-50 border-purple-100" },
            { label: "Service Bookings", value: (bookings?.length ?? 0).toString(), icon: "🛕", color: "bg-red-50 border-red-100" },
          ].map((stat) => (
            <Card key={stat.label} className={`border ${stat.color}`}>
              <CardContent className="p-5">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-stone-900 mb-1">{stat.value}</div>
                <div className="text-stone-500 text-xs">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">My Upcoming Bookings</CardTitle>
                <Link href="/events"><Button variant="ghost" size="sm" className="text-[#8b1a1a]">Browse Events</Button></Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-8 text-stone-400">
                  <div className="text-4xl mb-2">📅</div>
                  <p>No upcoming bookings</p>
                  <Link href="/events"><Button size="sm" className="mt-3">Register for Events</Button></Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => {
                    const bookingDate = new Date(booking.date + "T00:00:00");
                    return (
                      <div key={booking.id} className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                        <div className="w-12 h-12 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0 text-xs" style={{ backgroundColor: "#8b1a1a" }}>
                          <div className="font-bold text-base leading-none">{bookingDate.getDate()}</div>
                          <div>{bookingDate.toLocaleString("en-US", { month: "short" })}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-stone-900 text-sm truncate">{booking.title}</div>
                          <div className="text-stone-500 text-xs mt-0.5">{booking.time} · {booking.location}</div>
                          {booking.qrCode && <div className="text-stone-400 text-xs mt-0.5">QR: {booking.qrCode}</div>}
                        </div>
                        <Badge className={`text-xs border-0 flex-shrink-0 capitalize ${STATUS_COLORS[booking.status] || "bg-stone-100 text-stone-600"}`}>
                          {booking.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Donations</CardTitle>
                <Link href="/donations"><Button variant="ghost" size="sm" className="text-[#8b1a1a]">Donate Again</Button></Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {(donations ?? []).length === 0 ? (
                <div className="text-center py-8 text-stone-400">
                  <div className="text-4xl mb-2">💛</div>
                  <p>No donations yet</p>
                  <Link href="/donations"><Button size="sm" className="mt-3">Make a Donation</Button></Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {(donations ?? []).map((donation) => (
                    <div key={donation.id} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0" style={{ backgroundColor: "#c9a227" }}>💛</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-stone-900 text-sm truncate">
                          {donation.campaigns?.title ?? "General Fund"}
                        </div>
                        <div className="text-stone-400 text-xs mt-0.5">
                          {new Date(donation.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          {donation.receipt_number && ` · ${donation.receipt_number}`}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-sm" style={{ color: "#8b1a1a" }}>{formatCurrency(donation.amount)}</div>
                        <div className="text-green-600 text-xs">Tax deductible</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: "📅", label: "Register for Event", href: "/events" },
                { icon: "💛", label: "Make Donation", href: "/donations" },
                { icon: "🛕", label: "Book Service", href: "/services" },
                { icon: "🤝", label: "Volunteer", href: "/volunteer" },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <button className="w-full p-4 rounded-xl border border-stone-200 hover:border-[#8b1a1a] hover:bg-stone-50 transition-all text-center group">
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-sm font-medium text-stone-700 group-hover:text-[#8b1a1a]">{action.label}</div>
                  </button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
