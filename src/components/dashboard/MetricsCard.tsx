import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { type MetricStatus } from "@/types";

interface MetricsCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  status?: MetricStatus;
  icon?: LucideIcon;
  className?: string;
}

export function MetricsCard({
  title,
  value,
  suffix = "",
  change,
  changeLabel = "vs last week",
  className,
}: MetricsCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-white p-6",
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
        {title}
      </p>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-foreground">
          {value}
        </span>
        {suffix && (
          <span className="text-sm text-foreground-muted">{suffix}</span>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium",
              change > 0
                ? "text-success"
                : change < 0
                ? "text-error"
                : "text-foreground-muted"
            )}
          >
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-foreground-muted">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}
