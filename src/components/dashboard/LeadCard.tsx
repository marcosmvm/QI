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

// Brand Board v1.0 - Status Badge Colors
const statusConfig = {
  new: { label: "New", dot: "bg-emerald-pro-600", text: "text-emerald-pro-600" },
  contacted: { label: "Contacted", dot: "bg-emerald-pro-500", text: "text-emerald-pro-500" },
  qualified: { label: "Qualified", dot: "bg-emerald-pro-400", text: "text-emerald-pro-400" },
  proposal: { label: "Proposal", dot: "bg-energy-orange", text: "text-energy-orange" },
  won: { label: "Won", dot: "bg-emerald-pro-400", text: "text-emerald-pro-400" },
  lost: { label: "Lost", dot: "bg-alert-red", text: "text-alert-red" },
};

// Brand Board v1.0 - Interactive Card Pattern
export function LeadCard({ lead, className }: LeadCardProps) {
  const status = statusConfig[lead.status];

  return (
    <Link
      href={`/dashboard/leads/${lead.id}`}
      className={cn(
        "block bg-light-bg-secondary dark:bg-midnight-blue border border-border-default dark:border-graphite rounded-xl p-6 transition-all duration-200 hover:border-emerald-pro-600/50 hover:bg-light-bg-secondary dark:hover:bg-graphite",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-graphite flex items-center justify-center shrink-0">
          <span className="text-sm font-medium text-emerald-pro-600">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{lead.name}</p>
          {lead.title && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{lead.title}</p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <Building2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span className="truncate">{lead.company}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span className="truncate">{lead.email}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border-default dark:border-graphite/50 flex items-center justify-between">
        <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", status.text)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
          {status.label}
        </span>
        {lead.score !== undefined && (
          <span className="text-xs text-slate-500 dark:text-slate-400">Score: {lead.score}</span>
        )}
      </div>
    </Link>
  );
}
