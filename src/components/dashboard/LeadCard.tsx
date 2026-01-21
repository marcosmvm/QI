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
  new: { label: "New", dot: "bg-primary", text: "text-primary" },
  contacted: { label: "Contacted", dot: "bg-info", text: "text-info" },
  qualified: { label: "Qualified", dot: "bg-success", text: "text-success" },
  proposal: { label: "Proposal", dot: "bg-warning", text: "text-warning" },
  won: { label: "Won", dot: "bg-success", text: "text-success" },
  lost: { label: "Lost", dot: "bg-error", text: "text-error" },
};

export function LeadCard({ lead, className }: LeadCardProps) {
  const status = statusConfig[lead.status];

  return (
    <Link
      href={`/dashboard/leads/${lead.id}`}
      className={cn(
        "block rounded-lg border border-border bg-white p-4 hover:border-primary/30 transition-colors",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <span className="text-sm font-medium text-foreground-secondary">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
          {lead.title && (
            <p className="text-xs text-foreground-muted truncate">{lead.title}</p>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-foreground-secondary">
          <Building2 className="h-3.5 w-3.5 text-foreground-muted" />
          <span className="truncate">{lead.company}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground-secondary">
          <Mail className="h-3.5 w-3.5 text-foreground-muted" />
          <span className="truncate">{lead.email}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
        <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", status.text)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
          {status.label}
        </span>
        {lead.score !== undefined && (
          <span className="text-xs text-foreground-muted">Score: {lead.score}</span>
        )}
      </div>
    </Link>
  );
}
