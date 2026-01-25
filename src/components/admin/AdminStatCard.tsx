"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

interface SparklineData {
  value: number;
}

interface AdminStatCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  iconColor?: "cyan" | "violet" | "mint" | "orange";
  sparklineData?: SparklineData[];
  highlight?: boolean;
  className?: string;
}

const iconColorStyles = {
  cyan: "bg-emerald-pro-600/10 border-emerald-pro-600/30 text-emerald-pro-600",
  violet: "bg-emerald-pro-500/10 border-emerald-pro-500/30 text-emerald-pro-500",
  mint: "bg-emerald-pro-400/10 border-emerald-pro-400/30 text-emerald-pro-400",
  orange: "bg-energy-orange/10 border-energy-orange/30 text-energy-orange",
};

const sparklineColors = {
  cyan: "#00D4FF",
  violet: "#7B61FF",
  mint: "#00FFB2",
  orange: "#FF6B35",
};

export function AdminStatCard({
  title,
  value,
  suffix = "",
  change,
  changeLabel = "vs last period",
  icon: Icon,
  iconColor = "cyan",
  sparklineData,
  highlight = false,
  className,
}: AdminStatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-light-bg-secondary dark:bg-midnight-blue/30 p-6 transition-all duration-200",
        highlight
          ? "border-energy-orange/50 shadow-lg shadow-energy-orange/10"
          : "border-border-default dark:border-graphite/50 hover:border-border-default dark:border-graphite/80",
        className
      )}
    >
      <div className="flex items-start justify-between">
        {Icon && (
          <div
            className={cn(
              "h-10 w-10 rounded-lg border flex items-center justify-center",
              iconColorStyles[iconColor]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
        {sparklineData && sparklineData.length > 0 && (
          <div className="h-10 w-20">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={sparklineColors[iconColor]}
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-2xl font-sora font-bold text-slate-900 dark:text-white">
          {value}
          {suffix && <span className="text-lg text-slate-700 dark:text-slate-400 ml-1">{suffix}</span>}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">{title}</p>
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          {change > 0 ? (
            <TrendingUp className="h-4 w-4 text-emerald-pro-400" />
          ) : change < 0 ? (
            <TrendingDown className="h-4 w-4 text-energy-orange" />
          ) : null}
          <span
            className={cn(
              "text-sm font-medium",
              change > 0
                ? "text-emerald-pro-400"
                : change < 0
                ? "text-energy-orange"
                : "text-slate-700 dark:text-slate-400"
            )}
          >
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-slate-700 dark:text-slate-400">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}
