import type {
  DomainHealthResponse,
  DNCCheckResponse,
  BuildCampaignRequest,
  BuildCampaignResponse,
} from "@/types";

const N8N_BASE_URL = process.env.N8N_BASE_URL;

class N8NApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "N8NApiError";
  }
}

async function n8nFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!N8N_BASE_URL) {
    throw new Error("N8N_BASE_URL environment variable is not configured");
  }

  const url = `${N8N_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new N8NApiError(
      `n8n API error: ${response.statusText}`,
      response.status,
      errorBody
    );
  }

  return response.json();
}

/**
 * Check domain health via Guardian engine
 */
export async function checkDomainHealth(
  domain: string,
  clientId: string
): Promise<DomainHealthResponse> {
  return n8nFetch<DomainHealthResponse>("/webhook/check-domain-health", {
    method: "POST",
    body: JSON.stringify({ domain, clientId }),
  });
}

/**
 * Check if email is on Do Not Contact list via Guardian engine
 */
export async function checkDNC(
  email: string,
  clientId: string
): Promise<DNCCheckResponse> {
  return n8nFetch<DNCCheckResponse>("/webhook/check-dnc", {
    method: "POST",
    body: JSON.stringify({ email, clientId }),
  });
}

/**
 * Build a new campaign via Architect engine
 */
export async function buildCampaign(
  request: BuildCampaignRequest
): Promise<BuildCampaignResponse> {
  return n8nFetch<BuildCampaignResponse>("/webhook/build-campaign", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/**
 * Process a positive reply via Hunter engine
 */
export async function processReply(
  replyData: {
    campaignId: string;
    leadEmail: string;
    replyContent: string;
    sentiment: "positive" | "neutral" | "negative";
  }
): Promise<{ success: boolean; nextAction: string }> {
  return n8nFetch("/webhook/instantly-reply", {
    method: "POST",
    body: JSON.stringify(replyData),
  });
}

/**
 * Process website visitor identification via Sentinel engine
 */
export async function processVisitor(
  visitorData: {
    visitorId: string;
    pageUrl: string;
    company?: string;
    ipAddress?: string;
  }
): Promise<{ identified: boolean; leadData?: Record<string, unknown> }> {
  return n8nFetch("/webhook/visitor-identified", {
    method: "POST",
    body: JSON.stringify(visitorData),
  });
}

export { N8NApiError };
