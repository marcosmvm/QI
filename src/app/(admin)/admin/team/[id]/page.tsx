"use client";

import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

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

export default function TeamMemberDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [member, setMember] = useState<TeamMemberData | null>(null);
  const [assignedClients, setAssignedClients] = useState<AssignedClient[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      // Fetch team member
      const { data: memberData, error } = await supabase
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

      if (error || !memberData) {
        notFound();
        return;
      }

      const teamMember = memberData as unknown as TeamMemberData;
      setMember(teamMember);

      // Fetch assigned clients
      const { data: clientsData } = await supabase
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
        .eq("user_id", teamMember.user_id);

      setAssignedClients(
        ((clientsData || []) as unknown as Array<{
          id: string;
          organization_id: string;
          joined_at: string;
          organizations: { id: string; name: string; status: string } | null;
        }>).map((d) => ({
          id: d.id,
          organization_id: d.organization_id,
          assigned_at: d.joined_at,
          organizations: d.organizations,
        }))
      );

      // Fetch activity logs
      const { data: logsData } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("user_id", teamMember.user_id)
        .order("created_at", { ascending: false })
        .limit(10);

      setActivityLogs((logsData || []) as ActivityLog[]);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading || !member) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-light-text-muted dark:text-steel">Loading...</div>
      </div>
    );
  }

  const profile = member.profiles;
  const permissions = { ...defaultPermissions, ...member.permissions };

  const roleConfig = {
    admin: {
      label: "Admin",
      icon: Shield,
      color: "emerald-pro-500",
      description: "Full access to all features",
    },
    account_manager: {
      label: "Account Manager",
      icon: Building2,
      color: "emerald-pro-600",
      description: "Manages clients and campaigns",
    },
    support: {
      label: "Support",
      icon: Headphones,
      color: "emerald-pro-400",
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
    "emerald-pro-500": {
      text: "text-emerald-pro-500",
      bg: "bg-emerald-pro-500/10",
      border: "border-emerald-pro-500/30",
    },
    "emerald-pro-600": {
      text: "text-emerald-pro-600",
      bg: "bg-emerald-pro-600/10",
      border: "border-emerald-pro-600/30",
    },
    "emerald-pro-400": {
      text: "text-emerald-pro-400",
      bg: "bg-emerald-pro-400/10",
      border: "border-emerald-pro-400/30",
    },
    steel: {
      text: "text-light-text-muted dark:text-steel",
      bg: "bg-steel/10",
      border: "border-steel/30",
    },
  };

  const colors = colorClasses[role.color] || colorClasses.steel;

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Breadcrumb Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center gap-2 text-sm text-light-text-muted dark:text-steel mb-4">
          <Link href="/admin" className="hover:text-light-text dark:text-white transition-colors">Admin</Link>
          <span className="text-graphite">/</span>
          <Link href="/admin/team" className="hover:text-light-text dark:text-white transition-colors">Team</Link>
          <span className="text-graphite">/</span>
          <span className="text-emerald-pro-600">{profile?.full_name || "Member"}</span>
        </div>
        <Link
          href="/admin/team"
          className="inline-flex items-center gap-2 text-light-text-muted dark:text-steel hover:text-light-text dark:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Team
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={itemVariants}>
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`h-16 w-16 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
            <span className={`text-xl font-medium ${colors.text}`}>
              {getInitials(profile?.full_name)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-sora font-bold text-light-text dark:text-white">
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
              <span className="flex items-center gap-1 text-sm text-light-text-muted dark:text-steel">
                <Mail className="h-3.5 w-3.5" />
                {profile?.email || "No email"}
              </span>
              {member.hired_at && (
                <span className="text-sm text-light-text-muted dark:text-steel">
                  <Calendar className="h-3.5 w-3.5 inline mr-1" />
                  Joined {new Date(member.hired_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-emerald-pro-600/50 text-emerald-pro-600 rounded-lg hover:bg-emerald-pro-600/10 transition-colors">
            <Edit2 className="h-4 w-4" />
            Edit
          </button>
          <button className="p-2 border border-border-default dark:border-graphite text-light-text-muted dark:text-steel rounded-lg hover:bg-light-bg-secondary dark:bg-midnight-blue/30 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Permissions */}
          <div className="glass-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-emerald-pro-600" />
              </div>
              <div>
                <h2 className="text-lg font-sora font-semibold text-light-text dark:text-white">
                  Permissions
                </h2>
                <p className="text-sm text-light-text-muted dark:text-steel">{role.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(permissions).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-lg"
                >
                  <span className="text-sm text-silver capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                  {value ? (
                    <Check className="h-4 w-4 text-emerald-pro-400" />
                  ) : (
                    <X className="h-4 w-4 text-light-text-muted dark:text-steel" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Clients */}
          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-pro-500/10 border border-emerald-pro-500/30 flex items-center justify-center">
                  <Users className="h-5 w-5 text-emerald-pro-500" />
                </div>
                <div>
                  <h2 className="text-lg font-sora font-semibold text-light-text dark:text-white">
                    Assigned Clients
                  </h2>
                  <p className="text-sm text-light-text-muted dark:text-steel">
                    {assignedClients.length} client{assignedClients.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button className="text-sm text-emerald-pro-600 hover:underline">
                Assign Client
              </button>
            </div>

            {assignedClients.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-10 w-10 text-light-text-muted dark:text-steel mx-auto mb-3" />
                <p className="text-light-text-muted dark:text-steel text-sm">No clients assigned</p>
              </div>
            ) : (
              <div className="space-y-3">
                {assignedClients.map((client) => (
                  <Link
                    key={client.id}
                    href={`/admin/clients/${client.organization_id}`}
                    className="flex items-center justify-between p-4 bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-lg hover:border-emerald-pro-600/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-emerald-pro-500/10 border border-emerald-pro-500/30 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-emerald-pro-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-light-text dark:text-white">
                          {client.organizations?.name || "Unknown Client"}
                        </p>
                        <p className="text-xs text-light-text-muted dark:text-steel">
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
          <div className="glass-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-pro-400/10 border border-emerald-pro-400/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-emerald-pro-400" />
              </div>
              <div>
                <h2 className="text-lg font-sora font-semibold text-light-text dark:text-white">
                  Recent Activity
                </h2>
                <p className="text-sm text-light-text-muted dark:text-steel">Last 10 actions</p>
              </div>
            </div>

            {activityLogs.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-10 w-10 text-light-text-muted dark:text-steel mx-auto mb-3" />
                <p className="text-light-text-muted dark:text-steel text-sm">No activity recorded</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-lg"
                  >
                    <p className="text-sm text-light-text dark:text-white capitalize">
                      {log.action.replace(/_/g, " ")}
                    </p>
                    <p className="text-xs text-light-text-muted dark:text-steel mt-1">
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
                    <p className="text-sm font-medium text-light-text dark:text-white">
                      Deactivate Member
                    </p>
                    <p className="text-xs text-light-text-muted dark:text-steel mt-0.5">
                      Revoke access to all systems
                    </p>
                  </div>
                </button>
              ) : (
                <button className="w-full flex items-center justify-between p-3 bg-emerald-pro-400/10 border border-emerald-pro-400/20 rounded-lg text-left hover:bg-emerald-pro-400/20 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-light-text dark:text-white">
                      Reactivate Member
                    </p>
                    <p className="text-xs text-light-text-muted dark:text-steel mt-0.5">
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
                  <p className="text-xs text-light-text-muted dark:text-steel mt-0.5">
                    Permanently delete this team member
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    pilot: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
    paused: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    churned: "bg-steel/10 text-light-text-muted dark:text-steel border-steel/30",
    inactive: "bg-steel/10 text-light-text-muted dark:text-steel border-steel/30",
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
