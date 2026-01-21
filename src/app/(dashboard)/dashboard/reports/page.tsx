"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Mail,
  Eye,
  MessageSquare,
  Clock,
  Filter,
  Plus,
  Settings,
  Share2,
  RefreshCw,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  PieChart,
  Target,
  Users,
  ArrowUpRight,
  FileSpreadsheet,
  FileType,
  Printer,
  Send,
  MoreHorizontal,
  Edit3,
  Trash2,
  Bell,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";

// Enhanced mock data
const weeklyReports = [
  {
    id: "1",
    title: "Weekly Performance Report",
    date: "Jan 13 - Jan 19, 2026",
    status: "ready",
    generatedAt: "Jan 20, 2026 at 9:00 AM",
    metrics: {
      sent: 12500,
      openRate: 34.2,
      replyRate: 3.8,
      meetings: 23,
    },
    insights: 5,
    trend: "up",
  },
  {
    id: "2",
    title: "Weekly Performance Report",
    date: "Jan 6 - Jan 12, 2026",
    status: "ready",
    generatedAt: "Jan 13, 2026 at 9:00 AM",
    metrics: {
      sent: 11200,
      openRate: 32.8,
      replyRate: 3.5,
      meetings: 18,
    },
    insights: 4,
    trend: "up",
  },
  {
    id: "3",
    title: "Weekly Performance Report",
    date: "Dec 30 - Jan 5, 2026",
    status: "ready",
    generatedAt: "Jan 6, 2026 at 9:00 AM",
    metrics: {
      sent: 9800,
      openRate: 31.5,
      replyRate: 3.2,
      meetings: 15,
    },
    insights: 3,
    trend: "down",
  },
  {
    id: "4",
    title: "Weekly Performance Report",
    date: "Dec 23 - Dec 29, 2025",
    status: "ready",
    generatedAt: "Dec 30, 2025 at 9:00 AM",
    metrics: {
      sent: 8500,
      openRate: 29.8,
      replyRate: 2.9,
      meetings: 12,
    },
    insights: 2,
    trend: "down",
  },
];

const monthlyReports = [
  {
    id: "m1",
    title: "Monthly Executive Summary",
    date: "January 2026",
    status: "generating",
    metrics: {
      sent: 45000,
      openRate: 33.5,
      replyRate: 3.6,
      meetings: 78,
    },
  },
  {
    id: "m2",
    title: "Monthly Executive Summary",
    date: "December 2025",
    status: "ready",
    metrics: {
      sent: 42000,
      openRate: 31.2,
      replyRate: 3.2,
      meetings: 65,
    },
  },
];

const scheduledReports = [
  {
    id: "sr-1",
    name: "Weekly Performance Summary",
    frequency: "Every Monday at 9:00 AM",
    recipients: ["marcos@quantuminsights.io"],
    lastSent: "Jan 20, 2026",
    enabled: true,
    type: "weekly",
  },
  {
    id: "sr-2",
    name: "Monthly Executive Report",
    frequency: "1st of every month",
    recipients: ["marcos@quantuminsights.io", "team@quantuminsights.io"],
    lastSent: "Jan 1, 2026",
    enabled: true,
    type: "monthly",
  },
  {
    id: "sr-3",
    name: "Daily Deliverability Alert",
    frequency: "Daily at 6:00 PM",
    recipients: ["marcos@quantuminsights.io"],
    lastSent: "Jan 19, 2026",
    enabled: false,
    type: "daily",
  },
  {
    id: "sr-4",
    name: "Campaign Performance Digest",
    frequency: "Every Friday at 5:00 PM",
    recipients: ["marcos@quantuminsights.io"],
    lastSent: "Jan 17, 2026",
    enabled: true,
    type: "weekly",
  },
];

// Latest report insights
const latestInsights = [
  {
    type: "positive",
    title: "Open rates increased by 4.3%",
    description: "Driven by improved subject lines using the A/B testing from Scientist Engine.",
  },
  {
    type: "positive",
    title: "Reply rates hit a 3-month high",
    description: "3.8% reply rate with 45% positive sentiment across all campaigns.",
  },
  {
    type: "positive",
    title: "Top performer identified",
    description: "Q1 Enterprise Outreach campaign achieving 36% open rate and 4.2% reply rate.",
  },
  {
    type: "warning",
    title: "Healthcare Tech DMs underperforming",
    description: "25% open rate is below target. Recommend subject line optimization.",
  },
  {
    type: "neutral",
    title: "Optimal send time confirmed",
    description: "Tuesday-Thursday, 9-11 AM EST continues to show best engagement.",
  },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "custom">("weekly");
  const [selectedReport, setSelectedReport] = useState(weeklyReports[0]);

  return (
    <div className="min-h-screen bg-deep-space p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-steel mb-2">
          <Link href="/dashboard" className="hover:text-electric-cyan transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-white">Reports</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-white">Automated reports and performance insights</h1>
      </div>

      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Reports Generated", value: "24", sublabel: "This month", icon: FileText, color: "electric-cyan" },
            { label: "Scheduled Reports", value: "4", sublabel: "3 active", icon: CalendarDays, color: "quantum-violet" },
            { label: "Avg Open Rate", value: "33.5%", sublabel: "+2.3% vs last month", icon: Eye, color: "neon-mint" },
            { label: "Avg Reply Rate", value: "3.6%", sublabel: "+0.4% vs last month", icon: MessageSquare, color: "energy-orange" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-4 hover:border-electric-cyan/20 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-steel">{stat.label}</p>
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border",
                  stat.color === "electric-cyan" && "bg-electric-cyan/10 border-electric-cyan/20",
                  stat.color === "quantum-violet" && "bg-quantum-violet/10 border-quantum-violet/20",
                  stat.color === "neon-mint" && "bg-neon-mint/10 border-neon-mint/20",
                  stat.color === "energy-orange" && "bg-energy-orange/10 border-energy-orange/20"
                )}>
                  <stat.icon className={cn(
                    "h-4 w-4",
                    stat.color === "electric-cyan" && "text-electric-cyan",
                    stat.color === "quantum-violet" && "text-quantum-violet",
                    stat.color === "neon-mint" && "text-neon-mint",
                    stat.color === "energy-orange" && "text-energy-orange"
                  )} />
                </div>
              </div>
              <p className="text-2xl font-sora font-bold text-white">{stat.value}</p>
              <p className="text-xs text-steel mt-1">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-midnight-blue/50 border border-electric-cyan/10">
            {[
              { id: "weekly", label: "Weekly" },
              { id: "monthly", label: "Monthly" },
              { id: "custom", label: "Custom" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-electric-cyan/10 text-electric-cyan"
                    : "text-steel hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
            <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Reports List */}
          <div className="col-span-2 space-y-6">
            {/* Reports Table */}
            <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 overflow-hidden">
              <div className="px-6 py-4 border-b border-electric-cyan/10">
                <h3 className="font-semibold text-white">
                  {activeTab === "weekly" ? "Weekly Reports" : activeTab === "monthly" ? "Monthly Reports" : "Custom Reports"}
                </h3>
              </div>

              <div className="divide-y divide-electric-cyan/5">
                {(activeTab === "weekly" ? weeklyReports : monthlyReports).map((report) => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report as typeof selectedReport)}
                    className={cn(
                      "flex items-center justify-between p-4 hover:bg-electric-cyan/5 transition-colors cursor-pointer",
                      selectedReport.id === report.id && "bg-electric-cyan/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl border",
                        report.status === "ready"
                          ? "bg-electric-cyan/10 border-electric-cyan/20"
                          : "bg-energy-orange/10 border-energy-orange/20"
                      )}>
                        <FileText className={cn(
                          "h-6 w-6",
                          report.status === "ready" ? "text-electric-cyan" : "text-energy-orange"
                        )} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{report.title}</p>
                        <p className="text-sm text-steel">{report.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-xs text-steel">Sent</p>
                          <p className="text-white font-medium">{report.metrics.sent.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-steel">Open Rate</p>
                          <p className="text-white font-medium">{report.metrics.openRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-steel">Reply Rate</p>
                          <p className="text-neon-mint font-medium">{report.metrics.replyRate}%</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {report.status === "ready" ? (
                          <>
                            <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
                              View
                            </Button>
                            <button className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors">
                              <Download className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-lg bg-energy-orange/10 text-energy-orange border border-energy-orange/20">
                            Generating...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Preview */}
            <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Report Preview</h3>
                  <p className="text-sm text-steel">{selectedReport.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>

              {/* Metrics Summary */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Emails Sent", value: selectedReport.metrics.sent.toLocaleString(), icon: Mail, change: "+12%", trend: "up" },
                  { label: "Open Rate", value: `${selectedReport.metrics.openRate}%`, icon: Eye, change: "+4.3%", trend: "up" },
                  { label: "Reply Rate", value: `${selectedReport.metrics.replyRate}%`, icon: MessageSquare, change: "+8.6%", trend: "up" },
                  { label: "Meetings Booked", value: selectedReport.metrics.meetings?.toString() || "23", icon: Calendar, change: "+27.8%", trend: "up" },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="p-4 rounded-xl border border-electric-cyan/10 bg-deep-space/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className="h-4 w-4 text-steel" />
                      <div className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        metric.trend === "up" ? "text-neon-mint" : "text-rose"
                      )}>
                        {metric.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                    <p className="text-2xl font-sora font-bold text-white">{metric.value}</p>
                    <p className="text-xs text-steel mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Key Insights */}
              <div className="p-4 rounded-xl border border-electric-cyan/10 bg-deep-space/50">
                <h4 className="font-medium text-white mb-4">Key Insights</h4>
                <div className="space-y-3">
                  {latestInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-lg mt-0.5",
                        insight.type === "positive" && "bg-neon-mint/10",
                        insight.type === "warning" && "bg-energy-orange/10",
                        insight.type === "neutral" && "bg-electric-cyan/10"
                      )}>
                        {insight.type === "positive" ? (
                          <TrendingUp className="h-3.5 w-3.5 text-neon-mint" />
                        ) : insight.type === "warning" ? (
                          <AlertCircle className="h-3.5 w-3.5 text-energy-orange" />
                        ) : (
                          <CheckCircle2 className="h-3.5 w-3.5 text-electric-cyan" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{insight.title}</p>
                        <p className="text-xs text-steel">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scheduled Reports */}
            <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Scheduled Reports</h3>
                <Button variant="ghost" size="sm" className="text-electric-cyan hover:bg-electric-cyan/10">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {scheduledReports.map((report) => (
                  <div
                    key={report.id}
                    className={cn(
                      "p-3 rounded-xl border transition-all",
                      report.enabled
                        ? "border-electric-cyan/10 bg-deep-space/50"
                        : "border-electric-cyan/5 bg-deep-space/30 opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-white">{report.name}</p>
                      <div className={cn(
                        "h-2 w-2 rounded-full mt-1.5",
                        report.enabled ? "bg-neon-mint" : "bg-steel"
                      )} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-steel mb-1">
                      <Clock className="h-3 w-3" />
                      {report.frequency}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-steel">
                        {report.recipients.length} recipient{report.recipients.length > 1 ? "s" : ""}
                      </p>
                      <p className="text-[10px] text-steel">Last: {report.lastSent}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 border-electric-cyan/20 text-steel hover:text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Schedule
              </Button>
            </div>

            {/* Export Options */}
            <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-5">
              <h3 className="font-semibold text-white mb-4">Export Options</h3>
              <div className="space-y-2">
                {[
                  { label: "PDF Report", format: "PDF", icon: FileText, description: "Formatted report with charts" },
                  { label: "Excel Spreadsheet", format: "XLSX", icon: FileSpreadsheet, description: "Raw data with all metrics" },
                  { label: "CSV Data", format: "CSV", icon: FileType, description: "Plain data export" },
                ].map((option) => (
                  <button
                    key={option.format}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-electric-cyan/10 bg-deep-space/50 text-left hover:border-electric-cyan/30 hover:bg-electric-cyan/5 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-cyan/10 border border-electric-cyan/20 group-hover:bg-electric-cyan/20 transition-colors">
                      <option.icon className="h-5 w-5 text-electric-cyan" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{option.label}</p>
                      <p className="text-xs text-steel">{option.description}</p>
                    </div>
                    <Download className="h-4 w-4 text-steel group-hover:text-electric-cyan transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-5">
              <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-electric-cyan/20 text-steel hover:text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Latest Report
                </Button>
                <Button variant="outline" className="w-full justify-start border-electric-cyan/20 text-steel hover:text-white">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare Reports
                </Button>
                <Button variant="outline" className="w-full justify-start border-electric-cyan/20 text-steel hover:text-white">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Alert Thresholds
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
