"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  title?: string;
  phone?: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  score?: number;
  lastActivity?: string;
  createdAt: string;
}

interface LeadCardProps {
  lead: Lead;
  variant?: "default" | "compact";
  showActions?: boolean;
  className?: string;
}

const statusConfig = {
  new: {
    label: "New",
    className: "bg-electric-cyan/20 text-electric-cyan border-electric-cyan/30",
  },
  contacted: {
    label: "Contacted",
    className: "bg-quantum-violet/20 text-quantum-violet border-quantum-violet/30",
  },
  qualified: {
    label: "Qualified",
    className: "bg-neon-mint/20 text-neon-mint border-neon-mint/30",
  },
  proposal: {
    label: "Proposal",
    className: "bg-energy-orange/20 text-energy-orange border-energy-orange/30",
  },
  won: {
    label: "Won",
    className: "bg-neon-mint/20 text-neon-mint border-neon-mint/30",
  },
  lost: {
    label: "Lost",
    className: "bg-rose/20 text-rose border-rose/30",
  },
};

export function LeadCard({
  lead,
  variant = "default",
  showActions = true,
  className,
}: LeadCardProps) {
  const status = statusConfig[lead.status];

  if (variant === "compact") {
    return (
      <Link
        href={`/dashboard/leads/${lead.id}`}
        className={cn(
          "flex items-center gap-4 p-4 rounded-xl border border-graphite bg-midnight-blue/60 hover:border-electric-cyan/30 hover:bg-electric-cyan/5 transition-all group",
          className
        )}
      >
        <div className="h-10 w-10 rounded-full bg-quantum-violet/20 flex items-center justify-center shrink-0">
          <span className="text-sm font-semibold text-quantum-violet">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white truncate">{lead.name}</p>
          <p className="text-sm text-steel truncate">{lead.company}</p>
        </div>
        <span
          className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-medium border",
            status.className
          )}
        >
          {status.label}
        </span>
        <ChevronRight className="h-4 w-4 text-steel group-hover:text-electric-cyan transition-colors" />
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-graphite bg-midnight-blue/60 p-5 hover:border-electric-cyan/30 transition-all",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-quantum-violet/20 flex items-center justify-center">
            <span className="text-lg font-semibold text-quantum-violet">
              {lead.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <Link
              href={`/dashboard/leads/${lead.id}`}
              className="font-semibold text-white hover:text-electric-cyan transition-colors"
            >
              {lead.name}
            </Link>
            {lead.title && (
              <p className="text-sm text-steel">{lead.title}</p>
            )}
          </div>
        </div>
        {showActions && (
          <button className="p-2 text-steel hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-steel" />
          <span className="text-silver">{lead.company}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-steel" />
          <span className="text-silver">{lead.email}</span>
        </div>
        {lead.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-steel" />
            <span className="text-silver">{lead.phone}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-graphite">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-medium border",
              status.className
            )}
          >
            {status.label}
          </span>
          {lead.score !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 text-energy-orange fill-energy-orange" />
              <span className="text-silver">{lead.score}</span>
            </div>
          )}
        </div>
        {lead.lastActivity && (
          <div className="flex items-center gap-1.5 text-xs text-steel">
            <Calendar className="h-3.5 w-3.5" />
            {lead.lastActivity}
          </div>
        )}
      </div>
    </div>
  );
}
