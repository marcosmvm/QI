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
  variant?: "default" | "compact" | "large";
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
  variant = "default",
}: MetricsCardProps) {
  const statusConfig = {
    success: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-100",
      accent: "#22C55E",
    },
    warning: {
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      text: "text-amber-600",
      border: "border-amber-100",
      accent: "#F59E0B",
    },
    critical: {
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      text: "text-red-600",
      border: "border-red-100",
      accent: "#EF4444",
    },
  };

  const config = statusConfig[status];

  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  };

  const TrendIcon = getTrendIcon();

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "relative rounded-2xl bg-white p-4 shadow-card hover:shadow-card-hover transition-all duration-300 group border border-slate-100/50",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "rounded-xl p-2.5",
            config.iconBg
          )}>
            <Icon className={cn("h-4 w-4", config.text)} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-500 truncate">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-sora font-bold text-slate-900">
                {value}
              </span>
              {suffix && <span className="text-sm text-slate-500">{suffix}</span>}
            </div>
          </div>
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                change > 0 ? "bg-emerald-50 text-emerald-600" :
                change < 0 ? "bg-red-50 text-red-600" :
                "bg-slate-50 text-slate-500"
              )}
            >
              {TrendIcon && <TrendIcon className="h-3 w-3" />}
              <span>{change > 0 ? "+" : ""}{change}%</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "large") {
    return (
      <div
        className={cn(
          "relative rounded-3xl bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group border border-slate-100/50 overflow-hidden",
          className
        )}
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl"
          style={{ background: config.accent }}
        />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className={cn(
              "rounded-2xl p-3.5",
              config.iconBg
            )}>
              <Icon className={cn("h-6 w-6", config.text)} />
            </div>
            {change !== undefined && (
              <div
                className={cn(
                  "flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full",
                  change > 0 ? "bg-emerald-50 text-emerald-600" :
                  change < 0 ? "bg-red-50 text-red-600" :
                  "bg-slate-50 text-slate-500"
                )}
              >
                {TrendIcon && <TrendIcon className="h-4 w-4" />}
                <span>{change > 0 ? "+" : ""}{change}%</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-sora font-bold text-slate-900 tracking-tight">
                {value}
              </span>
              {suffix && <span className="text-xl font-medium text-slate-400">{suffix}</span>}
            </div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
          </div>

          {changeLabel && (
            <p className="mt-3 text-xs text-slate-400">{changeLabel}</p>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white p-5 shadow-card hover:shadow-card-hover transition-all duration-300 group border border-slate-100/50 overflow-hidden",
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.07] blur-xl"
        style={{ background: config.accent }}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-sora font-bold text-slate-900 tracking-tight">
              {value}
            </span>
            {suffix && <span className="text-lg font-medium text-slate-400">{suffix}</span>}
          </div>
        </div>
        <div className={cn(
          "rounded-xl p-3 transition-all duration-300",
          config.iconBg,
          "group-hover:scale-105"
        )}>
          <Icon className={cn("h-5 w-5", config.text)} />
        </div>
      </div>

      {change !== undefined && TrendIcon && (
        <div className="relative mt-4 flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full",
              change > 0 ? "bg-emerald-50 text-emerald-600" :
              change < 0 ? "bg-red-50 text-red-600" :
              "bg-slate-50 text-slate-500"
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{change > 0 ? "+" : ""}{change}%</span>
          </div>
          <span className="text-xs text-slate-400">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}
