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
        "rounded-xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6",
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-steel">
        {title}
      </p>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-white">
          {value}
        </span>
        {suffix && (
          <span className="text-sm text-steel">{suffix}</span>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium",
              change > 0
                ? "text-neon-mint"
                : change < 0
                ? "text-energy-orange"
                : "text-steel"
            )}
          >
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-steel">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}
