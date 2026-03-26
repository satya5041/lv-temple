import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { first_name, last_name, email, phone, group_slug, availability, skills } = body

    if (!first_name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Look up or create profile
    let userId: string | null = null
    const { data: existing } = await supabase.from("profiles").select("id").eq("email", email).single()

    if (existing) {
      userId = existing.id
    } else {
      const { data: authUser } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { first_name, last_name: last_name ?? "" },
      })
      if (authUser?.user) {
        userId = authUser.user.id
        await supabase.from("profiles").insert({
          id: userId, email, first_name, last_name: last_name ?? "",
          full_name: `${first_name} ${last_name ?? ""}`.trim(), phone: phone ?? null, role: "devotee",
        })
      }
    }

    if (!userId) return NextResponse.json({ error: "Could not identify user" }, { status: 400 })

    // Get group id from slug
    let groupId: string | null = null
    if (group_slug && group_slug !== "any") {
      const { data: group } = await supabase.from("volunteer_groups").select("id").eq("slug", group_slug).single()
      groupId = group?.id ?? null
    }

    // Check if already a volunteer
    const { data: existingVolunteer } = await supabase
      .from("volunteers").select("id").eq("user_id", userId).single()

    if (existingVolunteer) {
      return NextResponse.json({ error: "You have already applied to volunteer" }, { status: 409 })
    }

    const { data, error } = await supabase.from("volunteers").insert({
      user_id: userId,
      group_id: groupId,
      availability: availability ?? null,
      skills: skills ?? null,
      status: "pending",
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data, message: "Volunteer application received" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
