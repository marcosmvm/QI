import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Mail,
  MousePointerClick,
  Reply,
  TrendingUp,
  Calendar,
  Users,
} from "lucide-react";
import Link from "next/link";

interface MembershipWithOrg {
  organization_id: string;
  organizations: {
    id: string;
    name: string;
    status: string;
  } | null;
}

async function getUserOrganization() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user's organization
  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id, organizations(*)")
    .eq("user_id", user.id)
    .single();

  const typedMembership = membership as MembershipWithOrg | null;

  return {
    user,
    organization: typedMembership?.organizations || null,
    organizationId: typedMembership?.organization_id,
  };
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  target_industry: string | null;
  target_role: string | null;
  daily_limit: number;
  created_at: string;
}

interface CampaignMetric {
  id: string;
  campaign_id: string;
  date: string;
  emails_sent: number;
  emails_opened: number;
  emails_replied: number;
  emails_bounced: number;
}

interface Lead {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  stage: string;
  created_at: string;
}

async function getDashboardData(organizationId: string) {
  const supabase = await createClient();

  // Get campaigns for this organization
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false });

  const typedCampaigns = (campaigns || []) as Campaign[];

  // Get campaign metrics
  const { data: metrics } = await supabase
    .from("campaign_metrics")
    .select("*")
    .in(
      "campaign_id",
      typedCampaigns.map((c) => c.id)
    )
    .order("date", { ascending: false });

  const typedMetrics = (metrics || []) as CampaignMetric[];

  // Get recent leads
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false })
    .limit(5);

  const typedLeads = (leads || []) as Lead[];

  // Calculate totals from metrics
  const totals = typedMetrics.reduce(
    (acc, m) => ({
      sent: acc.sent + (m.emails_sent || 0),
      opened: acc.opened + (m.emails_opened || 0),
      replied: acc.replied + (m.emails_replied || 0),
      bounced: acc.bounced + (m.emails_bounced || 0),
    }),
    { sent: 0, opened: 0, replied: 0, bounced: 0 }
  );

  // Get weekly data for chart
  const weeklyData = getWeeklyData(typedMetrics);

  return {
    campaigns: typedCampaigns,
    metrics: typedMetrics,
    leads: typedLeads,
    totals,
    weeklyData,
  };
}

function getWeeklyData(metrics: Array<{ date: string; emails_sent: number; emails_opened: number; emails_replied: number }>) {
  // Group by date and aggregate
  const grouped = metrics.reduce((acc, m) => {
    const date = m.date;
    if (!acc[date]) {
      acc[date] = { sent: 0, opened: 0, replied: 0 };
    }
    acc[date].sent += m.emails_sent || 0;
    acc[date].opened += m.emails_opened || 0;
    acc[date].replied += m.emails_replied || 0;
    return acc;
  }, {} as Record<string, { sent: number; opened: number; replied: number }>);

  // Get last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    days.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      ...grouped[dateStr] || { sent: 0, opened: 0, replied: 0 },
    });
  }

  return days;
}

function getMetricStatus(metric: string, value: number): "success" | "warning" | "critical" {
  const thresholds: Record<string, { target: number; warning: number }> = {
    openRate: { target: 30, warning: 15 },
    replyRate: { target: 3, warning: 1 },
    deliverability: { target: 90, warning: 85 },
  };

  const t = thresholds[metric];
  if (!t) return "success";

  if (value >= t.target) return "success";
  if (value >= t.warning) return "warning";
  return "critical";
}

export default async function DashboardPage() {
  const { organization, organizationId } = await getUserOrganization();

  // If user has no organization, show onboarding message
  if (!organizationId) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="h-16 w-16 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-electric-cyan" />
          </div>
          <h1 className="text-xl font-sora font-bold text-white mb-2">Welcome to Quantum Insights</h1>
          <p className="text-steel mb-6">
            Your account is being set up. Our team will reach out shortly to complete your onboarding.
          </p>
          <Link
            href="/dashboard/support"
            className="inline-flex items-center gap-2 px-4 py-2 bg-electric-cyan text-deep-space font-medium rounded-lg hover:bg-electric-cyan/90 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  const { campaigns, leads, totals, weeklyData } = await getDashboardData(organizationId);

  const openRate = totals.sent > 0 ? (totals.opened / totals.sent) * 100 : 0;
  const replyRate = totals.sent > 0 ? (totals.replied / totals.sent) * 100 : 0;
  const deliverability = totals.sent > 0 ? ((totals.sent - totals.bounced) / totals.sent) * 100 : 0;

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

  return (
    <div className="min-h-screen p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-sora font-bold text-white">Dashboard</h1>
        <p className="text-steel mt-1">
          Welcome back! Here&apos;s an overview of your campaign performance.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Emails Sent"
          value={totals.sent.toLocaleString()}
          icon={Mail}
          status="success"
        />
        <MetricCard
          title="Open Rate"
          value={`${openRate.toFixed(1)}%`}
          icon={MousePointerClick}
          status={getMetricStatus("openRate", openRate)}
        />
        <MetricCard
          title="Reply Rate"
          value={`${replyRate.toFixed(1)}%`}
          icon={Reply}
          status={getMetricStatus("replyRate", replyRate)}
        />
        <MetricCard
          title="Deliverability"
          value={`${deliverability.toFixed(1)}%`}
          icon={TrendingUp}
          status={getMetricStatus("deliverability", deliverability)}
        />
      </div>

      {/* Performance Chart */}
      <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-sora font-semibold text-white mb-6">Weekly Performance</h2>
        <div className="h-64 flex items-end gap-2">
          {weeklyData.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col gap-1" style={{ height: '200px' }}>
                <div
                  className="w-full bg-electric-cyan/20 rounded-t"
                  style={{ height: `${Math.max((day.sent / Math.max(...weeklyData.map(d => d.sent), 1)) * 100, 2)}%` }}
                  title={`Sent: ${day.sent}`}
                />
              </div>
              <span className="text-xs text-steel">{day.date}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-graphite/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-electric-cyan/40" />
            <span className="text-xs text-steel">Emails Sent</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaigns */}
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-sora font-semibold text-white">Active Campaigns</h2>
              <p className="text-sm text-steel">{activeCampaigns} campaigns running</p>
            </div>
            <Link
              href="/dashboard/campaigns"
              className="text-sm text-electric-cyan hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {campaigns.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-8 w-8 text-steel mx-auto mb-2" />
                <p className="text-steel text-sm">No campaigns yet</p>
              </div>
            ) : (
              campaigns.slice(0, 4).map((campaign) => (
                <Link
                  key={campaign.id}
                  href={`/dashboard/campaigns/${campaign.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 border border-graphite/30 hover:border-electric-cyan/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${
                      campaign.status === "active" ? "bg-neon-mint" :
                      campaign.status === "paused" ? "bg-energy-orange" : "bg-steel"
                    }`} />
                    <span className="text-sm font-medium text-white">{campaign.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border capitalize ${
                    campaign.status === "active"
                      ? "bg-neon-mint/10 text-neon-mint border-neon-mint/30"
                      : campaign.status === "paused"
                      ? "bg-energy-orange/10 text-energy-orange border-energy-orange/30"
                      : "bg-steel/10 text-steel border-steel/30"
                  }`}>
                    {campaign.status}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-sora font-semibold text-white">Recent Leads</h2>
              <p className="text-sm text-steel">{leads.length} new leads</p>
            </div>
            <Link
              href="/dashboard/leads"
              className="text-sm text-electric-cyan hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {leads.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-8 w-8 text-steel mx-auto mb-2" />
                <p className="text-steel text-sm">No leads yet</p>
              </div>
            ) : (
              leads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/dashboard/leads/${lead.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 border border-graphite/30 hover:border-electric-cyan/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-quantum-violet/20 border border-quantum-violet/30 flex items-center justify-center">
                      <span className="text-xs font-medium text-quantum-violet">
                        {(lead.first_name?.[0] || "") + (lead.last_name?.[0] || "")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {lead.first_name} {lead.last_name}
                      </p>
                      <p className="text-xs text-steel">{lead.company}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border capitalize ${
                    lead.stage === "meeting" || lead.stage === "qualified"
                      ? "bg-neon-mint/10 text-neon-mint border-neon-mint/30"
                      : lead.stage === "engaged"
                      ? "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30"
                      : "bg-steel/10 text-steel border-steel/30"
                  }`}>
                    {lead.stage}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/reports"
          className="flex items-center gap-4 p-4 bg-midnight-blue/30 border border-graphite/50 rounded-xl hover:border-electric-cyan/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-electric-cyan" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Weekly Reports</p>
            <p className="text-xs text-steel">View your performance reports</p>
          </div>
        </Link>
        <Link
          href="/dashboard/support"
          className="flex items-center gap-4 p-4 bg-midnight-blue/30 border border-graphite/50 rounded-xl hover:border-electric-cyan/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-lg bg-quantum-violet/10 border border-quantum-violet/30 flex items-center justify-center">
            <Reply className="h-5 w-5 text-quantum-violet" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Contact Support</p>
            <p className="text-xs text-steel">Chat with our team</p>
          </div>
        </Link>
        <Link
          href="/dashboard/analytics"
          className="flex items-center gap-4 p-4 bg-midnight-blue/30 border border-graphite/50 rounded-xl hover:border-electric-cyan/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-lg bg-neon-mint/10 border border-neon-mint/30 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-neon-mint" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Deep Analytics</p>
            <p className="text-xs text-steel">Detailed performance insights</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  status,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  status: "success" | "warning" | "critical";
}) {
  const statusStyles = {
    success: "bg-neon-mint/10 border-neon-mint/30 text-neon-mint",
    warning: "bg-energy-orange/10 border-energy-orange/30 text-energy-orange",
    critical: "bg-energy-orange/10 border-energy-orange/30 text-energy-orange",
  };

  return (
    <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 rounded-lg border flex items-center justify-center ${statusStyles[status]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-sora font-bold text-white">{value}</p>
        <p className="text-sm text-steel mt-1">{title}</p>
      </div>
    </div>
  );
}
