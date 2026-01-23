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

// Brand Board v1.0 - Navigation Component
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
            ? "bg-deep-space/80 backdrop-blur-xl border-graphite/50 shadow-lg shadow-black/10"
            : "bg-transparent border-transparent"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-electric-cyan rounded-lg flex items-center justify-center group-hover:shadow-glow-cyan-sm transition-all duration-300">
                <span className="text-deep-space font-bold text-xl">X</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-electric-cyan transition-colors">XGrowthOS</span>
            </Link>

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
                          ? "text-electric-cyan"
                          : "text-steel hover:text-white"
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
                          ? "text-electric-cyan"
                          : "text-steel hover:text-white"
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
                className="hidden lg:block text-steel hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-graphite/50 transition-all duration-200"
              >
                Login
              </Link>
              {/* Primary Button with Glow */}
              <Link
                href="/contact"
                className="hidden lg:block bg-electric-cyan text-deep-space px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-glow-cyan hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a Call
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-steel hover:text-white hover:bg-graphite/50 rounded-lg transition-all duration-150"
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
