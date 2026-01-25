"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Zap, Clock, CheckCircle, Rocket } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";

// Target benchmarks we're building toward (honest pre-launch framing)
const targetBenchmarks = [
  { value: ">90%", label: "Deliverability Target", icon: Shield },
  { value: ">30%", label: "Open Rate Target", icon: Target },
  { value: ">3%", label: "Reply Rate Target", icon: Zap },
  { value: "48h", label: "Campaign Launch Time", icon: Clock },
];

const methodology = [
  {
    title: "Guardian Engine Compliance",
    description: "Every lead passes through our Guardian engine for DNC checks and domain health verification before any email is sent.",
    icon: Shield,
  },
  {
    title: "AI-Personalized Sequences",
    description: "The Architect engine creates personalized email sequences based on your ICP, not generic templates.",
    icon: Target,
  },
  {
    title: "Continuous Optimization",
    description: "The Scientist engine monitors performance 24/7 and automatically optimizes for better results.",
    icon: Zap,
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero Section - Honest Pre-Launch Framing */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-pro-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-pro-600/15 rounded-full blur-[100px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-pro-500/10 border border-emerald-pro-500/20 mb-6">
              <Rocket className="w-4 h-4 text-emerald-pro-500" />
              <span className="text-sm font-medium text-emerald-pro-500">Founding Partner Program</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              Results We&apos;re{" "}
              <span className="text-gradient">
                Targeting
              </span>
            </h1>

            <p className="text-xl text-slate-900 dark:text-slate-200 max-w-2xl mx-auto mb-10">
              We&apos;re launching with ambitious benchmarks backed by proven AI technology. Be among our founding partners and help us build case studies together.
            </p>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-pro-600 to-cyan-dark hover:from-cyan-light hover:to-emerald-pro-600 text-white font-semibold px-8"
              >
                Become a Founding Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Target Benchmarks */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-4">
              Our Performance Targets
            </h2>
            <p className="text-slate-900 dark:text-slate-200 max-w-2xl mx-auto">
              These are the benchmarks we&apos;re building our platform to achieve. Our pilot partners will help validate these targets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {targetBenchmarks.map((benchmark, index) => (
              <motion.div
                key={benchmark.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl border border-emerald-pro-600/20 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-emerald-pro-600/10 border border-emerald-pro-600/20">
                    <benchmark.icon className="h-6 w-6 text-emerald-pro-600" />
                  </div>
                </div>
                <p className="text-3xl font-sora font-bold text-emerald-pro-600 mb-2">
                  {benchmark.value}
                </p>
                <p className="text-slate-900 dark:text-slate-300 text-sm">{benchmark.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Methodology Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-4">
              How We&apos;ll Achieve These Results
            </h2>
            <p className="text-slate-900 dark:text-slate-200 max-w-2xl mx-auto">
              Our 11 AI engines work together to maximize deliverability and conversions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {methodology.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border-default dark:border-graphite/50 bg-white dark:bg-deep-space/50 hover:border-emerald-pro-600/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-emerald-pro-600/10 border border-emerald-pro-600/20">
                    <item.icon className="h-6 w-6 text-emerald-pro-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                </div>
                <p className="text-slate-900 dark:text-slate-200 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Founding Partner Benefits */}
      <SectionWrapper variant="gradient">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-4">
                Why Become a Founding Partner?
              </h2>
              <p className="text-slate-900 dark:text-slate-200 max-w-2xl mx-auto">
                Early adopters get exclusive benefits while helping shape the future of B2B outreach.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Exclusive Pricing", description: "Lock in founding partner rates—up to 60% off standard pricing, forever" },
                { title: "Direct Access", description: "Work directly with our founder to customize your campaigns" },
                { title: "Shape the Product", description: "Your feedback directly influences our roadmap and features" },
                { title: "First Case Study", description: "Get featured as a success story when we hit our targets together" },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/30"
                >
                  <CheckCircle className="h-6 w-6 text-emerald-pro-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{benefit.title}</h4>
                    <p className="text-slate-900 dark:text-slate-300 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="Be Part of Our First Success Stories"
        description="Join our founding partner program and help us build the future of B2B outreach together."
      />
    </>
  );
}
