"use client";

import Link from "next/link";
import { MoreHorizontal, Play, Pause, Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Campaign } from "@/types";

interface CampaignTableProps {
  campaigns: Campaign[];
}

const statusConfig = {
  draft: {
    label: "Draft",
    dot: "bg-steel",
    text: "text-steel",
  },
  active: {
    label: "Active",
    dot: "bg-neon-mint",
    text: "text-neon-mint",
  },
  paused: {
    label: "Paused",
    dot: "bg-energy-orange",
    text: "text-energy-orange",
  },
  completed: {
    label: "Completed",
    dot: "bg-electric-cyan",
    text: "text-electric-cyan",
  },
};

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="rounded-xl border border-graphite bg-midnight-blue/60 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-graphite">
        <div>
          <h3 className="text-base font-semibold text-white font-sora">Campaigns</h3>
          <p className="text-xs text-steel">{campaigns.length} active</p>
        </div>
        <Link
          href="/dashboard/campaigns"
          className="text-sm text-electric-cyan hover:text-electric-cyan/80 transition-colors"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-graphite">
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-steel">
                Campaign
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-steel">
                Status
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-steel">
                Sent
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-steel">
                Opens
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-steel">
                Replies
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-steel">
                Delivery
              </th>
              <th className="px-6 py-3 text-right text-2xs font-medium uppercase tracking-wider text-steel">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite">
            {campaigns.map((campaign) => {
              const status = statusConfig[campaign.status];
              return (
                <tr key={campaign.id} className="group hover:bg-deep-space/30 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="text-sm font-medium text-white hover:text-electric-cyan transition-colors"
                    >
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", status.text)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-silver">
                      {campaign.metrics.sent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.metrics.openRate >= 30
                          ? "text-neon-mint"
                          : campaign.metrics.openRate >= 15
                          ? "text-energy-orange"
                          : "text-error"
                      )}
                    >
                      {campaign.metrics.openRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.metrics.replyRate >= 3
                          ? "text-neon-mint"
                          : campaign.metrics.replyRate >= 1
                          ? "text-energy-orange"
                          : "text-error"
                      )}
                    >
                      {campaign.metrics.replyRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.metrics.deliverabilityRate >= 90
                          ? "text-neon-mint"
                          : campaign.metrics.deliverabilityRate >= 85
                          ? "text-energy-orange"
                          : "text-error"
                      )}
                    >
                      {campaign.metrics.deliverabilityRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {campaign.status === "active" ? (
                        <button className="p-1.5 text-steel hover:text-white rounded transition-colors">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campaign.status === "paused" || campaign.status === "draft" ? (
                        <button className="p-1.5 text-steel hover:text-white rounded transition-colors">
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="p-1.5 text-steel hover:text-white rounded transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="p-1.5 text-steel hover:text-error rounded transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-steel hover:text-white rounded transition-colors">
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
