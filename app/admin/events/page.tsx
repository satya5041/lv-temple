"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UPCOMING_EVENTS } from "@/lib/data/mock";

const STAT_CARDS = [
  { label: "Total Events", value: "18", icon: "🗓️", sub: "This year" },
  { label: "Upcoming", value: "6", icon: "⏳", sub: "Next 30 days" },
  { label: "This Month", value: "4", icon: "📅", sub: "March 2026" },
  { label: "Total Registrations", value: "1,066", icon: "👥", sub: "Across all events" },
];

const CATEGORIES = ["All", "Festival", "Pooja", "Cultural", "Community Service"];

const CATEGORY_COLORS: Record<string, string> = {
  Festival: "bg-orange-100 text-orange-700",
  Pooja: "bg-purple-100 text-purple-700",
  Cultural: "bg-blue-100 text-blue-700",
  "Community Service": "bg-green-100 text-green-700",
};

export default function AdminEventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = activeCategory === "All"
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter((e) => e.category === activeCategory);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-stone-400 hover:text-stone-600 text-sm">
              ← Admin
            </Link>
            <span className="text-stone-300">/</span>
            <h1 className="text-lg font-bold text-stone-900">Events Management</h1>
          </div>
          <Button onClick={() => setShowAddModal(true)} size="sm">
            + Add Event
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-stone-400 text-sm">{stat.label}</span>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-2xl font-bold text-stone-900">{stat.value}</div>
                <div className="text-xs text-stone-400 mt-1">{stat.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "text-white"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
              }`}
              style={activeCategory === cat ? { backgroundColor: "#8b1a1a" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Event</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Category</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Registrations</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Fee</th>
                  <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filtered.map((event) => {
                  const pct = Math.round((event.registered / event.capacity) * 100);
                  const isFull = event.registered >= event.capacity;
                  const isAlmost = pct >= 80;
                  const eventDate = new Date(event.date + "T00:00:00");
                  return (
                    <tr key={event.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-stone-900 text-sm">{event.title}</div>
                        <div className="text-xs text-stone-400 mt-0.5">{event.location}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-600 whitespace-nowrap">
                        {eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        <div className="text-xs text-stone-400">{event.time} – {event.endTime}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[event.category] || "bg-stone-100 text-stone-700"}`}>
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-stone-900">{event.registered} / {event.capacity}</div>
                        <div className="w-24 bg-stone-200 rounded-full h-1.5 mt-1">
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${Math.min(pct, 100)}%`,
                              backgroundColor: isFull ? "#ef4444" : isAlmost ? "#c9a227" : "#8b1a1a",
                            }}
                          />
                        </div>
                        <div className="text-xs text-stone-400 mt-0.5">{pct}% full</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: event.fee === 0 ? "#16a34a" : "#8b1a1a" }}>
                        {event.fee === 0 ? "Free" : `$${event.fee}`}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="text-xs px-3 py-1.5 rounded-md font-medium text-stone-600 border border-stone-200 hover:bg-stone-100 transition-colors">
                            Edit
                          </button>
                          <button className="text-xs px-3 py-1.5 rounded-md font-medium border border-stone-200 hover:text-white transition-colors" style={{ color: "#8b1a1a" }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#8b1a1a"; e.currentTarget.style.color = "white"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.color = "#8b1a1a"; }}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add Event Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
            <Card className="w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-stone-900">Add New Event</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-600 text-xl font-bold">×</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Event Title *</label>
                    <input type="text" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]" placeholder="e.g., Diwali Celebrations 2026" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Date *</label>
                      <input type="date" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Category *</label>
                      <select className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]">
                        <option>Festival</option>
                        <option>Pooja</option>
                        <option>Cultural</option>
                        <option>Community Service</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Start Time *</label>
                      <input type="time" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">End Time *</label>
                      <input type="time" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Capacity</label>
                      <input type="number" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]" placeholder="200" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Fee ($)</label>
                      <input type="number" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]" placeholder="0 for free" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Description</label>
                    <textarea className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] min-h-20 resize-none" placeholder="Event description..." />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                    <Button className="flex-1" onClick={() => setShowAddModal(false)}>Create Event</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
