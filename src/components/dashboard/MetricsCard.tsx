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
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      icon: "text-red-400",
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
        "rounded-xl border border-graphite bg-midnight-blue/60 backdrop-blur-sm p-6 transition-all duration-200 hover:border-electric-cyan/30 hover:shadow-glow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-steel">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-sora font-bold text-white">
              {value}
            </span>
            {suffix && <span className="text-lg text-steel">{suffix}</span>}
          </div>
        </div>
        <div className={cn("rounded-lg p-2.5", colors.bg, "border", colors.border)}>
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>
      </div>

      {change !== undefined && TrendIcon && (
        <div className="mt-4 flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              change > 0 ? "text-neon-mint" : change < 0 ? "text-red-400" : "text-steel"
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
