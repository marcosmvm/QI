"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  UserPlus,
  Users,
  Shield,
  Headphones,
  Eye,
  MoreHorizontal,
  Mail,
  Calendar,
  Building2,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface TeamMemberWithProfile {
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
  };
}

interface TeamStats {
  total: number;
  admins: number;
  accountManagers: number;
  support: number;
  viewers: number;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberWithProfile[]>([]);
  const [stats, setStats] = useState<TeamStats>({
    total: 0,
    admins: 0,
    accountManagers: 0,
    support: 0,
    viewers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      // Fetch team members
      const { data: membersData } = await supabase
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
        .eq("is_active", true)
        .order("hired_at", { ascending: false });

      const members = (membersData || []) as TeamMemberWithProfile[];
      setTeamMembers(members);

      // Calculate stats
      setStats({
        total: members.length,
        admins: members.filter((m) => m.role === "admin").length,
        accountManagers: members.filter((m) => m.role === "account_manager").length,
        support: members.filter((m) => m.role === "support").length,
        viewers: members.filter((m) => m.role === "viewer").length,
      });

      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-steel mb-2">
            <span>Admin</span>
            <span className="text-graphite">/</span>
            <span className="text-electric-cyan">Team</span>
          </div>
          <h1 className="text-2xl font-sora font-bold text-white">Team</h1>
          <p className="text-steel mt-1">Manage your team members and roles</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-electric-cyan text-deep-space font-medium rounded-lg hover:bg-electric-cyan/90 transition-colors">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Members" value={stats.total} icon={Users} />
        <StatCard
          label="Admins"
          value={stats.admins}
          icon={Shield}
          color="quantum-violet"
        />
        <StatCard
          label="Account Managers"
          value={stats.accountManagers}
          icon={Building2}
          color="electric-cyan"
        />
        <StatCard
          label="Support"
          value={stats.support}
          icon={Headphones}
          color="neon-mint"
        />
        <StatCard
          label="Viewers"
          value={stats.viewers}
          icon={Eye}
          color="steel"
        />
      </div>

      {/* Team Members Grid */}
      {teamMembers.length === 0 ? (
        <div className="glass-premium p-12 text-center">
          <Users className="h-12 w-12 text-steel mx-auto mb-4" />
          <p className="text-steel">No team members yet</p>
          <button className="text-electric-cyan hover:underline text-sm mt-2">
            Invite your first team member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      )}

      {/* Role Descriptions */}
      <div className="mt-12">
        <h2 className="text-lg font-sora font-semibold text-white mb-4">
          Role Permissions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <RoleCard
            role="Admin"
            description="Full access to all features including team management, billing, and settings."
            icon={Shield}
            color="quantum-violet"
          />
          <RoleCard
            role="Account Manager"
            description="Manage clients, campaigns, and view analytics. Cannot access billing or team settings."
            icon={Building2}
            color="electric-cyan"
          />
          <RoleCard
            role="Support"
            description="Access to support inbox and client communications. Read-only for other areas."
            icon={Headphones}
            color="neon-mint"
          />
          <RoleCard
            role="Viewer"
            description="Read-only access to dashboards and reports. Cannot make any changes."
            icon={Eye}
            color="steel"
          />
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color = "electric-cyan",
}: {
  label: string;
  value: number;
  icon: typeof Users;
  color?: string;
}) {
  const colorClasses: Record<string, { text: string; bg: string; border: string }> = {
    "electric-cyan": {
      text: "text-electric-cyan",
      bg: "bg-electric-cyan/10",
      border: "border-electric-cyan/30",
    },
    "quantum-violet": {
      text: "text-quantum-violet",
      bg: "bg-quantum-violet/10",
      border: "border-quantum-violet/30",
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

  const colors = colorClasses[color] || colorClasses["electric-cyan"];

  return (
    <div className="glass-premium p-4">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`h-8 w-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}
        >
          <Icon className={`h-4 w-4 ${colors.text}`} />
        </div>
      </div>
      <p className="text-2xl font-sora font-bold text-white">{value}</p>
      <p className="text-sm text-steel mt-1">{label}</p>
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMemberWithProfile }) {
  const profile = member.profiles;
  const roleColors: Record<string, string> = {
    admin: "bg-quantum-violet/10 text-quantum-violet border-quantum-violet/30",
    account_manager: "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30",
    support: "bg-neon-mint/10 text-neon-mint border-neon-mint/30",
    viewer: "bg-steel/10 text-steel border-steel/30",
  };

  const roleLabels: Record<string, string> = {
    admin: "Admin",
    account_manager: "Account Manager",
    support: "Support",
    viewer: "Viewer",
  };

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="glass-premium p-6 hover:border-graphite/80 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-quantum-violet/20 border border-quantum-violet/30 flex items-center justify-center">
            <span className="text-lg font-medium text-quantum-violet">
              {getInitials(profile.full_name)}
            </span>
          </div>
          <div>
            <p className="text-base font-medium text-white">
              {profile.full_name || "Unnamed"}
            </p>
            <span
              className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border mt-1 ${
                roleColors[member.role] || roleColors.viewer
              }`}
            >
              {roleLabels[member.role] || member.role}
            </span>
          </div>
        </div>
        <button className="p-2 rounded-lg text-steel hover:text-white hover:bg-midnight-blue/50 transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-steel" />
          <span className="text-silver truncate">{profile.email}</span>
        </div>
        {member.hired_at && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-steel" />
            <span className="text-silver">
              Joined {new Date(member.hired_at).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-graphite/30 flex items-center gap-2">
        <Link
          href={`/admin/team/${member.id}`}
          className="flex-1 px-3 py-2 text-sm text-center text-silver border border-graphite rounded-lg hover:bg-midnight-blue/30 transition-colors"
        >
          View Profile
        </Link>
        <button className="flex-1 px-3 py-2 text-sm text-center text-electric-cyan border border-electric-cyan/30 rounded-lg hover:bg-electric-cyan/10 transition-colors">
          Edit Role
        </button>
      </div>
    </div>
  );
}

function RoleCard({
  role,
  description,
  icon: Icon,
  color,
}: {
  role: string;
  description: string;
  icon: typeof Shield;
  color: string;
}) {
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

  const colors = colorClasses[color] || colorClasses.steel;

  return (
    <div className="glass-premium p-4">
      <div
        className={`h-10 w-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center mb-3`}
      >
        <Icon className={`h-5 w-5 ${colors.text}`} />
      </div>
      <h3 className="text-sm font-semibold text-white mb-1">{role}</h3>
      <p className="text-xs text-steel">{description}</p>
    </div>
  );
}
