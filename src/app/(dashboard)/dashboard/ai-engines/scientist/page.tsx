"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FlaskConical,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  RefreshCw,
  Settings,
  Calendar,
  Mail,
  Users,
  MessageSquare,
  MousePointer,
  Eye,
  Timer,
  Lightbulb,
  Beaker,
  ChevronRight,
  Sparkles,
  MoreHorizontal,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

// Mock data for A/B tests
const activeTests = [
  {
    id: "test-001",
    name: "Subject Line Test - Enterprise Outreach",
    campaign: "Q1 SaaS Outreach",
    status: "running",
    startDate: "Jan 12, 2026",
    variants: [
      { name: "Variant A", subject: "Quick question about {{company}}", sent: 500, opens: 340, replies: 42, openRate: 68, replyRate: 8.4 },
      { name: "Variant B", subject: "{{firstName}}, saw your recent news", sent: 500, opens: 385, replies: 51, openRate: 77, replyRate: 10.2 },
    ],
    winner: "B",
    confidence: 94,
    improvement: "+21.4%",
  },
  {
    id: "test-002",
    name: "Send Time Optimization",
    campaign: "Healthcare Tech DMs",
    status: "running",
    startDate: "Jan 15, 2026",
    variants: [
      { name: "Morning (8-10 AM)", subject: "-", sent: 300, opens: 198, replies: 18, openRate: 66, replyRate: 6.0 },
      { name: "Afternoon (2-4 PM)", subject: "-", sent: 300, opens: 225, replies: 24, openRate: 75, replyRate: 8.0 },
    ],
    winner: "Afternoon",
    confidence: 87,
    improvement: "+33.3%",
  },
  {
    id: "test-003",
    name: "CTA Variation Test",
    campaign: "FinTech CFO Prospecting",
    status: "completed",
    startDate: "Jan 8, 2026",
    variants: [
      { name: "Soft CTA", subject: "-", sent: 400, opens: 280, replies: 25, openRate: 70, replyRate: 6.25 },
      { name: "Direct CTA", subject: "-", sent: 400, opens: 268, replies: 36, openRate: 67, replyRate: 9.0 },
    ],
    winner: "Direct",
    confidence: 96,
    improvement: "+44.0%",
  },
];

// Mock data for optimization recommendations
const recommendations = [
  {
    id: "rec-001",
    type: "timing",
    title: "Optimal Send Window Detected",
    description: "Data suggests Tuesday-Thursday between 9-11 AM EST yields 23% higher open rates for your target audience.",
    impact: "high",
    campaign: "Q1 SaaS Outreach",
    actionable: true,
  },
  {
    id: "rec-002",
    type: "content",
    title: "Personalization Opportunity",
    description: "Emails mentioning recent company news have 34% higher reply rates. Consider adding {{recentNews}} variable.",
    impact: "high",
    campaign: "Healthcare Tech DMs",
    actionable: true,
  },
  {
    id: "rec-003",
    type: "sequence",
    title: "Sequence Length Adjustment",
    description: "80% of replies come within the first 3 touches. Consider consolidating your 5-step sequence.",
    impact: "medium",
    campaign: "FinTech CFO Prospecting",
    actionable: true,
  },
  {
    id: "rec-004",
    type: "audience",
    title: "Segment Performance Gap",
    description: "VP-level contacts show 2x engagement vs. Director-level. Consider focusing budget on VP segment.",
    impact: "medium",
    campaign: "Manufacturing VP Ops",
    actionable: true,
  },
];

// Mock data for performance metrics
const performanceMetrics = {
  openRate: { current: 64.2, previous: 58.7, change: 9.4, trend: "up" },
  replyRate: { current: 8.4, previous: 7.1, change: 18.3, trend: "up" },
  bounceRate: { current: 1.2, previous: 1.8, change: -33.3, trend: "down" },
  meetingRate: { current: 2.1, previous: 1.9, change: 10.5, trend: "up" },
};

// Mock data for hourly performance
const hourlyPerformance = [
  { hour: "6 AM", opens: 12, replies: 1 },
  { hour: "7 AM", opens: 28, replies: 2 },
  { hour: "8 AM", opens: 65, replies: 5 },
  { hour: "9 AM", opens: 89, replies: 12 },
  { hour: "10 AM", opens: 95, replies: 15 },
  { hour: "11 AM", opens: 78, replies: 11 },
  { hour: "12 PM", opens: 45, replies: 4 },
  { hour: "1 PM", opens: 52, replies: 6 },
  { hour: "2 PM", opens: 72, replies: 9 },
  { hour: "3 PM", opens: 68, replies: 8 },
  { hour: "4 PM", opens: 55, replies: 6 },
  { hour: "5 PM", opens: 32, replies: 3 },
  { hour: "6 PM", opens: 18, replies: 1 },
];

const statusColors = {
  running: {
    bg: "bg-emerald-pro-400/10",
    text: "text-emerald-pro-400",
    border: "border-emerald-pro-400/20",
    dot: "bg-emerald-pro-400",
  },
  completed: {
    bg: "bg-emerald-pro-600/10",
    text: "text-emerald-pro-600",
    border: "border-emerald-pro-600/20",
    dot: "bg-emerald-pro-600",
  },
  paused: {
    bg: "bg-energy-orange/10",
    text: "text-energy-orange",
    border: "border-energy-orange/20",
    dot: "bg-energy-orange",
  },
};

const impactColors = {
  high: { bg: "bg-emerald-pro-400/10", text: "text-emerald-pro-400", border: "border-emerald-pro-400/20" },
  medium: { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/20" },
  low: { bg: "bg-steel/10", text: "text-slate-900 dark:text-slate-200", border: "border-steel/20" },
};

export default function ScientistPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "tests" | "recommendations">("overview");

  const maxOpens = Math.max(...hourlyPerformance.map(h => h.opens));

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-200 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">Scientist Engine</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Scientist Engine</h1>
        <p className="text-slate-900 dark:text-slate-200 mt-1">Campaign Optimization & A/B Testing Intelligence</p>
      </motion.div>

      <div className="space-y-6">
        {/* Engine Status Banner */}
        <motion.div variants={itemVariants} className="relative glass-premium p-6 overflow-hidden border-emerald-pro-400/20">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-pro-400/60 to-transparent" />
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-pro-400/10 rounded-full blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-pro-400/20 border border-emerald-pro-400/30 shadow-glow-mint">
                <FlaskConical className="h-7 w-7 text-emerald-pro-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-light-bg-secondary dark:bg-midnight-blue text-emerald-pro-400 border border-emerald-pro-400/30">
                    ENGINE C
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-pro-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-pro-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-pro-400"></span>
                    </span>
                    Analyzing
                  </span>
                </div>
                <h2 className="text-xl font-sora font-bold text-slate-900 dark:text-white mt-1">Campaign Scientist</h2>
                <p className="text-sm text-slate-900 dark:text-slate-200">Real-time optimization, A/B testing, and performance intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-pro-400/30 text-emerald-pro-400 hover:bg-emerald-pro-400/10"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-pro-400 to-emerald-600 hover:from-emerald-400 hover:to-emerald-pro-400 text-white font-semibold shadow-glow-mint"
              >
                <Beaker className="h-4 w-4 mr-2" />
                New A/B Test
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Performance Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
          {[
            { label: "Avg Open Rate", value: `${performanceMetrics.openRate.current}%`, change: performanceMetrics.openRate.change, icon: Eye, color: "emerald-pro-600" },
            { label: "Avg Reply Rate", value: `${performanceMetrics.replyRate.current}%`, change: performanceMetrics.replyRate.change, icon: MessageSquare, color: "emerald-pro-400" },
            { label: "Bounce Rate", value: `${performanceMetrics.bounceRate.current}%`, change: performanceMetrics.bounceRate.change, icon: AlertTriangle, color: "energy-orange", inverse: true },
            { label: "Meeting Rate", value: `${performanceMetrics.meetingRate.current}%`, change: performanceMetrics.meetingRate.change, icon: Calendar, color: "emerald-pro-500" },
          ].map((metric) => {
            const isPositive = metric.inverse ? metric.change < 0 : metric.change > 0;
            return (
              <div
                key={metric.label}
                className="rounded-xl border border-emerald-pro-600/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-4 hover:border-emerald-pro-600/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-slate-900 dark:text-slate-200">{metric.label}</p>
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    metric.color === "emerald-pro-600" && "bg-emerald-pro-600/10 border border-emerald-pro-600/20",
                    metric.color === "emerald-pro-400" && "bg-emerald-pro-400/10 border border-emerald-pro-400/20",
                    metric.color === "energy-orange" && "bg-energy-orange/10 border border-energy-orange/20",
                    metric.color === "emerald-pro-500" && "bg-emerald-pro-500/10 border border-emerald-pro-500/20"
                  )}>
                    <metric.icon className={cn(
                      "h-4 w-4",
                      metric.color === "emerald-pro-600" && "text-emerald-pro-600",
                      metric.color === "emerald-pro-400" && "text-emerald-pro-400",
                      metric.color === "energy-orange" && "text-energy-orange",
                      metric.color === "emerald-pro-500" && "text-emerald-pro-500"
                    )} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-sora font-bold text-slate-900 dark:text-white">{metric.value}</p>
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    isPositive ? "text-emerald-pro-400" : "text-rose"
                  )}>
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(metric.change).toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="flex items-center gap-1 p-1 rounded-xl bg-light-bg-secondary dark:bg-midnight-blue/50 border border-emerald-pro-600/10 w-fit">
          {[
            { id: "overview", label: "Performance Overview", icon: BarChart3 },
            { id: "tests", label: "A/B Tests", icon: Beaker },
            { id: "recommendations", label: "AI Recommendations", icon: Lightbulb },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-emerald-pro-600/10 text-emerald-pro-600 border border-emerald-pro-600/20"
                  : "text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/5"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
            {/* Hourly Performance Chart */}
            <div className="col-span-2 glass-premium p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Hourly Performance</h3>
                  <p className="text-sm text-slate-900 dark:text-slate-200">Best engagement windows for your campaigns</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-pro-600"></span>
                    <span className="text-xs text-slate-900 dark:text-slate-200">Opens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-pro-400"></span>
                    <span className="text-xs text-slate-900 dark:text-slate-200">Replies</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-2 h-48">
                {hourlyPerformance.map((hour) => (
                  <div key={hour.hour} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-0.5">
                      <div
                        className="w-full bg-emerald-pro-600/60 rounded-t transition-all hover:bg-emerald-pro-600"
                        style={{ height: `${(hour.opens / maxOpens) * 140}px` }}
                      />
                      <div
                        className="w-full bg-emerald-pro-400/60 rounded-b transition-all hover:bg-emerald-pro-400"
                        style={{ height: `${(hour.replies / maxOpens) * 140}px` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-900 dark:text-slate-200 mt-2">{hour.hour}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-emerald-pro-400/5 border border-emerald-pro-400/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-pro-400" />
                  <span className="text-sm font-medium text-emerald-pro-400">AI Insight</span>
                </div>
                <p className="text-sm text-slate-900 dark:text-slate-200 mt-1">
                  Peak engagement occurs between 9-11 AM. Consider scheduling your highest-priority sends during this window for maximum impact.
                </p>
              </div>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="space-y-4">
              {/* Active Tests Summary */}
              <div className="rounded-xl border border-emerald-pro-600/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-pro-400/10 border border-emerald-pro-400/20">
                    <Beaker className="h-5 w-5 text-emerald-pro-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Active Tests</h3>
                    <p className="text-xs text-slate-900 dark:text-slate-200">Currently running experiments</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeTests.filter(t => t.status === "running").slice(0, 3).map((test) => (
                    <div key={test.id} className="p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-emerald-pro-600/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-900 dark:text-white truncate">{test.name}</span>
                        <span className="text-xs text-emerald-pro-400">{test.confidence}%</span>
                      </div>
                      <p className="text-xs text-slate-900 dark:text-slate-200">Leading: Variant {test.winner}</p>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" size="sm" className="w-full mt-3 text-emerald-pro-600 hover:bg-emerald-pro-600/10">
                  View All Tests
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              {/* Recent Wins */}
              <div className="rounded-xl border border-emerald-pro-600/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-pro-500/10 border border-emerald-pro-500/20">
                    <Target className="h-5 w-5 text-emerald-pro-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Recent Wins</h3>
                    <p className="text-xs text-slate-900 dark:text-slate-200">Successful optimizations</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-pro-400/5 border border-emerald-pro-400/20">
                    <CheckCircle2 className="h-5 w-5 text-emerald-pro-400" />
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white">+44% reply rate</p>
                      <p className="text-xs text-slate-900 dark:text-slate-200">CTA Variation Test</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-pro-400/5 border border-emerald-pro-400/20">
                    <CheckCircle2 className="h-5 w-5 text-emerald-pro-400" />
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white">-33% bounce rate</p>
                      <p className="text-xs text-slate-900 dark:text-slate-200">List cleaning applied</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-pro-400/5 border border-emerald-pro-400/20">
                    <CheckCircle2 className="h-5 w-5 text-emerald-pro-400" />
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white">+21% open rate</p>
                      <p className="text-xs text-slate-900 dark:text-slate-200">Subject line optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* A/B Tests Tab */}
        {activeTab === "tests" && (
          <motion.div variants={itemVariants} className="space-y-4">
            {activeTests.map((test) => {
              const status = statusColors[test.status as keyof typeof statusColors];
              const winningVariant = test.variants.find(v => v.name.includes(test.winner) || v.name === test.winner);

              return (
                <div
                  key={test.id}
                  className="glass-premium p-6 hover:border-emerald-pro-600/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{test.name}</h3>
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border",
                          status.bg,
                          status.text,
                          status.border
                        )}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot, test.status === "running" && "animate-pulse")} />
                          {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-900 dark:text-slate-200">
                        Campaign: {test.campaign} • Started {test.startDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {test.status === "running" && (
                        <Button variant="outline" size="sm" className="border-energy-orange/30 text-energy-orange hover:bg-energy-orange/10">
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Variants Comparison */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {test.variants.map((variant, index) => {
                      const isWinner = variant.name.includes(test.winner) || variant.name === test.winner;
                      return (
                        <div
                          key={variant.name}
                          className={cn(
                            "rounded-xl border p-4 transition-all",
                            isWinner
                              ? "border-emerald-pro-400/30 bg-emerald-pro-400/5"
                              : "border-emerald-pro-600/10 bg-white dark:bg-deep-space/50"
                          )}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "font-mono text-xs px-2 py-0.5 rounded-md border",
                                isWinner
                                  ? "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30"
                                  : "bg-light-bg-secondary dark:bg-midnight-blue text-emerald-pro-600 border-emerald-pro-600/20"
                              )}>
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">{variant.name}</span>
                            </div>
                            {isWinner && (
                              <span className="text-xs text-emerald-pro-400 font-medium flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Leading
                              </span>
                            )}
                          </div>

                          {variant.subject !== "-" && (
                            <p className="text-xs text-slate-900 dark:text-slate-200 mb-3 truncate">
                              Subject: "{variant.subject}"
                            </p>
                          )}

                          <div className="grid grid-cols-4 gap-3">
                            <div>
                              <p className="text-xs text-slate-900 dark:text-slate-200">Sent</p>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">{variant.sent}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-900 dark:text-slate-200">Opens</p>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">{variant.opens}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-900 dark:text-slate-200">Open Rate</p>
                              <p className={cn(
                                "text-sm font-semibold",
                                isWinner ? "text-emerald-pro-400" : "text-slate-900 dark:text-white"
                              )}>{variant.openRate}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-900 dark:text-slate-200">Reply Rate</p>
                              <p className={cn(
                                "text-sm font-semibold",
                                isWinner ? "text-emerald-pro-400" : "text-slate-900 dark:text-white"
                              )}>{variant.replyRate}%</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Test Results */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-deep-space/50 border border-emerald-pro-600/10">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-slate-900 dark:text-slate-200">Statistical Confidence</p>
                        <p className="text-lg font-semibold text-emerald-pro-600">{test.confidence}%</p>
                      </div>
                      <div className="h-8 w-px bg-emerald-pro-600/20" />
                      <div>
                        <p className="text-xs text-slate-900 dark:text-slate-200">Improvement</p>
                        <p className="text-lg font-semibold text-emerald-pro-400">{test.improvement}</p>
                      </div>
                      <div className="h-8 w-px bg-emerald-pro-600/20" />
                      <div>
                        <p className="text-xs text-slate-900 dark:text-slate-200">Recommended Action</p>
                        <p className="text-sm text-slate-900 dark:text-white">
                          {test.confidence >= 95 ? "Apply winning variant" : "Continue testing"}
                        </p>
                      </div>
                    </div>
                    {test.confidence >= 95 && (
                      <Button size="sm" className="bg-gradient-to-r from-emerald-pro-400 to-emerald-600 text-white font-semibold">
                        Apply Winner
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Recommendations Tab */}
        {activeTab === "recommendations" && (
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            {recommendations.map((rec) => {
              const impact = impactColors[rec.impact as keyof typeof impactColors];
              return (
                <div
                  key={rec.id}
                  className="rounded-xl border border-emerald-pro-600/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-5 hover:border-emerald-pro-600/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl border",
                        rec.type === "timing" && "bg-emerald-pro-600/10 border-emerald-pro-600/20",
                        rec.type === "content" && "bg-emerald-pro-500/10 border-emerald-pro-500/20",
                        rec.type === "sequence" && "bg-emerald-pro-400/10 border-emerald-pro-400/20",
                        rec.type === "audience" && "bg-energy-orange/10 border-energy-orange/20"
                      )}>
                        {rec.type === "timing" && <Clock className="h-5 w-5 text-emerald-pro-600" />}
                        {rec.type === "content" && <Mail className="h-5 w-5 text-emerald-pro-500" />}
                        {rec.type === "sequence" && <Activity className="h-5 w-5 text-emerald-pro-400" />}
                        {rec.type === "audience" && <Users className="h-5 w-5 text-energy-orange" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">{rec.title}</h4>
                        <p className="text-xs text-slate-900 dark:text-slate-200">{rec.campaign}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-lg border font-medium",
                      impact.bg,
                      impact.text,
                      impact.border
                    )}>
                      {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
                    </span>
                  </div>

                  <p className="text-sm text-slate-900 dark:text-slate-200 mb-4">{rec.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-emerald-pro-600/10">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-emerald-pro-500" />
                      <span className="text-xs text-slate-900 dark:text-slate-200">AI-generated recommendation</span>
                    </div>
                    {rec.actionable && (
                      <Button size="sm" variant="ghost" className="text-emerald-pro-600 hover:bg-emerald-pro-600/10">
                        Apply
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
