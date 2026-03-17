"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UPCOMING_EVENTS } from "@/lib/data/mock";

const CATEGORIES = ["All", "Pooja", "Festival", "Cultural", "Community Service"];

const CATEGORY_COLORS: Record<string, string> = {
  Festival: "bg-orange-100 text-orange-800",
  Pooja: "bg-purple-100 text-purple-800",
  Cultural: "bg-blue-100 text-blue-800",
  "Community Service": "bg-green-100 text-green-800",
};

type Event = typeof UPCOMING_EVENTS[0];

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attendees: number;
  notes: string;
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [regStep, setRegStep] = useState<"form" | "loading" | "success">("form");
  const [form, setForm] = useState<RegistrationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    attendees: 1,
    notes: "",
  });

  const filteredEvents =
    activeCategory === "All"
      ? UPCOMING_EVENTS
      : UPCOMING_EVENTS.filter((e) => e.category === activeCategory);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setRegStep("form");
    setForm({ firstName: "", lastName: "", email: "", phone: "", attendees: 1, notes: "" });
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setRegStep("form");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegStep("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setRegStep("success");
  };

  const bookingRef = `EVT-${Date.now().toString().slice(-6)}`;

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      {/* Header */}
      <section
        className="relative pt-32 pb-20 text-white"
        style={{
          background: "linear-gradient(135deg, #3d0a0a 0%, #8b1a1a 50%, #c9a227 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4" style={{ color: "#f0c040" }}>🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events &amp; Festivals</h1>
          <p className="text-stone-200 text-xl max-w-2xl mx-auto">
            Join us for poojas, festivals, cultural programs, and community service opportunities throughout the year.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-12 fill-[#fdfcf8]">
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
                  activeCategory === cat ? "text-white" : "text-stone-600 hover:bg-stone-100"
                }`}
                style={activeCategory === cat ? { backgroundColor: "#8b1a1a" } : {}}
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
              <span className="font-semibold text-stone-900">{filteredEvents.length}</span>{" "}
              {activeCategory === "All" ? "upcoming events" : activeCategory + " events"}
            </p>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-stone-500 text-lg">No events found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const capacityPct = Math.round((event.registered / event.capacity) * 100);
                const eventDate = new Date(event.date + "T00:00:00");
                const month = eventDate.toLocaleString("en-US", { month: "short" });
                const day = eventDate.getDate();
                const weekday = eventDate.toLocaleString("en-US", { weekday: "long" });
                const fullDate = eventDate.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });
                const isFull = event.registered >= event.capacity;
                const isAlmostFull = capacityPct >= 80;

                return (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5">
                    {/* Date Banner */}
                    <div className="p-4 flex items-center justify-between" style={{ backgroundColor: "#8b1a1a" }}>
                      <div className="flex items-center gap-3 text-white">
                        <div className="text-center">
                          <div className="text-xs uppercase tracking-wider text-stone-300">{month}</div>
                          <div className="text-3xl font-bold leading-none">{day}</div>
                          <div className="text-xs text-stone-300">{weekday}</div>
                        </div>
                        <div className="w-px h-10 bg-white/20" />
                        <div>
                          <Badge className={`text-xs border-0 ${CATEGORY_COLORS[event.category] || "bg-white/20 text-white"}`}>
                            {event.category}
                          </Badge>
                          {event.sponsorshipAvailable && (
                            <div className="text-xs text-stone-300 mt-1">Sponsorship available</div>
                          )}
                        </div>
                      </div>
                      {isFull ? (
                        <span className="text-xs bg-red-500/80 text-white px-2 py-1 rounded font-medium">Full</span>
                      ) : isAlmostFull ? (
                        <span className="text-xs px-2 py-1 rounded font-medium" style={{ backgroundColor: "#c9a227", color: "white" }}>Almost Full</span>
                      ) : null}
                    </div>

                    <CardContent className="p-5">
                      <h3 className="font-bold text-stone-900 text-lg mb-2 leading-tight">{event.title}</h3>
                      <p className="text-stone-500 text-sm mb-4 line-clamp-2 leading-relaxed">{event.description}</p>

                      <div className="space-y-2 text-sm text-stone-600 mb-4">
                        <div className="flex items-center gap-2"><span className="w-4 text-center">📅</span><span>{fullDate}</span></div>
                        <div className="flex items-center gap-2"><span className="w-4 text-center">🕐</span><span>{event.time} – {event.endTime}</span></div>
                        <div className="flex items-center gap-2"><span className="w-4 text-center">📍</span><span>{event.location}</span></div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full">{tag}</span>
                        ))}
                      </div>

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
                              backgroundColor: isFull ? "#ef4444" : isAlmostFull ? "#c9a227" : "#8b1a1a",
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-[#8b1a1a]">{event.fee === 0 ? "Free" : `$${event.fee}`}</div>
                          {event.fee > 0 && <div className="text-xs text-stone-400">per person</div>}
                        </div>
                        <Button
                          size="sm"
                          disabled={isFull}
                          className={isFull ? "opacity-50 cursor-not-allowed" : ""}
                          onClick={() => !isFull && openModal(event)}
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
          <h2 className="text-2xl font-bold text-[#8b1a1a] mb-3">Stay Updated on Upcoming Events</h2>
          <p className="text-stone-500 mb-6">Create an account to get early access to event registration and receive temple newsletters.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup"><Button size="lg">Create Account</Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">Contact Us</Button></Link>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-100 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900">{selectedEvent.title}</h2>
                <p className="text-stone-500 text-sm mt-1">
                  {new Date(selectedEvent.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {selectedEvent.time} · {selectedEvent.location}
                </p>
              </div>
              <button onClick={closeModal} className="text-stone-400 hover:text-stone-600 text-2xl font-bold leading-none ml-4 flex-shrink-0">×</button>
            </div>

            <div className="p-6">
              {regStep === "form" && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">First Name *</label>
                      <Input required value={form.firstName} onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="Priya" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Last Name *</label>
                      <Input required value={form.lastName} onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Sharma" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Email Address *</label>
                    <Input type="email" required value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone Number *</label>
                    <Input type="tel" required value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (425) 555-0123" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Number of Attendees *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, attendees: n }))}
                          className={`flex-1 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                            form.attendees === n ? "text-white border-[#8b1a1a]" : "border-stone-200 text-stone-700 hover:border-[#8b1a1a]"
                          }`}
                          style={form.attendees === n ? { backgroundColor: "#8b1a1a" } : {}}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Special Notes <span className="text-stone-400 font-normal">(optional)</span></label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                      placeholder="Dietary needs, accessibility requirements, etc."
                      className="w-full min-h-20 rounded-lg border border-stone-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] resize-none"
                    />
                  </div>
                  {selectedEvent.fee > 0 && (
                    <div className="bg-stone-50 rounded-xl p-4 flex justify-between items-center">
                      <span className="text-stone-600 text-sm">Total ({form.attendees} × ${selectedEvent.fee})</span>
                      <span className="font-bold text-lg text-[#8b1a1a]">${form.attendees * selectedEvent.fee}</span>
                    </div>
                  )}
                  <Button type="submit" size="lg" className="w-full" disabled={!form.firstName || !form.email || !form.phone}>
                    {selectedEvent.fee > 0 ? `Register & Pay $${form.attendees * selectedEvent.fee}` : "Complete Registration"}
                  </Button>
                  <p className="text-center text-xs text-stone-400">Confirmation sent to your email</p>
                </form>
              )}

              {regStep === "loading" && (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 border-4 border-stone-200 rounded-full mx-auto mb-4 animate-spin" style={{ borderTopColor: "#8b1a1a" }} />
                  <p className="text-stone-600 font-medium">Registering you...</p>
                </div>
              )}

              {regStep === "success" && (
                <div className="py-6 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">You&apos;re Registered!</h3>
                  <p className="text-stone-500 text-sm mb-4">Confirmation sent to <strong>{form.email}</strong></p>
                  <div className="bg-stone-50 rounded-xl p-4 mb-6 text-left space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Reference</span>
                      <span className="font-bold font-mono text-[#8b1a1a]">{bookingRef}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Event</span>
                      <span className="font-medium text-right max-w-48">{selectedEvent.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Attendees</span>
                      <span className="font-medium">{form.attendees}</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={closeModal}>Done</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
