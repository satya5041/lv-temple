import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { campaign_id, amount, donor_name, donor_email, in_honor_of, notes, is_anonymous } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valid donation amount is required" }, { status: 400 })
    }

    // Get user if logged in
    const cookieStore = await cookies()
    const session = cookieStore.get("lv_session")
    let userId: string | null = null
    if (session?.value) {
      try { userId = JSON.parse(session.value).id } catch {}
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("donations")
      .insert({
        user_id: is_anonymous ? null : userId,
        campaign_id: campaign_id || null,
        amount,
        donor_name: donor_name || null,
        donor_email: donor_email || null,
        in_honor_of: in_honor_of || null,
        notes: notes || null,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data, message: "Donation recorded successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("lv_session")
    if (!session?.value) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    const user = JSON.parse(session.value)

    const supabase = createAdminClient()
    const query = user.role === "admin"
      ? supabase.from("donations").select("*, campaigns(title)").order("created_at", { ascending: false })
      : supabase.from("donations").select("*, campaigns(title)").eq("user_id", user.id).order("created_at", { ascending: false })

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data: data ?? [] })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
