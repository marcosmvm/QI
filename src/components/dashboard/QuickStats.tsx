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
        <div key={index} className="rounded-xl border border-graphite bg-midnight-blue/60 backdrop-blur-sm p-4 hover:border-electric-cyan/30 transition-colors">
          <p className="text-xs font-medium uppercase tracking-wide text-steel">
            {stat.label}
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-semibold text-white">
              {stat.value}
            </span>
            {stat.suffix && (
              <span className="text-sm text-steel">{stat.suffix}</span>
            )}
          </div>
          {stat.change !== undefined && (
            <span
              className={cn(
                "text-xs font-medium",
                stat.change > 0
                  ? "text-neon-mint"
                  : stat.change < 0
                  ? "text-error"
                  : "text-steel"
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
