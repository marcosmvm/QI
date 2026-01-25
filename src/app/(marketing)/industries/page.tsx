"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { industries, getFeaturedIndustries } from "@/lib/content/industries";

// Brand Board v1.0 - Card accent colors for visual variety
const cardColors: Record<string, { text: string; iconBg: string }> = {
  saas: { text: "text-emerald-pro-600", iconBg: "bg-graphite" },
  finance: { text: "text-emerald-pro-400", iconBg: "bg-graphite" },
  healthcare: { text: "text-alert-red", iconBg: "bg-graphite" },
  martech: { text: "text-emerald-pro-500", iconBg: "bg-graphite" },
  cybersecurity: { text: "text-energy-orange", iconBg: "bg-graphite" },
  "hr-tech": { text: "text-emerald-pro-600", iconBg: "bg-graphite" },
};

const defaultCardColor = { text: "text-emerald-pro-600", iconBg: "bg-graphite" };

function getCardColor(id: string) {
  return cardColors[id] || defaultCardColor;
}

// Brand Board v1.0 - Trust Badge Pattern
function TrustBadge({ label }: { label: string }) {
  return (
    <div className="bg-light-bg-secondary dark:bg-midnight-blue border border-border-default dark:border-graphite rounded-lg px-6 py-3">
      <span className="text-slate-900 dark:text-slate-200 text-sm">{label}</span>
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
      <section className="relative py-32 bg-white dark:bg-deep-space overflow-hidden">
        {/* Enhanced Ambient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-pro-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-pro-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-pro-400/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Tech Badge */}
            <div className="tech-badge mb-6">
              <span className="text-sm font-medium text-emerald-pro-600">
                B2B Industry Expertise
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              <span className="headline-underline text-gradient">Industries We Serve</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-900 dark:text-slate-200 max-w-3xl mx-auto mb-12">
              We understand the unique challenges of B2B sales across verticals. Our
              AI-powered cold email campaigns are tailored to each industry&apos;s specific
              buyer personas and decision-making processes.
            </p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center gap-4 md:gap-6"
            >
              <TrustBadge label="Trusted by 500+ B2B companies" />
              <TrustBadge label="98% deliverability rate" />
              <TrustBadge label="15M+ emails sent" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Industries Grid */}
      <section id="industries" className="py-20 bg-white dark:bg-deep-space">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedIndustries.map((industry, index) => {
              const Icon = industry.icon;
              const colors = getCardColor(industry.id);

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/industries/${industry.id}`} className="block group h-full">
                    {/* Brand Board v1.0 - Interactive Card Pattern with Enhanced Hover */}
                    <div className="relative h-full p-6 rounded-xl border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue transition-all duration-200 hover:border-emerald-pro-600/50 hover:bg-light-bg-secondary dark:hover:bg-graphite hover:-translate-y-1 hover:shadow-card-hover overflow-hidden">
                      {/* Top accent line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-pro-600 to-emerald-pro-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                      {/* Icon and Arrow Row */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center transition-all duration-200 group-hover:bg-emerald-pro-600/10 group-hover:border group-hover:border-emerald-pro-600/30`}>
                          <Icon className={`h-5 w-5 ${colors.text} transition-all duration-200 group-hover:text-emerald-pro-600 group-hover:scale-110`} />
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-900 dark:text-slate-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-emerald-pro-600 transition-all duration-200" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-pro-600 transition-colors">
                        {industry.name}
                      </h3>

                      {/* Colored Tagline */}
                      <p className={`text-sm ${colors.text} font-medium mb-3`}>
                        {industry.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-slate-900 dark:text-slate-200 text-sm leading-relaxed">
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
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              className="text-center mt-12"
            >
              {/* Brand Board v1.0 - Secondary Button */}
              <button
                onClick={() => setShowAll(true)}
                className="border border-emerald-pro-600 text-emerald-pro-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-pro-600/10 transition-all duration-200 inline-flex items-center gap-2"
              >
                View All {industries.length} Industries
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* CTA Section */}
      <section className="relative py-32 bg-white dark:bg-deep-space overflow-hidden">
        {/* Enhanced Ambient Orbs */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-pro-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-pro-600/10 rounded-full blur-[150px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to <span className="headline-underline text-gradient">Dominate Your Industry</span>?
            </h2>
            <p className="text-lg text-slate-900 dark:text-slate-200 mb-10">
              Join hundreds of B2B companies using our AI-powered cold email system to book more qualified meetings and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Brand Board v1.0 - Primary CTA Magnetic Button */}
              <Link
                href="/contact"
                className="cta-magnetic"
              >
                Book a Strategy Call
              </Link>
              {/* Brand Board v1.0 - Ghost Button */}
              <Link
                href="/case-studies"
                className="text-slate-900 dark:text-slate-200 px-6 py-3 rounded-lg font-medium hover:text-slate-900 dark:hover:text-white hover:bg-light-bg-secondary dark:hover:bg-graphite transition-all duration-200"
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
