"use client";

import { Bell, Search, Plus, Calendar, ChevronDown, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showNavTabs?: boolean;
}

const navTabs = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Calendar", href: "/dashboard/appointments" },
  { name: "Projects", href: "/dashboard/campaigns" },
  { name: "Team", href: "/dashboard/leads" },
  { name: "Documents", href: "/dashboard/reports" },
];

export function Header({ title, subtitle, showNavTabs = true }: HeaderProps) {
  const pathname = usePathname();

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long'
    };
    const start = now.toLocaleDateString('en-US', options);
    const end = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', options);
    return `${start.split(' ')[1]} - ${end}`;
  };

  return (
    <header className="sticky top-0 z-30 bg-light-bg/80 dark:bg-deep-space/80 backdrop-blur-xl border-b border-border-default dark:border-graphite">
      {/* Top Bar with Navigation */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo/Icon + Nav Tabs */}
        <div className="flex items-center gap-6">
          {/* App Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Grid3X3 className="h-5 w-5 text-primary" />
          </div>

          {/* Navigation Tabs */}
          {showNavTabs && (
            <nav className="flex items-center gap-1 bg-light-bg-secondary/80 dark:bg-midnight-blue/80 rounded-full p-1">
              {navTabs.map((tab) => {
                const isActive = pathname === tab.href ||
                  (tab.href !== "/dashboard" && pathname?.startsWith(tab.href));

                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-emerald-pro-600/10 text-emerald-pro-600 dark:text-xgrowth-500 shadow-sm"
                        : "text-light-text-secondary dark:text-silver hover:text-light-text dark:hover:text-white hover:bg-light-bg-secondary dark:hover:bg-graphite/50"
                    )}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Add Widget Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-light-text-secondary dark:text-silver hover:text-light-text dark:hover:text-white hover:bg-light-bg-secondary dark:hover:bg-midnight-blue rounded-xl transition-colors">
            <Plus className="h-4 w-4" />
            Add widget
          </button>

          {/* Date Range */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-light-bg-secondary dark:bg-midnight-blue hover:bg-light-surface dark:hover:bg-graphite rounded-xl text-sm font-medium text-light-text-secondary dark:text-silver transition-colors">
            <Calendar className="h-4 w-4 text-light-text-muted dark:text-steel" />
            <span>{getCurrentDate()}</span>
            <ChevronDown className="h-4 w-4 text-light-text-muted dark:text-steel" />
          </button>

          {/* Add Report Button */}
          <Button
            size="sm"
            className="gap-2 bg-gradient-to-r from-emerald-pro-600 to-emerald-pro-700 hover:from-emerald-pro-700 hover:to-emerald-pro-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-soft hover:shadow-lg transition-all"
          >
            Add report
          </Button>

          {/* Search */}
          <div className="relative">
            <Search className="h-4 w-4 text-light-text-muted dark:text-steel" />
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 text-light-text-muted dark:text-steel hover:text-light-text dark:hover:text-white hover:bg-light-bg-secondary dark:hover:bg-midnight-blue rounded-xl transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </button>

          {/* User Avatar */}
          <button className="flex items-center gap-2 p-1 hover:bg-light-bg-secondary dark:hover:bg-midnight-blue rounded-xl transition-colors">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-pro-600 to-emerald-pro-500 dark:from-xgrowth-500 dark:to-xgrowth-400 flex items-center justify-center">
              <span className="text-xs font-bold text-white dark:text-green-950">MM</span>
            </div>
          </button>
        </div>
      </div>

      {/* Breadcrumb / Page Title Row */}
      {(title || subtitle) && (
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 text-sm text-light-text-muted dark:text-steel mb-1">
            <span>Portal</span>
            <span>/</span>
            <span className="text-light-text-secondary dark:text-silver">{title || 'Dashboard'}</span>
          </div>
          {subtitle && (
            <h1 className="text-2xl font-sora font-semibold text-light-text dark:text-white">{subtitle}</h1>
          )}
        </div>
      )}
    </header>
  );
}
