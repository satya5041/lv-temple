"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FAQ_DATA } from "@/lib/data/mock";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! I'm the LV Temple AI assistant. Ask me anything about temple timings, services, events, or how to donate.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      if (!response.body) throw new Error("No response body");

      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                fullText += parsed.delta.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: fullText,
                  };
                  return updated;
                });
              }
            } catch {
              // ignore parse errors for non-JSON lines
            }
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please call us at (425) 555-0123 or email info@lvtemple.org for assistance.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 z-50 shadow-2xl rounded-2xl overflow-hidden border border-stone-200">
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 text-white"
            style={{ backgroundColor: "#8b1a1a" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                🤖
              </div>
              <div>
                <div className="font-semibold text-sm">LV Temple Assistant</div>
                <div className="text-xs text-stone-300">
                  {isLoading ? "Typing..." : "Online"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white text-xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="bg-white h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1"
                    style={{ backgroundColor: "#8b1a1a", color: "white" }}
                  >
                    ॐ
                  </div>
                )}
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-stone-100 text-stone-800 rounded-bl-sm"
                  }`}
                  style={
                    msg.role === "user"
                      ? { backgroundColor: "#8b1a1a" }
                      : {}
                  }
                >
                  {msg.content}
                  {msg.role === "assistant" && isLoading && idx === messages.length - 1 && msg.content === "" && (
                    <span className="inline-flex gap-1 ml-1">
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-stone-200 p-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about timings, services..."
              className="text-sm"
              disabled={isLoading}
            />
            <Button
              size="sm"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0"
            >
              Send
            </Button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#8b1a1a" }}
        aria-label="Open chat"
      >
        {isOpen ? "×" : "💬"}
      </button>
    </>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStep, setFormStep] = useState<"idle" | "loading" | "success">("idle");
  // Keep submitted as alias for backward compat with JSX below
  const submitted = formStep === "success";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setFormStep("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setFormStep("success");
  };

  const handleReset = () => {
    setFormStep("idle");
    setFormData({ name: "", email: "", subject: "", message: "" });
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
            📞
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact &amp; Help
          </h1>
          <p className="text-stone-200 text-xl max-w-2xl mx-auto">
            We are here to help. Reach us by phone, email, or chat with our AI
            assistant for instant answers.
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

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              {
                icon: "📍",
                title: "Address",
                lines: ["1234 Temple Way", "Redmond, WA 98052"],
                action: "Get Directions",
                href: "https://maps.google.com",
              },
              {
                icon: "📞",
                title: "Phone",
                lines: ["(425) 555-0123", "Mon–Sat: 9AM–5PM"],
                action: "Call Now",
                href: "tel:+14255550123",
              },
              {
                icon: "✉️",
                title: "Email",
                lines: ["info@lvtemple.org", "Response within 24 hrs"],
                action: "Send Email",
                href: "mailto:info@lvtemple.org",
              },
              {
                icon: "🕐",
                title: "Temple Hours",
                lines: ["Mon–Fri: 8AM–12PM, 6–8:30PM", "Weekends: 8AM–8:30PM"],
                action: null,
                href: null,
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="text-center hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-2">{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-stone-500 text-sm">
                      {line}
                    </p>
                  ))}
                  {item.action && item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm font-medium"
                      style={{ color: "#8b1a1a" }}
                    >
                      {item.action} →
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Map Placeholder */}
            <div>
              <h2 className="text-2xl font-bold text-[#8b1a1a] mb-4">
                Find Us
              </h2>
              <div
                className="w-full h-72 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center"
                style={{ backgroundColor: "#e8e8e8" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86347.89!2d-122.12!3d47.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906d0d486e5999%3A0x78e7f4d60c6a3568!2sRedmond%2C%20WA!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Temple Location"
                />
              </div>
              <p className="text-stone-400 text-xs mt-2 text-center">
                1234 Temple Way, Redmond, WA 98052
              </p>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#8b1a1a] mb-4">
                Send a Message
              </h2>
              {formStep === "loading" ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div
                      className="w-12 h-12 border-4 border-stone-200 rounded-full mx-auto mb-4 animate-spin"
                      style={{ borderTopColor: "#8b1a1a" }}
                    />
                    <p className="text-stone-600 font-medium">Sending your message...</p>
                  </CardContent>
                </Card>
              ) : submitted ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-3">✅</div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-stone-500 mb-6">
                      We&apos;ll get back to you within 24 hours at{" "}
                      <strong>{formData.email}</strong>.
                    </p>
                    <Button variant="outline" onClick={handleReset}>
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                          Name *
                        </label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                          Email *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((f) => ({
                              ...f,
                              email: e.target.value,
                            }))
                          }
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                          Subject *
                        </label>
                        <Input
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData((f) => ({
                              ...f,
                              subject: e.target.value,
                            }))
                          }
                          placeholder="e.g., Booking inquiry, Volunteer question..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                          Message *
                        </label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((f) => ({
                              ...f,
                              message: e.target.value,
                            }))
                          }
                          placeholder="How can we help you?"
                          className="flex w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm min-h-28 resize-y focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={!formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-500">
              Quick answers to common questions. Use our AI chat for anything
              else!
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-xl border border-stone-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-stone-50 transition-colors">
                  <span className="font-medium text-stone-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-stone-300 flex items-center justify-center text-stone-400 text-xs font-bold group-open:border-[#8b1a1a] group-open:text-[#8b1a1a] transition-colors">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:block">−</span>
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Widget */}
      <AIChatWidget />
    </main>
  );
}
