"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/dashboard";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

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
  X,
  Loader2,
} from "lucide-react";

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
    recipients: ["marcos@xgrowthos.com"],
    lastSent: "Jan 20, 2026",
    enabled: true,
    type: "weekly",
  },
  {
    id: "sr-2",
    name: "Monthly Executive Report",
    frequency: "1st of every month",
    recipients: ["marcos@xgrowthos.com", "team@xgrowthos.com"],
    lastSent: "Jan 1, 2026",
    enabled: true,
    type: "monthly",
  },
  {
    id: "sr-3",
    name: "Daily Deliverability Alert",
    frequency: "Daily at 6:00 PM",
    recipients: ["marcos@xgrowthos.com"],
    lastSent: "Jan 19, 2026",
    enabled: false,
    type: "daily",
  },
  {
    id: "sr-4",
    name: "Campaign Performance Digest",
    frequency: "Every Friday at 5:00 PM",
    recipients: ["marcos@xgrowthos.com"],
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [previewReport, setPreviewReport] = useState<typeof weeklyReports[0] | null>(null);

  // Generate new report
  const handleGenerateReport = useCallback(async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    alert("Report generation started! It will be available in a few minutes.");
  }, []);

  // Export report to various formats
  const handleExport = useCallback((format: "pdf" | "xlsx" | "csv") => {
    const report = selectedReport;
    const filename = `report-${report.date.replace(/\s/g, "-").toLowerCase()}.${format}`;

    if (format === "csv") {
      const csvContent = `Report: ${report.title}\nDate: ${report.date}\n\nMetrics\nSent,${report.metrics.sent}\nOpen Rate,${report.metrics.openRate}%\nReply Rate,${report.metrics.replyRate}%\nMeetings,${report.metrics.meetings}`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } else {
      // For PDF and XLSX, show a message (would connect to backend in production)
      alert(`Downloading ${filename}... This will be connected to the report generation service.`);
    }
  }, [selectedReport]);

  // View report (open preview modal)
  const handleViewReport = useCallback((report: typeof weeklyReports[0]) => {
    setPreviewReport(report);
    setShowReportPreview(true);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">Reports</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Reports</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Automated reports and performance insights</p>
      </motion.div>

      <div className="space-y-6">
        {/* Quick Stats - Using MetricsCard */}
        <div className="grid grid-cols-4 gap-6">
          <MetricsCard
            title="Reports Generated"
            value={24}
            change={12}
            accent="cyan"
            delay={0}
          />
          <MetricsCard
            title="Scheduled Reports"
            value={4}
            accent="violet"
            delay={0.1}
          />
          <MetricsCard
            title="Avg Open Rate"
            value={33.5}
            suffix="%"
            change={2.3}
            accent="mint"
            delay={0.2}
          />
          <MetricsCard
            title="Avg Reply Rate"
            value={3.6}
            suffix="%"
            change={0.4}
            accent="orange"
            delay={0.3}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-light-bg-secondary dark:bg-midnight-blue/50 border border-emerald-pro-600/10">
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
                    ? "bg-emerald-pro-600/10 text-emerald-pro-600"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Custom Range
              </Button>
              <AnimatePresence>
                {showDatePicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-72 rounded-xl border border-emerald-pro-600/20 bg-light-bg-secondary dark:bg-midnight-blue/95 backdrop-blur-xl p-4 shadow-xl z-50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Select Date Range</span>
                      <button onClick={() => setShowDatePicker(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Start Date</label>
                        <input
                          type="date"
                          className="w-full h-9 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-3 text-sm text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">End Date</label>
                        <input
                          type="date"
                          className="w-full h-9 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-3 text-sm text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
                        />
                      </div>
                      <Button
                        className="w-full"
                        size="sm"
                        onClick={() => {
                          setShowDatePicker(false);
                          setActiveTab("custom");
                        }}
                      >
                        Apply Range
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-pro-600 to-cyan-dark hover:from-cyan-light hover:to-emerald-pro-600 text-deep-space font-semibold"
              onClick={handleGenerateReport}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Reports List */}
          <div className="col-span-2 space-y-6">
            {/* Reports Table */}
            <div className="glass-premium overflow-hidden">
              <div className="px-6 py-4 border-b border-emerald-pro-600/10">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {activeTab === "weekly" ? "Weekly Reports" : activeTab === "monthly" ? "Monthly Reports" : "Custom Reports"}
                </h3>
              </div>

              <div className="divide-y divide-emerald-pro-600/5">
                {(activeTab === "weekly" ? weeklyReports : monthlyReports).map((report) => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report as typeof selectedReport)}
                    className={cn(
                      "flex items-center justify-between p-4 hover:bg-emerald-pro-600/5 transition-colors cursor-pointer",
                      selectedReport.id === report.id && "bg-emerald-pro-600/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl border",
                        report.status === "ready"
                          ? "bg-emerald-pro-600/10 border-emerald-pro-600/20"
                          : "bg-energy-orange/10 border-energy-orange/20"
                      )}>
                        <FileText className={cn(
                          "h-6 w-6",
                          report.status === "ready" ? "text-emerald-pro-600" : "text-energy-orange"
                        )} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{report.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{report.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Sent</p>
                          <p className="text-slate-900 dark:text-white font-medium">{report.metrics.sent.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Open Rate</p>
                          <p className="text-slate-900 dark:text-white font-medium">{report.metrics.openRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Reply Rate</p>
                          <p className="text-emerald-pro-400 font-medium">{report.metrics.replyRate}%</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {report.status === "ready" ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewReport(report as typeof selectedReport);
                              }}
                            >
                              View
                            </Button>
                            <button
                              className="p-2 text-slate-500 dark:text-slate-400 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedReport(report as typeof selectedReport);
                                handleExport("pdf");
                              }}
                            >
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
            <div className="glass-premium p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Report Preview</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{selectedReport.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
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
                    className="p-4 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <div className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        metric.trend === "up" ? "text-emerald-pro-400" : "text-rose"
                      )}>
                        {metric.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                    <p className="text-2xl font-sora font-bold text-slate-900 dark:text-white">{metric.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Key Insights */}
              <div className="p-4 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/50">
                <h4 className="font-medium text-slate-900 dark:text-white mb-4">Key Insights</h4>
                <div className="space-y-3">
                  {latestInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-lg mt-0.5",
                        insight.type === "positive" && "bg-emerald-pro-400/10",
                        insight.type === "warning" && "bg-energy-orange/10",
                        insight.type === "neutral" && "bg-emerald-pro-600/10"
                      )}>
                        {insight.type === "positive" ? (
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-pro-400" />
                        ) : insight.type === "warning" ? (
                          <AlertCircle className="h-3.5 w-3.5 text-energy-orange" />
                        ) : (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-pro-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{insight.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{insight.description}</p>
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
            <div className="glass-premium p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">Scheduled Reports</h3>
                <Button variant="ghost" size="sm" className="text-emerald-pro-600 hover:bg-emerald-pro-600/10">
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
                        ? "border-emerald-pro-600/10 bg-white dark:bg-deep-space/50"
                        : "border-emerald-pro-600/5 bg-white dark:bg-deep-space/30 opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{report.name}</p>
                      <div className={cn(
                        "h-2 w-2 rounded-full mt-1.5",
                        report.enabled ? "bg-emerald-pro-400" : "bg-steel"
                      )} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <Clock className="h-3 w-3" />
                      {report.frequency}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {report.recipients.length} recipient{report.recipients.length > 1 ? "s" : ""}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Last: {report.lastSent}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Schedule
              </Button>
            </div>

            {/* Export Options */}
            <div className="glass-premium p-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Export Options</h3>
              <div className="space-y-2">
                {[
                  { label: "PDF Report", format: "pdf" as const, icon: FileText, description: "Formatted report with charts" },
                  { label: "Excel Spreadsheet", format: "xlsx" as const, icon: FileSpreadsheet, description: "Raw data with all metrics" },
                  { label: "CSV Data", format: "csv" as const, icon: FileType, description: "Plain data export" },
                ].map((option) => (
                  <button
                    key={option.format}
                    onClick={() => handleExport(option.format)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/50 text-left hover:border-emerald-pro-600/30 hover:bg-emerald-pro-600/5 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/20 group-hover:bg-emerald-pro-600/20 transition-colors">
                      <option.icon className="h-5 w-5 text-emerald-pro-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{option.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{option.description}</p>
                    </div>
                    <Download className="h-4 w-4 text-slate-500 dark:text-slate-400 group-hover:text-emerald-pro-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-premium p-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  onClick={() => alert("This will email the latest report. Connect to email service in production.")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Latest Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  onClick={() => alert("Report comparison feature coming soon!")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare Reports
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-emerald-pro-600/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  onClick={() => alert("Alert threshold configuration coming soon!")}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Set Alert Thresholds
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Report Preview Modal */}
        <AnimatePresence>
          {showReportPreview && previewReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="absolute inset-0 bg-white dark:bg-deep-space/80 backdrop-blur-sm"
                onClick={() => setShowReportPreview(false)}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-emerald-pro-600/20 bg-gradient-to-br from-midnight-blue to-deep-space p-6 shadow-2xl"
              >
                <button
                  onClick={() => setShowReportPreview(false)}
                  className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-emerald-pro-600/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">{previewReport.title}</h2>
                  <p className="text-slate-500 dark:text-slate-400">{previewReport.date}</p>
                </div>

                {/* Report Metrics Grid */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/50">
                    <Mail className="h-5 w-5 text-emerald-pro-600 mb-2" />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{previewReport.metrics.sent.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Emails Sent</p>
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-pro-400/20 bg-emerald-pro-400/5">
                    <Eye className="h-5 w-5 text-emerald-pro-400 mb-2" />
                    <p className="text-2xl font-bold text-emerald-pro-400">{previewReport.metrics.openRate}%</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Open Rate</p>
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-pro-500/20 bg-emerald-pro-500/5">
                    <MessageSquare className="h-5 w-5 text-emerald-pro-500 mb-2" />
                    <p className="text-2xl font-bold text-emerald-pro-500">{previewReport.metrics.replyRate}%</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Reply Rate</p>
                  </div>
                  <div className="p-4 rounded-xl border border-energy-orange/20 bg-energy-orange/5">
                    <Calendar className="h-5 w-5 text-energy-orange mb-2" />
                    <p className="text-2xl font-bold text-energy-orange">{previewReport.metrics.meetings || 0}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Meetings Booked</p>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="p-4 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/50 mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Key Insights</h4>
                  <div className="space-y-3">
                    {latestInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-lg mt-0.5",
                          insight.type === "positive" && "bg-emerald-pro-400/10",
                          insight.type === "warning" && "bg-energy-orange/10",
                          insight.type === "neutral" && "bg-emerald-pro-600/10"
                        )}>
                          {insight.type === "positive" ? (
                            <TrendingUp className="h-3.5 w-3.5 text-emerald-pro-400" />
                          ) : insight.type === "warning" ? (
                            <AlertCircle className="h-3.5 w-3.5 text-energy-orange" />
                          ) : (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-pro-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{insight.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{insight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Actions */}
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedReport(previewReport);
                      handleExport("pdf");
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={() => setShowReportPreview(false)}
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
