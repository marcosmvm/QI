"use client";

import Link from "next/link";
import { MoreHorizontal, Play, Pause, Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Campaign } from "@/types";

interface CampaignTableProps {
  campaigns: Campaign[];
}

// Brand Board v1.0 - Status Badge Colors
const statusConfig = {
  draft: {
    label: "Draft",
    dot: "bg-steel",
    text: "text-slate-700 dark:text-slate-400",
  },
  active: {
    label: "Active",
    dot: "bg-emerald-pro-400",
    text: "text-emerald-pro-400",
  },
  paused: {
    label: "Paused",
    dot: "bg-energy-orange",
    text: "text-energy-orange",
  },
  completed: {
    label: "Completed",
    dot: "bg-emerald-pro-600",
    text: "text-emerald-pro-600",
  },
};

// Brand Board v1.0 - Table Pattern
export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="bg-light-bg-secondary dark:bg-midnight-blue border border-border-default dark:border-graphite rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-default dark:border-graphite">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Campaigns</h3>
          <p className="text-sm text-slate-700 dark:text-slate-400">{campaigns.length} active</p>
        </div>
        <Link
          href="/dashboard/campaigns"
          className="text-sm text-emerald-pro-600 hover:text-emerald-pro-600/80 transition-colors"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-default dark:border-graphite">
              <th className="px-4 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                Campaign
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                Status
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                Sent
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                Opens
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                Replies
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                Delivery
              </th>
              <th className="px-4 py-4 text-right text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => {
              const status = statusConfig[campaign.status];
              return (
                <tr key={campaign.id} className="border-b border-border-default dark:border-graphite/50 hover:bg-light-bg-secondary dark:hover:bg-graphite/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="text-sm text-slate-900 dark:text-white hover:text-emerald-pro-600 transition-colors"
                    >
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", status.text)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-900 dark:text-white">
                      {campaign.metrics.sent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.metrics.openRate >= 30
                          ? "text-emerald-pro-400"
                          : campaign.metrics.openRate >= 15
                          ? "text-energy-orange"
                          : "text-alert-red"
                      )}
                    >
                      {campaign.metrics.openRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.metrics.replyRate >= 3
                          ? "text-emerald-pro-400"
                          : campaign.metrics.replyRate >= 1
                          ? "text-energy-orange"
                          : "text-alert-red"
                      )}
                    >
                      {campaign.metrics.replyRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.metrics.deliverabilityRate >= 90
                          ? "text-emerald-pro-400"
                          : campaign.metrics.deliverabilityRate >= 85
                          ? "text-energy-orange"
                          : "text-alert-red"
                      )}
                    >
                      {campaign.metrics.deliverabilityRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {campaign.status === "active" ? (
                        <button className="p-1.5 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded transition-colors">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campaign.status === "paused" || campaign.status === "draft" ? (
                        <button className="p-1.5 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded transition-colors">
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="p-1.5 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="p-1.5 text-slate-700 dark:text-slate-400 hover:text-alert-red rounded transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded transition-colors">
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
