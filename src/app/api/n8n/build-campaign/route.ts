import { NextRequest, NextResponse } from "next/server";
import { buildCampaign } from "@/lib/n8n";
import { type BuildCampaignRequest } from "@/types";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body: BuildCampaignRequest = await request.json();

    // Validate required fields
    const requiredFields = [
      "clientId",
      "campaignName",
      "targetIndustry",
      "targetRole",
      "valueProposition",
      "callToAction",
    ] as const;

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const result = await buildCampaign(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Build campaign error:", error);
    return NextResponse.json(
      { error: "Failed to build campaign" },
      { status: 500 }
    );
  }
}
