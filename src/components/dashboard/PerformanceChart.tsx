"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  sent: number;
  opened: number;
  replied: number;
}

interface PerformanceChartProps {
  data: DataPoint[];
  title?: string;
}

export function PerformanceChart({ data, title = "Performance" }: PerformanceChartProps) {
  return (
    <div className="rounded-lg border border-border bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <div className="mt-2 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-primary rounded" />
            <span className="text-xs text-foreground-muted">Sent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-foreground-muted rounded" />
            <span className="text-xs text-foreground-muted">Opened</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-success rounded" />
            <span className="text-xs text-foreground-muted">Replied</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <CartesianGrid stroke="#F3F4F6" strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
                padding: "12px",
              }}
              labelStyle={{ color: "#111827", fontWeight: 500, marginBottom: "8px", fontSize: "13px" }}
              itemStyle={{ color: "#6B7280", fontSize: "12px", padding: "2px 0" }}
            />
            <Line
              type="monotone"
              dataKey="sent"
              name="Sent"
              stroke="#3B82F6"
              strokeWidth={1.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="opened"
              name="Opened"
              stroke="#9CA3AF"
              strokeWidth={1.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="replied"
              name="Replied"
              stroke="#10B981"
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
