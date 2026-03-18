"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SERVICES } from "@/lib/data/mock";

const SERVICE_ICONS: Record<string, string> = {
  archana: "🌸",
  abhishekam: "🫧",
  homam: "🔥",
  wedding: "💍",
  gruhapravesam: "🏠",
  epuja: "💻",
};

const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
];

type BookingStep = "form" | "loading" | "success";

interface BookingForm {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  numberOfPeople: string;
  donationAmount: string;
  specialRequests: string;
}

export default function ServiceBookingPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const service = SERVICES.find((s) => s.id === serviceId);

  const today = new Date().toISOString().split("T")[0];
  const [bookingRef] = useState(`BK${Math.floor(100000 + Math.random() * 900000)}`);
  const [step, setStep] = useState<BookingStep>("form");
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});

  const [form, setForm] = useState<BookingForm>({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    numberOfPeople: "1",
    donationAmount: service ? String(service.suggestedDonation) : "",
    specialRequests: "",
  });

  const updateField = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingForm, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email address";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.date) newErrors.date = "Please select a date";
    if (!form.timeSlot) newErrors.timeSlot = "Please select a time slot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStep("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStep("success");
  };

  const handleBookAnother = () => {
    setStep("form");
    setForm({
      fullName: "",
      email: "",
      phone: "",
      date: "",
      timeSlot: "",
      numberOfPeople: "1",
      donationAmount: service ? String(service.suggestedDonation) : "",
      specialRequests: "",
    });
    setErrors({});
  };

  if (!service) {
    return (
      <main className="min-h-screen bg-[#fdfcf8] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6">🛕</div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: "#8b1a1a" }}>
            Service Not Found
          </h1>
          <p className="text-stone-500 mb-8 leading-relaxed">
            We couldn&apos;t find the service you&apos;re looking for. It may have been moved or
            the link may be incorrect.
          </p>
          <Link href="/services">
            <Button size="lg">Browse All Services</Button>
          </Link>
        </div>
      </main>
    );
  }

  const icon = SERVICE_ICONS[service.id] || "🛕";

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 text-white"
        style={{
          background: "linear-gradient(135deg, #3d0a0a 0%, #8b1a1a 50%, #c9a227 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-stone-300 hover:text-white text-sm mb-8 transition-colors"
          >
            ← Back to All Services
          </Link>
          <div className="text-6xl mb-4" style={{ color: "#f0c040" }}>
            {icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{service.title}</h1>
          <p className="text-stone-200 text-lg max-w-2xl mx-auto leading-relaxed">
            {service.description}
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

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Details Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl">{icon}</span>
                    <h2 className="text-xl font-bold" style={{ color: "#8b1a1a" }}>
                      {service.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-50">
                      <span className="text-lg flex-shrink-0">⏱️</span>
                      <div>
                        <div className="text-xs text-stone-400 uppercase tracking-wide font-semibold mb-0.5">
                          Duration
                        </div>
                        <div className="text-stone-800 font-medium text-sm">{service.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-50">
                      <span className="text-lg flex-shrink-0">💰</span>
                      <div>
                        <div className="text-xs text-stone-400 uppercase tracking-wide font-semibold mb-0.5">
                          Suggested Donation
                        </div>
                        <div className="font-bold text-lg" style={{ color: "#8b1a1a" }}>
                          ${service.suggestedDonation}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-50">
                      <span className="text-lg flex-shrink-0">📅</span>
                      <div>
                        <div className="text-xs text-stone-400 uppercase tracking-wide font-semibold mb-0.5">
                          Availability
                        </div>
                        <div className="text-stone-800 font-medium text-sm">
                          {service.availability}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-5 p-4 rounded-xl text-sm"
                    style={{ backgroundColor: "#fdf8ec", borderLeft: "3px solid #c9a227" }}
                  >
                    <div className="font-semibold mb-1" style={{ color: "#8b1a1a" }}>
                      Need help?
                    </div>
                    <p className="text-stone-500 leading-relaxed">
                      Call us at{" "}
                      <a
                        href="tel:+14255550123"
                        className="underline font-medium"
                        style={{ color: "#8b1a1a" }}
                      >
                        (425) 555-0123
                      </a>{" "}
                      or email{" "}
                      <a
                        href="mailto:info@lvtemple.org"
                        className="underline font-medium"
                        style={{ color: "#8b1a1a" }}
                      >
                        info@lvtemple.org
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-md">
                <CardContent className="p-8">
                  {step === "form" && (
                    <>
                      <h2 className="text-2xl font-bold mb-6" style={{ color: "#8b1a1a" }}>
                        Book {service.title}
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        {/* Full Name */}
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1.5">
                            Full Name{" "}
                            <span style={{ color: "#8b1a1a" }}>*</span>
                          </label>
                          <Input
                            value={form.fullName}
                            onChange={(e) => updateField("fullName", e.target.value)}
                            placeholder="e.g. Priya Sharma"
                            style={
                              errors.fullName ? { borderColor: "#ef4444" } : {}
                            }
                          />
                          {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                          )}
                        </div>

                        {/* Email + Phone */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                              Email Address <span style={{ color: "#8b1a1a" }}>*</span>
                            </label>
                            <Input
                              type="email"
                              value={form.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              placeholder="your@email.com"
                              style={errors.email ? { borderColor: "#ef4444" } : {}}
                            />
                            {errors.email && (
                              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                              Phone Number <span style={{ color: "#8b1a1a" }}>*</span>
                            </label>
                            <Input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
                              placeholder="+1 (425) 555-0123"
                              style={errors.phone ? { borderColor: "#ef4444" } : {}}
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                            )}
                          </div>
                        </div>

                        {/* Date + Time */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                              Preferred Date <span style={{ color: "#8b1a1a" }}>*</span>
                            </label>
                            <input
                              type="date"
                              min={today}
                              value={form.date}
                              onChange={(e) => updateField("date", e.target.value)}
                              style={{
                                borderColor: errors.date ? "#ef4444" : "#e2e8f0",
                              }}
                              className="flex h-10 w-full rounded-lg border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]"
                            />
                            {errors.date && (
                              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                              Time Slot <span style={{ color: "#8b1a1a" }}>*</span>
                            </label>
                            <select
                              value={form.timeSlot}
                              onChange={(e) => updateField("timeSlot", e.target.value)}
                              style={{
                                borderColor: errors.timeSlot ? "#ef4444" : "#e2e8f0",
                              }}
                              className="flex h-10 w-full rounded-lg border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]"
                            >
                              <option value="">Select a time</option>
                              {TIME_SLOTS.map((slot) => (
                                <option key={slot} value={slot}>
                                  {slot}
                                </option>
                              ))}
                            </select>
                            {errors.timeSlot && (
                              <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>
                            )}
                          </div>
                        </div>

                        {/* Number of People + Donation Amount */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                              Number of People
                            </label>
                            <select
                              value={form.numberOfPeople}
                              onChange={(e) => updateField("numberOfPeople", e.target.value)}
                              className="flex h-10 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]"
                            >
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={String(n)}>
                                  {n} {n === 1 ? "person" : "people"}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                              Donation Amount ($)
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium text-sm">
                                $
                              </span>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                value={form.donationAmount}
                                onChange={(e) => updateField("donationAmount", e.target.value)}
                                className="flex h-10 w-full rounded-lg border border-stone-200 pl-7 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]"
                              />
                            </div>
                            <p className="text-xs text-stone-400 mt-1">
                              Suggested: ${service.suggestedDonation}
                            </p>
                          </div>
                        </div>

                        {/* Special Requests */}
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1.5">
                            Special Requests{" "}
                            <span className="text-stone-400 font-normal">(optional)</span>
                          </label>
                          <textarea
                            value={form.specialRequests}
                            onChange={(e) => updateField("specialRequests", e.target.value)}
                            placeholder="Deity name, occasion, names to include in prayers, accessibility needs, etc."
                            rows={4}
                            className="flex w-full rounded-lg border border-stone-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8b1a1a] resize-none"
                          />
                        </div>

                        {/* Booking Summary Preview */}
                        {form.date && form.timeSlot && (
                          <div
                            className="rounded-xl p-4 text-sm space-y-2"
                            style={{ backgroundColor: "#fdf8ec", border: "1px solid #e8d5a3" }}
                          >
                            <div
                              className="font-semibold text-base mb-2"
                              style={{ color: "#8b1a1a" }}
                            >
                              Booking Summary
                            </div>
                            <div className="flex justify-between text-stone-600">
                              <span>Service</span>
                              <span className="font-medium">{service.title}</span>
                            </div>
                            <div className="flex justify-between text-stone-600">
                              <span>Date</span>
                              <span className="font-medium">
                                {new Date(form.date + "T00:00:00").toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex justify-between text-stone-600">
                              <span>Time</span>
                              <span className="font-medium">{form.timeSlot}</span>
                            </div>
                            <div className="flex justify-between text-stone-600">
                              <span>Attendees</span>
                              <span className="font-medium">{form.numberOfPeople}</span>
                            </div>
                            {form.donationAmount && Number(form.donationAmount) > 0 && (
                              <div
                                className="flex justify-between pt-2 border-t font-semibold"
                                style={{ borderColor: "#e8d5a3" }}
                              >
                                <span style={{ color: "#8b1a1a" }}>Donation</span>
                                <span style={{ color: "#8b1a1a" }}>
                                  ${Number(form.donationAmount).toFixed(0)}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        <Button type="submit" size="lg" className="w-full text-base font-semibold">
                          Confirm Booking
                        </Button>
                        <p className="text-center text-xs text-stone-400">
                          A confirmation email will be sent after booking · 501(c)(3) tax deductible
                        </p>
                      </form>
                    </>
                  )}

                  {step === "loading" && (
                    <div className="py-20 text-center">
                      <div
                        className="w-14 h-14 border-4 border-stone-200 rounded-full mx-auto mb-5 animate-spin"
                        style={{ borderTopColor: "#8b1a1a" }}
                      />
                      <p className="text-stone-700 font-semibold text-lg">
                        Processing your booking...
                      </p>
                      <p className="text-stone-400 text-sm mt-2">Please wait a moment</p>
                    </div>
                  )}

                  {step === "success" && (
                    <div className="py-6 text-center">
                      <div className="text-6xl mb-5">🙏</div>
                      <h2 className="text-2xl font-bold mb-2" style={{ color: "#8b1a1a" }}>
                        Booking Confirmed!
                      </h2>
                      <p className="text-stone-500 mb-6 text-sm">
                        A confirmation email has been sent to{" "}
                        <strong className="text-stone-700">{form.email}</strong>
                      </p>

                      <div
                        className="rounded-2xl p-6 mb-5 text-left max-w-sm mx-auto"
                        style={{ backgroundColor: "#fdf8ec", border: "1px solid #e8d5a3" }}
                      >
                        <div className="text-center mb-4">
                          <div className="text-xs text-stone-400 uppercase tracking-widest mb-1">
                            Booking Reference
                          </div>
                          <div
                            className="text-2xl font-bold font-mono tracking-widest"
                            style={{ color: "#8b1a1a" }}
                          >
                            {bookingRef}
                          </div>
                        </div>
                        <div className="space-y-2.5 border-t pt-4" style={{ borderColor: "#e8d5a3" }}>
                          <div className="flex justify-between text-sm">
                            <span className="text-stone-500">Service</span>
                            <span className="font-medium">
                              {icon} {service.title}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-stone-500">Name</span>
                            <span className="font-medium">{form.fullName}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-stone-500">Date</span>
                            <span className="font-medium">
                              {new Date(form.date + "T00:00:00").toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-stone-500">Time</span>
                            <span className="font-medium">{form.timeSlot}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-stone-500">Attendees</span>
                            <span className="font-medium">{form.numberOfPeople}</span>
                          </div>
                          {form.donationAmount && Number(form.donationAmount) > 0 && (
                            <div
                              className="flex justify-between text-sm pt-2 border-t font-semibold"
                              style={{ borderColor: "#e8d5a3" }}
                            >
                              <span className="text-stone-600">Donation</span>
                              <span style={{ color: "#8b1a1a" }}>
                                ${Number(form.donationAmount).toFixed(0)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className="text-xs rounded-lg px-4 py-3 mb-6 inline-block"
                        style={{
                          backgroundColor: "#f0fdf4",
                          color: "#166534",
                          border: "1px solid #bbf7d0",
                        }}
                      >
                        ✅ Tax receipt will be emailed · LV Temple is a 501(c)(3) organization
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button size="lg" variant="outline" onClick={handleBookAnother}>
                          Book Another Service
                        </Button>
                        <Link href="/services">
                          <Button size="lg">Browse All Services</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
