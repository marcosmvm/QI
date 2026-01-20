"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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

export function PerformanceChart({ data, title = "Campaign Performance" }: PerformanceChartProps) {
  return (
    <div className="rounded-xl border border-graphite bg-midnight-blue/60 backdrop-blur-sm p-6">
      <h3 className="text-lg font-sora font-semibold text-white mb-6">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7B61FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7B61FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorReplied" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FFB2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00FFB2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A2D4A",
                border: "1px solid #334155",
                borderRadius: "8px",
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.1)",
              }}
              labelStyle={{ color: "#FFFFFF", fontWeight: 600 }}
              itemStyle={{ color: "#E8EDF5" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span style={{ color: "#E8EDF5", fontSize: "12px" }}>{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="sent"
              name="Sent"
              stroke="#00D4FF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSent)"
            />
            <Area
              type="monotone"
              dataKey="opened"
              name="Opened"
              stroke="#7B61FF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOpened)"
            />
            <Area
              type="monotone"
              dataKey="replied"
              name="Replied"
              stroke="#00FFB2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorReplied)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
