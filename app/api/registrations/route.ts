import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { event_id, guest_count, special_notes, donor_name, donor_email } = body

    if (!event_id) {
      return NextResponse.json({ error: "event_id is required" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Try to get logged-in user
    const cookieStore = await cookies()
    const session = cookieStore.get("lv_session")
    let userId: string | null = null
    if (session?.value) {
      try { userId = JSON.parse(session.value).id } catch {}
    }

    // If not logged in, look up or create a guest profile
    if (!userId) {
      if (!donor_email) {
        return NextResponse.json({ error: "Email is required to register" }, { status: 400 })
      }
      // Check if profile exists
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", donor_email)
        .single()

      if (existing) {
        userId = existing.id
      } else {
        // Create guest auth user + profile
        const { data: authUser } = await supabase.auth.admin.createUser({
          email: donor_email,
          email_confirm: true,
          user_metadata: { first_name: donor_name?.split(" ")[0] ?? "", last_name: donor_name?.split(" ").slice(1).join(" ") ?? "" },
        })
        if (authUser?.user) {
          userId = authUser.user.id
          await supabase.from("profiles").insert({
            id: userId,
            email: donor_email,
            full_name: donor_name ?? donor_email,
            first_name: donor_name?.split(" ")[0] ?? "",
            last_name: donor_name?.split(" ").slice(1).join(" ") ?? "",
            role: "devotee",
          })
        }
      }
    }

    if (!userId) {
      return NextResponse.json({ error: "Could not identify user" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("registrations")
      .insert({ event_id, user_id: userId, guest_count: guest_count ?? 1, special_notes: special_notes ?? null, status: "registered" })
      .select("*, events(title, event_date, start_time, location)")
      .single()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "You are already registered for this event" }, { status: 409 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, message: "Registration successful" }, { status: 201 })
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
    const { data, error } = await supabase
      .from("registrations")
      .select("*, events(title, event_date, start_time, location)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data: data ?? [] })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
