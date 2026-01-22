import { createClient } from "@/lib/supabase/server";
import AdminAnalyticsClient from "./AdminAnalyticsClient";

export const dynamic = "force-dynamic";

interface CampaignMetric {
  campaign_id: string;
  date: string;
  emails_sent: number;
  emails_opened: number;
  emails_replied: number;
  emails_bounced: number;
  deliverability_rate: number | null;
  open_rate: number | null;
  reply_rate: number | null;
}

interface CampaignWithOrg {
  id: string;
  name: string;
  organization_id: string;
  organizations: {
    id: string;
    name: string;
  } | null;
}

async function getAnalyticsData() {
  const supabase = await createClient();

  // Get all campaign metrics
  const { data: metrics } = await supabase
    .from("campaign_metrics")
    .select("*")
    .order("date", { ascending: false });

  const typedMetrics = (metrics || []) as CampaignMetric[];

  // Get campaigns with organization info
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select(`
      id,
      name,
      organization_id,
      organizations (
        id,
        name
      )
    `);

  const typedCampaigns = (campaigns || []) as CampaignWithOrg[];

  // Get organizations count
  const { count: orgCount } = await supabase
    .from("organizations")
    .select("*", { count: "exact", head: true });

  // Get leads count
  const { count: leadCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .in("stage", ["qualified", "meeting"]);

  return {
    metrics: typedMetrics,
    campaigns: typedCampaigns,
    totalClients: orgCount || 0,
    totalQualifiedLeads: leadCount || 0,
  };
}

function calculateTotals(metrics: CampaignMetric[]) {
  return metrics.reduce(
    (acc, m) => ({
      sent: acc.sent + (m.emails_sent || 0),
      opened: acc.opened + (m.emails_opened || 0),
      replied: acc.replied + (m.emails_replied || 0),
      bounced: acc.bounced + (m.emails_bounced || 0),
    }),
    { sent: 0, opened: 0, replied: 0, bounced: 0 }
  );
}

function getWeeklyTrend(metrics: CampaignMetric[]) {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const thisWeek = metrics.filter((m) => new Date(m.date) >= oneWeekAgo);
  const lastWeek = metrics.filter(
    (m) => new Date(m.date) >= twoWeeksAgo && new Date(m.date) < oneWeekAgo
  );

  const thisWeekSent = thisWeek.reduce((sum, m) => sum + (m.emails_sent || 0), 0);
  const lastWeekSent = lastWeek.reduce((sum, m) => sum + (m.emails_sent || 0), 0);

  const change =
    lastWeekSent > 0
      ? ((thisWeekSent - lastWeekSent) / lastWeekSent) * 100
      : thisWeekSent > 0
      ? 100
      : 0;

  return { thisWeek: thisWeekSent, lastWeek: lastWeekSent, change };
}

function getTopPerformingCampaigns(
  metrics: CampaignMetric[],
  campaigns: CampaignWithOrg[]
) {
  // Group metrics by campaign
  const campaignStats = new Map<
    string,
    { sent: number; opened: number; replied: number; name: string; org: string }
  >();

  for (const metric of metrics) {
    const campaign = campaigns.find((c) => c.id === metric.campaign_id);
    if (!campaign) continue;

    const existing = campaignStats.get(metric.campaign_id) || {
      sent: 0,
      opened: 0,
      replied: 0,
      name: campaign.name,
      org: campaign.organizations?.name || "Unknown",
    };

    campaignStats.set(metric.campaign_id, {
      ...existing,
      sent: existing.sent + (metric.emails_sent || 0),
      opened: existing.opened + (metric.emails_opened || 0),
      replied: existing.replied + (metric.emails_replied || 0),
    });
  }

  // Convert to array and calculate rates
  const results = Array.from(campaignStats.entries()).map(([id, stats]) => ({
    id,
    ...stats,
    openRate: stats.sent > 0 ? (stats.opened / stats.sent) * 100 : 0,
    replyRate: stats.sent > 0 ? (stats.replied / stats.sent) * 100 : 0,
  }));

  // Sort by reply rate
  return results.sort((a, b) => b.replyRate - a.replyRate).slice(0, 10);
}

function getClientPerformance(
  metrics: CampaignMetric[],
  campaigns: CampaignWithOrg[]
) {
  // Group by organization
  const orgStats = new Map<
    string,
    { sent: number; opened: number; replied: number; name: string }
  >();

  for (const metric of metrics) {
    const campaign = campaigns.find((c) => c.id === metric.campaign_id);
    if (!campaign?.organizations) continue;

    const orgId = campaign.organization_id;
    const existing = orgStats.get(orgId) || {
      sent: 0,
      opened: 0,
      replied: 0,
      name: campaign.organizations.name,
    };

    orgStats.set(orgId, {
      ...existing,
      sent: existing.sent + (metric.emails_sent || 0),
      opened: existing.opened + (metric.emails_opened || 0),
      replied: existing.replied + (metric.emails_replied || 0),
    });
  }

  return Array.from(orgStats.entries())
    .map(([id, stats]) => ({
      id,
      ...stats,
      openRate: stats.sent > 0 ? (stats.opened / stats.sent) * 100 : 0,
      replyRate: stats.sent > 0 ? (stats.replied / stats.sent) * 100 : 0,
    }))
    .sort((a, b) => b.sent - a.sent);
}

export default async function AdminAnalyticsPage() {
  const { metrics, campaigns, totalClients, totalQualifiedLeads } =
    await getAnalyticsData();

  const totals = calculateTotals(metrics);
  const weeklyTrend = getWeeklyTrend(metrics);
  const topCampaigns = getTopPerformingCampaigns(metrics, campaigns);
  const clientPerformance = getClientPerformance(metrics, campaigns);

  const openRate = totals.sent > 0 ? (totals.opened / totals.sent) * 100 : 0;
  const replyRate = totals.sent > 0 ? (totals.replied / totals.sent) * 100 : 0;
  const deliverability =
    totals.sent > 0 ? ((totals.sent - totals.bounced) / totals.sent) * 100 : 0;

  return (
    <AdminAnalyticsClient
      totals={totals}
      weeklyTrend={weeklyTrend}
      topCampaigns={topCampaigns}
      clientPerformance={clientPerformance}
      totalClients={totalClients}
      totalQualifiedLeads={totalQualifiedLeads}
      campaignsCount={campaigns.length}
      openRate={openRate}
      replyRate={replyRate}
      deliverability={deliverability}
    />
  );
}
