import { Header } from "@/components/navigation/Header";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Mail,
  Eye,
  MessageSquare,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const weeklyReports = [
  {
    id: "1",
    title: "Weekly Performance Report",
    date: "Jan 15 - Jan 21, 2024",
    status: "ready",
    metrics: {
      sent: 12500,
      openRate: 34.2,
      replyRate: 3.8,
    },
  },
  {
    id: "2",
    title: "Weekly Performance Report",
    date: "Jan 8 - Jan 14, 2024",
    status: "ready",
    metrics: {
      sent: 11200,
      openRate: 32.8,
      replyRate: 3.5,
    },
  },
  {
    id: "3",
    title: "Weekly Performance Report",
    date: "Jan 1 - Jan 7, 2024",
    status: "ready",
    metrics: {
      sent: 9800,
      openRate: 31.5,
      replyRate: 3.2,
    },
  },
];

const scheduledReports = [
  {
    name: "Weekly Performance Summary",
    frequency: "Every Monday at 9:00 AM",
    recipients: ["marcos@quantuminsights.io"],
    enabled: true,
  },
  {
    name: "Monthly Executive Report",
    frequency: "1st of every month",
    recipients: ["marcos@quantuminsights.io", "team@quantuminsights.io"],
    enabled: true,
  },
  {
    name: "Daily Deliverability Alert",
    frequency: "Daily at 6:00 PM",
    recipients: ["marcos@quantuminsights.io"],
    enabled: false,
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen">
      <Header title="Reports" subtitle="Automated weekly reports and insights" />

      <div className="p-6 space-y-6">
        {/* Quick actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Custom Date Range
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export All
            </Button>
          </div>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly reports list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <h3 className="text-lg font-sora font-semibold text-white mb-6">
                Weekly Reports
              </h3>

              <div className="space-y-4">
                {weeklyReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-graphite bg-deep-space/50 hover:border-electric-cyan/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-electric-cyan/10 border border-electric-cyan/30">
                        <FileText className="h-6 w-6 text-electric-cyan" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{report.title}</p>
                        <p className="text-sm text-steel">{report.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-steel" />
                          <span className="text-silver">{report.metrics.sent.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-steel" />
                          <span className="text-silver">{report.metrics.openRate}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-steel" />
                          <span className="text-silver">{report.metrics.replyRate}%</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Report preview */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <h3 className="text-lg font-sora font-semibold text-white mb-6">
                Latest Report Preview
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Sent", value: "12,500", change: "+12%", icon: Mail },
                  { label: "Open Rate", value: "34.2%", change: "+4.3%", icon: Eye },
                  { label: "Reply Rate", value: "3.8%", change: "+8.6%", icon: MessageSquare },
                ].map((metric, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-graphite bg-deep-space/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className="h-5 w-5 text-steel" />
                      <span className="text-xs text-neon-mint">{metric.change}</span>
                    </div>
                    <p className="text-2xl font-sora font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-steel">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg border border-graphite bg-deep-space/50">
                <h4 className="font-medium text-white mb-3">Key Insights</h4>
                <ul className="space-y-2 text-sm text-silver">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-neon-mint mt-0.5 shrink-0" />
                    Open rates increased by 4.3% compared to last week, driven by improved subject lines.
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-neon-mint mt-0.5 shrink-0" />
                    Reply rates hit a 3-month high at 3.8%, with 45% positive sentiment.
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-neon-mint mt-0.5 shrink-0" />
                    Best performing campaign: "Q1 Enterprise Outreach" with 36% open rate.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scheduled reports */}
          <div className="space-y-6">
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-sora font-semibold text-white">
                  Scheduled Reports
                </h3>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>

              <div className="space-y-3">
                {scheduledReports.map((report, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border",
                      report.enabled
                        ? "border-graphite bg-deep-space/50"
                        : "border-graphite/50 bg-deep-space/30 opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-white">{report.name}</p>
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full mt-1.5",
                          report.enabled ? "bg-neon-mint" : "bg-steel"
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-steel mb-2">
                      <Clock className="h-4 w-4" />
                      {report.frequency}
                    </div>
                    <p className="text-xs text-steel">
                      {report.recipients.length} recipient{report.recipients.length > 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 gap-2">
                <Calendar className="h-4 w-4" />
                Add Scheduled Report
              </Button>
            </div>

            {/* Export options */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <h3 className="text-lg font-sora font-semibold text-white mb-4">
                Export Options
              </h3>
              <div className="space-y-2">
                {[
                  { label: "PDF Report", format: "PDF" },
                  { label: "Excel Spreadsheet", format: "XLSX" },
                  { label: "CSV Data", format: "CSV" },
                ].map((option, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-deep-space/50 text-sm text-silver hover:text-white hover:bg-deep-space transition-colors"
                  >
                    <span>{option.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-graphite text-steel">
                      {option.format}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
