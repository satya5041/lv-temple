"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { DONATION_CAMPAIGNS } from "@/lib/data/mock";

const MOCK_DONATIONS = [
  { id: "d1", name: "Venkat Reddy", email: "venkat.reddy@email.com", amount: 251, campaign: "New Temple Building Fund", date: "2026-03-14", status: "completed", method: "Card" },
  { id: "d2", name: "Meena Krishnan", email: "meena.k@email.com", amount: 501, campaign: "Facility Maintenance", date: "2026-03-13", status: "completed", method: "Card" },
  { id: "d3", name: "Suresh Nair", email: "suresh.n@email.com", amount: 1001, campaign: "New Temple Building Fund", date: "2026-03-12", status: "completed", method: "Check" },
  { id: "d4", name: "Anita Patel", email: "anita.p@email.com", amount: 108, campaign: "Prasadam & Food Service", date: "2026-03-11", status: "completed", method: "Card" },
  { id: "d5", name: "Ravi Shankar", email: "ravi.s@email.com", amount: 51, campaign: "Youth Education", date: "2026-03-10", status: "completed", method: "Card" },
  { id: "d6", name: "Kavitha Iyer", email: "kavitha.i@email.com", amount: 5001, campaign: "New Temple Building Fund", date: "2026-03-09", status: "completed", method: "Wire" },
  { id: "d7", name: "Mohan Das", email: "mohan.d@email.com", amount: 21, campaign: "Facility Maintenance", date: "2026-03-08", status: "pending", method: "Card" },
  { id: "d8", name: "Lakshmi Prasad", email: "lakshmi.p@email.com", amount: 351, campaign: "New Temple Building Fund", date: "2026-03-07", status: "completed", method: "Card" },
];

export default function AdminDonationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = MOCK_DONATIONS.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || d.campaign.toLowerCase().includes(filter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const totalThisMonth = MOCK_DONATIONS.filter(d => d.status === "completed").reduce((sum, d) => sum + d.amount, 0);

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-stone-400 hover:text-stone-600 text-sm">← Admin</Link>
            <span className="text-stone-300">/</span>
            <h1 className="text-lg font-bold text-stone-900">Donations Management</h1>
          </div>
          <Button size="sm" variant="outline">Export CSV</Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="p-5">
            <div className="text-stone-400 text-sm mb-1">This Month</div>
            <div className="text-2xl font-bold" style={{ color: "#8b1a1a" }}>{formatCurrency(totalThisMonth)}</div>
            <div className="text-xs text-stone-400 mt-1">{MOCK_DONATIONS.length} donations</div>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <div className="text-stone-400 text-sm mb-1">Avg Donation</div>
            <div className="text-2xl font-bold text-stone-900">{formatCurrency(Math.round(totalThisMonth / MOCK_DONATIONS.length))}</div>
            <div className="text-xs text-stone-400 mt-1">Per transaction</div>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <div className="text-stone-400 text-sm mb-1">Building Fund</div>
            <div className="text-2xl font-bold text-stone-900">$1.24M</div>
            <div className="text-xs text-green-600 mt-1">62% of $2M goal</div>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <div className="text-stone-400 text-sm mb-1">YTD Total</div>
            <div className="text-2xl font-bold text-stone-900">$48,230</div>
            <div className="text-xs text-stone-400 mt-1">Jan – Mar 2026</div>
          </CardContent></Card>
        </div>

        {/* Campaign Progress */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-stone-900 mb-4">Campaign Progress</h3>
            <div className="space-y-4">
              {DONATION_CAMPAIGNS.map((c) => {
                const pct = Math.round((c.raised / c.goal) * 100);
                return (
                  <div key={c.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-stone-800">{c.title}</span>
                      <span className="text-stone-500">{formatCurrency(c.raised)} / {formatCurrency(c.goal)}</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: c.urgent ? "#c9a227" : "#8b1a1a" }} />
                    </div>
                    <div className="text-xs text-stone-400 mt-0.5">{pct}% funded</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] bg-white"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] bg-white"
          >
            <option value="all">All Campaigns</option>
            <option value="building">New Temple Building</option>
            <option value="facility">Facility Maintenance</option>
            <option value="prasadam">Prasadam</option>
            <option value="education">Youth Education</option>
          </select>
        </div>

        {/* Donations Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Donor</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Amount</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Campaign</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Method</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900 text-sm">{d.name}</div>
                      <div className="text-xs text-stone-400">{d.email}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm" style={{ color: "#8b1a1a" }}>{formatCurrency(d.amount)}</td>
                    <td className="px-6 py-4 text-sm text-stone-600 max-w-40">
                      <span className="line-clamp-2">{d.campaign}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-700">{d.method}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-500">{new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${d.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}
