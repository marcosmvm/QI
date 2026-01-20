import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Play,
  Pause,
  Settings,
  Mail,
  Eye,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for a single campaign
const mockCampaign = {
  id: "1",
  name: "Q1 Enterprise Outreach",
  status: "active" as const,
  createdAt: "2024-01-15T00:00:00Z",
  updatedAt: "2024-01-19T00:00:00Z",
  description: "Targeting enterprise decision-makers in the tech industry for Q1 pipeline generation.",
  targetIndustry: "Technology",
  targetRole: "VP of Sales, CRO, Head of Growth",
  totalLeads: 15000,
  sequences: [
    { step: 1, subject: "Quick question about {{company}}'s growth", delay: 0, sent: 12450, opened: 4281, replied: 312 },
    { step: 2, subject: "Following up on my last email", delay: 3, sent: 8200, opened: 2624, replied: 124 },
    { step: 3, subject: "One last thing...", delay: 5, sent: 5100, opened: 1428, replied: 62 },
  ],
  metrics: {
    sent: 12450,
    delivered: 11892,
    opened: 4281,
    replied: 498,
    bounced: 186,
    complaints: 3,
    deliverabilityRate: 95.5,
    openRate: 36.0,
    replyRate: 4.2,
    bounceRate: 1.5,
    complaintRate: 0.02,
  },
};

const mockChartData = [
  { date: "Jan 15", sent: 2500, opened: 875, replied: 100 },
  { date: "Jan 16", sent: 2200, opened: 770, replied: 88 },
  { date: "Jan 17", sent: 2400, opened: 864, replied: 96 },
  { date: "Jan 18", sent: 2800, opened: 1008, replied: 112 },
  { date: "Jan 19", sent: 2550, opened: 918, replied: 102 },
];

const statusConfig = {
  draft: { label: "Draft", className: "bg-steel/20 text-steel", icon: Clock },
  active: { label: "Active", className: "bg-neon-mint/20 text-neon-mint", icon: Play },
  paused: { label: "Paused", className: "bg-energy-orange/20 text-energy-orange", icon: Pause },
  completed: { label: "Completed", className: "bg-quantum-violet/20 text-quantum-violet", icon: CheckCircle },
};

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = mockCampaign; // In real app, fetch based on params.id
  const status = statusConfig[campaign.status];
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen">
      <Header title={campaign.name} subtitle={`Campaign ID: ${params.id}`} />

      <div className="p-6 space-y-6">
        {/* Back link and actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/campaigns"
            className="flex items-center gap-2 text-steel hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to campaigns
          </Link>
          <div className="flex items-center gap-3">
            {campaign.status === "active" ? (
              <Button variant="outline" size="sm" className="gap-2">
                <Pause className="h-4 w-4" />
                Pause Campaign
              </Button>
            ) : campaign.status === "paused" || campaign.status === "draft" ? (
              <Button variant="outline" size="sm" className="gap-2">
                <Play className="h-4 w-4" />
                {campaign.status === "draft" ? "Launch Campaign" : "Resume Campaign"}
              </Button>
            ) : null}
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Campaign overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status and description */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium", status.className)}>
                      <StatusIcon className="h-4 w-4" />
                      {status.label}
                    </span>
                    <span className="text-sm text-steel">
                      Created {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-silver">{campaign.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-graphite">
                <div>
                  <p className="text-sm text-steel mb-1">Target Industry</p>
                  <p className="text-white font-medium">{campaign.targetIndustry}</p>
                </div>
                <div>
                  <p className="text-sm text-steel mb-1">Target Roles</p>
                  <p className="text-white font-medium">{campaign.targetRole}</p>
                </div>
              </div>
            </div>

            {/* Performance chart */}
            <PerformanceChart data={mockChartData} title="Campaign Performance" />

            {/* Email sequences */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <h3 className="text-lg font-sora font-semibold text-white mb-4">
                Email Sequences
              </h3>
              <div className="space-y-3">
                {campaign.sequences.map((seq) => (
                  <div
                    key={seq.step}
                    className="flex items-center gap-4 rounded-lg border border-graphite bg-deep-space/50 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-cyan/10 border border-electric-cyan/20">
                      <span className="text-sm font-mono font-bold text-electric-cyan">
                        {seq.step}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{seq.subject}</p>
                      <p className="text-sm text-steel">
                        {seq.delay === 0 ? "Sent immediately" : `Sent after ${seq.delay} days`}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-steel">Sent</p>
                        <p className="text-white font-medium">{seq.sent.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-steel">Opened</p>
                        <p className="text-white font-medium">{seq.opened.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-steel">Replied</p>
                        <p className="text-white font-medium">{seq.replied.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar stats */}
          <div className="space-y-6">
            {/* Key metrics */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <h3 className="text-lg font-sora font-semibold text-white mb-4">
                Key Metrics
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Users, label: "Total Leads", value: campaign.totalLeads.toLocaleString() },
                  { icon: Mail, label: "Emails Sent", value: campaign.metrics.sent.toLocaleString() },
                  { icon: Eye, label: "Open Rate", value: `${campaign.metrics.openRate}%`, status: campaign.metrics.openRate >= 30 ? "success" : "warning" },
                  { icon: MessageSquare, label: "Reply Rate", value: `${campaign.metrics.replyRate}%`, status: campaign.metrics.replyRate >= 3 ? "success" : "warning" },
                  { icon: Target, label: "Deliverability", value: `${campaign.metrics.deliverabilityRate}%`, status: campaign.metrics.deliverabilityRate >= 90 ? "success" : "warning" },
                  { icon: AlertTriangle, label: "Bounce Rate", value: `${campaign.metrics.bounceRate}%`, status: campaign.metrics.bounceRate <= 2 ? "success" : "warning" },
                ].map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <metric.icon className="h-4 w-4 text-steel" />
                      <span className="text-steel">{metric.label}</span>
                    </div>
                    <span
                      className={cn(
                        "font-medium",
                        metric.status === "success"
                          ? "text-neon-mint"
                          : metric.status === "warning"
                          ? "text-energy-orange"
                          : "text-white"
                      )}
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <h3 className="text-lg font-sora font-semibold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Mail className="h-4 w-4" />
                  View Email Templates
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Manage Lead List
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  View Replies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
