"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Eye,
  X,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  status: string;
  targetIndustry: string | null;
  dailyLimit: number;
  createdAt: string;
  clientId: string;
  clientName: string;
  clientStatus: string;
  healthScore: number | null;
  healthLevel: "healthy" | "warning" | "critical" | "unknown";
  totalSent: number;
  totalOpened: number;
  totalReplied: number;
  openRate: number | null;
  replyRate: number | null;
}

interface CampaignsTableProps {
  campaigns: Campaign[];
  clients: { id: string; name: string }[];
}

type SortField = "name" | "clientName" | "status" | "healthScore" | "totalSent" | "createdAt";
type SortOrder = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [25, 50, 100];

export function CampaignsTable({ campaigns, clients }: CampaignsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [healthFilter, setHealthFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [showFilters, setShowFilters] = useState(false);

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          campaign.name.toLowerCase().includes(query) ||
          campaign.clientName.toLowerCase().includes(query) ||
          campaign.targetIndustry?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== "all" && campaign.status !== statusFilter) {
        return false;
      }

      // Client filter
      if (clientFilter !== "all" && campaign.clientId !== clientFilter) {
        return false;
      }

      // Health filter
      if (healthFilter !== "all" && campaign.healthLevel !== healthFilter) {
        return false;
      }

      return true;
    });
  }, [campaigns, searchQuery, statusFilter, clientFilter, healthFilter]);

  // Sort campaigns
  const sortedCampaigns = useMemo(() => {
    return [...filteredCampaigns].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "clientName":
          comparison = a.clientName.localeCompare(b.clientName);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "healthScore":
          const scoreA = a.healthScore ?? -1;
          const scoreB = b.healthScore ?? -1;
          comparison = scoreA - scoreB;
          break;
        case "totalSent":
          comparison = a.totalSent - b.totalSent;
          break;
        case "createdAt":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredCampaigns, sortField, sortOrder]);

  // Paginate
  const totalPages = Math.ceil(sortedCampaigns.length / pageSize);
  const paginatedCampaigns = sortedCampaigns.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setClientFilter("all");
    setHealthFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    statusFilter !== "all" || clientFilter !== "all" || healthFilter !== "all";

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-text-muted dark:text-steel" />
          <input
            type="text"
            placeholder="Search campaigns or clients..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space pl-10 pr-4 text-light-text dark:text-white placeholder:text-light-text-muted dark:text-steel focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light-text-muted dark:text-steel hover:text-light-text dark:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors",
            showFilters || hasActiveFilters
              ? "border-emerald-pro-600/50 text-emerald-pro-600 bg-emerald-pro-600/10"
              : "border-border-default dark:border-graphite text-silver hover:bg-light-bg-secondary dark:bg-midnight-blue/30"
          )}
        >
          <Filter className="h-4 w-4" />
          Filter
          {hasActiveFilters && (
            <span className="h-2 w-2 rounded-full bg-emerald-pro-600" />
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-light-text-muted dark:text-steel hover:text-light-text dark:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      {showFilters && (
        <div className="flex items-center gap-4 mb-6 p-4 bg-light-bg-secondary dark:bg-midnight-blue/20 border border-border-default dark:border-graphite/30 rounded-lg">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-light-text-muted dark:text-steel">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 px-3 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space text-sm text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Client Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-light-text-muted dark:text-steel">Client:</label>
            <select
              value={clientFilter}
              onChange={(e) => {
                setClientFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 px-3 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space text-sm text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
            >
              <option value="all">All Clients</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Health Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-light-text-muted dark:text-steel">Health:</label>
            <select
              value={healthFilter}
              onChange={(e) => {
                setHealthFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 px-3 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space text-sm text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="healthy">Healthy</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
              <option value="unknown">No Data</option>
            </select>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-light-text-muted dark:text-steel">
          Showing {paginatedCampaigns.length} of {filteredCampaigns.length} campaigns
          {filteredCampaigns.length !== campaigns.length && (
            <span> (filtered from {campaigns.length} total)</span>
          )}
        </p>
      </div>

      {/* Table */}
      <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-default dark:border-graphite/50">
              <SortableHeader
                label="Campaign"
                field="name"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                label="Client"
                field="clientName"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                label="Status"
                field="status"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                label="Health"
                field="healthScore"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                label="Sent"
                field="totalSent"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
              <th className="text-left text-xs font-medium text-light-text-muted dark:text-steel uppercase tracking-wider px-6 py-4">
                Open Rate
              </th>
              <th className="text-left text-xs font-medium text-light-text-muted dark:text-steel uppercase tracking-wider px-6 py-4">
                Reply Rate
              </th>
              <th className="text-right text-xs font-medium text-light-text-muted dark:text-steel uppercase tracking-wider px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite/30">
            {paginatedCampaigns.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center">
                  <p className="text-light-text-muted dark:text-steel">No campaigns match your filters</p>
                  <button
                    onClick={clearFilters}
                    className="text-emerald-pro-600 hover:underline text-sm mt-2"
                  >
                    Clear filters
                  </button>
                </td>
              </tr>
            ) : (
              paginatedCampaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="hover:bg-light-bg-secondary dark:bg-midnight-blue/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/campaigns/${campaign.id}`}
                      className="text-sm font-medium text-light-text dark:text-white hover:text-emerald-pro-600 transition-colors"
                    >
                      {campaign.name}
                    </Link>
                    {campaign.targetIndustry && (
                      <p className="text-xs text-light-text-muted dark:text-steel mt-0.5">
                        {campaign.targetIndustry}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/clients/${campaign.clientId}`}
                      className="text-sm text-silver hover:text-emerald-pro-600 transition-colors"
                    >
                      {campaign.clientName}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <CampaignStatusBadge status={campaign.status} />
                  </td>
                  <td className="px-6 py-4">
                    <HealthBadge
                      score={campaign.healthScore}
                      level={campaign.healthLevel}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-silver">
                      {campaign.totalSent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-sm",
                        campaign.openRate !== null && campaign.openRate >= 30
                          ? "text-emerald-pro-400"
                          : campaign.openRate !== null && campaign.openRate >= 15
                          ? "text-silver"
                          : "text-energy-orange"
                      )}
                    >
                      {campaign.openRate !== null
                        ? `${campaign.openRate.toFixed(1)}%`
                        : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-sm",
                        campaign.replyRate !== null && campaign.replyRate >= 3
                          ? "text-emerald-pro-400"
                          : campaign.replyRate !== null && campaign.replyRate >= 1
                          ? "text-silver"
                          : "text-energy-orange"
                      )}
                    >
                      {campaign.replyRate !== null
                        ? `${campaign.replyRate.toFixed(1)}%`
                        : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {campaign.status === "active" ? (
                        <button
                          className="p-2 rounded-lg text-energy-orange hover:bg-energy-orange/10 transition-colors"
                          title="Pause campaign"
                        >
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campaign.status !== "completed" ? (
                        <button
                          className="p-2 rounded-lg text-emerald-pro-400 hover:bg-emerald-pro-400/10 transition-colors"
                          title="Resume campaign"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
                      <Link
                        href={`/admin/campaigns/${campaign.id}`}
                        className="p-2 rounded-lg text-light-text-muted dark:text-steel hover:text-light-text dark:text-white hover:bg-light-bg-secondary dark:bg-midnight-blue/50 transition-colors"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-light-text-muted dark:text-steel">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-8 px-2 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space text-sm text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border-default dark:border-graphite text-light-text-muted dark:text-steel hover:bg-light-bg-secondary dark:bg-midnight-blue/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-sm text-silver px-3">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border-default dark:border-graphite text-light-text-muted dark:text-steel hover:bg-light-bg-secondary dark:bg-midnight-blue/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SortableHeader({
  label,
  field,
  currentField,
  currentOrder,
  onSort,
}: {
  label: string;
  field: SortField;
  currentField: SortField;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}) {
  const isActive = currentField === field;

  return (
    <th className="text-left px-6 py-4">
      <button
        onClick={() => onSort(field)}
        className={cn(
          "flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors",
          isActive ? "text-emerald-pro-600" : "text-light-text-muted dark:text-steel hover:text-silver"
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            isActive && currentOrder === "asc" ? "rotate-180" : "",
            isActive ? "opacity-100" : "opacity-0"
          )}
        />
      </button>
    </th>
  );
}

function CampaignStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    draft: "bg-steel/10 text-light-text-muted dark:text-steel border-steel/30",
    paused: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    completed: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-1 text-xs font-medium rounded-full border capitalize",
        styles[status] || styles.draft
      )}
    >
      {status}
    </span>
  );
}

function HealthBadge({
  score,
  level,
}: {
  score: number | null;
  level: "healthy" | "warning" | "critical" | "unknown";
}) {
  const config = {
    healthy: {
      icon: CheckCircle,
      color: "text-emerald-pro-400",
      bg: "bg-emerald-pro-400/10",
      border: "border-emerald-pro-400/30",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-energy-orange",
      bg: "bg-energy-orange/10",
      border: "border-energy-orange/30",
    },
    critical: {
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
    },
    unknown: {
      icon: HelpCircle,
      color: "text-light-text-muted dark:text-steel",
      bg: "bg-steel/10",
      border: "border-steel/30",
    },
  };

  const { icon: Icon, color, bg, border } = config[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full border",
        bg,
        border,
        color
      )}
    >
      <Icon className="h-3 w-3" />
      {score !== null ? score : "N/A"}
    </span>
  );
}
