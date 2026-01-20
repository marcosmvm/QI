"use client";

import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-graphite bg-deep-space/80 backdrop-blur-sm px-6">
      <div>
        <h1 className="text-xl font-sora font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-steel">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="h-9 w-64 rounded-lg border border-graphite bg-midnight-blue/50 pl-9 pr-4 text-sm text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50 transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-steel hover:text-white hover:bg-midnight-blue rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-energy-orange" />
        </button>

        {/* New Campaign */}
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>
    </header>
  );
}
