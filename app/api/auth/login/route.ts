import { NextRequest, NextResponse } from "next/server";

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "u1",
    email: "devotee@lvtemple.org",
    password: "temple123",
    firstName: "Priya",
    lastName: "Sharma",
    role: "devotee",
  },
  {
    id: "admin1",
    email: "admin@lvtemple.org",
    password: "admin123",
    firstName: "Temple",
    lastName: "Admin",
    role: "admin",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: "Login successful",
    });

    // Set session cookie
    response.cookies.set("lv_session", JSON.stringify(userWithoutPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
