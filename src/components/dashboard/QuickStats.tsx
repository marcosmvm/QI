"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
  change?: number;
  icon?: LucideIcon;
  color?: "cyan" | "violet" | "mint" | "orange" | "rose";
}

interface QuickStatsProps {
  stats: StatItem[];
  variant?: "horizontal" | "vertical" | "grid";
  className?: string;
}

const colorConfig = {
  cyan: {
    icon: "text-electric-cyan",
    bg: "bg-electric-cyan/10",
    border: "border-electric-cyan/20",
  },
  violet: {
    icon: "text-quantum-violet",
    bg: "bg-quantum-violet/10",
    border: "border-quantum-violet/20",
  },
  mint: {
    icon: "text-neon-mint",
    bg: "bg-neon-mint/10",
    border: "border-neon-mint/20",
  },
  orange: {
    icon: "text-energy-orange",
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/20",
  },
  rose: {
    icon: "text-rose",
    bg: "bg-rose/10",
    border: "border-rose/20",
  },
};

export function QuickStats({
  stats,
  variant = "horizontal",
  className,
}: QuickStatsProps) {
  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "flex items-center divide-x divide-slate-200 rounded-xl border border-slate-200 bg-white overflow-hidden",
          className
        )}
      >
        {stats.map((stat, index) => {
          const color = colorConfig[stat.color || "cyan"];
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="flex-1 px-4 py-3 flex items-center gap-3"
            >
              {Icon && (
                <div
                  className={cn(
                    "h-9 w-9 rounded-lg flex items-center justify-center border",
                    color.bg,
                    color.border
                  )}
                >
                  <Icon className={cn("h-4 w-4", color.icon)} />
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-slate-900">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-sm text-slate-500">{stat.suffix}</span>
                  )}
                  {stat.change !== undefined && (
                    <span
                      className={cn(
                        "text-xs font-medium flex items-center gap-0.5 ml-1",
                        stat.change > 0
                          ? "text-neon-mint"
                          : stat.change < 0
                          ? "text-rose"
                          : "text-slate-500"
                      )}
                    >
                      {stat.change > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : stat.change < 0 ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : (
                        <Minus className="h-3 w-3" />
                      )}
                      {Math.abs(stat.change)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div
        className={cn(
          "space-y-3 rounded-xl border border-slate-200 bg-white p-4",
          className
        )}
      >
        {stats.map((stat, index) => {
          const color = colorConfig[stat.color || "cyan"];
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <div
                    className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center border",
                      color.bg,
                      color.border
                    )}
                  >
                    <Icon className={cn("h-4 w-4", color.icon)} />
                  </div>
                )}
                <span className="text-sm text-slate-500">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-slate-900">{stat.value}</span>
                {stat.suffix && (
                  <span className="text-sm text-slate-500">{stat.suffix}</span>
                )}
                {stat.change !== undefined && (
                  <span
                    className={cn(
                      "text-xs font-medium flex items-center gap-0.5 ml-2",
                      stat.change > 0
                        ? "text-neon-mint"
                        : stat.change < 0
                        ? "text-rose"
                        : "text-slate-500"
                    )}
                  >
                    {stat.change > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : stat.change < 0 ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : (
                      <Minus className="h-3 w-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Grid variant
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3",
        className
      )}
    >
      {stats.map((stat, index) => {
        const color = colorConfig[stat.color || "cyan"];
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">{stat.label}</span>
              {Icon && (
                <div
                  className={cn(
                    "h-7 w-7 rounded-lg flex items-center justify-center border",
                    color.bg,
                    color.border
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", color.icon)} />
                </div>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
              {stat.suffix && (
                <span className="text-sm text-slate-500">{stat.suffix}</span>
              )}
            </div>
            {stat.change !== undefined && (
              <span
                className={cn(
                  "text-xs font-medium flex items-center gap-0.5 mt-1",
                  stat.change > 0
                    ? "text-neon-mint"
                    : stat.change < 0
                    ? "text-rose"
                    : "text-slate-500"
                )}
              >
                {stat.change > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : stat.change < 0 ? (
                  <TrendingDown className="h-3 w-3" />
                ) : (
                  <Minus className="h-3 w-3" />
                )}
                {Math.abs(stat.change)}% vs last week
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
