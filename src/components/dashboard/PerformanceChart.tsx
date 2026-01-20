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
import { TrendingUp } from "lucide-react";

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
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6 transition-all duration-300 hover:border-primary-blue/20 hover:shadow-card-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-blue/10 border border-primary-blue/20">
          <TrendingUp className="h-5 w-5 text-primary-blue" />
        </div>
        <div>
          <h3 className="text-lg font-poppins font-semibold text-white">{title}</h3>
          <p className="text-xs text-steel">Last 7 days</p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0b81ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0b81ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffb902" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ffb902" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorReplied" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a2e52",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                padding: "12px 16px",
              }}
              labelStyle={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "8px" }}
              itemStyle={{ color: "#E8EDF5", fontSize: "12px" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span style={{ color: "#94A3B8", fontSize: "12px", fontWeight: 500 }}>{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="sent"
              name="Sent"
              stroke="#0b81ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSent)"
            />
            <Area
              type="monotone"
              dataKey="opened"
              name="Opened"
              stroke="#ffb902"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOpened)"
            />
            <Area
              type="monotone"
              dataKey="replied"
              name="Replied"
              stroke="#22c55e"
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
