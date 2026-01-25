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

// Brand Board v1.0 - Stat Card Pattern
export function QuickStats({ stats, className }: QuickStatsProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-light-bg-secondary dark:bg-midnight-blue border border-border-default dark:border-graphite rounded-xl p-6">
          <p className="text-sm text-slate-700 dark:text-slate-400 font-medium uppercase tracking-wide">
            {stat.label}
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-metric-lg font-bold text-slate-900 dark:text-white">
              {stat.value}
            </span>
            {stat.suffix && (
              <span className="text-sm text-slate-700 dark:text-slate-400">{stat.suffix}</span>
            )}
          </div>
          {stat.change !== undefined && (
            <span
              className={cn(
                "text-sm mt-1",
                stat.change > 0
                  ? "text-emerald-pro-400"
                  : stat.change < 0
                  ? "text-alert-red"
                  : "text-slate-700 dark:text-slate-400"
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
