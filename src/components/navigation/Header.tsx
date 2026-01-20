"use client";

import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-graphite/50 bg-deep-space/95 backdrop-blur-md px-6">
      <div>
        <h1 className="text-xl font-sora font-bold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-steel">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="h-10 w-72 rounded-xl border border-electric-cyan/20 bg-midnight-blue/50 pl-10 pr-4 text-sm text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/20 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 text-steel hover:text-electric-cyan hover:bg-electric-cyan/5 rounded-xl transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-energy-orange animate-pulse" />
        </button>

        {/* New Campaign */}
        <Button size="sm" className="gap-2 bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold px-4 py-2 rounded-xl shadow-glow-sm hover:shadow-glow-md transition-all">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>
    </header>
  );
}
