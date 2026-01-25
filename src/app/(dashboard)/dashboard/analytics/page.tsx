"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-200 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">Analytics</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-slate-900 dark:text-slate-200 mt-1">
          Campaign performance insights
        </p>
      </motion.div>

      {/* Top metrics - using enhanced MetricsCard with staggered animation */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Sent"
          value={36000}
          change={18.5}
          accent="emerald"
          delay={0}
        />
        <MetricsCard
          title="Avg Open Rate"
          value={34.2}
          suffix="%"
          change={4.2}
          accent="sky"
          delay={0.1}
        />
        <MetricsCard
          title="Avg Reply Rate"
          value={3.8}
          suffix="%"
          change={12.1}
          accent="emerald"
          delay={0.2}
        />
        <MetricsCard
          title="Leads Generated"
          value={1500}
          change={22.3}
          accent="amber"
          delay={0.3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Weekly Trend */}
        <motion.div
          variants={itemVariants}
          className="glass-premium p-6 hover:shadow-card-glow-active transition-all duration-300"
        >
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6">
            Weekly Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <defs>
                  <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(26, 45, 74, 0.95)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0, 212, 255, 0.3)",
                    borderRadius: "12px",
                    color: "#E8EDF5",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 255, 0.1)",
                    padding: "12px 16px",
                  }}
                  labelStyle={{ color: "#00D4FF", fontWeight: 600, marginBottom: "4px" }}
                  itemStyle={{ color: "#E8EDF5" }}
                  cursor={{ stroke: "rgba(0, 212, 255, 0.3)", strokeWidth: 1, strokeDasharray: "4 4" }}
                />
                <Line type="monotone" dataKey="sent" name="Sent" stroke="#00D4FF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="opened" name="Opened" stroke="#7B61FF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="replied" name="Replied" stroke="#00FFB2" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Chart legend */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border-default dark:border-graphite/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-pro-600" />
              <span className="text-xs text-slate-900 dark:text-slate-200">Sent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-pro-500" />
              <span className="text-xs text-slate-900 dark:text-slate-200">Opened</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-pro-400" />
              <span className="text-xs text-slate-900 dark:text-slate-200">Replied</span>
            </div>
          </div>
        </motion.div>

        {/* Hourly Engagement */}
        <motion.div
          variants={itemVariants}
          className="glass-premium p-6 hover:shadow-card-glow-active transition-all duration-300"
        >
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6">
            Hourly Engagement
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyEngagement}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4FF" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="hour" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(26, 45, 74, 0.95)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0, 212, 255, 0.3)",
                    borderRadius: "12px",
                    color: "#E8EDF5",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 255, 0.1)",
                    padding: "12px 16px",
                  }}
                  labelStyle={{ color: "#00D4FF", fontWeight: 600, marginBottom: "4px" }}
                  itemStyle={{ color: "#E8EDF5" }}
                  cursor={{ fill: "rgba(0, 212, 255, 0.08)" }}
                />
                <Bar dataKey="opens" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Campaign Performance */}
      <motion.div
        variants={itemVariants}
        className="glass-premium p-6 hover:shadow-card-glow-active transition-all duration-300"
      >
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6">
          Campaign Performance
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignPerformance} layout="vertical">
              <defs>
                <linearGradient id="violetBarGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7B61FF" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#7B61FF" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#334155" strokeDasharray="0" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: "#E8EDF5", fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(26, 45, 74, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(123, 97, 255, 0.3)",
                  borderRadius: "12px",
                  color: "#E8EDF5",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(123, 97, 255, 0.1)",
                  padding: "12px 16px",
                }}
                labelStyle={{ color: "#7B61FF", fontWeight: 600, marginBottom: "4px" }}
                itemStyle={{ color: "#E8EDF5" }}
                cursor={{ fill: "rgba(123, 97, 255, 0.08)" }}
              />
              <Bar dataKey="openRate" name="Open Rate %" fill="url(#violetBarGradient)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
