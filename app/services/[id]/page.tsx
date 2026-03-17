"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SERVICES } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/utils";

const SERVICE_ICONS: Record<string, string> = {
  archana: "🌸",
  abhishekam: "🫧",
  homam: "🔥",
  wedding: "💍",
  gruhapravesam: "🏠",
  epuja: "💻",
};

const TIME_SLOTS: Record<string, string[]> = {
  archana: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"],
  abhishekam: ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
  homam: ["9:00 AM", "10:00 AM"],
  wedding: ["9:00 AM", "10:00 AM", "11:00 AM"],
  gruhapravesam: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"],
  epuja: ["Any time – online"],
};

export default function ServiceBookingPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const service = SERVICES.find((s) => s.id === serviceId);

  const [step, setStep] = useState<"details" | "confirm" | "success">("details");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    nakshatram: "",
    gotra: "",
    specialRequests: "",
    donationAmount: service?.suggestedDonation || 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!service) {
    return (
      <main className="min-h-screen bg-[#fdfcf8] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛕</div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Service Not Found</h1>
          <p className="text-stone-500 mb-6">The service you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/services">
            <Button>View All Services</Button>
          </Link>
        </div>
      </main>
    );
  }

  const timeSlots = TIME_SLOTS[service.id] || ["9:00 AM", "10:00 AM", "11:00 AM"];

  // Get min date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "details") {
      setStep("confirm");
      return;
    }
    // Submit booking
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // Simulate API call
    setIsLoading(false);
    setStep("success");
  };

  const bookingRef = `LVT-${Date.now().toString().slice(-6)}`;

  if (step === "success") {
    return (
      <main className="min-h-screen bg-[#fdfcf8] flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-lg shadow-xl border-0">
          <CardContent className="p-10 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl" style={{ backgroundColor: "#f0f9f0" }}>
              ✅
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Booking Confirmed!</h2>
            <p className="text-stone-500 mb-4">
              Your {service.title} has been booked successfully.
            </p>
            <div className="bg-stone-50 rounded-xl p-5 mb-6 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Booking Reference</span>
                <span className="font-bold font-mono text-[#8b1a1a]">{bookingRef}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Service</span>
                <span className="font-medium">{service.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Date</span>
                <span className="font-medium">{new Date(form.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Time</span>
                <span className="font-medium">{form.timeSlot}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Devotee</span>
                <span className="font-medium">{form.firstName} {form.lastName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Donation</span>
                <span className="font-medium text-green-600">{formatCurrency(form.donationAmount)}</span>
              </div>
            </div>
            <p className="text-stone-400 text-sm mb-6">
              A confirmation email has been sent to <strong>{form.email}</strong>. Please arrive 15 minutes early.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/services" className="flex-1">
                <Button variant="outline" className="w-full">Book Another Service</Button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full">View My Bookings</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 text-white"
        style={{ background: "linear-gradient(135deg, #3d0a0a 0%, #8b1a1a 50%, #c9a227 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/services" className="inline-flex items-center gap-2 text-stone-300 hover:text-white text-sm mb-6 transition-colors">
            ← Back to All Services
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{SERVICE_ICONS[service.id] || "🛕"}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">{service.title}</h1>
              <p className="text-stone-300">{service.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
              <span className="text-stone-300">Duration: </span>
              <span className="font-medium">{service.duration}</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
              <span className="text-stone-300">Suggested Donation: </span>
              <span className="font-medium">{formatCurrency(service.suggestedDonation)}+</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
              <span className="text-stone-300">Availability: </span>
              <span className="font-medium">{service.availability}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10 fill-[#fdfcf8]">
            <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white border-b border-stone-100 py-4">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            {["details", "confirm"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: step === s || (step === "confirm" && i === 0) ? "#8b1a1a" : "#e5e7eb",
                    color: step === s || (step === "confirm" && i === 0) ? "white" : "#6b7280",
                  }}
                >
                  {i === 0 && step === "confirm" ? "✓" : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step === s ? "text-[#8b1a1a]" : "text-stone-400"}`}>
                  {s === "details" ? "Your Details" : "Confirm & Pay"}
                </span>
                {i < 1 && <div className="w-8 h-px bg-stone-300 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            {step === "details" && (
              <div className="space-y-6">
                {/* Devotee Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-[#8b1a1a]">👤 Devotee Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">First Name *</label>
                        <Input required value={form.firstName} onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="Priya" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">Last Name *</label>
                        <Input required value={form.lastName} onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Sharma" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">Email Address *</label>
                        <Input type="email" required value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone Number *</label>
                        <Input type="tel" required value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (425) 555-0123" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                          Nakshatram <span className="text-stone-400 font-normal">(optional)</span>
                        </label>
                        <Input value={form.nakshatram} onChange={(e) => setForm(f => ({ ...f, nakshatram: e.target.value }))} placeholder="e.g., Rohini" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                          Gotra <span className="text-stone-400 font-normal">(optional)</span>
                        </label>
                        <Input value={form.gotra} onChange={(e) => setForm(f => ({ ...f, gotra: e.target.value }))} placeholder="e.g., Kashyapa" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Schedule */}
                {service.id !== "epuja" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-[#8b1a1a]">📅 Schedule</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">Preferred Date *</label>
                        <Input type="date" required value={form.date} min={minDate} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-3">Preferred Time Slot *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setForm(f => ({ ...f, timeSlot: slot }))}
                              className={`py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                                form.timeSlot === slot
                                  ? "border-[#8b1a1a] text-white"
                                  : "border-stone-200 text-stone-700 hover:border-[#8b1a1a]"
                              }`}
                              style={form.timeSlot === slot ? { backgroundColor: "#8b1a1a" } : {}}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        {!form.timeSlot && <p className="text-xs text-stone-400 mt-2">Please select a time slot</p>}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Donation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-[#8b1a1a]">💛 Donation Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-500 text-sm mb-4">Suggested donation: {formatCurrency(service.suggestedDonation)}</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                      {[service.suggestedDonation, service.suggestedDonation * 2, service.suggestedDonation * 3, service.suggestedDonation * 5].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, donationAmount: amt }))}
                          className={`py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                            form.donationAmount === amt
                              ? "border-[#8b1a1a] text-white"
                              : "border-stone-200 text-stone-700 hover:border-[#8b1a1a]"
                          }`}
                          style={form.donationAmount === amt ? { backgroundColor: "#8b1a1a" } : {}}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                      <Input
                        type="number"
                        placeholder="Custom amount"
                        className="pl-7"
                        value={form.donationAmount}
                        min={1}
                        onChange={(e) => setForm(f => ({ ...f, donationAmount: parseFloat(e.target.value) || 0 }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Special Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-[#8b1a1a]">📝 Special Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      value={form.specialRequests}
                      onChange={(e) => setForm(f => ({ ...f, specialRequests: e.target.value }))}
                      placeholder="Any special names to include in the pooja, specific prayers, or other requests..."
                      className="w-full min-h-24 rounded-lg border border-stone-200 p-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] focus:border-transparent resize-none"
                    />
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!form.firstName || !form.email || !form.phone || (service.id !== "epuja" && (!form.date || !form.timeSlot))}
                >
                  Continue to Confirm →
                </Button>
              </div>
            )}

            {step === "confirm" && (
              <div className="space-y-6">
                <Card className="border-2 border-[#8b1a1a]/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#8b1a1a]">📋 Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-stone-50 rounded-xl p-5 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-500">Service</span>
                        <span className="font-semibold">{SERVICE_ICONS[service.id]} {service.title}</span>
                      </div>
                      {form.date && (
                        <div className="flex justify-between text-sm">
                          <span className="text-stone-500">Date</span>
                          <span className="font-medium">{new Date(form.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
                        </div>
                      )}
                      {form.timeSlot && (
                        <div className="flex justify-between text-sm">
                          <span className="text-stone-500">Time</span>
                          <span className="font-medium">{form.timeSlot}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-500">Devotee</span>
                        <span className="font-medium">{form.firstName} {form.lastName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-500">Email</span>
                        <span className="font-medium">{form.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-500">Phone</span>
                        <span className="font-medium">{form.phone}</span>
                      </div>
                      {form.nakshatram && (
                        <div className="flex justify-between text-sm">
                          <span className="text-stone-500">Nakshatram</span>
                          <span className="font-medium">{form.nakshatram}</span>
                        </div>
                      )}
                      {form.gotra && (
                        <div className="flex justify-between text-sm">
                          <span className="text-stone-500">Gotra</span>
                          <span className="font-medium">{form.gotra}</span>
                        </div>
                      )}
                      {form.specialRequests && (
                        <div className="text-sm">
                          <span className="text-stone-500 block mb-1">Special Requests</span>
                          <span className="text-stone-700 text-xs italic">{form.specialRequests}</span>
                        </div>
                      )}
                      <div className="pt-3 border-t border-stone-200 flex justify-between">
                        <span className="font-semibold text-stone-900">Total Donation</span>
                        <span className="font-bold text-lg text-[#8b1a1a]">{formatCurrency(form.donationAmount)}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                      <strong>Important:</strong> Please arrive 15 minutes before your scheduled time. Bring flowers, fruits, and coconut (or purchase from our temple shop).
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep("details")}>
                    ← Edit Details
                  </Button>
                  <Button type="submit" size="lg" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Confirming..." : `Confirm & Pay ${formatCurrency(form.donationAmount)}`}
                  </Button>
                </div>
                <p className="text-center text-xs text-stone-400">
                  Secure payment · Tax receipt sent to your email · 501(c)(3) deductible
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
