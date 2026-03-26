import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Role is stored in app_metadata — available directly from auth, no extra DB query
    const meta = authData.user.user_metadata ?? {}
    const appMeta = authData.user.app_metadata ?? {}

    const user = {
      id: authData.user.id,
      email: authData.user.email!,
      firstName: meta.first_name ?? "",
      lastName: meta.last_name ?? "",
      role: (appMeta.role as string) ?? "devotee",
    }

    const response = NextResponse.json({ success: true, user, message: "Login successful" })

    response.cookies.set("lv_session", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    response.cookies.set("sb-access-token", authData.session!.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
