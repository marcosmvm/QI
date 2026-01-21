"use client";

import Link from "next/link";
import { MetricsCard } from "@/components/dashboard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data
const weeklyData = [
  { week: "Week 1", sent: 8500, opened: 2975, replied: 340 },
  { week: "Week 2", sent: 9200, opened: 3312, replied: 386 },
  { week: "Week 3", sent: 7800, opened: 2730, replied: 312 },
  { week: "Week 4", sent: 10500, opened: 3990, replied: 462 },
];

const campaignPerformance = [
  { name: "Q1 Enterprise", openRate: 36, replyRate: 4.2 },
  { name: "SaaS Decision", openRate: 32, replyRate: 3.4 },
  { name: "Healthcare IT", openRate: 25, replyRate: 2.0 },
  { name: "Fintech CFOs", openRate: 28, replyRate: 2.8 },
];

const hourlyEngagement = [
  { hour: "6am", opens: 120 },
  { hour: "8am", opens: 450 },
  { hour: "10am", opens: 680 },
  { hour: "12pm", opens: 520 },
  { hour: "2pm", opens: 590 },
  { hour: "4pm", opens: 410 },
  { hour: "6pm", opens: 280 },
  { hour: "8pm", opens: 150 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-deep-space p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-steel mb-2">
          <Link href="/dashboard" className="hover:text-electric-cyan transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-white">Analytics</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-white">Analytics</h1>
        <p className="text-sm text-steel mt-1">
          Campaign performance insights
        </p>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Sent"
          value="36,000"
          change={18.5}
        />
        <MetricsCard
          title="Avg Open Rate"
          value="34.2"
          suffix="%"
          change={4.2}
        />
        <MetricsCard
          title="Avg Reply Rate"
          value="3.8"
          suffix="%"
          change={12.1}
        />
        <MetricsCard
          title="Leads Generated"
          value="1,500"
          change={22.3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Weekly Trend */}
        <div className="rounded-xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
          <h3 className="text-base font-semibold text-white mb-6">
            Weekly Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid stroke="#334155" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A2D4A",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#E8EDF5",
                  }}
                  labelStyle={{ color: "#E8EDF5" }}
                />
                <Line type="monotone" dataKey="sent" name="Sent" stroke="#00D4FF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="opened" name="Opened" stroke="#7B61FF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="replied" name="Replied" stroke="#00FFB2" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Engagement */}
        <div className="rounded-xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
          <h3 className="text-base font-semibold text-white mb-6">
            Hourly Engagement
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyEngagement}>
                <CartesianGrid stroke="#334155" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="hour" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A2D4A",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#E8EDF5",
                  }}
                  labelStyle={{ color: "#E8EDF5" }}
                />
                <Bar dataKey="opens" fill="#00D4FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="rounded-xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
        <h3 className="text-base font-semibold text-white mb-6">
          Campaign Performance
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignPerformance} layout="vertical">
              <CartesianGrid stroke="#334155" strokeDasharray="0" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: "#E8EDF5", fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A2D4A",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#E8EDF5",
                }}
                labelStyle={{ color: "#E8EDF5" }}
              />
              <Bar dataKey="openRate" name="Open Rate %" fill="#7B61FF" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
