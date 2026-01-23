"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Rocket, CheckCircle, MapPin, GraduationCap, Shield, Target, Zap } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";

// Founder commitment instead of fake testimonials
const founderCommitments = [
  {
    icon: Shield,
    title: "Deliverability Guaranteed",
    description: "99%+ inbox placement or we fix it at no extra cost. Your domain reputation is sacred.",
  },
  {
    icon: Target,
    title: "Quality Over Volume",
    description: "We measure success by qualified meetings booked, not emails sent.",
  },
  {
    icon: Zap,
    title: "Performance-Based Pricing",
    description: "We only win when you win. Our incentives are aligned with your success.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero Section - Honest Pre-Launch Framing */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-pro-500/20 rounded-full blur-[120px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-pro-500/10 border border-emerald-pro-500/20 mb-6">
              <Rocket className="w-4 h-4 text-emerald-pro-500" />
              <span className="text-sm font-medium text-emerald-pro-500">Launching February 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-light-text dark:text-white mb-6">
              Our Commitment to{" "}
              <span className="gradient-text-cyan-violet">
                Founding Partners
              </span>
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-silver max-w-2xl mx-auto">
              We&apos;re building something special. Here&apos;s what we promise to every founding partner who joins us.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Founder Message */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative p-8 md:p-12 rounded-3xl border border-emerald-pro-600/20 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 p-4 rounded-2xl bg-light-bg-secondary dark:bg-midnight-blue border border-border-default dark:border-graphite/50 backdrop-blur-sm">
              <Quote className="h-6 w-6 text-emerald-pro-600" />
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-light-text dark:text-white font-medium leading-relaxed mb-8 mt-4">
              &ldquo;I built XGrowthOS because I was tired of seeing B2B companies waste their best sales reps on cold outreach. Your closers should be closing, not prospecting. Our 5 AI engines do the heavy lifting so your team can focus on what they do best—building relationships and closing deals.&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-pro-600 to-emerald-pro-500 flex items-center justify-center text-deep-space font-bold text-xl">
                  MM
                </div>
                <div>
                  <p className="font-semibold text-light-text dark:text-white text-lg">Marcos Matthews</p>
                  <p className="text-emerald-pro-600 text-sm font-medium">Founder & CEO</p>
                  <div className="flex items-center gap-3 mt-1 text-light-text-muted dark:text-steel text-xs">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Los Angeles, CA
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      CSUN Entrepreneurship
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Our Commitments */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-light-text dark:text-white mb-4">
              Our Promise to You
            </h2>
            <p className="text-light-text-secondary dark:text-silver max-w-2xl mx-auto">
              These aren&apos;t marketing claims—they&apos;re commitments we stand behind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {founderCommitments.map((commitment, index) => (
              <motion.div
                key={commitment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl border border-emerald-pro-600/20 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-xl bg-emerald-pro-600/10 border border-emerald-pro-600/20">
                    <commitment.icon className="h-8 w-8 text-emerald-pro-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-light-text dark:text-white mb-3">{commitment.title}</h3>
                <p className="text-light-text-secondary dark:text-silver">{commitment.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Founding Partner Benefits */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-light-text dark:text-white mb-4">
              Why Join as a Founding Partner?
            </h2>
            <p className="text-light-text-secondary dark:text-silver max-w-2xl mx-auto">
              Early adopters get exclusive benefits that won&apos;t be available later.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Lock in Founding Rates", description: "Up to 60% off standard pricing—forever, as long as you remain a client" },
              { title: "Direct Founder Access", description: "Work directly with Marcos to customize your campaigns and strategy" },
              { title: "Shape the Product", description: "Your feedback directly influences our roadmap and feature development" },
              { title: "Be a Case Study", description: "Get featured prominently when we launch publicly with your success story" },
              { title: "Extended Pilot Terms", description: "30-day extension or 50% credit if targets aren't met by week 8" },
              { title: "Priority Support", description: "Dedicated Slack channel and weekly strategy calls with the team" },
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
                  <h4 className="font-semibold text-light-text dark:text-white mb-1">{benefit.title}</h4>
                  <p className="text-light-text-muted dark:text-steel text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="gradient">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-sora font-bold text-light-text dark:text-white mb-4">
              Ready to Be a Founding Partner?
            </h2>
            <p className="text-light-text-secondary dark:text-silver mb-8 max-w-xl mx-auto">
              Limited spots available. Book a call to discuss if we&apos;re a fit for each other.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-emerald-pro-600 to-cyan-dark hover:from-cyan-light hover:to-emerald-pro-600 text-deep-space font-semibold">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="Join Our Founding Partner Program"
        description="Be among the first to experience AI-powered B2B outreach that actually works."
      />
    </>
  );
}
