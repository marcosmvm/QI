"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  Building2,
  Plus,
} from "lucide-react";
import { ClientsTable } from "./ClientsTable";
import { calculateHealthScore } from "@/components/admin/ClientHealthBadge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};


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
  const supabase = createClient();

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
  const supabase = createClient();

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

interface ClientWithHealth {
  id: string;
  name: string;
  domain: string | null;
  industry: string | null;
  status: string;
  createdAt: string;
  planType: string | null;
  monthlyFee: number | null;
  campaignCount: number;
  activeCampaigns: number;
  healthScore: number | null;
}

interface Stats {
  total: number;
  active: number;
  pilot: number;
  paused: number;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<OrganizationWithMetrics[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, pilot: 0, paused: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [clientsData, statsData] = await Promise.all([getClients(), getClientStats()]);
      setClients(clientsData);
      setStats(statsData);
      setLoading(false);
    }
    loadData();
  }, []);

  // Transform clients with health scores
  const clientsWithHealth: ClientWithHealth[] = clients.map((client) => ({
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

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-slate-500 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Admin / <span className="text-emerald-pro-500">Clients</span></p>
          <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Clients</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your client relationships</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-pro-600 dark:bg-xgrowth-500 text-white dark:text-green-950 font-medium rounded-lg hover:bg-emerald-pro-600/90 dark:hover:bg-xgrowth-400 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Clients" value={stats.total} />
        <StatCard label="Active" value={stats.active} color="emerald-pro-400" />
        <StatCard label="Pilot" value={stats.pilot} color="emerald-pro-600" />
        <StatCard label="Paused" value={stats.paused} color="energy-orange" />
      </motion.div>

      {/* Clients Table with Search/Filter */}
      <motion.div variants={itemVariants}>
        {clients.length === 0 ? (
          <div className="glass-premium p-12 text-center">
            <Building2 className="h-12 w-12 text-slate-500 dark:text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No clients yet</p>
            <Link
              href="/admin/clients/new"
              className="text-emerald-pro-600 hover:underline text-sm mt-2 inline-block"
            >
              Add your first client
            </Link>
          </div>
        ) : (
          <ClientsTable clients={clientsWithHealth} industries={industries} />
        )}
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  color = "emerald-pro-600",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  const colorClasses: Record<string, string> = {
    "emerald-pro-600": "text-emerald-pro-600",
    "emerald-pro-400": "text-emerald-pro-400",
    "energy-orange": "text-energy-orange",
    "emerald-pro-500": "text-emerald-pro-500",
  };

  return (
    <div className="glass-premium p-4">
      <p className={`text-2xl font-sora font-bold ${colorClasses[color]}`}>
        {value}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
    </div>
  );
}
