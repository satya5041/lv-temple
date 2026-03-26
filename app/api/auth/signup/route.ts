import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, phone } = await request.json()

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm for now
      user_metadata: { first_name: firstName, last_name: lastName },
    })

    if (authError || !authData.user) {
      if (authError?.message?.includes("already registered")) {
        return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
      }
      return NextResponse.json({ error: authError?.message ?? "Signup failed" }, { status: 400 })
    }

    // Create profile record
    await supabase.from("profiles").insert({
      id: authData.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`,
      phone: phone || null,
      role: "devotee",
    })

    return NextResponse.json({
      success: true,
      user: { id: authData.user.id, email, firstName, lastName, role: "devotee" },
      message: "Account created successfully!",
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
