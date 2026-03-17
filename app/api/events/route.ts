import { NextRequest, NextResponse } from "next/server";
import { UPCOMING_EVENTS } from "@/lib/data/mock";

// GET /api/events - return all events
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");

  let events = UPCOMING_EVENTS;

  if (category && category !== "All") {
    events = events.filter((e) => e.category === category);
  }

  if (limit) {
    const n = parseInt(limit, 10);
    if (!isNaN(n) && n > 0) {
      events = events.slice(0, n);
    }
  }

  return NextResponse.json({
    data: events,
    total: events.length,
    timestamp: new Date().toISOString(),
  });
}

// POST /api/events - create a new event (admin only)
export async function POST(req: NextRequest) {
  try {
    // In production: verify admin auth token here
    const body = await req.json();

    const {
      title,
      category,
      date,
      time,
      endTime,
      description,
      location,
      capacity,
      fee,
    } = body;

    if (!title || !category || !date || !time || !description || !location) {
      return NextResponse.json(
        { error: "Missing required fields: title, category, date, time, description, location" },
        { status: 400 }
      );
    }

    // In production: insert into Supabase
    const newEvent = {
      id: `evt-${Date.now()}`,
      title,
      category,
      date,
      time,
      endTime: endTime || time,
      description,
      location,
      capacity: capacity || 100,
      registered: 0,
      fee: fee || 0,
      sponsorshipAvailable: false,
      image: null,
      tags: [category],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { data: newEvent, message: "Event created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
