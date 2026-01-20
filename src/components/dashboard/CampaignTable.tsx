"use client";

import Link from "next/link";
import { MoreHorizontal, Play, Pause, Eye, Trash2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Campaign } from "@/types";

interface CampaignTableProps {
  campaigns: Campaign[];
}

const statusConfig = {
  draft: {
    label: "Draft",
    className: "bg-steel/20 text-steel border border-steel/20",
  },
  active: {
    label: "Active",
    className: "bg-emerald/15 text-emerald border border-emerald/20",
  },
  paused: {
    label: "Paused",
    className: "bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/20",
  },
  completed: {
    label: "Completed",
    className: "bg-primary-blue/15 text-primary-blue border border-primary-blue/20",
  },
};

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-blue/10 border border-primary-blue/20">
            <Mail className="h-5 w-5 text-primary-blue" />
          </div>
          <div>
            <h3 className="text-lg font-poppins font-semibold text-white">Active Campaigns</h3>
            <p className="text-xs text-steel">{campaigns.length} campaigns</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-deep-space/30">
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-steel/70">
                Campaign
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-steel/70">
                Status
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-steel/70">
                Sent
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-steel/70">
                Open Rate
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-steel/70">
                Reply Rate
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-steel/70">
                Deliverability
              </th>
              <th className="px-6 py-3.5 text-right text-[10px] font-semibold uppercase tracking-widest text-steel/70">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {campaigns.map((campaign) => {
              const status = statusConfig[campaign.status];
              return (
                <tr
                  key={campaign.id}
                  className="hover:bg-primary-blue/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="font-medium text-white hover:text-primary-blue transition-colors"
                    >
                      {campaign.name}
                    </Link>
                    <p className="text-xs text-steel mt-0.5">
                      Created {new Date(campaign.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold",
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-silver">
                    {campaign.metrics.sent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-1.5 max-w-16 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            campaign.metrics.openRate >= 30
                              ? "bg-emerald"
                              : campaign.metrics.openRate >= 15
                              ? "bg-accent-yellow"
                              : "bg-rose"
                          )}
                          style={{ width: `${Math.min(campaign.metrics.openRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-silver">
                        {campaign.metrics.openRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-1.5 max-w-16 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            campaign.metrics.replyRate >= 3
                              ? "bg-emerald"
                              : campaign.metrics.replyRate >= 1
                              ? "bg-accent-yellow"
                              : "bg-rose"
                          )}
                          style={{ width: `${Math.min(campaign.metrics.replyRate * 10, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-silver">
                        {campaign.metrics.replyRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-1.5 max-w-16 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            campaign.metrics.deliverabilityRate >= 90
                              ? "bg-emerald"
                              : campaign.metrics.deliverabilityRate >= 85
                              ? "bg-accent-yellow"
                              : "bg-rose"
                          )}
                          style={{ width: `${campaign.metrics.deliverabilityRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-silver">
                        {campaign.metrics.deliverabilityRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      {campaign.status === "active" ? (
                        <button className="p-2 text-steel hover:text-accent-yellow hover:bg-accent-yellow/10 rounded-lg transition-colors">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campaign.status === "paused" || campaign.status === "draft" ? (
                        <button className="p-2 text-steel hover:text-emerald hover:bg-emerald/10 rounded-lg transition-colors">
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="p-2 text-steel hover:text-primary-blue hover:bg-primary-blue/10 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="p-2 text-steel hover:text-rose hover:bg-rose/10 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-steel hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
