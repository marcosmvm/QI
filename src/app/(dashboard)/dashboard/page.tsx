"use client";

import {
  MetricsCard,
  CampaignTable,
  PerformanceChart,
  EngineStatus,
} from "@/components/dashboard";
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
    <div className="min-h-screen p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-foreground-secondary mt-1">
          Campaign performance overview
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Emails Sent"
          value={totalSent.toLocaleString()}
          change={12.5}
        />
        <MetricsCard
          title="Open Rate"
          value={(totalOpened / totalSent * 100).toFixed(1)}
          suffix="%"
          change={8.2}
        />
        <MetricsCard
          title="Replies"
          value={totalReplied.toLocaleString()}
          change={15.3}
        />
        <MetricsCard
          title="Deliverability"
          value={avgDeliverability.toFixed(1)}
          suffix="%"
          change={2.1}
        />
      </div>

      {/* Chart Section */}
      <div className="mb-8">
        <PerformanceChart data={mockChartData} title="Weekly Performance" />
      </div>

      {/* Table and Engine Status */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <CampaignTable campaigns={mockCampaigns} />
        </div>
        <div className="col-span-4">
          <EngineStatus engines={mockEngineStatus} />
        </div>
      </div>
    </div>
  );
}
