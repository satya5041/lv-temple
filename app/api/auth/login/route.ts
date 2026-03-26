import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Sign in via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Fetch profile for role
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, first_name, last_name, role")
      .eq("id", authData.user.id)
      .single()

    const user = {
      id: authData.user.id,
      email: authData.user.email!,
      firstName: profile?.first_name ?? "",
      lastName: profile?.last_name ?? "",
      role: profile?.role ?? "devotee",
    }

    const response = NextResponse.json({ success: true, user, message: "Login successful" })

    // Set session cookie (used by middleware for admin route protection)
    response.cookies.set("lv_session", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    // Also set Supabase access token for client-side SDK
    response.cookies.set("sb-access-token", authData.session!.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
