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
            ? "bg-[#0a0f1c]/80 backdrop-blur-md border-[#1e293b]"
            : "bg-[#0a0f1c]/80 backdrop-blur-md border-[#1e293b]"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#00d4ff]/60 rounded-lg flex items-center justify-center">
                <span className="text-[#0a0f1c] font-bold text-xl font-sora">Q</span>
              </div>
              <span className="text-xl font-bold text-[#f0f0f5] font-sora">Quantum Insights</span>
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
                        "flex items-center gap-1 text-sm font-medium transition-colors",
                        activeDropdown === item.label
                          ? "text-[#00d4ff]"
                          : "text-[#9ca3af] hover:text-[#f0f0f5]"
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
                        "text-sm font-medium transition-colors",
                        pathname === item.href || pathname.startsWith(item.href + "/")
                          ? "text-[#00d4ff]"
                          : "text-[#9ca3af] hover:text-[#f0f0f5]"
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
              <Link
                href="/login"
                className="hidden lg:block text-[#9ca3af] hover:text-[#00d4ff] font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="hidden lg:block bg-[#00d4ff] text-[#0a0f1c] px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all"
              >
                Book a Call
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#9ca3af] hover:text-[#f0f0f5] rounded-lg transition-colors"
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
