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
    className: "bg-steel/20 text-steel",
  },
  active: {
    label: "Active",
    className: "bg-neon-mint/20 text-neon-mint",
  },
  paused: {
    label: "Paused",
    className: "bg-energy-orange/20 text-energy-orange",
  },
  completed: {
    label: "Completed",
    className: "bg-quantum-violet/20 text-quantum-violet",
  },
};

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="rounded-xl border border-graphite bg-midnight-blue/60 backdrop-blur-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-graphite">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-steel">
                Campaign
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-steel">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-steel">
                Sent
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-steel">
                Open Rate
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-steel">
                Reply Rate
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-steel">
                Deliverability
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-steel">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite">
            {campaigns.map((campaign) => {
              const status = statusConfig[campaign.status];
              return (
                <tr
                  key={campaign.id}
                  className="hover:bg-deep-space/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="font-medium text-white hover:text-electric-cyan transition-colors"
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
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-silver">
                    {campaign.metrics.sent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 max-w-16 rounded-full bg-graphite overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            campaign.metrics.openRate >= 30
                              ? "bg-neon-mint"
                              : campaign.metrics.openRate >= 15
                              ? "bg-energy-orange"
                              : "bg-red-400"
                          )}
                          style={{ width: `${Math.min(campaign.metrics.openRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-silver">
                        {campaign.metrics.openRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 max-w-16 rounded-full bg-graphite overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            campaign.metrics.replyRate >= 3
                              ? "bg-neon-mint"
                              : campaign.metrics.replyRate >= 1
                              ? "bg-energy-orange"
                              : "bg-red-400"
                          )}
                          style={{ width: `${Math.min(campaign.metrics.replyRate * 10, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-silver">
                        {campaign.metrics.replyRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 max-w-16 rounded-full bg-graphite overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            campaign.metrics.deliverabilityRate >= 90
                              ? "bg-neon-mint"
                              : campaign.metrics.deliverabilityRate >= 85
                              ? "bg-energy-orange"
                              : "bg-red-400"
                          )}
                          style={{ width: `${campaign.metrics.deliverabilityRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-silver">
                        {campaign.metrics.deliverabilityRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {campaign.status === "active" ? (
                        <button className="p-1.5 text-steel hover:text-energy-orange hover:bg-energy-orange/10 rounded-lg transition-colors">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campaign.status === "paused" || campaign.status === "draft" ? (
                        <button className="p-1.5 text-steel hover:text-neon-mint hover:bg-neon-mint/10 rounded-lg transition-colors">
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="p-1.5 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="p-1.5 text-steel hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-steel hover:text-white hover:bg-midnight-blue rounded-lg transition-colors">
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
