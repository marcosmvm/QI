"use client";

import { motion } from "framer-motion";
import {
  Mail,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { CampaignsTable } from "./CampaignsTable";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface CampaignData {
  id: string;
  name: string;
  status: string;
  targetIndustry: string | null;
  dailyLimit: number;
  createdAt: string;
  clientId: string;
  clientName: string;
  clientStatus: string;
  healthScore: number | null;
  healthLevel: "healthy" | "warning" | "critical" | "unknown";
  totalSent: number;
  totalOpened: number;
  totalReplied: number;
  openRate: number | null;
  replyRate: number | null;
}

interface CampaignsPageClientProps {
  campaigns: CampaignData[];
  clients: { id: string; name: string }[];
  stats: {
    total: number;
    active: number;
    paused: number;
    draft: number;
    completed: number;
  };
  healthCounts: {
    healthy: number;
    warning: number;
    critical: number;
  };
}

export default function CampaignsPageClient({
  campaigns,
  clients,
  stats,
  healthCounts,
}: CampaignsPageClientProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-sora font-bold text-white">Campaigns</h1>
            <p className="text-steel mt-1">
              Monitor and manage campaigns across all clients
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-6 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Active" value={stats.active} color="neon-mint" />
        <StatCard label="Paused" value={stats.paused} color="energy-orange" />
        <StatCard label="Draft" value={stats.draft} color="steel" />
        <StatCard
          label="Healthy"
          value={healthCounts.healthy}
          color="neon-mint"
          icon={CheckCircle}
        />
        <StatCard
          label="At Risk"
          value={healthCounts.warning + healthCounts.critical}
          color="energy-orange"
          icon={AlertTriangle}
        />
      </motion.div>

      {/* Campaigns Table */}
      <motion.div variants={itemVariants}>
        {campaigns.length === 0 ? (
          <div className="glass-premium p-12 text-center">
            <Mail className="h-12 w-12 text-steel mx-auto mb-4" />
            <p className="text-steel">No campaigns yet</p>
          </div>
        ) : (
          <CampaignsTable campaigns={campaigns} clients={clients} />
        )}
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  color = "electric-cyan",
  icon: Icon,
}: {
  label: string;
  value: number;
  color?: string;
  icon?: typeof TrendingUp;
}) {
  const colorClasses: Record<string, string> = {
    "electric-cyan": "text-electric-cyan",
    "neon-mint": "text-neon-mint",
    "energy-orange": "text-energy-orange",
    "quantum-violet": "text-quantum-violet",
    steel: "text-steel",
  };

  return (
    <div className="glass-premium p-4">
      <div className="flex items-center justify-between">
        <p className={`text-2xl font-sora font-bold ${colorClasses[color]}`}>
          {value}
        </p>
        {Icon && <Icon className={`h-5 w-5 ${colorClasses[color]}`} />}
      </div>
      <p className="text-sm text-steel mt-1">{label}</p>
    </div>
  );
}
