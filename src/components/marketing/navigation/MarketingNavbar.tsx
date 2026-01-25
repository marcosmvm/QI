"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/marketing/layout/Container";
import { mainNavigation } from "@/lib/content/navigation";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "@/components/brand/Logo";

// XGrowthOS Brand - Navigation Component (Light Theme Default)
export function MarketingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/80 dark:bg-deep-space/80 backdrop-blur-xl border-border-default shadow-soft"
            : "bg-transparent border-transparent"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Logo variant="light" size="md" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {mainNavigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.dropdown ? (
                    <button
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors duration-150",
                        activeDropdown === item.label
                          ? "text-emerald-pro-600 dark:text-xgrowth-500"
                          : "text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          activeDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors duration-150",
                        pathname === item.href || pathname.startsWith(item.href + "/")
                          ? "text-emerald-pro-600 dark:text-xgrowth-500"
                          : "text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mega Menu Dropdown */}
                  {item.dropdown && activeDropdown === item.label && (
                    <MegaMenu
                      sections={item.dropdown.sections}
                      featured={item.dropdown.featured}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              {/* Ghost Button for Login */}
              <Link
                href="/login"
                className="hidden lg:block text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-graphite/50 transition-all duration-200"
              >
                Login
              </Link>
              {/* Primary Button with Glow */}
              <Link
                href="/contact"
                className="hidden lg:block bg-emerald-pro-600 dark:bg-xgrowth-500 text-white dark:text-green-950 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:bg-emerald-pro-700 dark:hover:bg-xgrowth-400 hover:shadow-glow-emerald dark:hover:shadow-glow-green hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a Call
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-light-bg-secondary dark:hover:bg-graphite/50 rounded-lg transition-all duration-150"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
