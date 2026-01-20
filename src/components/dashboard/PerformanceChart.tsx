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

export function PerformanceChart({ data, title = "7-Day Performance" }: PerformanceChartProps) {
  return (
    <div className="relative rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6 transition-all duration-300 hover:border-electric-cyan/20 hover:shadow-card-hover overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-cyan/40 to-transparent" />

      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-cyan/10 border border-electric-cyan/20">
          <TrendingUp className="h-5 w-5 text-electric-cyan" />
        </div>
        <div>
          <h3 className="text-lg font-sora font-semibold text-white">{title}</h3>
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
              {/* Sent - Electric Cyan */}
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
              {/* Opened - Quantum Violet */}
              <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7B61FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7B61FF" stopOpacity={0} />
              </linearGradient>
              {/* Replied - Neon Mint */}
              <linearGradient id="colorReplied" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FFB2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00FFB2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.08)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(0,212,255,0.15)" }}
            />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A2D4A",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0,212,255,0.1)",
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
