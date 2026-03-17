"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VOLUNTEER_GROUPS } from "@/lib/data/mock";

const GROUP_ICONS: Record<string, string> = {
  kitchen: "👨‍🍳",
  "pooja-prep": "🌸",
  "priest-assist": "📖",
  "prasadam-stock": "📦",
  events: "🎉",
  it: "💻",
};

const GROUP_COLORS: Record<string, string> = {
  kitchen: "bg-orange-50 border-orange-200",
  "pooja-prep": "bg-purple-50 border-purple-200",
  "priest-assist": "bg-blue-50 border-blue-200",
  "prasadam-stock": "bg-green-50 border-green-200",
  events: "bg-yellow-50 border-yellow-200",
  it: "bg-gray-50 border-gray-200",
};

const GROUP_ICON_BG: Record<string, string> = {
  kitchen: "bg-orange-100 text-orange-700",
  "pooja-prep": "bg-purple-100 text-purple-700",
  "priest-assist": "bg-blue-100 text-blue-700",
  "prasadam-stock": "bg-green-100 text-green-700",
  events: "bg-yellow-100 text-yellow-700",
  it: "bg-gray-100 text-gray-700",
};

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    groupPreference: "",
    availability: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 text-white"
        style={{
          background:
            "linear-gradient(135deg, #3d0a0a 0%, #8b1a1a 50%, #c9a227 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4" style={{ color: "#f0c040" }}>
            🤝
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Volunteer Portal
          </h1>
          <p className="text-stone-200 text-xl max-w-2xl mx-auto">
            Seva (selfless service) is one of the highest forms of devotion.
            Join our dedicated volunteers and make a difference.
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

      {/* Stats */}
      <section className="py-10 px-4 bg-white border-b border-stone-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: "150+", label: "Active Volunteers" },
              { value: "6", label: "Volunteer Teams" },
              { value: "Every Weekend", label: "Opportunities" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: "#8b1a1a" }}
                >
                  {stat.value}
                </div>
                <div className="text-stone-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#8b1a1a] mb-4">
            Join Our Team
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Our volunteers are the backbone of the temple. From cooking prasadam
            to managing live streams, every act of seva helps our community
            thrive. No experience required — just devotion and willingness to
            serve.
          </p>
        </div>

        {/* Volunteer Groups */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-stone-900 mb-6 text-center">
            Our Volunteer Groups
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VOLUNTEER_GROUPS.map((group) => (
              <Card
                key={group.id}
                className={`border-2 hover:shadow-md transition-all hover:-translate-y-0.5 ${
                  GROUP_COLORS[group.id] || "bg-stone-50 border-stone-200"
                }`}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${
                      GROUP_ICON_BG[group.id] || "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {GROUP_ICONS[group.id] || "🤝"}
                  </div>
                  <h4 className="text-lg font-bold text-stone-900 mb-2">
                    {group.name}
                  </h4>
                  <p className="text-stone-500 text-sm mb-4">
                    {group.id === "kitchen" &&
                      "Help prepare and serve prasadam for weekly poojas and special events. Kitchen experience preferred but not required."}
                    {group.id === "pooja-prep" &&
                      "Assist in arranging flowers, preparing materials, and setting up the pooja room for daily and special rituals."}
                    {group.id === "priest-assist" &&
                      "Support our priests during major poojas and festivals. Requires basic knowledge of Hindu rituals."}
                    {group.id === "prasadam-stock" &&
                      "Manage inventory of pooja materials, prasadam items, and temple supplies. Good organizational skills needed."}
                    {group.id === "events" &&
                      "Help organize and manage temple events — registration, crowd management, hospitality, and clean-up."}
                    {group.id === "it" &&
                      "Manage live streams, website, social media, photography, and audio-visual equipment."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">
                      Every weekend
                    </span>
                    <button
                      onClick={() =>
                        setFormData((f) => ({
                          ...f,
                          groupPreference: group.id,
                        }))
                      }
                      className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                      style={{ color: "#8b1a1a", backgroundColor: "white", border: "1px solid #8b1a1a" }}
                    >
                      I&apos;m Interested
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-up Form */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-3">
              Volunteer Sign-Up
            </h2>
            <p className="text-stone-500">
              Fill out this form and our volunteer coordinator will be in touch
              within 2–3 business days.
            </p>
          </div>

          {submitted ? (
            <Card className="text-center">
              <CardContent className="p-12">
                <div className="text-6xl mb-4">🙏</div>
                <h3 className="text-2xl font-bold text-[#8b1a1a] mb-3">
                  Thank You for Your Interest!
                </h3>
                <p className="text-stone-500 text-lg">
                  We have received your application. Our volunteer coordinator
                  will contact you at{" "}
                  <strong>{formData.email}</strong> within 2–3 business days.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        First Name *
                      </label>
                      <Input
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            firstName: e.target.value,
                          }))
                        }
                        placeholder="Priya"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Last Name *
                      </label>
                      <Input
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            lastName: e.target.value,
                          }))
                        }
                        placeholder="Sharma"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="priya@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="+1 (425) 555-0123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Group Preference *
                    </label>
                    <select
                      required
                      value={formData.groupPreference}
                      onChange={(e) =>
                        setFormData((f) => ({
                          ...f,
                          groupPreference: e.target.value,
                        }))
                      }
                      className="flex h-10 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]"
                    >
                      <option value="">Select a group...</option>
                      {VOLUNTEER_GROUPS.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                      <option value="any">Any / No preference</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Availability *
                    </label>
                    <select
                      required
                      value={formData.availability}
                      onChange={(e) =>
                        setFormData((f) => ({
                          ...f,
                          availability: e.target.value,
                        }))
                      }
                      className="flex h-10 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]"
                    >
                      <option value="">Select availability...</option>
                      <option value="weekends">Weekends only</option>
                      <option value="weekdays">Weekdays only</option>
                      <option value="both">Both weekdays and weekends</option>
                      <option value="events">Special events only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Additional Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Tell us about your skills, experience, or why you want to volunteer..."
                      className="flex w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm min-h-24 resize-y focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}
