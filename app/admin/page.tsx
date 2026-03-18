import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatShortDate } from "@/lib/utils";

const MOCK_REGISTRATIONS = [
  {
    id: "r1",
    name: "Venkat Reddy",
    email: "venkat.reddy@email.com",
    event: "Sri Rama Navami",
    date: "2026-04-06",
    status: "Confirmed",
    registeredAt: "2026-03-14",
  },
  {
    id: "r2",
    name: "Meena Krishnan",
    email: "meena.k@email.com",
    event: "Hanuman Jayanti",
    date: "2026-04-12",
    status: "Confirmed",
    registeredAt: "2026-03-13",
  },
  {
    id: "r3",
    name: "Suresh Nair",
    email: "suresh.n@email.com",
    event: "Bhagavad Gita Study",
    date: "2026-03-22",
    status: "Pending",
    registeredAt: "2026-03-12",
  },
  {
    id: "r4",
    name: "Lakshmi Iyer",
    email: "lakshmi.i@email.com",
    event: "Ugadi",
    date: "2026-03-29",
    status: "Confirmed",
    registeredAt: "2026-03-11",
  },
  {
    id: "r5",
    name: "Ramesh Gowda",
    email: "ramesh.g@email.com",
    event: "Sri Rama Navami",
    date: "2026-04-06",
    status: "Confirmed",
    registeredAt: "2026-03-10",
  },
];

const MOCK_DONATIONS = [
  {
    id: "d1",
    name: "Anitha Chandrasekhar",
    email: "anitha.c@email.com",
    campaign: "New Temple Building Fund",
    amount: 1001,
    date: "2026-03-15",
    method: "Credit Card",
  },
  {
    id: "d2",
    name: "Krishnamurthy Rao",
    email: "k.rao@email.com",
    campaign: "New Temple Building Fund",
    amount: 501,
    date: "2026-03-14",
    method: "Zelle",
  },
  {
    id: "d3",
    name: "Padma Venkat",
    email: "padma.v@email.com",
    campaign: "Prasadam & Food Service",
    amount: 251,
    date: "2026-03-13",
    method: "Credit Card",
  },
  {
    id: "d4",
    name: "Ravi Shankar",
    email: "ravi.s@email.com",
    campaign: "Youth Education",
    amount: 108,
    date: "2026-03-12",
    method: "Venmo",
  },
  {
    id: "d5",
    name: "Saraswathi Balaji",
    email: "sara.b@email.com",
    campaign: "New Temple Building Fund",
    amount: 2501,
    date: "2026-03-11",
    method: "Check",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const ADMIN_NAV = [
  { label: "Events", href: "/admin/events", icon: "📅" },
  { label: "Donations", href: "/admin/donations", icon: "💛" },
  { label: "Users", href: "/admin/users", icon: "👥" },
  { label: "Volunteers", href: "/admin/volunteers", icon: "🤝" },
];

export default function AdminDashboardPage() {
  const totalDonationsThisMonth = MOCK_DONATIONS.reduce(
    (sum, d) => sum + d.amount,
    0
  );

  return (
    <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-1">
              Admin Dashboard
            </h1>
            <p className="text-stone-500">
              LV Temple — Redmond, WA · Manage all temple operations
            </p>
          </div>
        </div>

        {/* Admin Nav */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {ADMIN_NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-white border border-stone-200 rounded-xl p-4 flex items-center gap-3 hover:border-[#8b1a1a] hover:shadow-sm transition-all cursor-pointer">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-stone-700 text-sm">
                  Manage {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            {
              label: "Total Devotees",
              value: "1,247",
              change: "+23 this month",
              icon: "👥",
              color: "bg-blue-50",
              iconColor: "text-blue-600",
            },
            {
              label: "This Month Donations",
              value: formatCurrency(totalDonationsThisMonth),
              change: "+12% vs last month",
              icon: "💰",
              color: "bg-yellow-50",
              iconColor: "text-yellow-600",
            },
            {
              label: "Upcoming Events",
              value: "8",
              change: "Next: Ugadi (Mar 29)",
              icon: "📅",
              color: "bg-purple-50",
              iconColor: "text-purple-600",
            },
            {
              label: "Active Volunteers",
              value: "147",
              change: "Across 6 teams",
              icon: "🤝",
              color: "bg-green-50",
              iconColor: "text-green-600",
            },
          ].map((stat) => (
            <Card key={stat.label} className={`border-0 ${stat.color}`}>
              <CardContent className="p-5">
                <div className={`text-2xl mb-2 ${stat.iconColor}`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-stone-900 mb-0.5">
                  {stat.value}
                </div>
                <div className="text-stone-600 text-xs font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-stone-400 text-xs">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Registrations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Registrations</CardTitle>
                <Link href="/admin/events">
                  <Button variant="ghost" size="sm" className="text-[#8b1a1a]">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100">
                      <th className="text-left py-2 pr-3 text-stone-500 font-medium">
                        Name
                      </th>
                      <th className="text-left py-2 pr-3 text-stone-500 font-medium">
                        Event
                      </th>
                      <th className="text-left py-2 text-stone-500 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {MOCK_REGISTRATIONS.map((reg) => (
                      <tr key={reg.id} className="hover:bg-stone-50">
                        <td className="py-3 pr-3">
                          <div className="font-medium text-stone-900">
                            {reg.name}
                          </div>
                          <div className="text-stone-400 text-xs">
                            {reg.email}
                          </div>
                        </td>
                        <td className="py-3 pr-3">
                          <div className="text-stone-700">{reg.event}</div>
                          <div className="text-stone-400 text-xs">
                            {formatShortDate(reg.date)}
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge
                            className={`text-xs border-0 ${
                              STATUS_COLORS[reg.status] || ""
                            }`}
                          >
                            {reg.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Donations</CardTitle>
                <Link href="/admin/donations">
                  <Button variant="ghost" size="sm" className="text-[#8b1a1a]">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100">
                      <th className="text-left py-2 pr-3 text-stone-500 font-medium">
                        Donor
                      </th>
                      <th className="text-left py-2 pr-3 text-stone-500 font-medium">
                        Campaign
                      </th>
                      <th className="text-right py-2 text-stone-500 font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {MOCK_DONATIONS.map((donation) => (
                      <tr key={donation.id} className="hover:bg-stone-50">
                        <td className="py-3 pr-3">
                          <div className="font-medium text-stone-900">
                            {donation.name}
                          </div>
                          <div className="text-stone-400 text-xs">
                            {formatShortDate(donation.date)}
                          </div>
                        </td>
                        <td className="py-3 pr-3">
                          <div className="text-stone-700 text-xs leading-tight">
                            {donation.campaign}
                          </div>
                          <div className="text-stone-400 text-xs">
                            {donation.method}
                          </div>
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className="font-bold"
                            style={{ color: "#8b1a1a" }}
                          >
                            {formatCurrency(donation.amount)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  icon: "➕",
                  label: "Create Event",
                  href: "/admin/events/new",
                  color: "bg-blue-50 border-blue-200 hover:border-blue-400",
                },
                {
                  icon: "📢",
                  label: "Send Announcement",
                  href: "/admin/announcements/new",
                  color:
                    "bg-purple-50 border-purple-200 hover:border-purple-400",
                },
                {
                  icon: "📊",
                  label: "View Reports",
                  href: "/admin/reports",
                  color: "bg-green-50 border-green-200 hover:border-green-400",
                },
                {
                  icon: "👥",
                  label: "Manage Users",
                  href: "/admin/users",
                  color:
                    "bg-orange-50 border-orange-200 hover:border-orange-400",
                },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <button
                    className={`w-full p-4 rounded-xl border-2 transition-all text-center ${action.color}`}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-sm font-medium text-stone-700">
                      {action.label}
                    </div>
                  </button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
