import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("lv_session")
    if (!session?.value) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    const user = JSON.parse(session.value)

    const body = await req.json()
    const { service_id, booking_date, booking_time, devotee_name, nakshatra, gotra, special_intentions, amount_paid, payment_method } = body

    if (!service_id || !booking_date) {
      return NextResponse.json({ error: "service_id and booking_date are required" }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        service_id,
        user_id: user.id,
        booking_date,
        booking_time: booking_time || null,
        devotee_name: devotee_name || user.firstName,
        nakshatra: nakshatra || null,
        gotra: gotra || null,
        special_intentions: special_intentions || null,
        amount_paid: amount_paid || null,
        payment_method: payment_method || null,
        status: "pending",
      })
      .select("*, services(name)")
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data, message: "Booking created successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("lv_session")
    if (!session?.value) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    const user = JSON.parse(session.value)

    const supabase = createAdminClient()
    const query = user.role === "admin"
      ? supabase.from("bookings").select("*, services(name), profiles(first_name, last_name, email)").order("created_at", { ascending: false })
      : supabase.from("bookings").select("*, services(name)").eq("user_id", user.id).order("created_at", { ascending: false })

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data: data ?? [] })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
