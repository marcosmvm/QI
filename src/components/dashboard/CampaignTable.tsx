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
    className: "bg-slate-100 text-slate-600 border border-slate-200",
  },
  active: {
    label: "Active",
    className: "bg-neon-mint/10 text-neon-mint border border-neon-mint/20",
  },
  paused: {
    label: "Paused",
    className: "bg-energy-orange/10 text-energy-orange border border-energy-orange/20",
  },
  completed: {
    label: "Completed",
    className: "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20",
  },
};

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
            <Mail className="h-5 w-5 text-electric-cyan" />
          </div>
          <div>
            <h3 className="text-lg font-sora font-semibold text-slate-900">Active Campaigns</h3>
            <p className="text-xs text-slate-500">{campaigns.length} campaigns</p>
          </div>
        </div>
        <Link
          href="/dashboard/campaigns"
          className="text-sm text-electric-cyan hover:text-cyan-dark transition-colors font-medium"
        >
          View all campaigns →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Campaign
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Status
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Sent
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Open Rate
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Reply Rate
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Deliverability
              </th>
              <th className="px-6 py-3.5 text-right text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {campaigns.map((campaign) => {
              const status = statusConfig[campaign.status];
              return (
                <tr
                  key={campaign.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="font-medium text-slate-900 hover:text-electric-cyan transition-colors"
                    >
                      {campaign.name}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">
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
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    {campaign.metrics.sent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-1.5 max-w-16 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            campaign.metrics.openRate >= 30
                              ? "bg-neon-mint"
                              : campaign.metrics.openRate >= 15
                              ? "bg-energy-orange"
                              : "bg-rose"
                          )}
                          style={{ width: `${Math.min(campaign.metrics.openRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {campaign.metrics.openRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-1.5 max-w-16 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            campaign.metrics.replyRate >= 3
                              ? "bg-neon-mint"
                              : campaign.metrics.replyRate >= 1
                              ? "bg-energy-orange"
                              : "bg-rose"
                          )}
                          style={{ width: `${Math.min(campaign.metrics.replyRate * 10, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {campaign.metrics.replyRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-1.5 max-w-16 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            campaign.metrics.deliverabilityRate >= 90
                              ? "bg-electric-cyan"
                              : campaign.metrics.deliverabilityRate >= 85
                              ? "bg-energy-orange"
                              : "bg-rose"
                          )}
                          style={{ width: `${campaign.metrics.deliverabilityRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {campaign.metrics.deliverabilityRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      {campaign.status === "active" ? (
                        <button className="p-2 text-slate-500 hover:text-energy-orange hover:bg-energy-orange/10 rounded-lg transition-colors">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campaign.status === "paused" || campaign.status === "draft" ? (
                        <button className="p-2 text-slate-500 hover:text-neon-mint hover:bg-neon-mint/10 rounded-lg transition-colors">
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="p-2 text-slate-500 hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="p-2 text-slate-500 hover:text-rose hover:bg-rose/10 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
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
