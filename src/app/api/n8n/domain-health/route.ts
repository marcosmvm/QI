import { NextRequest, NextResponse } from "next/server";
import { checkDomainHealth } from "@/lib/n8n";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, clientId } = body;

    if (!domain) {
      return NextResponse.json(
        { error: "Domain is required" },
        { status: 400 }
      );
    }

    const result = await checkDomainHealth(domain, clientId || "default");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Domain health check error:", error);
    return NextResponse.json(
      { error: "Failed to check domain health" },
      { status: 500 }
    );
  }
}
