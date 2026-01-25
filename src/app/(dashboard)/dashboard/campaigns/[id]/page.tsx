"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Users,
  TrendingUp,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  Edit3,
  Copy,
  Trash2,
  Settings,
  Download,
  RefreshCw,
  MessageSquare,
  MousePointer,
  Eye,
  AlertTriangle,
  Target,
  Zap,
  Send,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronRight,
  GitBranch,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

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

// Mock campaign data
const campaignData = {
  id: "1",
  name: "Q1 Enterprise Outreach",
  status: "active",
  description: "Targeting VP and C-level executives at enterprise SaaS companies for our Q1 growth initiative.",
  createdAt: "Jan 15, 2026",
  updatedAt: "Jan 19, 2026",
  targetAudience: "VP/C-Level, Enterprise SaaS, 500+ employees",
  sequences: 3,
  totalLeads: 3500,
  metrics: {
    sent: 12450,
    delivered: 11892,
    opened: 4281,
    replied: 498,
    clicked: 892,
    bounced: 186,
    unsubscribed: 23,
    complaints: 3,
    meetings: 45,
    deliverabilityRate: 95.5,
    openRate: 36.0,
    clickRate: 7.5,
    replyRate: 4.2,
    bounceRate: 1.5,
    complaintRate: 0.02,
    meetingRate: 0.9,
  },
  thresholds: {
    deliverability: { target: 90, warning: 85 },
    openRate: { target: 30, warning: 15 },
    replyRate: { target: 3, warning: 1 },
    bounceRate: { target: 2, warning: 5 },
    complaintRate: { target: 0.05, warning: 0.1 },
  },
};

// Mock sequence data
const sequences = [
  {
    id: "seq-1",
    name: "Initial Outreach",
    step: 1,
    sent: 3500,
    opened: 1890,
    replied: 245,
    openRate: 54,
    replyRate: 7.0,
    status: "active",
  },
  {
    id: "seq-2",
    name: "Follow-up #1",
    step: 2,
    sent: 2800,
    opened: 1456,
    replied: 168,
    openRate: 52,
    replyRate: 6.0,
    status: "active",
  },
  {
    id: "seq-3",
    name: "Final Touch",
    step: 3,
    sent: 2100,
    opened: 935,
    replied: 85,
    openRate: 44.5,
    replyRate: 4.0,
    status: "active",
  },
];

// Mock daily performance data
const dailyPerformance = [
  { date: "Jan 13", sent: 450, opened: 162, replied: 19 },
  { date: "Jan 14", sent: 520, opened: 187, replied: 22 },
  { date: "Jan 15", sent: 480, opened: 173, replied: 21 },
  { date: "Jan 16", sent: 510, opened: 194, replied: 25 },
  { date: "Jan 17", sent: 490, opened: 176, replied: 20 },
  { date: "Jan 18", sent: 530, opened: 201, replied: 28 },
  { date: "Jan 19", sent: 470, opened: 169, replied: 18 },
];

// Mock recent activity
const recentActivity = [
  { id: "act-1", type: "reply", lead: "Sarah Johnson", company: "Acme Corp", time: "2 hours ago", message: "Interested in scheduling a demo..." },
  { id: "act-2", type: "meeting", lead: "Michael Chen", company: "TechStart", time: "3 hours ago", message: "Meeting scheduled for Jan 22" },
  { id: "act-3", type: "open", lead: "Emily Williams", company: "HealthTech", time: "4 hours ago", message: "Opened email 3 times" },
  { id: "act-4", type: "click", lead: "David Martinez", company: "FinServices", time: "5 hours ago", message: "Clicked pricing page link" },
  { id: "act-5", type: "reply", lead: "Robert Taylor", company: "CloudNine", time: "6 hours ago", message: "Positive response, asking for more info..." },
];

type MetricStatusType = "success" | "warning" | "critical";

const getMetricStatus = (value: number, target: number, warning: number, inverse = false): MetricStatusType => {
  if (inverse) {
    if (value <= target) return "success";
    if (value <= warning) return "warning";
    return "critical";
  }
  if (value >= target) return "success";
  if (value >= warning) return "warning";
  return "critical";
};

const statusColors: Record<MetricStatusType, { bg: string; text: string; border: string }> = {
  success: { bg: "bg-emerald-pro-400/10", text: "text-emerald-pro-400", border: "border-emerald-pro-400/20" },
  warning: { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/20" },
  critical: { bg: "bg-rose/10", text: "text-rose", border: "border-rose/20" },
};

const activityIcons: Record<string, typeof Mail> = {
  reply: MessageSquare,
  meeting: Calendar,
  open: Eye,
  click: MousePointer,
};

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"overview" | "sequences" | "activity">("overview");

  const maxSent = Math.max(...dailyPerformance.map(d => d.sent));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <Link href="/dashboard/campaigns" className="hover:text-emerald-pro-600 transition-colors">Campaigns</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">{campaignData.name}</span>
        </div>
      </motion.div>

      <div>
        {/* Back Button */}
        <Link
          href="/dashboard/campaigns"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-pro-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </Link>

        {/* Campaign Header */}
        <motion.div variants={itemVariants} className="glass-premium p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-pro-600/10 border border-emerald-pro-600/20">
                <Mail className="h-7 w-7 text-emerald-pro-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">{campaignData.name}</h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-pro-400/10 text-emerald-pro-400 border border-emerald-pro-400/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-pro-400 animate-pulse" />
                    Active
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{campaignData.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Created {campaignData.createdAt}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {campaignData.totalLeads.toLocaleString()} leads
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <GitBranch className="h-3 w-3" />
                    {campaignData.sequences} sequences
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-energy-orange/30 text-energy-orange hover:bg-energy-orange/10">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-6 gap-4 mb-6">
          {[
            { label: "Sent", value: campaignData.metrics.sent.toLocaleString(), icon: Send, color: "emerald-pro-600" },
            { label: "Delivered", value: `${campaignData.metrics.deliverabilityRate}%`, sublabel: campaignData.metrics.delivered.toLocaleString(), icon: CheckCircle2, status: getMetricStatus(campaignData.metrics.deliverabilityRate, 90, 85) },
            { label: "Opened", value: `${campaignData.metrics.openRate}%`, sublabel: campaignData.metrics.opened.toLocaleString(), icon: Eye, status: getMetricStatus(campaignData.metrics.openRate, 30, 15) },
            { label: "Clicked", value: `${campaignData.metrics.clickRate}%`, sublabel: campaignData.metrics.clicked.toLocaleString(), icon: MousePointer, color: "emerald-pro-500" },
            { label: "Replied", value: `${campaignData.metrics.replyRate}%`, sublabel: campaignData.metrics.replied.toLocaleString(), icon: MessageSquare, status: getMetricStatus(campaignData.metrics.replyRate, 3, 1) },
            { label: "Meetings", value: campaignData.metrics.meetings.toString(), sublabel: `${campaignData.metrics.meetingRate}%`, icon: Calendar, color: "energy-orange" },
          ].map((metric) => {
            const metricStatus = metric.status ? statusColors[metric.status] : null;
            return (
              <div
                key={metric.label}
                className="glass-premium p-4 hover:border-emerald-pro-600/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200 group overflow-hidden"
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-pro-600 to-emerald-pro-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">{metric.label}</p>
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg border",
                    metricStatus ? `${metricStatus.bg} ${metricStatus.border}` :
                    metric.color === "emerald-pro-600" ? "bg-emerald-pro-600/10 border-emerald-pro-600/20" :
                    metric.color === "emerald-pro-500" ? "bg-emerald-pro-500/10 border-emerald-pro-500/20" :
                    "bg-energy-orange/10 border-energy-orange/20"
                  )}>
                    <metric.icon className={cn(
                      "h-4 w-4",
                      metricStatus ? metricStatus.text :
                      metric.color === "emerald-pro-600" ? "text-emerald-pro-600" :
                      metric.color === "emerald-pro-500" ? "text-emerald-pro-500" :
                      "text-energy-orange"
                    )} />
                  </div>
                </div>
                <p className={cn(
                  "text-2xl font-sora font-bold",
                  metricStatus ? metricStatus.text : "text-slate-900 dark:text-white"
                )}>
                  {metric.value}
                </p>
                {metric.sublabel && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{metric.sublabel} total</p>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Health Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Bounce Rate", value: campaignData.metrics.bounceRate, target: 2, warning: 5, unit: "%", inverse: true },
            { label: "Unsubscribe Rate", value: (campaignData.metrics.unsubscribed / campaignData.metrics.sent * 100).toFixed(2), target: 0.5, warning: 1, unit: "%", inverse: true },
            { label: "Complaint Rate", value: campaignData.metrics.complaintRate, target: 0.05, warning: 0.1, unit: "%", inverse: true },
          ].map((metric) => {
            const status = getMetricStatus(Number(metric.value), metric.target, metric.warning, metric.inverse);
            const colors = statusColors[status];
            return (
              <div
                key={metric.label}
                className={cn(
                  "rounded-xl border p-4",
                  colors.border,
                  colors.bg.replace("/10", "/5")
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</span>
                  <span className={cn("text-xs font-medium", colors.text)}>
                    Target: {"<"}{metric.target}{metric.unit}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <p className={cn("text-2xl font-sora font-bold", colors.text)}>
                    {metric.value}{metric.unit}
                  </p>
                  {status === "success" ? (
                    <CheckCircle2 className={cn("h-5 w-5", colors.text)} />
                  ) : status === "warning" ? (
                    <AlertTriangle className={cn("h-5 w-5", colors.text)} />
                  ) : (
                    <XCircle className={cn("h-5 w-5", colors.text)} />
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex items-center gap-1 p-1 rounded-xl bg-light-bg-secondary dark:bg-midnight-blue/50 border border-emerald-pro-600/10 w-fit mb-6">
          {[
            { id: "overview", label: "Performance Overview", icon: BarChart3 },
            { id: "sequences", label: "Sequences", icon: GitBranch },
            { id: "activity", label: "Recent Activity", icon: Zap },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-emerald-pro-600/10 text-emerald-pro-600 border border-emerald-pro-600/20"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/5"
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
            {/* Daily Performance Chart */}
            <div className="col-span-2 glass-premium p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-slate-900 dark:text-white">Daily Performance</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-pro-600"></span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Sent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-pro-500"></span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Opened</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-pro-400"></span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Replied</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-3 h-48">
                {dailyPerformance.map((day) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5 items-end" style={{ height: "140px" }}>
                      <div
                        className="flex-1 bg-emerald-pro-600/40 rounded-t hover:bg-emerald-pro-600/60 transition-all"
                        style={{ height: `${(day.sent / maxSent) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-emerald-pro-500/40 rounded-t hover:bg-emerald-pro-500/60 transition-all"
                        style={{ height: `${(day.opened / maxSent) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-emerald-pro-400/40 rounded-t hover:bg-emerald-pro-400/60 transition-all"
                        style={{ height: `${(day.replied / maxSent) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">{day.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sequence Summary */}
            <div className="glass-premium p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Sequence Performance</h3>
              <div className="space-y-3">
                {sequences.map((seq) => (
                  <div
                    key={seq.id}
                    className="p-3 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-emerald-pro-600/10 text-emerald-pro-600 border border-emerald-pro-600/20">
                          {seq.step}
                        </span>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{seq.name}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Open Rate</span>
                        <p className="text-slate-900 dark:text-white font-medium">{seq.openRate}%</p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Reply Rate</span>
                        <p className="text-emerald-pro-400 font-medium">{seq.replyRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Sequences Tab */}
        {activeTab === "sequences" && (
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-white">Campaign Sequences</h3>
              <Button size="sm" className="bg-emerald-pro-600/10 text-emerald-pro-600 hover:bg-emerald-pro-600/20 border border-emerald-pro-600/20">
                <Plus className="h-4 w-4 mr-2" />
                Add Sequence
              </Button>
            </div>

            <div className="glass-premium overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald-pro-600/10">
                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Step</th>
                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Name</th>
                    <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Sent</th>
                    <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Opened</th>
                    <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Replied</th>
                    <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Open Rate</th>
                    <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Reply Rate</th>
                    <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-pro-600/5">
                  {sequences.map((seq) => (
                    <tr key={seq.id} className="hover:bg-emerald-pro-600/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm px-3 py-1 rounded-lg bg-emerald-pro-600/10 text-emerald-pro-600 border border-emerald-pro-600/20">
                          Step {seq.step}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-900 dark:text-white">{seq.name}</p>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-slate-900 dark:text-white">{seq.sent.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-slate-900 dark:text-white">{seq.opened.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-emerald-pro-400 font-medium">{seq.replied}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-slate-900 dark:text-white font-medium">{seq.openRate}%</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={cn(
                          "text-sm font-semibold",
                          seq.replyRate >= 5 ? "text-emerald-pro-400" : seq.replyRate >= 3 ? "text-energy-orange" : "text-slate-500 dark:text-slate-400"
                        )}>
                          {seq.replyRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <motion.div variants={itemVariants} className="glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
              <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activityIcons[activity.type];
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/50 hover:border-emerald-pro-600/20 transition-all"
                  >
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border",
                      activity.type === "reply" && "bg-emerald-pro-400/10 border-emerald-pro-400/20",
                      activity.type === "meeting" && "bg-emerald-pro-500/10 border-emerald-pro-500/20",
                      activity.type === "open" && "bg-emerald-pro-600/10 border-emerald-pro-600/20",
                      activity.type === "click" && "bg-energy-orange/10 border-energy-orange/20"
                    )}>
                      <Icon className={cn(
                        "h-5 w-5",
                        activity.type === "reply" && "text-emerald-pro-400",
                        activity.type === "meeting" && "text-emerald-pro-500",
                        activity.type === "open" && "text-emerald-pro-600",
                        activity.type === "click" && "text-energy-orange"
                      )} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900 dark:text-white">{activity.lead}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">at {activity.company}</span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{activity.message}</p>
                    </div>
                    <Link
                      href={`/dashboard/leads/lead-001`}
                      className="p-2 text-slate-500 dark:text-slate-400 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
