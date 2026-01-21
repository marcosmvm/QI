"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { industries, getFeaturedIndustries } from "@/lib/content/industries";

// Card-specific color mapping for visual variety
const cardColors: Record<string, { bg: string; text: string }> = {
  saas: { bg: "bg-electric-cyan/20", text: "text-electric-cyan" },
  finance: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  healthcare: { bg: "bg-rose-500/20", text: "text-rose-400" },
  martech: { bg: "bg-quantum-violet/20", text: "text-quantum-violet" },
  cybersecurity: { bg: "bg-energy-orange/20", text: "text-energy-orange" },
  "hr-tech": { bg: "bg-sky-500/20", text: "text-sky-400" },
};

// Default colors for industries not in the map
const defaultCardColor = { bg: "bg-electric-cyan/20", text: "text-electric-cyan" };

function getCardColor(id: string) {
  return cardColors[id] || defaultCardColor;
}

// Trust Badge Component
interface TrustBadgeProps {
  label: string;
}

function TrustBadge({ label }: TrustBadgeProps) {
  return (
    <div className="bg-midnight-blue/50 border border-graphite rounded-lg px-6 py-3">
      <span className="text-steel text-sm">{label}</span>
    </div>
  );
}

export default function IndustriesPage() {
  const [showAll, setShowAll] = useState(false);
  const featuredIndustries = getFeaturedIndustries();
  const displayedIndustries = showAll ? industries : featuredIndustries;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-deep-space">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />

        {/* Subtle glow effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-electric-cyan/5 rounded-full blur-[150px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sora font-bold text-white mb-6 leading-tight">
              Industries{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-quantum-violet bg-clip-text text-transparent">
                We Serve
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-steel max-w-3xl mx-auto mb-12">
              We understand the unique challenges of B2B sales across verticals. Our
              AI-powered cold email campaigns are tailored to each industry&apos;s specific
              buyer personas and decision-making processes.
            </p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8"
            >
              <TrustBadge label="Trusted by 500+ B2B companies" />
              <TrustBadge label="98% deliverability rate" />
              <TrustBadge label="15M+ emails sent" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Industries Grid */}
      <section id="industries" className="py-20 lg:py-28 bg-deep-space">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedIndustries.map((industry, index) => {
              const Icon = industry.icon;
              const colors = getCardColor(industry.id);

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/industries/${industry.id}`} className="block group h-full">
                    <div className="relative h-full p-6 lg:p-8 rounded-2xl border border-graphite bg-midnight-blue/50 hover:border-electric-cyan/30 hover:bg-midnight-blue/80 transition-all duration-300">
                      {/* Icon and Arrow Row */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`inline-flex p-3 rounded-xl ${colors.bg}`}>
                          <Icon className={`h-6 w-6 ${colors.text}`} />
                        </div>
                        <ArrowRight className="h-5 w-5 text-steel opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-electric-cyan transition-all duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-sora font-bold text-white mb-1 group-hover:text-electric-cyan transition-colors">
                        {industry.name}
                      </h3>

                      {/* Colored Tagline */}
                      <p className={`text-sm ${colors.text} font-medium mb-3`}>
                        {industry.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-steel text-sm leading-relaxed">
                        {industry.shortDescription}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* View All Industries Button */}
          {!showAll && industries.length > featuredIndustries.length && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(true)}
                className="border-graphite hover:border-electric-cyan/50 text-white hover:text-electric-cyan bg-transparent px-8 py-6"
              >
                View All {industries.length} Industries
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <CTABanner
        title="Ready to Dominate Your Industry?"
        description="Join hundreds of B2B companies using our AI-powered cold email system to book more qualified meetings and accelerate growth."
        primaryCTA={{ text: "Book a Strategy Call", href: "/contact" }}
        secondaryCTA={{ text: "View Case Studies", href: "/case-studies" }}
      />
    </>
  );
}
