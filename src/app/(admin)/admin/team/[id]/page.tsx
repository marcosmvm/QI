import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Calendar,
  Shield,
  Building2,
  Headphones,
  Eye,
  MoreHorizontal,
  Check,
  X,
  Clock,
  Users,
  Edit2,
  AlertTriangle,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface TeamMemberData {
  id: string;
  user_id: string;
  role: string;
  permissions: Record<string, boolean>;
  hired_at: string | null;
  is_active: boolean;
  profiles: {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface AssignedClient {
  id: string;
  organization_id: string;
  assigned_at: string;
  organizations: {
    id: string;
    name: string;
    status: string;
  } | null;
}

interface ActivityLog {
  id: string;
  action: string;
  resource_type: string;
  created_at: string;
  details: Record<string, unknown> | null;
}

async function getTeamMember(id: string): Promise<TeamMemberData | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("team_members")
    .select(`
      id,
      user_id,
      role,
      permissions,
      hired_at,
      is_active,
      profiles:user_id (
        id,
        email,
        full_name,
        avatar_url
      )
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as unknown as TeamMemberData;
}

async function getAssignedClients(userId: string): Promise<AssignedClient[]> {
  const supabase = await createClient();

  // In a real implementation, this would query assigned client relationships
  // For now, we'll simulate with organization_members where user is account manager
  const { data } = await supabase
    .from("organization_members")
    .select(`
      id,
      organization_id,
      joined_at,
      organizations (
        id,
        name,
        status
      )
    `)
    .eq("user_id", userId);

  return ((data || []) as unknown as Array<{
    id: string;
    organization_id: string;
    joined_at: string;
    organizations: { id: string; name: string; status: string } | null;
  }>).map((d) => ({
    id: d.id,
    organization_id: d.organization_id,
    assigned_at: d.joined_at,
    organizations: d.organizations,
  }));
}

async function getActivityLogs(userId: string): Promise<ActivityLog[]> {
  const supabase = await createClient();

  // In a real implementation, query audit_logs table
  // For now, return mock data
  const { data } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10);

  return (data || []) as ActivityLog[];
}

const defaultPermissions = {
  view_dashboard: true,
  manage_clients: false,
  manage_campaigns: false,
  view_analytics: true,
  manage_billing: false,
  manage_team: false,
  access_support: true,
  manage_settings: false,
};

export default async function TeamMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  const member = await getTeamMember(id);

  if (!member) {
    notFound();
  }

  const [assignedClients, activityLogs] = await Promise.all([
    getAssignedClients(member.user_id),
    getActivityLogs(member.user_id),
  ]);

  const profile = member.profiles;
  const permissions = { ...defaultPermissions, ...member.permissions };

  const roleConfig = {
    admin: {
      label: "Admin",
      icon: Shield,
      color: "quantum-violet",
      description: "Full access to all features",
    },
    account_manager: {
      label: "Account Manager",
      icon: Building2,
      color: "electric-cyan",
      description: "Manages clients and campaigns",
    },
    support: {
      label: "Support",
      icon: Headphones,
      color: "neon-mint",
      description: "Handles support tickets",
    },
    viewer: {
      label: "Viewer",
      icon: Eye,
      color: "steel",
      description: "Read-only access",
    },
  };

  const role = roleConfig[member.role as keyof typeof roleConfig] || roleConfig.viewer;

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const colorClasses: Record<string, { text: string; bg: string; border: string }> = {
    "quantum-violet": {
      text: "text-quantum-violet",
      bg: "bg-quantum-violet/10",
      border: "border-quantum-violet/30",
    },
    "electric-cyan": {
      text: "text-electric-cyan",
      bg: "bg-electric-cyan/10",
      border: "border-electric-cyan/30",
    },
    "neon-mint": {
      text: "text-neon-mint",
      bg: "bg-neon-mint/10",
      border: "border-neon-mint/30",
    },
    steel: {
      text: "text-steel",
      bg: "bg-steel/10",
      border: "border-steel/30",
    },
  };

  const colors = colorClasses[role.color] || colorClasses.steel;

  return (
    <div className="p-8">
      {/* Back link */}
      <Link
        href="/admin/team"
        className="inline-flex items-center gap-2 text-steel hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Team
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`h-16 w-16 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
            <span className={`text-xl font-medium ${colors.text}`}>
              {getInitials(profile?.full_name)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-sora font-bold text-white">
                {profile?.full_name || "Unnamed"}
              </h1>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
              >
                {role.label}
              </span>
              {!member.is_active && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-energy-orange/10 text-energy-orange border border-energy-orange/30">
                  Inactive
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-sm text-steel">
                <Mail className="h-3.5 w-3.5" />
                {profile?.email || "No email"}
              </span>
              {member.hired_at && (
                <span className="text-sm text-steel">
                  <Calendar className="h-3.5 w-3.5 inline mr-1" />
                  Joined {new Date(member.hired_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-electric-cyan/50 text-electric-cyan rounded-lg hover:bg-electric-cyan/10 transition-colors">
            <Edit2 className="h-4 w-4" />
            Edit
          </button>
          <button className="p-2 border border-graphite text-steel rounded-lg hover:bg-midnight-blue/30 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Permissions */}
          <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-electric-cyan" />
              </div>
              <div>
                <h2 className="text-lg font-sora font-semibold text-white">
                  Permissions
                </h2>
                <p className="text-sm text-steel">{role.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(permissions).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-deep-space/50 border border-graphite/30 rounded-lg"
                >
                  <span className="text-sm text-silver capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                  {value ? (
                    <Check className="h-4 w-4 text-neon-mint" />
                  ) : (
                    <X className="h-4 w-4 text-steel" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Clients */}
          <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-quantum-violet/10 border border-quantum-violet/30 flex items-center justify-center">
                  <Users className="h-5 w-5 text-quantum-violet" />
                </div>
                <div>
                  <h2 className="text-lg font-sora font-semibold text-white">
                    Assigned Clients
                  </h2>
                  <p className="text-sm text-steel">
                    {assignedClients.length} client{assignedClients.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button className="text-sm text-electric-cyan hover:underline">
                Assign Client
              </button>
            </div>

            {assignedClients.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-10 w-10 text-steel mx-auto mb-3" />
                <p className="text-steel text-sm">No clients assigned</p>
              </div>
            ) : (
              <div className="space-y-3">
                {assignedClients.map((client) => (
                  <Link
                    key={client.id}
                    href={`/admin/clients/${client.organization_id}`}
                    className="flex items-center justify-between p-4 bg-deep-space/50 border border-graphite/30 rounded-lg hover:border-electric-cyan/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-quantum-violet/10 border border-quantum-violet/30 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-quantum-violet" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {client.organizations?.name || "Unknown Client"}
                        </p>
                        <p className="text-xs text-steel">
                          Assigned {new Date(client.assigned_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={client.organizations?.status || "inactive"} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Activity Log */}
          <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-neon-mint/10 border border-neon-mint/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-neon-mint" />
              </div>
              <div>
                <h2 className="text-lg font-sora font-semibold text-white">
                  Recent Activity
                </h2>
                <p className="text-sm text-steel">Last 10 actions</p>
              </div>
            </div>

            {activityLogs.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-10 w-10 text-steel mx-auto mb-3" />
                <p className="text-steel text-sm">No activity recorded</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-deep-space/50 border border-graphite/30 rounded-lg"
                  >
                    <p className="text-sm text-white capitalize">
                      {log.action.replace(/_/g, " ")}
                    </p>
                    <p className="text-xs text-steel mt-1">
                      {log.resource_type} •{" "}
                      {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-sora font-semibold text-red-400">
                Danger Zone
              </h3>
            </div>

            <div className="space-y-3">
              {member.is_active ? (
                <button className="w-full flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-left hover:bg-red-500/20 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Deactivate Member
                    </p>
                    <p className="text-xs text-steel mt-0.5">
                      Revoke access to all systems
                    </p>
                  </div>
                </button>
              ) : (
                <button className="w-full flex items-center justify-between p-3 bg-neon-mint/10 border border-neon-mint/20 rounded-lg text-left hover:bg-neon-mint/20 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Reactivate Member
                    </p>
                    <p className="text-xs text-steel mt-0.5">
                      Restore access to assigned resources
                    </p>
                  </div>
                </button>
              )}

              <button className="w-full flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-left hover:bg-red-500/20 transition-colors">
                <div>
                  <p className="text-sm font-medium text-red-400">
                    Remove from Team
                  </p>
                  <p className="text-xs text-steel mt-0.5">
                    Permanently delete this team member
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
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
    inactive: "bg-steel/10 text-steel border-steel/30",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border capitalize ${
        styles[status] || styles.inactive
      }`}
    >
      {status}
    </span>
  );
}
