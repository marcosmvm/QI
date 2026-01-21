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
  Users,
  Calendar,
  ChevronDown,
  Cpu,
  FlaskConical,
  Target,
  Eye,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Compliance", href: "/dashboard/compliance", icon: CheckCircle },
];

const aiEngines = [
  { name: "Guardian", href: "/dashboard/ai-engines/guardian", icon: Shield },
  { name: "Architect", href: "/dashboard/ai-engines/architect", icon: Cpu },
  { name: "Scientist", href: "/dashboard/ai-engines/scientist", icon: FlaskConical },
  { name: "Hunter", href: "/dashboard/ai-engines/hunter", icon: Target },
  { name: "Sentinel", href: "/dashboard/ai-engines/sentinel", icon: Eye },
];

const bottomNav = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [aiEnginesOpen, setAiEnginesOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-border">
          <span className="text-lg font-semibold text-foreground">
            Quantum Insights
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-muted text-foreground"
                    : "text-foreground-secondary hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* AI Engines Section */}
          <div className="mt-6 pt-6 border-t border-border">
            <button
              onClick={() => setAiEnginesOpen(!aiEnginesOpen)}
              className={cn(
                "w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname?.startsWith("/dashboard/ai-engines")
                  ? "bg-muted text-foreground"
                  : "text-foreground-secondary hover:bg-muted hover:text-foreground"
              )}
            >
              <Cpu className="h-4 w-4" />
              <span className="flex-1 text-left">AI Engines</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  aiEnginesOpen ? "rotate-180" : ""
                )}
              />
            </button>

            {aiEnginesOpen && (
              <div className="mt-1 ml-4 space-y-1">
                {aiEngines.map((engine) => (
                  <Link
                    key={engine.name}
                    href={engine.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive(engine.href)
                        ? "bg-muted text-foreground"
                        : "text-foreground-secondary hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <engine.icon className="h-4 w-4" />
                    <span>{engine.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 py-4 border-t border-border">
          {bottomNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-muted text-foreground"
                  : "text-foreground-secondary hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium text-foreground-secondary">MM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Marcos Matthews</p>
              <p className="text-xs text-foreground-muted truncate">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
