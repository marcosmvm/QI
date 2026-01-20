import { cn } from "@/lib/utils";
import { type LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { type MetricStatus } from "@/types";

interface MetricsCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  status?: MetricStatus;
  icon: LucideIcon;
  className?: string;
}

export function MetricsCard({
  title,
  value,
  suffix = "",
  change,
  changeLabel = "vs last week",
  status = "success",
  icon: Icon,
  className,
}: MetricsCardProps) {
  const statusColors = {
    success: {
      bg: "bg-neon-mint/10",
      border: "border-neon-mint/20",
      text: "text-neon-mint",
      icon: "text-neon-mint",
    },
    warning: {
      bg: "bg-energy-orange/10",
      border: "border-energy-orange/20",
      text: "text-energy-orange",
      icon: "text-energy-orange",
    },
    critical: {
      bg: "bg-rose/10",
      border: "border-rose/20",
      text: "text-rose",
      icon: "text-rose",
    },
  };

  const colors = statusColors[status];

  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  };

  const TrendIcon = getTrendIcon();

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6 transition-all duration-300 hover:border-electric-cyan/30 hover:shadow-card-hover group overflow-hidden",
        className
      )}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-cyan/40 to-transparent" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-steel">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-sora font-bold text-white tracking-tight">
              {value}
            </span>
            {suffix && <span className="text-lg font-medium text-steel">{suffix}</span>}
          </div>
        </div>
        <div className={cn(
          "rounded-xl p-3 border transition-all duration-300",
          colors.bg,
          colors.border,
          "group-hover:shadow-sm"
        )}>
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>
      </div>

      {change !== undefined && TrendIcon && (
        <div className="relative mt-4 flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1.5 text-sm font-semibold",
              change > 0 ? "text-neon-mint" : change < 0 ? "text-rose" : "text-steel"
            )}
          >
            <TrendIcon className="h-4 w-4" />
            <span>{Math.abs(change)}%</span>
          </div>
          <span className="text-xs text-steel">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}
