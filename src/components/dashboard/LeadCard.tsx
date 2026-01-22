"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Building2, Mail } from "lucide-react";

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
  className?: string;
}

const statusConfig = {
  new: { label: "New", dot: "bg-electric-cyan", text: "text-electric-cyan" },
  contacted: { label: "Contacted", dot: "bg-quantum-violet", text: "text-quantum-violet" },
  qualified: { label: "Qualified", dot: "bg-neon-mint", text: "text-neon-mint" },
  proposal: { label: "Proposal", dot: "bg-energy-orange", text: "text-energy-orange" },
  won: { label: "Won", dot: "bg-neon-mint", text: "text-neon-mint" },
  lost: { label: "Lost", dot: "bg-error", text: "text-error" },
};

export function LeadCard({ lead, className }: LeadCardProps) {
  const status = statusConfig[lead.status];

  return (
    <Link
      href={`/dashboard/leads/${lead.id}`}
      className={cn(
        "block rounded-xl border border-graphite bg-midnight-blue/60 backdrop-blur-sm p-4 hover:border-electric-cyan/40 hover:shadow-glow-cyan-sm transition-all",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-deep-space/60 border border-graphite flex items-center justify-center shrink-0">
          <span className="text-sm font-medium text-electric-cyan">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{lead.name}</p>
          {lead.title && (
            <p className="text-xs text-steel truncate">{lead.title}</p>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-silver">
          <Building2 className="h-3.5 w-3.5 text-steel" />
          <span className="truncate">{lead.company}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-silver">
          <Mail className="h-3.5 w-3.5 text-steel" />
          <span className="truncate">{lead.email}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-graphite flex items-center justify-between">
        <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", status.text)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
          {status.label}
        </span>
        {lead.score !== undefined && (
          <span className="text-xs text-steel">Score: {lead.score}</span>
        )}
      </div>
    </Link>
  );
}
