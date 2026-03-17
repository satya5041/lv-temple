"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UPCOMING_EVENTS } from "@/lib/data/mock";

const CATEGORIES = ["All", "Pooja", "Festival", "Cultural", "Community Service"];

const CATEGORY_COLORS: Record<string, string> = {
  Festival: "bg-orange-100 text-orange-800",
  Pooja: "bg-purple-100 text-purple-800",
  Cultural: "bg-blue-100 text-blue-800",
  "Community Service": "bg-green-100 text-green-800",
};

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents =
    activeCategory === "All"
      ? UPCOMING_EVENTS
      : UPCOMING_EVENTS.filter((e) => e.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      {/* Header */}
      <section
        className="relative pt-32 pb-20 text-white"
        style={{
          background:
            "linear-gradient(135deg, #3d0a0a 0%, #8b1a1a 50%, #c9a227 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4" style={{ color: "#f0c040" }}>
            🎉
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Events &amp; Festivals
          </h1>
          <p className="text-stone-200 text-xl max-w-2xl mx-auto">
            Join us for poojas, festivals, cultural programs, and community
            service opportunities throughout the year.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="w-full h-12 fill-[#fdfcf8]"
          >
            <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-30 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
                style={
                  activeCategory === cat
                    ? { backgroundColor: "#8b1a1a" }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-stone-500">
              Showing{" "}
              <span className="font-semibold text-stone-900">
                {filteredEvents.length}
              </span>{" "}
              {activeCategory === "All" ? "upcoming events" : activeCategory + " events"}
            </p>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-stone-500 text-lg">
                No events found in this category.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const capacityPct = Math.round(
                  (event.registered / event.capacity) * 100
                );
                const eventDate = new Date(event.date + "T00:00:00");
                const month = eventDate.toLocaleString("en-US", {
                  month: "short",
                });
                const day = eventDate.getDate();
                const weekday = eventDate.toLocaleString("en-US", {
                  weekday: "long",
                });
                const fullDate = eventDate.toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });
                const isFull = event.registered >= event.capacity;
                const isAlmostFull = capacityPct >= 80;

                return (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    {/* Date Banner */}
                    <div
                      className="p-4 flex items-center justify-between"
                      style={{ backgroundColor: "#8b1a1a" }}
                    >
                      <div className="flex items-center gap-3 text-white">
                        <div className="text-center">
                          <div className="text-xs uppercase tracking-wider text-stone-300">
                            {month}
                          </div>
                          <div className="text-3xl font-bold leading-none">
                            {day}
                          </div>
                          <div className="text-xs text-stone-300">{weekday}</div>
                        </div>
                        <div className="w-px h-10 bg-white/20" />
                        <div>
                          <Badge
                            className={`text-xs border-0 ${
                              CATEGORY_COLORS[event.category] ||
                              "bg-white/20 text-white"
                            }`}
                          >
                            {event.category}
                          </Badge>
                          {event.sponsorshipAvailable && (
                            <div className="text-xs text-stone-300 mt-1">
                              Sponsorship available
                            </div>
                          )}
                        </div>
                      </div>
                      {isFull ? (
                        <span className="text-xs bg-red-500/80 text-white px-2 py-1 rounded font-medium">
                          Full
                        </span>
                      ) : isAlmostFull ? (
                        <span
                          className="text-xs px-2 py-1 rounded font-medium"
                          style={{ backgroundColor: "#c9a227", color: "white" }}
                        >
                          Almost Full
                        </span>
                      ) : null}
                    </div>

                    <CardContent className="p-5">
                      <h3 className="font-bold text-stone-900 text-lg mb-2 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-stone-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm text-stone-600 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-4 text-center">📅</span>
                          <span>{fullDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 text-center">🕐</span>
                          <span>
                            {event.time} – {event.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 text-center">📍</span>
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Capacity */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-stone-500 mb-1">
                          <span>{event.registered} registered</span>
                          <span>{event.capacity} capacity ({capacityPct}%)</span>
                        </div>
                        <div className="w-full bg-stone-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${Math.min(capacityPct, 100)}%`,
                              backgroundColor: isFull
                                ? "#ef4444"
                                : isAlmostFull
                                ? "#c9a227"
                                : "#8b1a1a",
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-[#8b1a1a]">
                            {event.fee === 0 ? "Free" : `$${event.fee}`}
                          </div>
                          {event.fee > 0 && (
                            <div className="text-xs text-stone-400">
                              per person
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          disabled={isFull}
                          className={isFull ? "opacity-50 cursor-not-allowed" : ""}
                        >
                          {isFull ? "Event Full" : "Register"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-stone-50 border-t border-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#8b1a1a] mb-3">
            Stay Updated on Upcoming Events
          </h2>
          <p className="text-stone-500 mb-6">
            Create an account to get early access to event registration and
            receive temple newsletters.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
