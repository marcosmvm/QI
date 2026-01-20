// Campaign types
export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "completed";
  createdAt: string;
  updatedAt: string;
  metrics: CampaignMetrics;
}

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  replied: number;
  bounced: number;
  complaints: number;
  deliverabilityRate: number;
  openRate: number;
  replyRate: number;
  bounceRate: number;
  complaintRate: number;
}

// Domain health types
export interface DomainHealthResponse {
  score: number;
  eligible: boolean;
  domainAge: number;
  hasMX: boolean;
  hasSPF: boolean;
  hasDKIM: boolean;
  onBlacklist: boolean;
}

// DNC check types
export interface DNCCheckResponse {
  email: string;
  isOnDNC: boolean;
  reason?: string;
}

// Build campaign types
export interface BuildCampaignRequest {
  clientId: string;
  campaignName: string;
  targetIndustry: string;
  targetRole: string;
  valueProposition: string;
  callToAction: string;
}

export interface BuildCampaignResponse {
  success: boolean;
  campaignId: string;
  sequences: EmailSequence[];
}

export interface EmailSequence {
  step: number;
  subject: string;
  body: string;
  delay: number;
}

// Engine status types
export type EngineName = "Guardian" | "Architect" | "Scientist" | "Hunter" | "Sentinel";

export interface EngineStatus {
  name: EngineName;
  codename: string;
  status: "operational" | "degraded" | "offline";
  lastCheck: string;
  metrics?: Record<string, number>;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  role: "admin" | "user";
  createdAt: string;
}

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  deliverability: { target: 90, warning: 85, critical: 85 },
  openRate: { target: 30, warning: 15, critical: 15 },
  replyRate: { target: 3, warning: 1, critical: 1 },
  bounceRate: { target: 2, warning: 5, critical: 5 },
  complaintRate: { target: 0.05, warning: 0.1, critical: 0.1 },
} as const;

export type MetricStatus = "success" | "warning" | "critical";

export function getMetricStatus(
  metric: keyof typeof PERFORMANCE_THRESHOLDS,
  value: number
): MetricStatus {
  const threshold = PERFORMANCE_THRESHOLDS[metric];

  // For bounce and complaint rates, lower is better
  if (metric === "bounceRate" || metric === "complaintRate") {
    if (value <= threshold.target) return "success";
    if (value <= threshold.warning) return "warning";
    return "critical";
  }

  // For other metrics, higher is better
  if (value >= threshold.target) return "success";
  if (value >= threshold.warning) return "warning";
  return "critical";
}
