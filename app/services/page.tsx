import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function ServicesPage() {
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
            🛕
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Services &amp; Bookings
          </h1>
          <p className="text-stone-200 text-xl max-w-2xl mx-auto">
            Book Archana, Abhishekam, Homam, and more. Our priests will conduct
            each service with devotion and care.
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

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-3">
              Available Services
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              All services are conducted by our trained priests following
              traditional Vaikhanasa Agama rituals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Service icon banner */}
                <div
                  className="h-24 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #8b1a1a 0%, #5c1111 100%)",
                  }}
                >
                  <span className="text-5xl">
                    {SERVICE_ICONS[service.id] || "🛕"}
                  </span>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-500 flex items-center gap-1.5">
                        <span>⏱</span> Duration
                      </span>
                      <span className="font-medium text-stone-900">
                        {service.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-500 flex items-center gap-1.5">
                        <span>💛</span> Suggested Donation
                      </span>
                      <span
                        className="font-bold text-base"
                        style={{ color: "#8b1a1a" }}
                      >
                        {formatCurrency(service.suggestedDonation)}+
                      </span>
                    </div>
                    <div className="flex items-start justify-between text-sm">
                      <span className="text-stone-500 flex items-center gap-1.5">
                        <span>📅</span> Availability
                      </span>
                      <span className="font-medium text-stone-900 text-right max-w-32">
                        {service.availability}
                      </span>
                    </div>
                  </div>

                  <Link href={`/services/${service.id}`}>
                    <Button className="w-full">Book This Service</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-3">
              What to Expect When Booking
            </h2>
            <p className="text-stone-500 text-lg">
              Our simple 4-step process makes booking a pooja easy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                icon: "🔍",
                title: "Choose a Service",
                desc: "Browse our available services and select the one that fits your devotional needs.",
              },
              {
                step: "2",
                icon: "📅",
                title: "Pick Date & Time",
                desc: "Select your preferred date and time slot. Check availability and confirm.",
              },
              {
                step: "3",
                icon: "💳",
                title: "Make Donation",
                desc: "Make the suggested donation securely online. All donations are tax-deductible.",
              },
              {
                step: "4",
                icon: "✅",
                title: "Receive Confirmation",
                desc: "Get an email confirmation with a QR code. Arrive 15 minutes before your service.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
                  style={{ backgroundColor: "#8b1a1a" }}
                >
                  {item.step}
                </div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-stone-900 mb-2">{item.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-l-4 border-l-[#c9a227]">
            <CardContent className="p-8">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#8b1a1a" }}
              >
                Important Notes
              </h3>
              <ul className="space-y-3 text-stone-600">
                {[
                  "Please arrive 15 minutes before your scheduled service.",
                  "Bring flowers, fruits, and coconut for your pooja (or purchase from our temple shop).",
                  "Dress modestly — traditional Indian attire preferred. Shoulders and knees should be covered.",
                  "Cancellations must be made 48+ hours in advance for a full refund.",
                  "For weddings and Homams, a prior consultation with our Head Priest is required.",
                  "E-Puja devotees will receive a video recording and prasadam by mail within 7 days.",
                ].map((note) => (
                  <li key={note} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                      style={{ backgroundColor: "#c9a227" }}
                    >
                      ✓
                    </span>
                    <span className="text-sm">{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4 text-white"
        style={{
          background: "linear-gradient(135deg, #8b1a1a 0%, #c9a227 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-stone-200 mb-8">
            Our team is happy to help you select the right service. Contact us or
            chat with our AI assistant for guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="white">
                Contact Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#8b1a1a]"
              >
                Chat with AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
