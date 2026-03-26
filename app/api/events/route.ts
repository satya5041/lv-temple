import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const limit = searchParams.get("limit")

  const supabase = createAdminClient()

  let query = supabase
    .from("events")
    .select("*, registered_count:registrations(count)")
    .eq("is_active", true)
    .order("event_date", { ascending: true })

  if (category && category !== "All") {
    query = query.eq("category", category)
  }

  if (limit) {
    const n = parseInt(limit, 10)
    if (!isNaN(n) && n > 0) query = query.limit(n)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: data ?? [], total: data?.length ?? 0 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, category, event_date, start_time, end_time, description, location, capacity, fee } = body

    if (!title || !category || !event_date || !start_time || !description || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("events")
      .insert({ title, category, event_date, start_time, end_time, description, location, capacity: capacity ?? 100, fee: fee ?? 0 })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data, message: "Event created successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
