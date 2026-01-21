import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Building2,
  Plus,
} from "lucide-react";
import { ClientsTable } from "./ClientsTable";
import { calculateHealthScore } from "@/components/admin/ClientHealthBadge";

export const dynamic = "force-dynamic";

interface OrganizationWithMetrics {
  id: string;
  name: string;
  domain: string | null;
  industry: string | null;
  status: string;
  created_at: string;
  subscriptions: { plan_type: string; monthly_fee: number | null }[] | null;
  campaigns: {
    id: string;
    status: string;
    campaign_metrics: {
      deliverability_rate: number | null;
      open_rate: number | null;
      reply_rate: number | null;
      bounce_rate: number | null;
    }[];
  }[];
}

async function getClients(): Promise<OrganizationWithMetrics[]> {
  const supabase = await createClient();

  const { data: organizations } = await supabase
    .from("organizations")
    .select(`
      id,
      name,
      domain,
      industry,
      status,
      created_at,
      subscriptions (plan_type, monthly_fee),
      campaigns (
        id,
        status,
        campaign_metrics (
          deliverability_rate,
          open_rate,
          reply_rate,
          bounce_rate
        )
      )
    `)
    .order("created_at", { ascending: false });

  return (organizations || []) as OrganizationWithMetrics[];
}

async function getClientStats() {
  const supabase = await createClient();

  const { data: organizations } = await supabase
    .from("organizations")
    .select("status");

  const orgs = (organizations || []) as { status: string }[];

  const stats = {
    total: orgs.length,
    active: orgs.filter((o) => o.status === "active").length,
    pilot: orgs.filter((o) => o.status === "pilot").length,
    paused: orgs.filter((o) => o.status === "paused").length,
  };

  return stats;
}

// Calculate health score for a client
function getClientHealthScore(client: OrganizationWithMetrics): number | null {
  const allMetrics = client.campaigns.flatMap((c) => c.campaign_metrics);

  if (allMetrics.length === 0) return null;

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

export default async function ClientsPage() {
  const [clients, stats] = await Promise.all([getClients(), getClientStats()]);

  // Transform clients with health scores
  const clientsWithHealth = clients.map((client) => ({
    id: client.id,
    name: client.name,
    domain: client.domain,
    industry: client.industry,
    status: client.status,
    createdAt: client.created_at,
    planType: client.subscriptions?.[0]?.plan_type || null,
    monthlyFee: client.subscriptions?.[0]?.monthly_fee || null,
    campaignCount: client.campaigns.length,
    activeCampaigns: client.campaigns.filter((c) => c.status === "active").length,
    healthScore: getClientHealthScore(client),
  }));

  // Get unique industries for filter dropdown
  const industries = Array.from(
    new Set(clients.map((c) => c.industry).filter(Boolean))
  ) as string[];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Clients</h1>
          <p className="text-steel mt-1">Manage your client relationships</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="flex items-center gap-2 px-4 py-2 bg-electric-cyan text-deep-space font-medium rounded-lg hover:bg-electric-cyan/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Clients" value={stats.total} />
        <StatCard label="Active" value={stats.active} color="neon-mint" />
        <StatCard label="Pilot" value={stats.pilot} color="electric-cyan" />
        <StatCard label="Paused" value={stats.paused} color="energy-orange" />
      </div>

      {/* Clients Table with Search/Filter */}
      {clients.length === 0 ? (
        <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-12 text-center">
          <Building2 className="h-12 w-12 text-steel mx-auto mb-4" />
          <p className="text-steel">No clients yet</p>
          <Link
            href="/admin/clients/new"
            className="text-electric-cyan hover:underline text-sm mt-2 inline-block"
          >
            Add your first client
          </Link>
        </div>
      ) : (
        <ClientsTable clients={clientsWithHealth} industries={industries} />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color = "electric-cyan",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  const colorClasses: Record<string, string> = {
    "electric-cyan": "text-electric-cyan",
    "neon-mint": "text-neon-mint",
    "energy-orange": "text-energy-orange",
    "quantum-violet": "text-quantum-violet",
  };

  return (
    <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-4">
      <p className={`text-2xl font-sora font-bold ${colorClasses[color]}`}>
        {value}
      </p>
      <p className="text-sm text-steel mt-1">{label}</p>
    </div>
  );
}
