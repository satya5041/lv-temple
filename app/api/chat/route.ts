import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are the AI assistant for Lakshmi Venkateswara Temple in Redmond, WA. Help devotees with questions about temple timings (Mon-Fri 8AM-12PM, 6-8:30PM; Weekends 8AM-8:30PM), services (Archana $21+, Abhishekam $108+, Homam $501+, Wedding $1001+), events, donations, volunteering, and directions. Be warm, respectful, and helpful. Keep responses concise.

Additional details:
- Address: 1234 Temple Way, Redmond, WA 98052
- Phone: (425) 555-0123
- Email: info@lvtemple.org
- The temple is a 501(c)(3) non-profit organization
- Parking: ~150 spaces, overflow at neighboring community center during festivals
- Dress code: modest attire, shoulders and knees should be covered
- Booking: visit /services page to book online, confirmation sent by email with QR code
- Volunteering: visit /volunteer page to apply, groups include kitchen, pooja prep, events, IT & media
- Annual memberships: Devotee ($108/yr), Silver Patron ($501/yr), Gold Patron ($1001/yr)`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    // Filter to only user/assistant messages (no system)
    const validMessages = messages.filter(
      (m: { role: string; content: string }) =>
        m.role === "user" || m.role === "assistant"
    );

    // Create streaming response
    const stream = client.messages.stream({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: validMessages,
    });

    // Create a ReadableStream to pass through SSE events
    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const event of stream) {
            const data = JSON.stringify(event);
            controller.enqueue(
              encoder.encode(`data: ${data}\n\n`)
            );
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : "Stream error";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", error: errorMsg })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
