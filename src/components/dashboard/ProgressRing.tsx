"use client";

import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  color?: "cyan" | "violet" | "mint" | "orange" | "rose";
  className?: string;
}

const sizeConfig = {
  sm: {
    size: 48,
    strokeWidth: 4,
    fontSize: "text-xs",
    labelSize: "text-[8px]",
  },
  md: {
    size: 80,
    strokeWidth: 6,
    fontSize: "text-lg",
    labelSize: "text-[10px]",
  },
  lg: {
    size: 120,
    strokeWidth: 8,
    fontSize: "text-2xl",
    labelSize: "text-xs",
  },
};

const colorConfig = {
  cyan: "#00D4FF",
  violet: "#7B61FF",
  mint: "#00FFB2",
  orange: "#FF6B35",
  rose: "#F43F5E",
};

export function ProgressRing({
  value,
  max = 100,
  size = "md",
  showLabel = true,
  label,
  color = "cyan",
  className,
}: ProgressRingProps) {
  const config = sizeConfig[size];
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (config.size - config.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={config.size}
        height={config.size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          strokeWidth={config.strokeWidth}
          stroke="rgba(0,212,255,0.1)"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          strokeWidth={config.strokeWidth}
          stroke={colorConfig[color]}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${colorConfig[color]}50)`,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold text-white", config.fontSize)}>
            {Math.round(percentage)}%
          </span>
          {label && (
            <span className={cn("text-steel uppercase tracking-wider", config.labelSize)}>
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
