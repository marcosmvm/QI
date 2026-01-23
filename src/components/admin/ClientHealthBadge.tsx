import { cn } from "@/lib/utils";

type HealthLevel = "healthy" | "warning" | "critical" | "unknown";

interface ClientHealthBadgeProps {
  score: number | null;
  showScore?: boolean;
  size?: "sm" | "md";
  className?: string;
}

function getHealthLevel(score: number | null): HealthLevel {
  if (score === null) return "unknown";
  if (score >= 80) return "healthy";
  if (score >= 60) return "warning";
  return "critical";
}

const healthStyles: Record<HealthLevel, string> = {
  healthy: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
  warning: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
  critical: "bg-red-500/10 text-red-400 border-red-500/30",
  unknown: "bg-steel/10 text-light-text-muted dark:text-steel border-steel/30",
};

const healthLabels: Record<HealthLevel, string> = {
  healthy: "Healthy",
  warning: "At Risk",
  critical: "Critical",
  unknown: "N/A",
};

const dotStyles: Record<HealthLevel, string> = {
  healthy: "bg-emerald-pro-400",
  warning: "bg-energy-orange",
  critical: "bg-red-400",
  unknown: "bg-steel",
};

export function ClientHealthBadge({
  score,
  showScore = true,
  size = "md",
  className,
}: ClientHealthBadgeProps) {
  const healthLevel = getHealthLevel(score);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        healthStyles[healthLevel],
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      <span
        className={cn(
          "rounded-full",
          dotStyles[healthLevel],
          size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2"
        )}
      />
      {showScore && score !== null ? (
        <span>{score}</span>
      ) : (
        <span>{healthLabels[healthLevel]}</span>
      )}
    </span>
  );
}

// Utility function to calculate health score from metrics
export function calculateHealthScore(metrics: {
  deliverabilityRate?: number | null;
  openRate?: number | null;
  replyRate?: number | null;
  bounceRate?: number | null;
}): number | null {
  const { deliverabilityRate, openRate, replyRate, bounceRate } = metrics;

  // If no metrics available, return null
  if (
    deliverabilityRate === null &&
    openRate === null &&
    replyRate === null &&
    bounceRate === null
  ) {
    return null;
  }

  let score = 0;
  let factors = 0;

  // Deliverability: target >90%, warning 85%, critical <85%
  if (deliverabilityRate !== null && deliverabilityRate !== undefined) {
    if (deliverabilityRate >= 90) score += 100;
    else if (deliverabilityRate >= 85) score += 70;
    else score += 30;
    factors++;
  }

  // Open rate: target >30%, warning 15%, critical <15%
  if (openRate !== null && openRate !== undefined) {
    if (openRate >= 30) score += 100;
    else if (openRate >= 15) score += 70;
    else score += 30;
    factors++;
  }

  // Reply rate: target >3%, warning 1%, critical <1%
  if (replyRate !== null && replyRate !== undefined) {
    if (replyRate >= 3) score += 100;
    else if (replyRate >= 1) score += 70;
    else score += 30;
    factors++;
  }

  // Bounce rate: target <2%, warning 5%, critical >5%
  if (bounceRate !== null && bounceRate !== undefined) {
    if (bounceRate <= 2) score += 100;
    else if (bounceRate <= 5) score += 70;
    else score += 30;
    factors++;
  }

  if (factors === 0) return null;

  return Math.round(score / factors);
}
