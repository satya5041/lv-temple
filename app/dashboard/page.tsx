import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatShortDate } from "@/lib/utils";

const MOCK_USER = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  membershipTier: "Silver Patron",
  memberSince: "2021-06-15",
};

const MOCK_UPCOMING_BOOKINGS = [
  {
    id: "b1",
    type: "Event",
    title: "Sri Rama Navami Celebrations",
    date: "2026-04-06",
    time: "09:00",
    location: "Main Hall",
    status: "Confirmed",
    qrCode: "QR-001234",
  },
  {
    id: "b2",
    type: "Service",
    title: "Abhishekam",
    date: "2026-03-22",
    time: "08:00",
    location: "Main Sanctum",
    status: "Confirmed",
    qrCode: "QR-001235",
  },
];

const MOCK_DONATIONS = [
  {
    id: "d1",
    campaign: "New Temple Building Fund",
    amount: 501,
    date: "2026-03-10",
    receipt: "RCP-2026-001",
    taxDeductible: true,
  },
  {
    id: "d2",
    campaign: "Prasadam & Food Service",
    amount: 108,
    date: "2026-02-14",
    receipt: "RCP-2026-002",
    taxDeductible: true,
  },
  {
    id: "d3",
    campaign: "New Temple Building Fund",
    amount: 251,
    date: "2026-01-05",
    receipt: "RCP-2026-003",
    taxDeductible: true,
  },
];

const STATUS_COLORS: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const totalDonated = MOCK_DONATIONS.reduce((sum, d) => sum + d.amount, 0);

  return (
    <main className="min-h-screen bg-[#fdfcf8] pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-1">
              Namaste, {MOCK_USER.name.split(" ")[0]}! 🙏
            </h1>
            <p className="text-stone-500">{MOCK_USER.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className="px-3 py-1 text-sm"
              style={{ backgroundColor: "#c9a227", color: "white" }}
            >
              ⭐ {MOCK_USER.membershipTier}
            </Badge>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Upcoming Bookings",
              value: MOCK_UPCOMING_BOOKINGS.length.toString(),
              icon: "📅",
              color: "bg-blue-50 border-blue-100",
            },
            {
              label: "Total Donated",
              value: formatCurrency(totalDonated),
              icon: "💛",
              color: "bg-yellow-50 border-yellow-100",
            },
            {
              label: "Membership",
              value: "Active",
              icon: "⭐",
              color: "bg-purple-50 border-purple-100",
            },
            {
              label: "Member Since",
              value: new Date(MOCK_USER.memberSince).getFullYear().toString(),
              icon: "🛕",
              color: "bg-red-50 border-red-100",
            },
          ].map((stat) => (
            <Card
              key={stat.label}
              className={`border ${stat.color}`}
            >
              <CardContent className="p-5">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-stone-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-stone-500 text-xs">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* My Upcoming Events */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">My Upcoming Bookings</CardTitle>
                <Link href="/events">
                  <Button variant="ghost" size="sm" className="text-[#8b1a1a]">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {MOCK_UPCOMING_BOOKINGS.length === 0 ? (
                <div className="text-center py-8 text-stone-400">
                  <div className="text-4xl mb-2">📅</div>
                  <p>No upcoming bookings</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {MOCK_UPCOMING_BOOKINGS.map((booking) => {
                    const bookingDate = new Date(booking.date + "T00:00:00");
                    return (
                      <div
                        key={booking.id}
                        className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl"
                      >
                        <div
                          className="w-12 h-12 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0 text-xs"
                          style={{ backgroundColor: "#8b1a1a" }}
                        >
                          <div className="font-bold text-base leading-none">
                            {bookingDate.getDate()}
                          </div>
                          <div>
                            {bookingDate.toLocaleString("en-US", {
                              month: "short",
                            })}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-stone-900 text-sm truncate">
                            {booking.title}
                          </div>
                          <div className="text-stone-500 text-xs mt-0.5">
                            {booking.time} · {booking.location}
                          </div>
                          <div className="text-stone-400 text-xs mt-0.5">
                            QR: {booking.qrCode}
                          </div>
                        </div>
                        <Badge
                          className={`text-xs border-0 flex-shrink-0 ${
                            STATUS_COLORS[booking.status] || ""
                          }`}
                        >
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
                <Link href="/donations">
                  <Button variant="ghost" size="sm" className="text-[#8b1a1a]">
                    Donate Again
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {MOCK_DONATIONS.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0"
                      style={{ backgroundColor: "#c9a227" }}
                    >
                      💛
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-stone-900 text-sm truncate">
                        {donation.campaign}
                      </div>
                      <div className="text-stone-400 text-xs mt-0.5">
                        {formatShortDate(donation.date)} · {donation.receipt}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className="font-bold text-sm"
                        style={{ color: "#8b1a1a" }}
                      >
                        {formatCurrency(donation.amount)}
                      </div>
                      {donation.taxDeductible && (
                        <div className="text-green-600 text-xs">
                          Tax deductible
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  icon: "📅",
                  label: "Register for Event",
                  href: "/events",
                },
                {
                  icon: "💛",
                  label: "Make Donation",
                  href: "/donations",
                },
                {
                  icon: "🛕",
                  label: "Book Service",
                  href: "/services",
                },
                {
                  icon: "👤",
                  label: "Update Profile",
                  href: "/dashboard/profile",
                },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <button className="w-full p-4 rounded-xl border border-stone-200 hover:border-[#8b1a1a] hover:bg-stone-50 transition-all text-center group">
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-sm font-medium text-stone-700 group-hover:text-[#8b1a1a]">
                      {action.label}
                    </div>
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
