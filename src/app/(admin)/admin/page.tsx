import { createClient } from "@/lib/supabase/server";
import {
  Building2,
  DollarSign,
  Mail,
  MessageSquare,
  Users,
  TrendingUp,
  AlertCircle,
  Send,
  Eye,
  Reply,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { EngineStatusCompact } from "@/components/admin/EngineStatusCard";
import { ClientHealthBadge, calculateHealthScore } from "@/components/admin/ClientHealthBadge";

export const dynamic = "force-dynamic";

// Types
interface OrgWithMetrics {
  id: string;
  name: string;
  status: string;
  created_at: string;
  campaigns: {
    campaign_metrics: {
      deliverability_rate: number | null;
      open_rate: number | null;
      reply_rate: number | null;
      bounce_rate: number | null;
    }[];
  }[];
}

interface EngineHealth {
  name: "Guardian" | "Architect" | "Scientist" | "Hunter" | "Sentinel";
  status: "operational" | "degraded" | "offline";
  errors24h: number;
}

// Fetch admin stats
async function getAdminStats() {
  const supabase = await createClient();

  // Get client counts by status
  const { data: organizations } = await supabase
    .from("organizations")
    .select("id, status");

  const orgs = (organizations || []) as { id: string; status: string }[];
  const activeClients = orgs.filter((o) => o.status === "active").length;
  const pilotClients = orgs.filter((o) => o.status === "pilot").length;
  const totalClients = orgs.length;

  // Get subscription data for MRR
  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("monthly_fee, status")
    .eq("status", "active");

  const subs = (subscriptions || []) as { monthly_fee: number | null; status: string }[];
  const mrr = subs.reduce((sum, s) => sum + (s.monthly_fee || 0), 0);

  // Get open support conversations
  const { data: conversations } = await supabase
    .from("chat_conversations")
    .select("id, priority")
    .eq("status", "open");

  const convs = (conversations || []) as { id: string; priority: string }[];
  const openTickets = convs.length;
  const urgentTickets = convs.filter((c) => c.priority === "urgent").length;

  // Get total campaigns
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id, status");

  const camps = (campaigns || []) as { id: string; status: string }[];
  const activeCampaigns = camps.filter((c) => c.status === "active").length;

  // Get today's metrics
  const today = new Date().toISOString().split("T")[0];
  const { data: todayMetrics } = await supabase
    .from("campaign_metrics")
    .select("emails_sent, emails_opened, emails_replied")
    .eq("date", today);

  const metrics = (todayMetrics || []) as { emails_sent: number; emails_opened: number; emails_replied: number }[];
  const todayStats = metrics.reduce(
    (acc, m) => ({
      sent: acc.sent + (m.emails_sent || 0),
      opened: acc.opened + (m.emails_opened || 0),
      replied: acc.replied + (m.emails_replied || 0),
    }),
    { sent: 0, opened: 0, replied: 0 }
  );

  // Get new leads today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { count: newLeadsToday } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .gte("created_at", todayStart.toISOString());

  return {
    totalClients,
    activeClients,
    pilotClients,
    mrr,
    openTickets,
    urgentTickets,
    activeCampaigns,
    todayStats,
    newLeadsToday: newLeadsToday || 0,
  };
}

// Fetch MRR trend data (last 12 months)
async function getMrrTrend() {
  const supabase = await createClient();

  // Generate last 12 months
  const months: { month: string; mrr: number }[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = date.toLocaleString("default", { month: "short" });

    // For demo, we'll use current MRR with some variation
    // In production, you'd query historical subscription data
    months.push({
      month: monthStr,
      mrr: 0, // Will be populated below
    });
  }

  // Get current subscriptions
  const { data: subsData } = await supabase
    .from("subscriptions")
    .select("monthly_fee, created_at, status")
    .eq("status", "active");

  const subs = (subsData || []) as { monthly_fee: number | null; created_at: string; status: string }[];

  // Calculate cumulative MRR for each month
  let runningMrr = 0;
  months.forEach((m, idx) => {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - (11 - idx), 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() - (10 - idx), 1);

    subs.forEach((sub) => {
      const subDate = new Date(sub.created_at);
      if (subDate <= nextMonth) {
        // Only count if subscription existed by this month
      }
    });

    // For now, simulate growth
    runningMrr = subs.reduce((sum, s) => sum + (s.monthly_fee || 0), 0);
    const growthFactor = 0.7 + (idx * 0.03); // Simulate growth
    m.mrr = Math.round(runningMrr * growthFactor);
  });

  // Set last month to actual MRR
  if (months.length > 0) {
    months[months.length - 1].mrr = subs.reduce(
      (sum, s) => sum + (s.monthly_fee || 0),
      0
    );
  }

  return months;
}

// Fetch clients with health scores
async function getClientsWithHealth(): Promise<OrgWithMetrics[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("organizations")
    .select(`
      id,
      name,
      status,
      created_at,
      campaigns (
        campaign_metrics (
          deliverability_rate,
          open_rate,
          reply_rate,
          bounce_rate
        )
      )
    `)
    .order("created_at", { ascending: false })
    .limit(10);

  return (data || []) as OrgWithMetrics[];
}

interface RecentClient {
  id: string;
  name: string;
  status: string;
  created_at: string;
}

// Fetch recent clients
async function getRecentClients(): Promise<RecentClient[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("organizations")
    .select("id, name, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (data || []) as RecentClient[];
}

interface OpenConversation {
  id: string;
  subject: string | null;
  status: string;
  priority: string;
  created_at: string;
  organizations: { name: string } | null;
}

// Fetch open conversations
async function getOpenConversations(): Promise<OpenConversation[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("chat_conversations")
    .select(`
      id,
      subject,
      status,
      priority,
      created_at,
      organizations (name)
    `)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(5);

  return (data || []) as OpenConversation[];
}

// Get engine health status (mock for now, will integrate with n8n)
async function getEngineHealth(): Promise<EngineHealth[]> {
  // In production, this would query the engine_health table or n8n API
  return [
    { name: "Guardian", status: "operational", errors24h: 0 },
    { name: "Architect", status: "operational", errors24h: 0 },
    { name: "Scientist", status: "operational", errors24h: 2 },
    { name: "Hunter", status: "operational", errors24h: 0 },
    { name: "Sentinel", status: "operational", errors24h: 0 },
  ];
}

// Calculate health score for a client
function getClientHealthScore(client: OrgWithMetrics): number | null {
  const allMetrics = client.campaigns.flatMap((c) => c.campaign_metrics);

  if (allMetrics.length === 0) return null;

  // Average the metrics
  const avgMetrics = {
    deliverabilityRate:
      allMetrics.reduce((sum, m) => sum + (m.deliverability_rate || 0), 0) /
      allMetrics.length,
    openRate:
      allMetrics.reduce((sum, m) => sum + (m.open_rate || 0), 0) /
      allMetrics.length,
    replyRate:
      allMetrics.reduce((sum, m) => sum + (m.reply_rate || 0), 0) /
      allMetrics.length,
    bounceRate:
      allMetrics.reduce((sum, m) => sum + (m.bounce_rate || 0), 0) /
      allMetrics.length,
  };

  return calculateHealthScore(avgMetrics);
}

export default async function AdminDashboardPage() {
  const [stats, mrrTrend, clientsWithHealth, recentClients, openConversations, engineHealth] =
    await Promise.all([
      getAdminStats(),
      getMrrTrend(),
      getClientsWithHealth(),
      getRecentClients(),
      getOpenConversations(),
      getEngineHealth(),
    ]);

  // Calculate health distribution
  const healthDistribution = { healthy: 0, warning: 0, critical: 0, unknown: 0 };
  clientsWithHealth.forEach((client) => {
    const score = getClientHealthScore(client);
    if (score === null) healthDistribution.unknown++;
    else if (score >= 80) healthDistribution.healthy++;
    else if (score >= 60) healthDistribution.warning++;
    else healthDistribution.critical++;
  });

  // Check for alerts
  const alerts: { type: "error" | "warning"; message: string }[] = [];
  if (stats.urgentTickets > 0) {
    alerts.push({
      type: "error",
      message: `${stats.urgentTickets} urgent support ticket${stats.urgentTickets > 1 ? "s" : ""} require attention`,
    });
  }
  if (healthDistribution.critical > 0) {
    alerts.push({
      type: "warning",
      message: `${healthDistribution.critical} client${healthDistribution.critical > 1 ? "s" : ""} with critical health scores`,
    });
  }
  const degradedEngines = engineHealth.filter((e) => e.status !== "operational");
  if (degradedEngines.length > 0) {
    alerts.push({
      type: "error",
      message: `${degradedEngines.length} engine${degradedEngines.length > 1 ? "s" : ""} degraded or offline`,
    });
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-300 mb-2">
          <span className="text-emerald-pro-600">Admin</span>
          <span>/</span>
          <span className="text-emerald-pro-500">Dashboard</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-900 dark:text-slate-300 mt-1">Overview of your business operations</p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 rounded-xl p-4 backdrop-blur-sm ${
                alert.type === "error"
                  ? "bg-energy-orange/10 border border-energy-orange/30"
                  : "bg-emerald-pro-500/10 border border-emerald-pro-500/30"
              }`}
            >
              <AlertCircle
                className={`h-5 w-5 ${
                  alert.type === "error" ? "text-energy-orange" : "text-emerald-pro-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  alert.type === "error" ? "text-energy-orange" : "text-emerald-pro-500"
                }`}
              >
                {alert.message}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCard
          title="Total Clients"
          value={stats.totalClients}
          icon={Building2}
          iconColor="cyan"
          sparklineData={[{ value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: stats.totalClients }]}
        />
        <AdminStatCard
          title="Monthly Revenue"
          value={`$${stats.mrr.toLocaleString()}`}
          icon={DollarSign}
          iconColor="mint"
          change={12}
          changeLabel="vs last month"
        />
        <AdminStatCard
          title="Active Campaigns"
          value={stats.activeCampaigns}
          icon={Mail}
          iconColor="violet"
        />
        <AdminStatCard
          title="Open Tickets"
          value={stats.openTickets}
          icon={MessageSquare}
          iconColor={stats.urgentTickets > 0 ? "orange" : "cyan"}
          highlight={stats.urgentTickets > 0}
        />
      </div>

      {/* Today's Snapshot */}
      <div className="mb-8">
        <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">Today&apos;s Activity</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-4 backdrop-blur-sm hover:border-emerald-pro-600/30 hover:-translate-y-0.5 hover:shadow-glow-cyan-sm transition-all duration-300">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-300 mb-2">
              <Send className="h-4 w-4 text-emerald-pro-600" />
              <span className="text-xs">Emails Sent</span>
            </div>
            <p className="text-xl font-sora font-bold text-slate-900 dark:text-white">
              {stats.todayStats.sent.toLocaleString()}
            </p>
          </div>
          <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-4 backdrop-blur-sm hover:border-emerald-pro-500/30 hover:-translate-y-0.5 hover:shadow-glow-violet-lg transition-all duration-300">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-300 mb-2">
              <Eye className="h-4 w-4 text-emerald-pro-500" />
              <span className="text-xs">Opens</span>
            </div>
            <p className="text-xl font-sora font-bold text-slate-900 dark:text-white">
              {stats.todayStats.opened.toLocaleString()}
            </p>
          </div>
          <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-4 backdrop-blur-sm hover:border-emerald-pro-400/30 hover:-translate-y-0.5 hover:shadow-glow-mint-lg transition-all duration-300">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-300 mb-2">
              <Reply className="h-4 w-4 text-emerald-pro-400" />
              <span className="text-xs">Replies</span>
            </div>
            <p className="text-xl font-sora font-bold text-slate-900 dark:text-white">
              {stats.todayStats.replied.toLocaleString()}
            </p>
          </div>
          <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-4 backdrop-blur-sm hover:border-energy-orange/30 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,107,53,0.2)] transition-all duration-300">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-300 mb-2">
              <UserPlus className="h-4 w-4 text-energy-orange" />
              <span className="text-xs">New Leads</span>
            </div>
            <p className="text-xl font-sora font-bold text-slate-900 dark:text-white">
              {stats.newLeadsToday.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Revenue Chart + Engine Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart data={mrrTrend} title="Revenue Trend (12 Months)" />
        </div>

        <div className="glass-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Engine Status</h3>
            <Link href="/admin/engines" className="text-sm text-emerald-pro-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-graphite/30">
            {engineHealth.map((engine) => (
              <EngineStatusCompact
                key={engine.name}
                name={engine.name}
                status={engine.status}
                errors24h={engine.errors24h}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Client Health Matrix */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Client Health Overview</h2>
          <Link href="/admin/clients" className="text-sm text-emerald-pro-600 hover:underline">
            View all clients
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-emerald-pro-400/10 border border-emerald-pro-400/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-sora font-bold text-emerald-pro-400">
              {healthDistribution.healthy}
            </p>
            <p className="text-xs text-emerald-pro-400 mt-1">Healthy</p>
          </div>
          <div className="bg-energy-orange/10 border border-energy-orange/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-sora font-bold text-energy-orange">
              {healthDistribution.warning}
            </p>
            <p className="text-xs text-energy-orange mt-1">At Risk</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-sora font-bold text-red-400">
              {healthDistribution.critical}
            </p>
            <p className="text-xs text-red-400 mt-1">Critical</p>
          </div>
          <div className="bg-steel/10 border border-steel/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-sora font-bold text-slate-900 dark:text-slate-300">
              {healthDistribution.unknown}
            </p>
            <p className="text-xs text-slate-900 dark:text-slate-300 mt-1">No Data</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Clients + Open Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="glass-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Recent Clients</h2>
            <Link href="/admin/clients" className="text-sm text-emerald-pro-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentClients.length === 0 ? (
              <p className="text-slate-900 dark:text-slate-300 text-sm">No clients yet</p>
            ) : (
              recentClients.map((client) => {
                const clientWithHealth = clientsWithHealth.find((c) => c.id === client.id);
                const healthScore = clientWithHealth
                  ? getClientHealthScore(clientWithHealth)
                  : null;

                return (
                  <Link
                    key={client.id}
                    href={`/admin/clients/${client.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 hover:border-emerald-pro-600/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-emerald-pro-500/20 border border-emerald-pro-500/30 flex items-center justify-center">
                        <Users className="h-4 w-4 text-emerald-pro-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{client.name}</p>
                        <p className="text-xs text-slate-900 dark:text-slate-300">
                          {new Date(client.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ClientHealthBadge score={healthScore} size="sm" />
                      <StatusBadge status={client.status} />
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Open Support Tickets */}
        <div className="glass-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Open Support</h2>
            <Link href="/admin/support" className="text-sm text-emerald-pro-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {openConversations.length === 0 ? (
              <div className="text-center py-8">
                <div className="h-12 w-12 rounded-full bg-emerald-pro-400/10 border border-emerald-pro-400/30 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-emerald-pro-400" />
                </div>
                <p className="text-slate-900 dark:text-slate-300 text-sm">All caught up!</p>
                <p className="text-slate-900 dark:text-slate-300/60 text-xs">No open support tickets</p>
              </div>
            ) : (
              openConversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/admin/support?conversation=${conv.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 hover:border-emerald-pro-500/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center ${
                        conv.priority === "urgent"
                          ? "bg-energy-orange/20 border border-energy-orange/30"
                          : "bg-emerald-pro-600/10 border border-emerald-pro-600/30"
                      }`}
                    >
                      {conv.priority === "urgent" ? (
                        <AlertCircle className="h-4 w-4 text-energy-orange" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-emerald-pro-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {conv.subject || "No subject"}
                      </p>
                      <p className="text-xs text-slate-900 dark:text-slate-300">
                        {(conv.organizations as { name: string } | null)?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <PriorityBadge priority={conv.priority} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    pilot: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
    paused: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    churned: "bg-steel/10 text-slate-900 dark:text-slate-300 border-steel/30",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border capitalize ${styles[status] || styles.paused}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    urgent: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    high: "bg-emerald-pro-500/10 text-emerald-pro-500 border-emerald-pro-500/30",
    normal: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
    low: "bg-steel/10 text-slate-900 dark:text-slate-300 border-steel/30",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border capitalize ${styles[priority] || styles.normal}`}
    >
      {priority}
    </span>
  );
}
