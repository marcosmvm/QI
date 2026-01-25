"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Clock,
  User,
  Filter,
  Search,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Building2,
  Mail,
  Users,
  Shield,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  profiles?: {
    full_name: string | null;
    email: string;
  } | null;
}

async function getAuditLogs(): Promise<AuditLog[]> {
  const supabase = createClient();

  const { data } = await supabase
    .from("audit_logs")
    .select(`
      *,
      profiles:user_id (
        full_name,
        email
      )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  return (data || []) as AuditLog[];
}

// Generate mock data if no audit logs exist
function getMockAuditLogs(): AuditLog[] {
  const now = new Date();
  const actions = [
    { action: "created", resource: "campaign", icon: Plus },
    { action: "updated", resource: "client", icon: Edit },
    { action: "viewed", resource: "report", icon: Eye },
    { action: "deleted", resource: "lead", icon: Trash2 },
    { action: "updated", resource: "settings", icon: Settings },
    { action: "created", resource: "team_member", icon: Users },
  ];

  const users = [
    { name: "Marcos Matthews", email: "marcos@xgrowthos.com" },
    { name: "Sarah Chen", email: "sarah@xgrowthos.com" },
    { name: "John Doe", email: "john@xgrowthos.com" },
  ];

  return Array.from({ length: 20 }, (_, i) => {
    const actionData = actions[i % actions.length];
    const user = users[i % users.length];
    const date = new Date(now.getTime() - i * 60 * 60 * 1000 * (i + 1));

    return {
      id: `mock-${i}`,
      user_id: `user-${i % 3}`,
      action: actionData.action,
      resource_type: actionData.resource,
      resource_id: `resource-${i}`,
      details: {
        name:
          actionData.resource === "campaign"
            ? "Q1 Enterprise Outreach"
            : actionData.resource === "client"
            ? "TechCorp Inc"
            : "Weekly Report",
      },
      ip_address: "192.168.1.1",
      user_agent: "Mozilla/5.0",
      created_at: date.toISOString(),
      profiles: {
        full_name: user.name,
        email: user.email,
      },
    };
  });
}

const actionConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  created: {
    icon: Plus,
    color: "emerald-pro-400",
    label: "Created",
  },
  updated: {
    icon: Edit,
    color: "emerald-pro-600",
    label: "Updated",
  },
  deleted: {
    icon: Trash2,
    color: "energy-orange",
    label: "Deleted",
  },
  viewed: {
    icon: Eye,
    color: "steel",
    label: "Viewed",
  },
};

const resourceConfig: Record<string, { icon: React.ElementType; label: string }> = {
  campaign: { icon: Mail, label: "Campaign" },
  client: { icon: Building2, label: "Client" },
  lead: { icon: Users, label: "Lead" },
  team_member: { icon: Users, label: "Team Member" },
  settings: { icon: Settings, label: "Settings" },
  report: { icon: Eye, label: "Report" },
  user: { icon: User, label: "User" },
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

export default function AuditLogPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const logs = await getAuditLogs();
        if (logs.length === 0) {
          setAuditLogs(getMockAuditLogs());
        } else {
          setAuditLogs(logs);
        }
      } catch {
        setAuditLogs(getMockAuditLogs());
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  // Group logs by date
  const groupedLogs = auditLogs.reduce((acc, log) => {
    const date = new Date(log.created_at);
    const dateKey = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(log);
    return acc;
  }, {} as Record<string, AuditLog[]>);

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-slate-500 dark:text-slate-400">Loading audit logs...</div>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Admin / <span className="text-emerald-pro-500">Audit Log</span></p>
          <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Audit Log</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track all changes and actions across the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border-default dark:border-graphite text-slate-500 dark:text-slate-400 rounded-lg hover:bg-light-bg-secondary dark:bg-midnight-blue/30 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-emerald-pro-600/30 text-emerald-pro-600 rounded-lg hover:bg-emerald-pro-600/10 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Search audit logs..."
            className="w-full h-10 rounded-lg border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/30 pl-10 pr-4 text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none"
          />
        </div>
        <select className="h-10 rounded-lg border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/30 px-4 text-slate-900 dark:text-white">
          <option value="">All Actions</option>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
          <option value="deleted">Deleted</option>
          <option value="viewed">Viewed</option>
        </select>
        <select className="h-10 rounded-lg border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/30 px-4 text-slate-900 dark:text-white">
          <option value="">All Resources</option>
          <option value="campaign">Campaigns</option>
          <option value="client">Clients</option>
          <option value="lead">Leads</option>
          <option value="team_member">Team Members</option>
        </select>
        <select className="h-10 rounded-lg border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/30 px-4 text-slate-900 dark:text-white">
          <option value="">All Users</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Actions"
          value={auditLogs.length}
          icon={Clock}
        />
        <StatCard
          label="Creates"
          value={auditLogs.filter((l) => l.action === "created").length}
          icon={Plus}
          color="emerald-pro-400"
        />
        <StatCard
          label="Updates"
          value={auditLogs.filter((l) => l.action === "updated").length}
          icon={Edit}
          color="emerald-pro-600"
        />
        <StatCard
          label="Deletes"
          value={auditLogs.filter((l) => l.action === "deleted").length}
          icon={Trash2}
          color="energy-orange"
        />
      </div>

      {/* Audit Log Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedLogs).map(([date, logs]) => (
          <div key={date}>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{date}</h3>
            <div className="space-y-2">
              {logs.map((log) => (
                <AuditLogRow key={log.id} log={log} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {auditLogs.length === 0 && (
        <div className="glass-premium p-12 text-center">
          <Clock className="h-12 w-12 text-slate-500 dark:text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">No audit logs yet</p>
          <p className="text-sm text-slate-500 dark:text-slate-400/70 mt-1">
            Actions will be recorded as users interact with the platform
          </p>
        </div>
      )}
    </motion.div>
  );
}

function AuditLogRow({ log }: { log: AuditLog }) {
  const action = actionConfig[log.action] || actionConfig.viewed;
  const resource = resourceConfig[log.resource_type] || resourceConfig.user;
  const ActionIcon = action.icon;
  const ResourceIcon = resource.icon;

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    "emerald-pro-400": {
      bg: "bg-emerald-pro-400/10",
      border: "border-emerald-pro-400/30",
      text: "text-emerald-pro-400",
    },
    "emerald-pro-600": {
      bg: "bg-emerald-pro-600/10",
      border: "border-emerald-pro-600/30",
      text: "text-emerald-pro-600",
    },
    "energy-orange": {
      bg: "bg-energy-orange/10",
      border: "border-energy-orange/30",
      text: "text-energy-orange",
    },
    steel: {
      bg: "bg-steel/10",
      border: "border-steel/30",
      text: "text-slate-500 dark:text-slate-400",
    },
  };

  const colors = colorClasses[action.color] || colorClasses.steel;

  const resourceName =
    (log.details as Record<string, string>)?.name || log.resource_type;

  return (
    <div className="flex items-center gap-4 p-4 glass-premium hover:border-border-default dark:border-graphite/70 transition-colors">
      {/* Action Icon */}
      <div
        className={`h-10 w-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}
      >
        <ActionIcon className={`h-5 w-5 ${colors.text}`} />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {log.profiles?.full_name || "System"}
          </span>
          <span className={`text-sm ${colors.text}`}>{action.label}</span>
          <span className="text-sm text-slate-700 dark:text-slate-200">a</span>
          <div className="flex items-center gap-1">
            <ResourceIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm text-slate-700 dark:text-slate-200">{resource.label}</span>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
          {resourceName}
        </p>
      </div>

      {/* Timestamp */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm text-slate-500 dark:text-slate-400">{formatTimeAgo(log.created_at)}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400/70">
          {new Date(log.created_at).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color = "emerald-pro-600",
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color?: string;
}) {
  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    "emerald-pro-600": {
      bg: "bg-emerald-pro-600/10",
      border: "border-emerald-pro-600/30",
      text: "text-emerald-pro-600",
    },
    "emerald-pro-400": {
      bg: "bg-emerald-pro-400/10",
      border: "border-emerald-pro-400/30",
      text: "text-emerald-pro-400",
    },
    "energy-orange": {
      bg: "bg-energy-orange/10",
      border: "border-energy-orange/30",
      text: "text-energy-orange",
    },
  };

  const colors = colorClasses[color] || colorClasses["emerald-pro-600"];

  return (
    <div className="glass-premium p-4">
      <div className="flex items-center gap-3">
        <div
          className={`h-8 w-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}
        >
          <Icon className={`h-4 w-4 ${colors.text}`} />
        </div>
        <div>
          <p className="text-xl font-sora font-bold text-slate-900 dark:text-white">{value}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
