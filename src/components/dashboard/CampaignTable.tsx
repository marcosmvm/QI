"use client";

import Link from "next/link";
import { MoreHorizontal, Play, Pause, Eye, Trash2, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Campaign } from "@/types";

interface CampaignTableProps {
  campaigns: Campaign[];
}

const statusConfig = {
  draft: {
    label: "Draft",
    className: "bg-slate-100 text-slate-600",
  },
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-600",
  },
  paused: {
    label: "Paused",
    className: "bg-amber-50 text-amber-600",
  },
  completed: {
    label: "Completed",
    className: "bg-blue-50 text-blue-600",
  },
};

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="relative rounded-3xl bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-sora font-semibold text-slate-900">Active Campaigns</h3>
            <p className="text-xs text-slate-500">{campaigns.length} campaigns running</p>
          </div>
        </div>
        <Link
          href="/dashboard/campaigns"
          className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark transition-colors font-medium"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Campaign
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Sent
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Open Rate
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Reply Rate
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Deliverability
              </th>
              <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
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
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="font-medium text-slate-900 hover:text-primary transition-colors"
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
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {campaign.metrics.sent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 max-w-16 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            campaign.metrics.openRate >= 30
                              ? "bg-emerald-500"
                              : campaign.metrics.openRate >= 15
                              ? "bg-amber-500"
                              : "bg-red-500"
                          )}
                          style={{ width: `${Math.min(campaign.metrics.openRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 w-12">
                        {campaign.metrics.openRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 max-w-16 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            campaign.metrics.replyRate >= 3
                              ? "bg-emerald-500"
                              : campaign.metrics.replyRate >= 1
                              ? "bg-amber-500"
                              : "bg-red-500"
                          )}
                          style={{ width: `${Math.min(campaign.metrics.replyRate * 10, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 w-12">
                        {campaign.metrics.replyRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 max-w-16 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            campaign.metrics.deliverabilityRate >= 90
                              ? "bg-primary"
                              : campaign.metrics.deliverabilityRate >= 85
                              ? "bg-amber-500"
                              : "bg-red-500"
                          )}
                          style={{ width: `${campaign.metrics.deliverabilityRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 w-12">
                        {campaign.metrics.deliverabilityRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {campaign.status === "active" ? (
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campaign.status === "paused" || campaign.status === "draft" ? (
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
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
