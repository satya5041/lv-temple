import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, phone } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // In production, save to Supabase. For now, return success.
    const newUser = {
      id: `u_${Date.now()}`,
      email,
      firstName,
      lastName,
      phone: phone || null,
      role: "devotee",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      user: newUser,
      message: "Account created successfully! Please check your email to verify.",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
