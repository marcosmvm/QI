import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Building2,
  Search,
  Plus,
  Filter,
  Mail,
  Users,
  TrendingUp,
} from "lucide-react";

interface Organization {
  id: string;
  name: string;
  domain: string | null;
  industry: string | null;
  status: string;
  created_at: string;
  subscriptions: { plan_type: string } | { plan_type: string }[] | null;
}

interface OrgStatus {
  status: string;
}

async function getClients(): Promise<Organization[]> {
  const supabase = await createClient();

  const { data: organizations } = await supabase
    .from("organizations")
    .select(`
      *,
      subscriptions(*),
      organization_members(count)
    `)
    .order("created_at", { ascending: false });

  return (organizations || []) as Organization[];
}

async function getClientStats() {
  const supabase = await createClient();

  const { data: organizations } = await supabase
    .from("organizations")
    .select("status");

  const orgs = (organizations || []) as OrgStatus[];

  const stats = {
    total: orgs.length,
    active: orgs.filter((o) => o.status === "active").length,
    pilot: orgs.filter((o) => o.status === "pilot").length,
    paused: orgs.filter((o) => o.status === "paused").length,
  };

  return stats;
}

export default async function ClientsPage() {
  const clients = await getClients();
  const stats = await getClientStats();

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

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel" />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full h-10 rounded-lg border border-graphite bg-deep-space pl-10 pr-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-graphite rounded-lg text-silver hover:bg-midnight-blue/30 transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* Clients List */}
      <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-graphite/50">
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Client
              </th>
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Plan
              </th>
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Industry
              </th>
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Joined
              </th>
              <th className="text-right text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite/30">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <Building2 className="h-12 w-12 text-steel mx-auto mb-4" />
                  <p className="text-steel">No clients yet</p>
                  <Link
                    href="/admin/clients/new"
                    className="text-electric-cyan hover:underline text-sm mt-2 inline-block"
                  >
                    Add your first client
                  </Link>
                </td>
              </tr>
            ) : (
              clients.map((client) => {
                const subscription = Array.isArray(client.subscriptions)
                  ? client.subscriptions[0]
                  : client.subscriptions;

                return (
                  <tr
                    key={client.id}
                    className="hover:bg-midnight-blue/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="flex items-center gap-3"
                      >
                        <div className="h-10 w-10 rounded-full bg-quantum-violet/20 border border-quantum-violet/30 flex items-center justify-center">
                          <span className="text-sm font-medium text-quantum-violet">
                            {client.name?.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white hover:text-electric-cyan transition-colors">
                            {client.name}
                          </p>
                          <p className="text-xs text-steel">{client.domain}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-silver capitalize">
                        {subscription?.plan_type || "No plan"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-silver">
                        {client.industry || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-steel">
                        {new Date(client.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="p-2 rounded-lg text-steel hover:text-white hover:bg-midnight-blue/50 transition-colors"
                          title="View details"
                        >
                          <TrendingUp className="h-4 w-4" />
                        </Link>
                        <button
                          className="p-2 rounded-lg text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 transition-colors"
                          title="Send email"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 rounded-lg text-steel hover:text-quantum-violet hover:bg-quantum-violet/10 transition-colors"
                          title="Team"
                        >
                          <Users className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-neon-mint/10 text-neon-mint border-neon-mint/30",
    pilot: "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30",
    paused: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    churned: "bg-steel/10 text-steel border-steel/30",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full border capitalize ${
        styles[status] || styles.paused
      }`}
    >
      {status}
    </span>
  );
}
