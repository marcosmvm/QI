import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Mail,
  Search,
  Filter,
  Play,
  Pause,
  Eye,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import { CampaignsTable } from "./CampaignsTable";
import { calculateHealthScore } from "@/components/admin/ClientHealthBadge";

export const dynamic = "force-dynamic";

interface CampaignWithMetrics {
  id: string;
  name: string;
  status: string;
  target_industry: string | null;
  target_role: string | null;
  daily_limit: number;
  created_at: string;
  organization_id: string;
  organizations: {
    id: string;
    name: string;
    status: string;
  };
  campaign_metrics: {
    date: string;
    emails_sent: number;
    emails_delivered: number;
    emails_opened: number;
    emails_replied: number;
    emails_bounced: number;
    deliverability_rate: number | null;
    open_rate: number | null;
    reply_rate: number | null;
    bounce_rate: number | null;
  }[];
}

async function getCampaigns(): Promise<CampaignWithMetrics[]> {
  const supabase = await createClient();

  const { data: campaigns } = await supabase
    .from("campaigns")
    .select(`
      id,
      name,
      status,
      target_industry,
      target_role,
      daily_limit,
      created_at,
      organization_id,
      organizations (
        id,
        name,
        status
      ),
      campaign_metrics (
        date,
        emails_sent,
        emails_delivered,
        emails_opened,
        emails_replied,
        emails_bounced,
        deliverability_rate,
        open_rate,
        reply_rate,
        bounce_rate
      )
    `)
    .order("created_at", { ascending: false });

  return (campaigns || []) as CampaignWithMetrics[];
}

async function getCampaignStats() {
  const supabase = await createClient();

  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("status");

  const camps = (campaigns || []) as { status: string }[];

  return {
    total: camps.length,
    active: camps.filter((c) => c.status === "active").length,
    paused: camps.filter((c) => c.status === "paused").length,
    draft: camps.filter((c) => c.status === "draft").length,
    completed: camps.filter((c) => c.status === "completed").length,
  };
}

// Calculate campaign health from metrics
function getCampaignHealth(metrics: CampaignWithMetrics["campaign_metrics"]): {
  score: number | null;
  level: "healthy" | "warning" | "critical" | "unknown";
} {
  if (metrics.length === 0) {
    return { score: null, level: "unknown" };
  }

  // Get last 7 days of metrics
  const recentMetrics = metrics.slice(-7);

  const avgMetrics = {
    deliverabilityRate:
      recentMetrics.reduce((sum, m) => sum + (m.deliverability_rate || 0), 0) /
      recentMetrics.length,
    openRate:
      recentMetrics.reduce((sum, m) => sum + (m.open_rate || 0), 0) /
      recentMetrics.length,
    replyRate:
      recentMetrics.reduce((sum, m) => sum + (m.reply_rate || 0), 0) /
      recentMetrics.length,
    bounceRate:
      recentMetrics.reduce((sum, m) => sum + (m.bounce_rate || 0), 0) /
      recentMetrics.length,
  };

  const score = calculateHealthScore(avgMetrics);

  if (score === null) return { score: null, level: "unknown" };
  if (score >= 80) return { score, level: "healthy" };
  if (score >= 60) return { score, level: "warning" };
  return { score, level: "critical" };
}

export default async function CampaignsPage() {
  const [campaigns, stats] = await Promise.all([
    getCampaigns(),
    getCampaignStats(),
  ]);

  // Get unique clients for filter
  const clients = Array.from(
    new Map(
      campaigns.map((c) => [
        c.organizations.id,
        { id: c.organizations.id, name: c.organizations.name },
      ])
    ).values()
  );

  // Transform campaigns with health scores
  const campaignsWithHealth = campaigns.map((campaign) => {
    const health = getCampaignHealth(campaign.campaign_metrics);
    const totalSent = campaign.campaign_metrics.reduce(
      (sum, m) => sum + (m.emails_sent || 0),
      0
    );
    const totalOpened = campaign.campaign_metrics.reduce(
      (sum, m) => sum + (m.emails_opened || 0),
      0
    );
    const totalReplied = campaign.campaign_metrics.reduce(
      (sum, m) => sum + (m.emails_replied || 0),
      0
    );

    return {
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      targetIndustry: campaign.target_industry,
      dailyLimit: campaign.daily_limit,
      createdAt: campaign.created_at,
      clientId: campaign.organizations.id,
      clientName: campaign.organizations.name,
      clientStatus: campaign.organizations.status,
      healthScore: health.score,
      healthLevel: health.level,
      totalSent,
      totalOpened,
      totalReplied,
      openRate: totalSent > 0 ? (totalOpened / totalSent) * 100 : null,
      replyRate: totalSent > 0 ? (totalReplied / totalSent) * 100 : null,
    };
  });

  // Count campaigns by health
  const healthCounts = {
    healthy: campaignsWithHealth.filter((c) => c.healthLevel === "healthy").length,
    warning: campaignsWithHealth.filter((c) => c.healthLevel === "warning").length,
    critical: campaignsWithHealth.filter((c) => c.healthLevel === "critical").length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Campaigns</h1>
          <p className="text-steel mt-1">
            Monitor and manage campaigns across all clients
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Active" value={stats.active} color="neon-mint" />
        <StatCard label="Paused" value={stats.paused} color="energy-orange" />
        <StatCard label="Draft" value={stats.draft} color="steel" />
        <StatCard
          label="Healthy"
          value={healthCounts.healthy}
          color="neon-mint"
          icon={CheckCircle}
        />
        <StatCard
          label="At Risk"
          value={healthCounts.warning + healthCounts.critical}
          color="energy-orange"
          icon={AlertTriangle}
        />
      </div>

      {/* Campaigns Table */}
      {campaigns.length === 0 ? (
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-12 text-center">
          <Mail className="h-12 w-12 text-steel mx-auto mb-4" />
          <p className="text-steel">No campaigns yet</p>
        </div>
      ) : (
        <CampaignsTable campaigns={campaignsWithHealth} clients={clients} />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color = "electric-cyan",
  icon: Icon,
}: {
  label: string;
  value: number;
  color?: string;
  icon?: typeof TrendingUp;
}) {
  const colorClasses: Record<string, string> = {
    "electric-cyan": "text-electric-cyan",
    "neon-mint": "text-neon-mint",
    "energy-orange": "text-energy-orange",
    "quantum-violet": "text-quantum-violet",
    steel: "text-steel",
  };

  return (
    <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <p className={`text-2xl font-sora font-bold ${colorClasses[color]}`}>
          {value}
        </p>
        {Icon && <Icon className={`h-5 w-5 ${colorClasses[color]}`} />}
      </div>
      <p className="text-sm text-steel mt-1">{label}</p>
    </div>
  );
}
