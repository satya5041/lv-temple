import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BLOG_POSTS = [
  {
    id: "1",
    title: "Sri Rama Navami 2026 — A Day of Divine Celebration",
    excerpt:
      "This year's Sri Rama Navami was a magnificent celebration attended by over 400 devotees. Read about the special poojas, cultural programs, and the beautiful procession.",
    date: "March 10, 2026",
    category: "Festival",
    readTime: "3 min read",
  },
  {
    id: "2",
    title: "Youth Samskruta (Sanskrit) Classes — Registration Open",
    excerpt:
      "Our popular Sanskrit classes for children (ages 6–16) are now open for the Spring 2026 session. Limited seats available. Learn the language of the Vedas.",
    date: "March 5, 2026",
    category: "Education",
    readTime: "2 min read",
  },
  {
    id: "3",
    title: "New Temple Building Fund Reaches 62% of Goal",
    excerpt:
      "We are thrilled to announce that our New Temple Building Fund has reached $1.24 million — 62% of our $2 million goal. Thank you to all our generous donors.",
    date: "February 28, 2026",
    category: "Announcement",
    readTime: "2 min read",
  },
];

const FACEBOOK_POSTS = [
  {
    id: "1",
    text: "🙏 Beautiful Abhishekam ceremony this morning. Thank you to all the devotees who joined us. Jai Sri Venkateswara! #LVTemple #Abhishekam",
    date: "2 hours ago",
    likes: 47,
  },
  {
    id: "2",
    text: "📢 Reminder: Ugadi Telugu New Year celebrations on March 29th! Free entry. Panchanga Sravanam at 9 AM. Cultural programs in the evening. All are welcome! 🌸",
    date: "Yesterday",
    likes: 112,
  },
  {
    id: "3",
    text: "❤️ Annadanam (free meal) served to 250 devotees last Sunday. A big thank you to our Kitchen Seva team. #Annadanam #Seva",
    date: "3 days ago",
    likes: 93,
  },
];

const GALLERY_EVENTS = [
  { label: "Maha Shivaratri 2026", color: "bg-blue-200" },
  { label: "Diwali 2025", color: "bg-orange-200" },
  { label: "Navaratri 2025", color: "bg-pink-200" },
  { label: "Krishna Janmashtami", color: "bg-yellow-200" },
  { label: "Ugadi 2025", color: "bg-green-200" },
  { label: "Sri Rama Navami 2025", color: "bg-purple-200" },
  { label: "Annual Day 2025", color: "bg-red-200" },
  { label: "Youth Cultural Show", color: "bg-teal-200" },
  { label: "Hanuman Jayanti", color: "bg-amber-200" },
];

export default function CommunityPage() {
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
            🎬
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Community &amp; Media
          </h1>
          <p className="text-stone-200 text-xl max-w-2xl mx-auto">
            Watch ceremonies live, explore our photo gallery, and stay connected
            with temple news and social updates.
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

      {/* YouTube Playlist */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#8b1a1a] mb-2">
                Video Gallery
              </h2>
              <p className="text-stone-500">
                Watch recorded ceremonies, cultural programs, and special events
              </p>
            </div>
            <a
              href="https://youtube.com/@lvtemple"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90" style={{ backgroundColor: "#FF0000" }}>
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube Channel
              </button>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Sri Rama Navami Celebrations 2026",
                duration: "2:34:12",
                views: "1.2K",
                thumb: "bg-gradient-to-br from-blue-800 to-blue-600",
              },
              {
                title: "Maha Shivaratri Special Abhishekam",
                duration: "1:12:45",
                views: "890",
                thumb: "bg-gradient-to-br from-purple-800 to-purple-600",
              },
              {
                title: "Ugadi 2026 — Panchanga Sravanam",
                duration: "45:22",
                views: "672",
                thumb: "bg-gradient-to-br from-green-800 to-green-600",
              },
              {
                title: "Diwali 2025 Full Celebration",
                duration: "3:15:00",
                views: "2.4K",
                thumb: "bg-gradient-to-br from-orange-700 to-yellow-600",
              },
              {
                title: "Youth Cultural Program 2025",
                duration: "1:45:30",
                views: "1.8K",
                thumb: "bg-gradient-to-br from-pink-700 to-red-600",
              },
              {
                title: "Satyanarayana Vratha Katha",
                duration: "58:10",
                views: "445",
                thumb: "bg-gradient-to-br from-teal-800 to-teal-600",
              },
            ].map((video) => (
              <Card
                key={video.title}
                className="overflow-hidden hover:shadow-md transition-all cursor-pointer group"
              >
                <div
                  className={`${video.thumb} h-40 relative flex items-center justify-center`}
                >
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
                    <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[18px] border-transparent border-l-white ml-1" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-stone-900 text-sm leading-tight mb-1">
                    {video.title}
                  </h4>
                  <p className="text-stone-400 text-xs">{video.views} views</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Streaming */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <Card
            className="overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            }}
          >
            <CardContent className="p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Live Streaming</h3>
                  <p className="text-stone-300 mb-4">
                    We stream all major festivals and special events live on
                    YouTube. Subscribe to get notified when we go live.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold mb-1">Next Live Stream</div>
                      <div className="text-stone-300">Ugadi — March 29, 2026</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold mb-1">Platform</div>
                      <div className="text-stone-300">YouTube Live</div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="https://youtube.com/@lvtemple"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "#FF0000" }}
                  >
                    Subscribe
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-3">
              Photo Gallery
            </h2>
            <p className="text-stone-500">
              Glimpses of our temple celebrations and community events
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {GALLERY_EVENTS.map((item, idx) => (
              <div
                key={item.label}
                className={`${item.color} relative rounded-xl overflow-hidden group cursor-pointer ${
                  idx === 0 ? "col-span-2 row-span-2" : ""
                }`}
                style={{ height: idx === 0 ? "300px" : "140px" }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end">
                  <div className="w-full p-3 opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                      {item.label}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-50">
                  <span className="text-4xl">
                    {idx % 3 === 0 ? "🛕" : idx % 3 === 1 ? "🙏" : "🪔"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Feeds */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-3">
              Social Media
            </h2>
            <p className="text-stone-500">Follow us for daily updates</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {FACEBOOK_POSTS.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "#1877F2" }}
                    >
                      f
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900">
                        LV Temple
                      </div>
                      <div className="text-xs text-stone-400">{post.date}</div>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-3">
                    {post.text}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-stone-400">
                    <span>👍 {post.likes} likes</span>
                    <span>💬 Comment</span>
                    <span>↗ Share</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://facebook.com/lvtemple"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium text-sm"
                  style={{ backgroundColor: "#1877F2" }}
                >
                  Follow on Facebook
                </button>
              </a>
              <a
                href="https://instagram.com/lvtemple"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium text-sm"
                  style={{
                    background:
                      "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  }}
                >
                  Follow on Instagram
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / News */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#8b1a1a] mb-2">
                Latest News
              </h2>
              <p className="text-stone-500">
                Temple announcements and community updates
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-stone-100 text-stone-700 border-0 text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-stone-400 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-lg mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 text-xs">{post.date}</span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#8b1a1a" }}
                    >
                      Read more →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
