"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueDataPoint {
  month: string;
  mrr: number;
  arr?: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  title?: string;
  showARR?: boolean;
}

export function RevenueChart({
  data,
  title = "Revenue Trend",
  showARR = false,
}: RevenueChartProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value}`;
  };

  return (
    <div className="rounded-xl border border-border-default dark:border-graphite/50 bg-light-bg-secondary dark:bg-midnight-blue/30 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">{title}</h3>
        <div className="mt-2 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-emerald-pro-600 rounded" />
            <span className="text-xs text-slate-500 dark:text-slate-400">MRR</span>
          </div>
          {showARR && (
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-4 bg-emerald-pro-500 rounded" />
              <span className="text-xs text-slate-500 dark:text-slate-400">ARR</span>
            </div>
          )}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="arrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7B61FF" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7B61FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A2D4A",
                border: "1px solid #334155",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                padding: "12px",
              }}
              labelStyle={{
                color: "#FFFFFF",
                fontWeight: 600,
                marginBottom: "8px",
                fontSize: "13px",
              }}
              itemStyle={{ color: "#E8EDF5", fontSize: "12px", padding: "2px 0" }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="mrr"
              name="MRR"
              stroke="#00D4FF"
              strokeWidth={2}
              fill="url(#mrrGradient)"
            />
            {showARR && (
              <Area
                type="monotone"
                dataKey="arr"
                name="ARR"
                stroke="#7B61FF"
                strokeWidth={2}
                fill="url(#arrGradient)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Mini sparkline version for compact displays
export function RevenueSparkline({
  data,
  className,
}: {
  data: { value: number }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00D4FF"
            strokeWidth={1.5}
            fill="url(#sparklineGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
