"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Scale } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";

const competitors = [
  {
    slug: "belkins",
    name: "Belkins",
    description: "B2B appointment setting agency",
    differentiators: [
      "AI-first vs manual processes",
      "Real-time optimization",
      "Transparent pricing",
    ],
  },
  {
    slug: "cience",
    name: "CIENCE",
    description: "SDR-as-a-service provider",
    differentiators: [
      "AI engines vs human SDRs",
      "Faster campaign deployment",
      "Lower cost per meeting",
    ],
  },
  {
    slug: "saleshive",
    name: "SalesHive",
    description: "Outsourced sales development",
    differentiators: [
      "Technology-led approach",
      "No long-term contracts",
      "Full transparency",
    ],
  },
  {
    slug: "martal-group",
    name: "Martal Group",
    description: "Lead generation agency",
    differentiators: [
      "AI personalization at scale",
      "Dedicated engine monitoring",
      "Performance guarantees",
    ],
  },
  {
    slug: "leadgen",
    name: "LeadGen.com",
    description: "B2B lead generation platform",
    differentiators: [
      "Full-service vs self-serve",
      "Human-AI hybrid approach",
      "Campaign optimization",
    ],
  },
  {
    slug: "callbox",
    name: "Callbox",
    description: "Multi-channel outreach provider",
    differentiators: [
      "AI-powered targeting",
      "Focus on quality over quantity",
      "Modern tech stack",
    ],
  },
];

export default function ComparisonHubPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-white dark:bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />
        {/* Enhanced Ambient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-pro-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-pro-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-pro-400/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Tech Badge */}
            <div className="tech-badge mb-6">
              <Scale className="w-4 h-4 text-emerald-pro-500" />
              <span className="text-sm font-medium text-emerald-pro-500">
                Compare Providers
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              XGrowthOS vs{" "}
              <span className="headline-underline text-gradient">
                The Competition
              </span>
            </h1>

            <p className="text-xl text-slate-900 dark:text-slate-200">
              See how our AI-powered approach compares to traditional lead
              generation agencies.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Competitor Grid */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <motion.div
                key={competitor.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/vs/${competitor.slug}`}
                  className="block p-6 rounded-2xl border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/50 hover:border-emerald-pro-600/30 transition-colors h-full"
                >
                  <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-1">
                    XGrowthOS vs {competitor.name}
                  </h3>
                  <p className="text-sm text-slate-900 dark:text-slate-200 mb-4">
                    {competitor.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {competitor.differentiators.map((diff, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-200"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-pro-400 flex-shrink-0" />
                        {diff}
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm text-emerald-pro-600 hover:underline">
                    Read comparison
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Why Compare */}
      <SectionWrapper variant="dark">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center p-8 rounded-3xl border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/50"
          >
            <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-4">
              Why Companies Switch to XGrowthOS
            </h2>
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Traditional agencies rely on manual processes that can&apos;t match the
              speed, personalization, and optimization that AI delivers.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-3xl font-sora font-bold text-emerald-pro-600 mb-2">
                  3x
                </p>
                <p className="text-sm text-slate-900 dark:text-slate-200">
                  Faster campaign deployment
                </p>
              </div>
              <div>
                <p className="text-3xl font-sora font-bold text-emerald-pro-400 mb-2">
                  40%
                </p>
                <p className="text-sm text-slate-900 dark:text-slate-200">Lower cost per meeting</p>
              </div>
              <div>
                <p className="text-3xl font-sora font-bold text-emerald-pro-500 mb-2">
                  24/7
                </p>
                <p className="text-sm text-slate-900 dark:text-slate-200">Continuous optimization</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="See the Quantum Difference"
        description="Book a demo to see how our AI engines outperform traditional agencies."
      />
    </>
  );
}
