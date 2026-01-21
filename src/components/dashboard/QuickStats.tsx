import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
  change?: number;
}

interface QuickStatsProps {
  stats: StatItem[];
  className?: string;
}

export function QuickStats({ stats, className }: QuickStatsProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => (
        <div key={index} className="rounded-lg border border-border bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            {stat.label}
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-semibold text-foreground">
              {stat.value}
            </span>
            {stat.suffix && (
              <span className="text-sm text-foreground-muted">{stat.suffix}</span>
            )}
          </div>
          {stat.change !== undefined && (
            <span
              className={cn(
                "text-xs font-medium",
                stat.change > 0
                  ? "text-success"
                  : stat.change < 0
                  ? "text-error"
                  : "text-foreground-muted"
              )}
            >
              {stat.change > 0 ? "+" : ""}
              {stat.change}%
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
