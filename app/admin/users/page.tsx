"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MOCK_USERS = [
  { id: "u1", name: "Venkat Reddy", email: "venkat.reddy@email.com", phone: "+1 425-555-0101", role: "devotee", membership: "Silver Patron", joined: "2025-11-15", status: "active" },
  { id: "u2", name: "Meena Krishnan", email: "meena.k@email.com", phone: "+1 425-555-0102", role: "devotee", membership: "Gold Patron", joined: "2025-09-22", status: "active" },
  { id: "u3", name: "Suresh Nair", email: "suresh.n@email.com", phone: "+1 425-555-0103", role: "volunteer", membership: "Devotee Member", joined: "2025-12-01", status: "active" },
  { id: "u4", name: "Anita Patel", email: "anita.p@email.com", phone: "+1 425-555-0104", role: "devotee", membership: "None", joined: "2026-01-10", status: "active" },
  { id: "u5", name: "Ravi Shankar", email: "ravi.s@email.com", phone: "+1 425-555-0105", role: "volunteer", membership: "Devotee Member", joined: "2026-02-05", status: "active" },
  { id: "u6", name: "Kavitha Iyer", email: "kavitha.i@email.com", phone: "+1 425-555-0106", role: "devotee", membership: "Gold Patron", joined: "2025-08-19", status: "active" },
  { id: "u7", name: "Mohan Das", email: "mohan.d@email.com", phone: "+1 425-555-0107", role: "devotee", membership: "None", joined: "2026-03-01", status: "inactive" },
  { id: "u8", name: "Lakshmi Prasad", email: "lakshmi.p@email.com", phone: "+1 425-555-0108", role: "admin", membership: "Gold Patron", joined: "2024-06-15", status: "active" },
];

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-red-100 text-red-700",
  volunteer: "bg-blue-100 text-blue-700",
  devotee: "bg-stone-100 text-stone-700",
};

const MEMBERSHIP_COLORS: Record<string, string> = {
  "Gold Patron": "bg-yellow-100 text-yellow-700",
  "Silver Patron": "bg-gray-100 text-gray-700",
  "Devotee Member": "bg-blue-50 text-blue-600",
  "None": "bg-stone-50 text-stone-400",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = MOCK_USERS.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-stone-400 hover:text-stone-600 text-sm">← Admin</Link>
            <span className="text-stone-300">/</span>
            <h1 className="text-lg font-bold text-stone-900">Users & Devotees</h1>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Export</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: "1,247", icon: "👥" },
            { label: "Active Members", value: "423", icon: "⭐" },
            { label: "Volunteers", value: "147", icon: "🤝" },
            { label: "New This Month", value: "38", icon: "🆕" },
          ].map((s) => (
            <Card key={s.label}><CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-stone-400 text-sm mb-1">{s.label}</div>
                  <div className="text-2xl font-bold text-stone-900">{s.value}</div>
                </div>
                <span className="text-2xl">{s.icon}</span>
              </div>
            </CardContent></Card>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] bg-white"
          />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] bg-white">
            <option value="all">All Roles</option>
            <option value="devotee">Devotees</option>
            <option value="volunteer">Volunteers</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">User</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Role</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Membership</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Joined</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: "#8b1a1a" }}>
                          {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-stone-900 text-sm">{u.name}</div>
                          <div className="text-xs text-stone-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${ROLE_COLORS[u.role]}`}>{u.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${MEMBERSHIP_COLORS[u.membership]}`}>{u.membership}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-500">{new Date(u.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5 rounded-md font-medium text-stone-600 border border-stone-200 hover:bg-stone-100 transition-colors">View</button>
                        <button className="text-xs px-3 py-1.5 rounded-md font-medium text-[#8b1a1a] border border-stone-200 hover:bg-stone-100 transition-colors">Edit</button>
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
