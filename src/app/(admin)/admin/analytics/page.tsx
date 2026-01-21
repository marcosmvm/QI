import { createClient } from "@/lib/supabase/server";
import {
  BarChart3,
  TrendingUp,
  Mail,
  Users,
  MousePointerClick,
  Reply,
  Download,
  Calendar,
  Building2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Analytics</h1>
          <p className="text-steel mt-1">
            Platform-wide performance metrics and insights
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-electric-cyan/30 text-electric-cyan rounded-lg hover:bg-electric-cyan/10 transition-colors">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Emails Sent"
          value={totals.sent.toLocaleString()}
          icon={Mail}
          trend={weeklyTrend.change}
        />
        <StatCard
          label="Open Rate"
          value={`${openRate.toFixed(1)}%`}
          icon={MousePointerClick}
          target={30}
          current={openRate}
        />
        <StatCard
          label="Reply Rate"
          value={`${replyRate.toFixed(1)}%`}
          icon={Reply}
          target={3}
          current={replyRate}
        />
        <StatCard
          label="Deliverability"
          value={`${deliverability.toFixed(1)}%`}
          icon={TrendingUp}
          target={90}
          current={deliverability}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-steel mb-2">
            <Building2 className="h-4 w-4" />
            <span className="text-xs">Total Clients</span>
          </div>
          <p className="text-2xl font-sora font-bold text-white">
            {totalClients}
          </p>
        </div>
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-steel mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">Active Campaigns</span>
          </div>
          <p className="text-2xl font-sora font-bold text-white">
            {campaigns.length}
          </p>
        </div>
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-steel mb-2">
            <Users className="h-4 w-4" />
            <span className="text-xs">Qualified Leads</span>
          </div>
          <p className="text-2xl font-sora font-bold text-white">
            {totalQualifiedLeads}
          </p>
        </div>
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-steel mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">This Week</span>
          </div>
          <p className="text-2xl font-sora font-bold text-white">
            {weeklyTrend.thisWeek.toLocaleString()}
          </p>
          <p className="text-xs text-steel">emails sent</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Campaigns */}
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
          <h2 className="text-lg font-sora font-semibold text-white mb-4">
            Top Performing Campaigns
          </h2>
          {topCampaigns.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="h-10 w-10 text-steel mx-auto mb-3" />
              <p className="text-steel text-sm">No campaign data yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topCampaigns.slice(0, 5).map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-3 bg-deep-space/50 border border-graphite/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-steel w-6">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {campaign.name}
                      </p>
                      <p className="text-xs text-steel">{campaign.org}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neon-mint">
                      {campaign.replyRate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-steel">reply rate</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Client Performance */}
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
          <h2 className="text-lg font-sora font-semibold text-white mb-4">
            Client Performance
          </h2>
          {clientPerformance.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="h-10 w-10 text-steel mx-auto mb-3" />
              <p className="text-steel text-sm">No client data yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {clientPerformance.slice(0, 5).map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 bg-deep-space/50 border border-graphite/30 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {client.name}
                    </p>
                    <p className="text-xs text-steel">
                      {client.sent.toLocaleString()} emails sent
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-silver">
                        {client.openRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-steel">open</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neon-mint">
                        {client.replyRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-steel">reply</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  target,
  current,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  trend?: number;
  target?: number;
  current?: number;
}) {
  const isOnTarget = target && current ? current >= target : true;

  return (
    <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`h-8 w-8 rounded-lg flex items-center justify-center ${
            isOnTarget
              ? "bg-neon-mint/10 border border-neon-mint/30"
              : "bg-energy-orange/10 border border-energy-orange/30"
          }`}
        >
          <Icon
            className={`h-4 w-4 ${
              isOnTarget ? "text-neon-mint" : "text-energy-orange"
            }`}
          />
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs ${
              trend >= 0 ? "text-neon-mint" : "text-energy-orange"
            }`}
          >
            {trend >= 0 ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-sora font-bold text-white">{value}</p>
      <p className="text-xs text-steel mt-1">{label}</p>
      {target && (
        <p className="text-xs text-steel mt-1">Target: {target}%</p>
      )}
    </div>
  );
}
