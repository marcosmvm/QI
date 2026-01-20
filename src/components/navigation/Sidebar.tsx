"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  BarChart3,
  Shield,
  FileText,
  Settings,
  LogOut,
  Zap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Compliance", href: "/dashboard/compliance", icon: Shield },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-graphite/50 bg-deep-space">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-graphite/50 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric-cyan to-quantum-violet shadow-glow-sm">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-sora font-bold text-white tracking-tight">
              Quantum
            </h1>
            <p className="text-xs text-steel font-medium">Insights Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-steel/60">
            Main Menu
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-electric-cyan/15 text-electric-cyan shadow-sm"
                    : "text-steel hover:bg-electric-cyan/5 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-electric-cyan" : "text-steel group-hover:text-electric-cyan"
                )} />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-electric-cyan" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Engine Status Indicator */}
        <div className="mx-3 mb-4 rounded-xl border border-electric-cyan/20 bg-midnight-blue/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-mint opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-mint"></span>
            </span>
            <span className="text-xs font-semibold text-silver">All Engines Operational</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {["A", "B", "C", "G", "H"].map((engine) => (
              <div
                key={engine}
                className="flex h-7 w-full items-center justify-center rounded-lg bg-neon-mint/10 text-xs font-mono font-bold text-neon-mint border border-neon-mint/20"
                title={`Engine ${engine}`}
              >
                {engine}
              </div>
            ))}
          </div>
        </div>

        {/* User section */}
        <div className="border-t border-graphite/50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-quantum-violet to-violet-dark flex items-center justify-center shadow-glow-violet">
              <span className="text-sm font-bold text-white">MM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Marcos Matthews</p>
              <p className="text-xs text-steel truncate">marcos@quantumins...</p>
            </div>
            <button className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/5 rounded-lg transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
