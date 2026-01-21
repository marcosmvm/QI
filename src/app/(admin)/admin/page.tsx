import { createClient } from "@/lib/supabase/server";
import {
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  Mail,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

export const dynamic = 'force-dynamic';

interface OrgStatus {
  id: string;
  status: string;
}

interface SubFee {
  monthly_fee: number | null;
  status: string;
}

interface CampaignStatus {
  id: string;
  status: string;
}

async function getAdminStats() {
  const supabase = await createClient();

  // Get client counts by status
  const { data: organizations } = await supabase
    .from("organizations")
    .select("id, status");

  const orgs = (organizations || []) as OrgStatus[];
  const activeClients = orgs.filter((o) => o.status === "active").length;
  const pilotClients = orgs.filter((o) => o.status === "pilot").length;
  const totalClients = orgs.length;

  // Get subscription data for MRR
  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("monthly_fee, status")
    .eq("status", "active");

  const subs = (subscriptions || []) as SubFee[];
  const mrr = subs.reduce((sum, s) => sum + (s.monthly_fee || 0), 0);

  // Get open support conversations
  const { data: conversations } = await supabase
    .from("chat_conversations")
    .select("id")
    .eq("status", "open");

  const openTickets = conversations?.length || 0;

  // Get total campaigns
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id, status");

  const camps = (campaigns || []) as CampaignStatus[];
  const activeCampaigns = camps.filter((c) => c.status === "active").length;

  return {
    totalClients,
    activeClients,
    pilotClients,
    mrr,
    openTickets,
    activeCampaigns,
  };
}

interface RecentClient {
  id: string;
  name: string;
  status: string;
  created_at: string;
}

interface OpenConversation {
  id: string;
  subject: string | null;
  status: string;
  priority: string;
  created_at: string;
  organizations: { name: string } | null;
}

async function getRecentClients(): Promise<RecentClient[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("organizations")
    .select("id, name, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (data || []) as RecentClient[];
}

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

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const recentClients = await getRecentClients();
  const openConversations = await getOpenConversations();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-sora font-bold text-white">Admin Dashboard</h1>
        <p className="text-steel mt-1">Overview of your business metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Clients"
          value={stats.totalClients.toString()}
          subtitle={`${stats.activeClients} active, ${stats.pilotClients} pilot`}
          icon={Building2}
          trend={null}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.mrr.toLocaleString()}`}
          subtitle="MRR from active subscriptions"
          icon={DollarSign}
          trend={null}
        />
        <StatCard
          title="Active Campaigns"
          value={stats.activeCampaigns.toString()}
          subtitle="Across all clients"
          icon={Mail}
          trend={null}
        />
        <StatCard
          title="Open Tickets"
          value={stats.openTickets.toString()}
          subtitle="Support conversations"
          icon={MessageSquare}
          trend={null}
          highlight={stats.openTickets > 0}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-sora font-semibold text-white">Recent Clients</h2>
            <a href="/admin/clients" className="text-sm text-electric-cyan hover:underline">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {recentClients.length === 0 ? (
              <p className="text-steel text-sm">No clients yet</p>
            ) : (
              recentClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 border border-graphite/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-quantum-violet/20 border border-quantum-violet/30 flex items-center justify-center">
                      <Users className="h-4 w-4 text-quantum-violet" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{client.name}</p>
                      <p className="text-xs text-steel">
                        {new Date(client.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={client.status} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Open Support Tickets */}
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-sora font-semibold text-white">Open Support</h2>
            <a href="/admin/support" className="text-sm text-electric-cyan hover:underline">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {openConversations.length === 0 ? (
              <div className="text-center py-8">
                <div className="h-12 w-12 rounded-full bg-neon-mint/10 border border-neon-mint/30 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-neon-mint" />
                </div>
                <p className="text-steel text-sm">All caught up!</p>
                <p className="text-steel/60 text-xs">No open support tickets</p>
              </div>
            ) : (
              openConversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 border border-graphite/30"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      conv.priority === "urgent"
                        ? "bg-energy-orange/20 border border-energy-orange/30"
                        : "bg-electric-cyan/10 border border-electric-cyan/30"
                    }`}>
                      {conv.priority === "urgent" ? (
                        <AlertCircle className="h-4 w-4 text-energy-orange" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-electric-cyan" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {conv.subject || "No subject"}
                      </p>
                      <p className="text-xs text-steel">
                        {(conv.organizations as { name: string } | null)?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <PriorityBadge priority={conv.priority} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  highlight = false,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  trend: number | null;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-midnight-blue/30 border rounded-xl p-6 ${
      highlight ? "border-energy-orange/50" : "border-graphite/50"
    }`}>
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
          highlight
            ? "bg-energy-orange/10 border border-energy-orange/30"
            : "bg-electric-cyan/10 border border-electric-cyan/30"
        }`}>
          <Icon className={`h-5 w-5 ${highlight ? "text-energy-orange" : "text-electric-cyan"}`} />
        </div>
        {trend !== null && (
          <span className={`text-xs font-medium ${trend >= 0 ? "text-neon-mint" : "text-energy-orange"}`}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-sora font-bold text-white">{value}</p>
        <p className="text-sm text-silver mt-1">{title}</p>
        <p className="text-xs text-steel mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-neon-mint/10 text-neon-mint border-neon-mint/30",
    pilot: "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30",
    paused: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    churned: "bg-steel/10 text-steel border-steel/30",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border capitalize ${styles[status] || styles.paused}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    urgent: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    high: "bg-quantum-violet/10 text-quantum-violet border-quantum-violet/30",
    normal: "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30",
    low: "bg-steel/10 text-steel border-steel/30",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border capitalize ${styles[priority] || styles.normal}`}>
      {priority}
    </span>
  );
}
