import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, user: null },
        { status: 401 }
      );
    }

    const session = JSON.parse(sessionCookie.value);

    return NextResponse.json({
      success: true,
      user: session,
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { success: false, user: null },
      { status: 500 }
    );
  }
}
