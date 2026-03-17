"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VOLUNTEER_GROUPS } from "@/lib/data/mock";

const MOCK_VOLUNTEERS = [
  { id: "v1", name: "Suresh Nair", email: "suresh.n@email.com", group: "Kitchen & Prasadam", availability: "Weekends", hours: 48, status: "active", since: "2025-09-01" },
  { id: "v2", name: "Ravi Shankar", email: "ravi.s@email.com", group: "IT & Media", availability: "Flexible", hours: 32, status: "active", since: "2026-01-15" },
  { id: "v3", name: "Priya Nambiar", email: "priya.n@email.com", group: "Events & Hospitality", availability: "Weekends", hours: 64, status: "active", since: "2025-06-20" },
  { id: "v4", name: "Arjun Sharma", email: "arjun.s@email.com", group: "Priest Assistance", availability: "Mornings", hours: 120, status: "active", since: "2025-04-10" },
  { id: "v5", name: "Divya Menon", email: "divya.m@email.com", group: "Pooja Preparation", availability: "Weekends", hours: 28, status: "active", since: "2026-02-01" },
  { id: "v6", name: "Kumar Pillai", email: "kumar.p@email.com", group: "Prasadam Stock Mgmt", availability: "Flexible", hours: 16, status: "pending", since: "2026-03-10" },
];

const GROUP_COLORS: Record<string, string> = {
  "Kitchen & Prasadam": "bg-orange-100 text-orange-700",
  "Pooja Preparation": "bg-purple-100 text-purple-700",
  "Priest Assistance": "bg-blue-100 text-blue-700",
  "Prasadam Stock Mgmt": "bg-green-100 text-green-700",
  "Events & Hospitality": "bg-yellow-100 text-yellow-700",
  "IT & Media": "bg-gray-100 text-gray-700",
};

export default function AdminVolunteersPage() {
  const [groupFilter, setGroupFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_VOLUNTEERS.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchGroup = groupFilter === "all" || v.group === groupFilter;
    return matchSearch && matchGroup;
  });

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-stone-400 hover:text-stone-600 text-sm">← Admin</Link>
            <span className="text-stone-300">/</span>
            <h1 className="text-lg font-bold text-stone-900">Volunteers Management</h1>
          </div>
          <Button size="sm">+ Add Volunteer</Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Volunteers", value: "147", icon: "🤝" },
            { label: "Active", value: "132", icon: "✅" },
            { label: "Pending Approval", value: "15", icon: "⏳" },
            { label: "Total Hours (YTD)", value: "2,840", icon: "⏰" },
          ].map((s) => (
            <Card key={s.label}><CardContent className="p-5">
              <div className="flex justify-between">
                <div>
                  <div className="text-stone-400 text-sm mb-1">{s.label}</div>
                  <div className="text-2xl font-bold text-stone-900">{s.value}</div>
                </div>
                <span className="text-2xl">{s.icon}</span>
              </div>
            </CardContent></Card>
          ))}
        </div>

        {/* Groups Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {VOLUNTEER_GROUPS.map((g) => {
            const count = MOCK_VOLUNTEERS.filter(v => v.group === g.name).length;
            return (
              <Card key={g.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setGroupFilter(groupFilter === g.name ? "all" : g.name)}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-800 text-sm">{g.name}</div>
                    <div className="text-xs text-stone-400 mt-0.5">{count} volunteer{count !== 1 ? "s" : ""}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "#8b1a1a" }}>
                    {count}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search volunteers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] bg-white"
          />
          <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}
            className="border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] bg-white">
            <option value="all">All Groups</option>
            {VOLUNTEER_GROUPS.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
          </select>
        </div>

        {/* Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Volunteer</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Group</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Availability</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Hours (YTD)</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Since</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: "#c9a227" }}>
                          {v.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-stone-900 text-sm">{v.name}</div>
                          <div className="text-xs text-stone-400">{v.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${GROUP_COLORS[v.group] || "bg-stone-100 text-stone-700"}`}>{v.group}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">{v.availability}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-stone-900">{v.hours}h</td>
                    <td className="px-6 py-4 text-sm text-stone-500">{new Date(v.since).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${v.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {v.status === "pending" && (
                          <button className="text-xs px-3 py-1.5 rounded-md font-medium bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">Approve</button>
                        )}
                        <button className="text-xs px-3 py-1.5 rounded-md font-medium text-stone-600 border border-stone-200 hover:bg-stone-100 transition-colors">Edit</button>
                      </div>
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
