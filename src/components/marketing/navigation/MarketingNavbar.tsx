"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/marketing/layout/Container";
import { mainNavigation, type NavLink } from "@/lib/content/navigation";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-deep-space/95 backdrop-blur-md border-b border-graphite/50 shadow-lg"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
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
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        activeDropdown === item.label
                          ? "text-electric-cyan"
                          : "text-silver hover:text-white"
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
                        "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        pathname === item.href
                          ? "text-electric-cyan"
                          : "text-silver hover:text-white"
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

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hidden lg:block">
                <Button className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold px-6 shadow-glow-sm hover:shadow-glow-md transition-all">
                  Book a Call
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-silver hover:text-white rounded-lg transition-colors"
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

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
