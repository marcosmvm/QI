"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Users,
  TrendingUp,
  X,
} from "lucide-react";
import { ClientHealthBadge } from "@/components/admin/ClientHealthBadge";

interface Client {
  id: string;
  name: string;
  domain: string | null;
  industry: string | null;
  status: string;
  createdAt: string;
  planType: string | null;
  monthlyFee: number | null;
  campaignCount: number;
  activeCampaigns: number;
  healthScore: number | null;
}

interface ClientsTableProps {
  clients: Client[];
  industries: string[];
}

type SortField = "name" | "status" | "healthScore" | "createdAt" | "planType";
type SortOrder = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [25, 50, 100];

export function ClientsTable({ clients, industries }: ClientsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [healthFilter, setHealthFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search clients
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          client.name.toLowerCase().includes(query) ||
          client.domain?.toLowerCase().includes(query) ||
          client.industry?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== "all" && client.status !== statusFilter) {
        return false;
      }

      // Industry filter
      if (industryFilter !== "all" && client.industry !== industryFilter) {
        return false;
      }

      // Health filter
      if (healthFilter !== "all") {
        const score = client.healthScore;
        if (healthFilter === "healthy" && (score === null || score < 80)) return false;
        if (healthFilter === "warning" && (score === null || score < 60 || score >= 80)) return false;
        if (healthFilter === "critical" && (score === null || score >= 60)) return false;
        if (healthFilter === "unknown" && score !== null) return false;
      }

      return true;
    });
  }, [clients, searchQuery, statusFilter, industryFilter, healthFilter]);

  // Sort clients
  const sortedClients = useMemo(() => {
    return [...filteredClients].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "healthScore":
          const scoreA = a.healthScore ?? -1;
          const scoreB = b.healthScore ?? -1;
          comparison = scoreA - scoreB;
          break;
        case "createdAt":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "planType":
          comparison = (a.planType || "").localeCompare(b.planType || "");
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredClients, sortField, sortOrder]);

  // Paginate clients
  const totalPages = Math.ceil(sortedClients.length / pageSize);
  const paginatedClients = sortedClients.slice(
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

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setIndustryFilter("all");
    setHealthFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    statusFilter !== "all" || industryFilter !== "all" || healthFilter !== "all";

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, domain, or industry..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space pl-10 pr-4 text-slate-900 dark:text-white placeholder:text-slate-700 dark:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
            showFilters || hasActiveFilters
              ? "border-emerald-pro-600/50 text-emerald-pro-600 bg-emerald-pro-600/10"
              : "border-border-default dark:border-graphite text-slate-700 dark:text-slate-200 hover:bg-light-bg-secondary dark:bg-midnight-blue/30"
          }`}
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
            className="text-sm text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
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
            <label className="text-xs text-slate-700 dark:text-slate-400">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 px-3 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space text-sm text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pilot">Pilot</option>
              <option value="paused">Paused</option>
              <option value="churned">Churned</option>
            </select>
          </div>

          {/* Industry Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-700 dark:text-slate-400">Industry:</label>
            <select
              value={industryFilter}
              onChange={(e) => {
                setIndustryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 px-3 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space text-sm text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
            >
              <option value="all">All</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Health Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-700 dark:text-slate-400">Health:</label>
            <select
              value={healthFilter}
              onChange={(e) => {
                setHealthFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 px-3 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space text-sm text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="healthy">Healthy (80+)</option>
              <option value="warning">At Risk (60-79)</option>
              <option value="critical">Critical (&lt;60)</option>
              <option value="unknown">No Data</option>
            </select>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-700 dark:text-slate-400">
          Showing {paginatedClients.length} of {filteredClients.length} clients
          {filteredClients.length !== clients.length && (
            <span> (filtered from {clients.length} total)</span>
          )}
        </p>
      </div>

      {/* Table */}
      <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-default dark:border-graphite/50">
              <SortableHeader
                label="Client"
                field="name"
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
                label="Plan"
                field="planType"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
              <th className="text-left text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Campaigns
              </th>
              <SortableHeader
                label="Joined"
                field="createdAt"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
              <th className="text-right text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite/30">
            {paginatedClients.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <p className="text-slate-700 dark:text-slate-400">No clients match your filters</p>
                  <button
                    onClick={clearFilters}
                    className="text-emerald-pro-600 hover:underline text-sm mt-2"
                  >
                    Clear filters
                  </button>
                </td>
              </tr>
            ) : (
              paginatedClients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-light-bg-secondary dark:bg-midnight-blue/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="h-10 w-10 rounded-full bg-emerald-pro-500/20 border border-emerald-pro-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-emerald-pro-500">
                          {client.name?.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white hover:text-emerald-pro-600 transition-colors truncate">
                          {client.name}
                        </p>
                        <p className="text-xs text-slate-700 dark:text-slate-400 truncate">
                          {client.domain || client.industry || "-"}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={client.status} />
                  </td>
                  <td className="px-6 py-4">
                    <ClientHealthBadge score={client.healthScore} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 dark:text-slate-200 capitalize">
                      {client.planType || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      {client.activeCampaigns}/{client.campaignCount}
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-400 ml-1">active</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 dark:text-slate-400">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="p-2 rounded-lg text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-light-bg-secondary dark:bg-midnight-blue/50 transition-colors"
                        title="View details"
                      >
                        <TrendingUp className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-2 rounded-lg text-slate-700 dark:text-slate-400 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 transition-colors"
                        title="Send email"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg text-slate-700 dark:text-slate-400 hover:text-emerald-pro-500 hover:bg-emerald-pro-500/10 transition-colors"
                        title="Team"
                      >
                        <Users className="h-4 w-4" />
                      </button>
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
            <span className="text-sm text-slate-700 dark:text-slate-400">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-8 px-2 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space text-sm text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none"
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
              className="p-2 rounded-lg border border-border-default dark:border-graphite text-slate-700 dark:text-slate-400 hover:bg-light-bg-secondary dark:bg-midnight-blue/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-sm text-slate-700 dark:text-slate-200 px-3">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border-default dark:border-graphite text-slate-700 dark:text-slate-400 hover:bg-light-bg-secondary dark:bg-midnight-blue/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        className={`flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors ${
          isActive ? "text-emerald-pro-600" : "text-slate-700 dark:text-slate-400 hover:text-slate-700 dark:text-slate-200"
        }`}
      >
        {label}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${
            isActive && currentOrder === "asc" ? "rotate-180" : ""
          } ${isActive ? "opacity-100" : "opacity-0"}`}
        />
      </button>
    </th>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    pilot: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
    paused: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    churned: "bg-steel/10 text-slate-700 dark:text-slate-400 border-steel/30",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full border capitalize ${
        styles[status] || styles.paused
      }`}
    >
      {status}
    </span>
  );
}
