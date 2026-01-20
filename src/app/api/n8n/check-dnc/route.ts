import { NextRequest, NextResponse } from "next/server";
import { checkDNC } from "@/lib/n8n";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, clientId } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const result = await checkDNC(email, clientId || "default");

    return NextResponse.json(result);
  } catch (error) {
    console.error("DNC check error:", error);
    return NextResponse.json(
      { error: "Failed to check DNC status" },
      { status: 500 }
    );
  }
}
