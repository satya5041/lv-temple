import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UPCOMING_EVENTS, DONATION_CAMPAIGNS } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Redmond, WA",
    text: "This temple has been a spiritual home for our family for over 10 years. The priests are knowledgeable, the poojas are conducted with great devotion, and the community is warm and welcoming.",
    initials: "PS",
  },
  {
    name: "Venkat Reddy",
    location: "Bellevue, WA",
    text: "The Abhishekam service here is truly divine. We book it every year for our anniversary and it always fills us with peace and gratitude. The staff goes above and beyond.",
    initials: "VR",
  },
  {
    name: "Anitha Krishnamurthy",
    location: "Kirkland, WA",
    text: "My children have grown up attending events here. The youth programs, cultural classes, and community events have helped them stay connected to their heritage. We are so grateful.",
    initials: "AK",
  },
];

export default function HomePage() {
  const featuredEvents = UPCOMING_EVENTS.slice(0, 3);
  const mainCampaign = DONATION_CAMPAIGNS[0];
  const donationProgress = Math.round(
    (mainCampaign.raised / mainCampaign.goal) * 100
  );

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #3d0a0a 0%, #8b1a1a 40%, #c9a227 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.3) 35px, rgba(255,255,255,0.3) 70px)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-32 pb-20">
          <div
            className="text-8xl md:text-9xl mb-6 drop-shadow-2xl leading-none"
            style={{ color: "#f0c040" }}
          >
            ॐ
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            A Place of Devotion,
            <br />
            <span style={{ color: "#f0c040" }}>Community &amp; Grace</span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-stone-200 max-w-3xl mx-auto leading-relaxed">
            Lakshmi Venkateswara Temple — your spiritual home in Redmond, WA.
            Serving the community with devotion for over 20 years.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/events">
              <Button size="xl" variant="white" className="w-full sm:w-auto font-semibold">
                Explore Events
              </Button>
            </Link>
            <Link href="/donations">
              <Button
                size="xl"
                className="w-full sm:w-auto font-semibold border-2 border-white bg-transparent hover:bg-white hover:text-[#8b1a1a] text-white"
              >
                Donate Now
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="xl"
                className="w-full sm:w-auto font-semibold bg-[#c9a227] hover:bg-[#a8851e] text-white"
              >
                Book a Service
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { value: "5,000+", label: "Devotees" },
              { value: "200+", label: "Events / Year" },
              { value: "20+", label: "Years Serving" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "#f0c040" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-stone-200 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="w-full h-16 fill-[#fdfcf8]"
          >
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-[#8b1a1a] text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">🕐</span>
              <div>
                <span className="font-semibold">Weekdays:</span>{" "}
                <span className="text-stone-200">8AM–12PM &amp; 6–8:30PM</span>
              </div>
            </div>
            <div className="hidden md:block text-stone-400">|</div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🕐</span>
              <div>
                <span className="font-semibold">Weekends:</span>{" "}
                <span className="text-stone-200">8AM–8:30PM</span>
              </div>
            </div>
            <div className="hidden md:block text-stone-400">|</div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="text-stone-200">
                1234 Temple Way, Redmond, WA 98052
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-3">
              Upcoming Events
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Join us for poojas, festivals, cultural programs, and community
              gatherings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {featuredEvents.map((event) => {
              const capacityPct = Math.round(
                (event.registered / event.capacity) * 100
              );
              const eventDate = new Date(event.date + "T00:00:00");
              const month = eventDate.toLocaleString("en-US", {
                month: "short",
              });
              const day = eventDate.getDate();

              return (
                <Card
                  key={event.id}
                  className="hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="bg-[#8b1a1a] text-white p-3 flex items-center gap-3">
                    <div className="text-center min-w-12">
                      <div className="text-xs uppercase tracking-wider text-stone-300">
                        {month}
                      </div>
                      <div className="text-2xl font-bold">{day}</div>
                    </div>
                    <Badge className="bg-white/20 text-white border-0 text-xs">
                      {event.category}
                    </Badge>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="font-bold text-stone-900 text-lg mb-2 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-1 text-sm text-stone-600 mb-4">
                      <div className="flex items-center gap-2">
                        <span>🕐</span>
                        <span>
                          {event.time} – {event.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-stone-500 mb-1">
                        <span>{event.registered} registered</span>
                        <span>{event.capacity} capacity</span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${capacityPct}%`,
                            backgroundColor:
                              capacityPct > 80 ? "#c9a227" : "#8b1a1a",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#8b1a1a]">
                        {event.fee === 0 ? "Free" : `$${event.fee}`}
                      </span>
                      <Link href="/events">
                        <Button size="sm">Register</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/events">
              <Button variant="outline" size="lg">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Serve */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-3">
              How We Serve
            </h2>
            <p className="text-stone-500 text-lg">
              The temple serves the community in many ways
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🛕",
                title: "Temple Services",
                desc: "Book Archana, Abhishekam, Homam, and more for yourself and your family.",
                href: "/services",
                cta: "Book a Service",
              },
              {
                icon: "🎉",
                title: "Events & Festivals",
                desc: "Celebrate Hindu festivals, participate in cultural programs and community gatherings.",
                href: "/events",
                cta: "See Events",
              },
              {
                icon: "🤝",
                title: "Volunteer",
                desc: "Join our dedicated volunteer teams in kitchen, events, IT, pooja prep, and more.",
                href: "/volunteer",
                cta: "Get Involved",
              },
              {
                icon: "💛",
                title: "Donate",
                desc: "Support our campaigns — new temple building, prasadam program, youth education.",
                href: "/donations",
                cta: "Donate Now",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="text-center hover:shadow-md transition-all hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                    {item.desc}
                  </p>
                  <Link href={item.href}>
                    <Button variant="outline" size="sm" className="w-full">
                      {item.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Campaign */}
      <section
        className="py-20 px-4"
        style={{
          background: "linear-gradient(135deg, #8b1a1a 0%, #5c1111 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-white text-center">
          <div className="text-4xl mb-4">🏛️</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            New Temple Building Fund
          </h2>
          <p className="text-stone-200 text-lg mb-8 max-w-2xl mx-auto">
            Help us build a permanent, larger temple to serve our growing
            community. We have secured the land and received architectural plans.
          </p>

          <div className="bg-white/10 rounded-2xl p-8 mb-8">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-stone-200">Raised</span>
              <span className="text-stone-200">Goal</span>
            </div>
            <div className="flex justify-between font-bold text-2xl mb-3">
              <span style={{ color: "#f0c040" }}>
                {formatCurrency(mainCampaign.raised)}
              </span>
              <span>{formatCurrency(mainCampaign.goal)}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 mb-2">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${donationProgress}%`,
                  backgroundColor: "#f0c040",
                }}
              />
            </div>
            <div className="text-right text-sm text-stone-200">
              {donationProgress}% of goal reached
            </div>
          </div>

          <p className="text-stone-200 mb-6">Make a quick donation:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[51, 108, 251, 501, 1001, 2501].map((amount) => (
              <Link key={amount} href="/donations">
                <button className="px-5 py-2.5 rounded-lg font-semibold border-2 border-white/50 text-white hover:bg-white hover:text-[#8b1a1a] transition-all">
                  ${amount}
                </button>
              </Link>
            ))}
          </div>
          <Link href="/donations">
            <Button
              size="lg"
              className="bg-[#c9a227] hover:bg-[#a8851e] text-white font-semibold px-10"
            >
              View All Campaigns &amp; Donate
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[#fdfcf8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-3">
              From Our Devotees
            </h2>
            <p className="text-stone-500 text-lg">
              Hear what our community members say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name}>
                <CardContent className="p-8">
                  <div className="text-4xl text-[#c9a227] font-serif mb-4">
                    &ldquo;
                  </div>
                  <p className="text-stone-600 leading-relaxed mb-6 italic">
                    {t.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: "#8b1a1a" }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900">
                        {t.name}
                      </div>
                      <div className="text-stone-400 text-sm">{t.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Create Account */}
      <section className="py-20 px-4 bg-stone-50 border-t border-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🙏</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4">
            Join Our Community
          </h2>
          <p className="text-stone-500 text-lg mb-8 max-w-xl mx-auto">
            Create a free account to register for events, track your donations,
            book services, and stay connected with temple news and announcements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
