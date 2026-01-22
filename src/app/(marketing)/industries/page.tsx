"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { industries, getFeaturedIndustries } from "@/lib/content/industries";

// Card-specific color mapping for visual variety
const cardColors: Record<string, { bg: string; text: string; iconBg: string }> = {
  saas: { bg: "bg-electric-cyan/20", text: "text-electric-cyan", iconBg: "bg-deep-space/50" },
  finance: { bg: "bg-neon-mint/20", text: "text-neon-mint", iconBg: "bg-deep-space/50" },
  healthcare: { bg: "bg-rose-500/20", text: "text-rose-500", iconBg: "bg-deep-space/50" },
  martech: { bg: "bg-quantum-violet/20", text: "text-quantum-violet", iconBg: "bg-deep-space/50" },
  cybersecurity: { bg: "bg-energy-orange/20", text: "text-energy-orange", iconBg: "bg-deep-space/50" },
  "hr-tech": { bg: "bg-sky-500/20", text: "text-sky-500", iconBg: "bg-deep-space/50" },
};

// Default colors for industries not in the map
const defaultCardColor = { bg: "bg-electric-cyan/20", text: "text-electric-cyan", iconBg: "bg-deep-space/50" };

function getCardColor(id: string) {
  return cardColors[id] || defaultCardColor;
}

// Trust Badge Component
function TrustBadge({ label }: { label: string }) {
  return (
    <div className="bg-midnight-blue border border-graphite rounded-lg px-6 py-3">
      <span className="text-steel text-sm">{label}</span>
    </div>
  );
}

export default function IndustriesPage() {
  const [showAll, setShowAll] = useState(false);
  const featuredIndustries = getFeaturedIndustries();
  const displayedIndustries = showAll ? industries : featuredIndustries;

  return (
    <main>
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-deep-space">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-sora">
              Industries We Serve
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
      <section id="industries" className="py-20 bg-deep-space">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <div className="relative h-full p-8 rounded-2xl border border-graphite bg-midnight-blue hover:border-electric-cyan/30 hover:shadow-glow-cyan-sm transition-all duration-300">
                      {/* Icon and Arrow Row */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${colors.text}`} />
                        </div>
                        <ArrowRight className="h-5 w-5 text-steel opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-electric-cyan transition-all duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-1 font-sora group-hover:text-electric-cyan transition-colors">
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
              <button
                onClick={() => setShowAll(true)}
                className="border border-graphite text-white px-8 py-4 rounded-lg font-semibold hover:border-electric-cyan hover:text-electric-cyan transition-all inline-flex items-center gap-2"
              >
                View All {industries.length} Industries
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-deep-space">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sora">
              Ready to Dominate Your Industry?
            </h2>
            <p className="text-xl text-steel mb-10">
              Join hundreds of B2B companies using our AI-powered cold email system to book more qualified meetings and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="bg-electric-cyan text-deep-space px-8 py-4 rounded-lg font-semibold btn-glow transition-all"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/case-studies"
                className="border border-graphite text-white px-8 py-4 rounded-lg font-semibold hover:border-electric-cyan transition-all"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
