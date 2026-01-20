import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download } from "lucide-react";
import { type Campaign } from "@/types";

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
  {
    id: "5",
    name: "Q4 2023 Retargeting",
    status: "completed",
    createdAt: "2023-10-01T00:00:00Z",
    updatedAt: "2023-12-31T00:00:00Z",
    metrics: {
      sent: 25000,
      delivered: 23750,
      opened: 8312,
      replied: 712,
      bounced: 500,
      complaints: 5,
      deliverabilityRate: 95.0,
      openRate: 35.0,
      replyRate: 3.0,
      bounceRate: 2.0,
      complaintRate: 0.02,
    },
  },
];

export default function CampaignsPage() {
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length;
  const totalSent = mockCampaigns.reduce((sum, c) => sum + c.metrics.sent, 0);

  return (
    <div className="min-h-screen">
      <Header title="Campaigns" subtitle={`${activeCampaigns} active campaigns`} />

      <div className="p-6 space-y-6">
        {/* Action bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          <Link href="/dashboard/campaigns/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          </Link>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Campaigns", value: mockCampaigns.length },
            { label: "Active", value: activeCampaigns },
            { label: "Total Sent", value: totalSent.toLocaleString() },
            { label: "Avg Open Rate", value: "32.5%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-lg border border-graphite bg-midnight-blue/40 p-4"
            >
              <p className="text-sm text-steel">{stat.label}</p>
              <p className="text-2xl font-sora font-bold text-white mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Campaign table */}
        <CampaignTable campaigns={mockCampaigns} />
      </div>
    </div>
  );
}
