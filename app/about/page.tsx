import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEITIES } from "@/lib/data/mock";

const PRIESTS = [
  {
    name: "Sri Venkatachalam Sharma",
    title: "Head Priest (Archakar)",
    experience: "25+ years",
    specialization: "Vaikhanasa Agama, Pancharatra",
    initials: "VS",
  },
  {
    name: "Sri Narasimha Bhattacharya",
    title: "Senior Priest",
    experience: "18+ years",
    specialization: "Vedic rituals, Homams",
    initials: "NB",
  },
  {
    name: "Sri Ramakrishna Dikshitar",
    title: "Priest",
    experience: "10+ years",
    specialization: "Archana, Abhishekam, Poojas",
    initials: "RD",
  },
];

const TIMELINE = [
  {
    year: "2003",
    title: "Temple Founded",
    desc: "A small group of 50 families came together to establish the LV Temple in a rented hall in Redmond.",
  },
  {
    year: "2007",
    title: "First Permanent Location",
    desc: "Moved to a dedicated facility at the current address. Installed the consecrated murti of Lord Venkateswara.",
  },
  {
    year: "2010",
    title: "Sri Lakshmi Devi Shrine Added",
    desc: "Expanded the temple with a dedicated shrine for Sri Lakshmi Devi and Sri Andal.",
  },
  {
    year: "2015",
    title: "Community Hall Inaugurated",
    desc: "Opened a 300-seat community hall for cultural programs, weddings, and community events.",
  },
  {
    year: "2019",
    title: "5,000+ Devotee Milestone",
    desc: "Reached a milestone of 5,000 registered devotee families across the Pacific Northwest.",
  },
  {
    year: "2023",
    title: "New Temple Land Acquired",
    desc: "Secured 5 acres of land for a permanent, larger temple complex. Architectural plans completed.",
  },
];

const DEITY_COLORS = [
  "from-blue-900 to-blue-700",
  "from-yellow-700 to-yellow-500",
  "from-green-800 to-green-600",
];

export default function AboutPage() {
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
            Our Temple, Our Story
          </h1>
          <p className="text-stone-200 text-xl max-w-2xl mx-auto leading-relaxed">
            Over 20 years of devotion, community, and service in the heart of
            the Pacific Northwest.
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

      {/* History & Mission */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#8b1a1a] mb-6">
                Our History
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Lakshmi Venkateswara Temple was founded in 2003 by a small
                  group of devoted Hindu families from the Redmond and Eastside
                  Seattle area. What began as weekly prayers in a rented
                  community hall has grown into the spiritual heart of over 5,000
                  Hindu families across the Pacific Northwest.
                </p>
                <p>
                  Our temple follows the ancient Vaikhanasa Agama tradition,
                  with daily rituals (nitya seva) conducted by trained priests
                  who have received their training from renowned temples in India.
                  We are committed to preserving the richness of Vedic traditions
                  while serving a modern, diverse community.
                </p>
                <p>
                  Today, the temple is a 501(c)(3) non-profit organization
                  governed by a board of trustees elected from the community.
                  We are actively fundraising for a new, permanent temple
                  complex to serve our growing congregation.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#8b1a1a] mb-6">
                Our Mission
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: "🙏",
                    title: "Preserve Tradition",
                    desc: "Conduct authentic Vedic rituals and services according to the Vaikhanasa Agama tradition.",
                  },
                  {
                    icon: "🤝",
                    title: "Build Community",
                    desc: "Foster a welcoming, inclusive community for all Hindus and spiritual seekers.",
                  },
                  {
                    icon: "🎓",
                    title: "Educate Youth",
                    desc: "Teach the next generation about Hindu culture, Sanskrit, and spiritual values.",
                  },
                  {
                    icon: "💚",
                    title: "Serve Society",
                    desc: "Give back through food service, community outreach, and charitable activities.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 p-4 bg-stone-50 rounded-xl"
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-stone-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-stone-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Presiding Deities */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-3">
              Our Presiding Deities
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Three divine presences who bless our temple and all who come to
              worship here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DEITIES.map((deity, idx) => (
              <Card
                key={deity.name}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className={`bg-gradient-to-br ${DEITY_COLORS[idx]} h-48 flex items-center justify-center`}
                >
                  <span className="text-8xl opacity-80">
                    {idx === 0 ? "🔱" : idx === 1 ? "🌸" : "🌿"}
                  </span>
                </div>
                <CardContent className="p-6">
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "#c9a227" }}
                  >
                    {deity.title}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">
                    {deity.name}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {deity.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Priests */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-3">
              Our Priests
            </h2>
            <p className="text-stone-500 text-lg">
              Trained in the traditional Vaikhanasa Agama, our priests conduct
              all rituals with devotion and precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRIESTS.map((priest) => (
              <Card
                key={priest.name}
                className="text-center hover:shadow-md transition-shadow"
              >
                <CardContent className="p-8">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4"
                    style={{ backgroundColor: "#8b1a1a" }}
                  >
                    {priest.initials}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-1">
                    {priest.name}
                  </h3>
                  <div
                    className="text-sm font-medium mb-3"
                    style={{ color: "#c9a227" }}
                  >
                    {priest.title}
                  </div>
                  <div className="space-y-2 text-sm text-stone-500">
                    <div className="flex items-center justify-center gap-2">
                      <span>⏱</span>
                      <span>{priest.experience} experience</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span>📚</span>
                      <span>{priest.specialization}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Temple Timeline */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-3">
              Temple Timeline
            </h2>
            <p className="text-stone-500 text-lg">
              Key milestones in our journey of devotion and growth.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 -translate-x-1/2" />

            <div className="space-y-8">
              {TIMELINE.map((item, idx) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 ${
                    idx % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`hidden md:block w-5/12 ${
                      idx % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "#c9a227" }}
                    >
                      {item.year}
                    </div>
                    <h4 className="font-bold text-stone-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative z-10 flex-shrink-0 w-16 h-16 hidden md:flex items-center justify-center">
                    <div
                      className="w-5 h-5 rounded-full border-4 border-white"
                      style={{ backgroundColor: "#8b1a1a" }}
                    />
                  </div>

                  <div className="hidden md:block w-5/12" />

                  {/* Mobile layout */}
                  <div className="flex md:hidden gap-4 pl-16 relative">
                    <div
                      className="absolute left-6 top-3 w-4 h-4 rounded-full border-4 border-white z-10"
                      style={{ backgroundColor: "#8b1a1a" }}
                    />
                    <div>
                      <div
                        className="text-xl font-bold mb-1"
                        style={{ color: "#c9a227" }}
                      >
                        {item.year}
                      </div>
                      <h4 className="font-bold text-stone-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-stone-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section
        className="py-20 px-4 text-white"
        style={{
          background: "linear-gradient(135deg, #8b1a1a 0%, #c9a227 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🎥</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Take a Virtual Tour
          </h2>
          <p className="text-stone-200 text-lg mb-8 max-w-xl mx-auto">
            Can&apos;t visit us in person? Explore the temple from the comfort of
            your home with our virtual tour and recorded ceremony videos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/community">
              <Button size="lg" variant="white" className="w-full sm:w-auto">
                Watch Videos &amp; Live Streams
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#8b1a1a]"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
