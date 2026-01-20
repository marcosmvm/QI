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
import { TrendingUp, MoreHorizontal } from "lucide-react";

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
    <div className="relative rounded-3xl bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-sora font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">Campaign performance overview</p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
          <MoreHorizontal className="h-5 w-5 text-slate-400" />
        </button>
      </div>

      {/* Legend Pills */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="text-xs font-medium text-slate-700">Sent</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
          <span className="text-xs font-medium text-slate-700">Opened</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-slate-700">Replied</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              {/* Sent - Primary Green */}
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
              </linearGradient>
              {/* Opened - Secondary Navy */}
              <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0} />
              </linearGradient>
              {/* Replied - Emerald */}
              <linearGradient id="colorReplied" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "#F1F5F9" }}
              dy={10}
            />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "none",
                borderRadius: "16px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.12)",
                padding: "16px",
              }}
              labelStyle={{ color: "#1E293B", fontWeight: 600, marginBottom: "12px", fontSize: "13px" }}
              itemStyle={{ color: "#64748B", fontSize: "12px", padding: "4px 0" }}
              cursor={{ stroke: "#E2E8F0", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="sent"
              name="Sent"
              stroke="#4ADE80"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorSent)"
              dot={false}
              activeDot={{ r: 6, fill: "#4ADE80", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="opened"
              name="Opened"
              stroke="#1E3A5F"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorOpened)"
              dot={false}
              activeDot={{ r: 6, fill: "#1E3A5F", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="replied"
              name="Replied"
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorReplied)"
              dot={false}
              activeDot={{ r: 6, fill: "#10B981", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
