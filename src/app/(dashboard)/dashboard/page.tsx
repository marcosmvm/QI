import { Header } from "@/components/navigation/Header";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { EngineStatus } from "@/components/dashboard/EngineStatus";
import { Mail, Eye, MessageSquare, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { type Campaign, type EngineStatus as EngineStatusType } from "@/types";

// Mock data - replace with real API calls
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q1 Enterprise Outreach",
    status: "active",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
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
  },
  {
    id: "2",
    name: "SaaS Decision Makers",
    status: "active",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
    metrics: {
      sent: 8320,
      delivered: 7904,
      opened: 2529,
      replied: 267,
      bounced: 166,
      complaints: 2,
      deliverabilityRate: 95.0,
      openRate: 32.0,
      replyRate: 3.4,
      bounceRate: 2.0,
      complaintRate: 0.03,
    },
  },
  {
    id: "3",
    name: "Healthcare IT Leaders",
    status: "paused",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
    metrics: {
      sent: 5640,
      delivered: 5245,
      opened: 1311,
      replied: 105,
      bounced: 169,
      complaints: 1,
      deliverabilityRate: 93.0,
      openRate: 25.0,
      replyRate: 2.0,
      bounceRate: 3.0,
      complaintRate: 0.02,
    },
  },
  {
    id: "4",
    name: "Fintech CFOs",
    status: "draft",
    createdAt: "2024-01-19T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
    metrics: {
      sent: 0,
      delivered: 0,
      opened: 0,
      replied: 0,
      bounced: 0,
      complaints: 0,
      deliverabilityRate: 0,
      openRate: 0,
      replyRate: 0,
      bounceRate: 0,
      complaintRate: 0,
    },
  },
];

const mockChartData = [
  { date: "Jan 13", sent: 1200, opened: 420, replied: 48 },
  { date: "Jan 14", sent: 1350, opened: 486, replied: 54 },
  { date: "Jan 15", sent: 1100, opened: 385, replied: 41 },
  { date: "Jan 16", sent: 1450, opened: 551, replied: 62 },
  { date: "Jan 17", sent: 1600, opened: 592, replied: 71 },
  { date: "Jan 18", sent: 1280, opened: 448, replied: 52 },
  { date: "Jan 19", sent: 1520, opened: 562, replied: 68 },
];

const mockEngineStatus: EngineStatusType[] = [
  { name: "Guardian", codename: "A", status: "operational", lastCheck: new Date().toISOString() },
  { name: "Architect", codename: "B", status: "operational", lastCheck: new Date().toISOString() },
  { name: "Scientist", codename: "C", status: "operational", lastCheck: new Date().toISOString() },
  { name: "Hunter", codename: "G", status: "operational", lastCheck: new Date().toISOString() },
  { name: "Sentinel", codename: "H", status: "operational", lastCheck: new Date().toISOString() },
];

// Calculate aggregate metrics
const totalSent = mockCampaigns.reduce((sum, c) => sum + c.metrics.sent, 0);
const totalOpened = mockCampaigns.reduce((sum, c) => sum + c.metrics.opened, 0);
const totalReplied = mockCampaigns.reduce((sum, c) => sum + c.metrics.replied, 0);
const avgDeliverability = mockCampaigns
  .filter((c) => c.metrics.sent > 0)
  .reduce((sum, c) => sum + c.metrics.deliverabilityRate, 0) /
  mockCampaigns.filter((c) => c.metrics.sent > 0).length;

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" subtitle="Welcome back, Marcos" />

      <div className="p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard
            title="Total Emails Sent"
            value={totalSent.toLocaleString()}
            change={12.5}
            status="success"
            icon={Mail}
          />
          <MetricsCard
            title="Avg Open Rate"
            value={(totalOpened / totalSent * 100).toFixed(1)}
            suffix="%"
            change={8.2}
            status="success"
            icon={Eye}
          />
          <MetricsCard
            title="Total Replies"
            value={totalReplied.toLocaleString()}
            change={15.3}
            status="success"
            icon={MessageSquare}
          />
          <MetricsCard
            title="Avg Deliverability"
            value={avgDeliverability.toFixed(1)}
            suffix="%"
            change={2.1}
            status="success"
            icon={CheckCircle}
          />
        </div>

        {/* Charts and Engine Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart data={mockChartData} title="7-Day Performance" />
          </div>
          <div>
            <EngineStatus engines={mockEngineStatus} />
          </div>
        </div>

        {/* Campaign Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-sora font-semibold text-white">
              Active Campaigns
            </h2>
            <a
              href="/dashboard/campaigns"
              className="text-sm text-electric-cyan hover:underline"
            >
              View all campaigns →
            </a>
          </div>
          <CampaignTable campaigns={mockCampaigns} />
        </div>
      </div>
    </div>
  );
}
