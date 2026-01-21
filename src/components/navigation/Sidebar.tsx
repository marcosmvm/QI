"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  BarChart3,
  FileText,
  Settings,
  Users,
  MessageSquare,
  LogOut,
  Zap,
  Building2,
  UserCog,
  CreditCard,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Profile } from "@/types/database";

// Client navigation - what clients see
const clientNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

// Admin navigation - what admins see
const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Clients", href: "/admin/clients", icon: Building2 },
  { name: "Campaigns", href: "/admin/campaigns", icon: Mail },
  { name: "Team", href: "/admin/team", icon: UserCog },
  { name: "Support Inbox", href: "/admin/support", icon: Inbox },
  { name: "Billing", href: "/admin/billing", icon: CreditCard },
];

const clientBottomNav = [
  { name: "Support", href: "/dashboard/support", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const adminBottomNav = [
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  variant?: "client" | "admin";
}

export function Sidebar({ variant = "client" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(data);
      }
      setIsLoading(false);
    }

    loadProfile();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === "/admin") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const navigation = variant === "admin" ? adminNavigation : clientNavigation;
  const bottomNav = variant === "admin" ? adminBottomNav : clientBottomNav;

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-deep-space border-r border-graphite/50">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-graphite/50">
          <Link href={variant === "admin" ? "/admin" : "/dashboard"} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric-cyan/10 border border-electric-cyan/30">
              <Zap className="h-5 w-5 text-electric-cyan" />
            </div>
            <span className="text-lg font-sora font-semibold text-white">
              Quantum
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20"
                    : "text-silver hover:bg-midnight-blue/50 hover:text-white border border-transparent"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4",
                  isActive(item.href) ? "text-electric-cyan" : "text-steel"
                )} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 py-4 border-t border-graphite/50">
          <div className="space-y-1">
            {bottomNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20"
                    : "text-silver hover:bg-midnight-blue/50 hover:text-white border border-transparent"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4",
                  isActive(item.href) ? "text-electric-cyan" : "text-steel"
                )} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-graphite/50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-quantum-violet/20 border border-quantum-violet/30 flex items-center justify-center">
              <span className="text-sm font-medium text-quantum-violet">
                {isLoading ? "..." : getInitials(profile?.full_name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {isLoading ? "Loading..." : profile?.full_name || "User"}
              </p>
              <p className="text-xs text-steel truncate capitalize">
                {isLoading ? "" : profile?.role || "client"}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg text-steel hover:text-energy-orange hover:bg-energy-orange/10 transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
