"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Sparkles,
  TrendingUp,
  Rocket,
  Shield,
  Target,
  Users,
  Mail,
  CheckCircle,
  Zap,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: "Week 1: Discovery & Setup",
    description:
      "Kickoff call within 3 days, dashboard access in 48 hours, ICP definition, domain warmup, and technical integrations.",
    details: [
      "60-minute kickoff call",
      "Complete Discovery Questionnaire",
      "Domain warmup initiated",
    ],
  },
  {
    step: 2,
    icon: Sparkles,
    title: "Week 2: Campaign Development",
    description:
      "The Architect AI generates campaign copy, we configure SPF/DKIM/DMARC, and test CRM integration.",
    details: [
      "AI-generated copy for approval",
      "5 subject line variants",
      "Personalization configured",
    ],
  },
  {
    step: 3,
    icon: TrendingUp,
    title: "Weeks 3-4: Launch & First Meetings",
    description:
      "First emails send, The Scientist monitors replies, The Guardian protects domain health. First meetings typically booked.",
    details: [
      "Guardian pre-launch compliance check",
      "Daily monitoring enabled",
      "Weekly reports begin",
    ],
  },
  {
    step: 4,
    icon: Rocket,
    title: "Weeks 5-12: Optimization & Scale",
    description:
      "The Scientist runs Mon/Wed A/B tests, The Hunter expands from positive replies (25-50 new leads each).",
    details: [
      "Continuous A/B testing",
      "Reply-based lead expansion",
      "10%+ monthly improvement",
    ],
  },
];

const engines = [
  {
    name: "Guardian",
    codename: "Engines C+D",
    icon: Shield,
    description: "DNC verification, domain monitoring, deliverability protection",
    color: "emerald-pro-600",
  },
  {
    name: "Architect",
    codename: "Engine B",
    icon: Sparkles,
    description: "Multi-agent AI copywriting, Master Library integration",
    color: "emerald-pro-500",
  },
  {
    name: "Scientist",
    codename: "Engines A+F",
    icon: BarChart3,
    description: "Mon/Wed optimization cycles, A/B testing automation",
    color: "emerald-pro-400",
  },
  {
    name: "Hunter",
    codename: "Engine G",
    icon: Target,
    description: "25-50 new leads per positive reply",
    color: "energy-orange",
  },
  {
    name: "Sentinel",
    codename: "Engine H",
    icon: Users,
    description: "8-15 contacts per identified website visitor",
    color: "emerald-pro-600",
  },
];

const stats = [
  { value: "8%+", label: "Reply Rate Target" },
  { value: "95%+", label: "Inbox Placement" },
  { value: "40%+", label: "Open Rate Target" },
  { value: "10-30", label: "Meetings in 90 Days" },
];

const differentiators = [
  {
    icon: Zap,
    title: "AI-First Approach",
    description:
      "Our five AI engines work together to automate what traditionally required an entire team.",
  },
  {
    icon: Shield,
    title: "Compliance Built-In",
    description:
      "Guardian engine ensures every campaign meets deliverability standards before it goes live.",
  },
  {
    icon: MessageSquare,
    title: "Human-Like Personalization",
    description:
      "Architect creates messages that feel authentic, not automated—at any scale.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Optimization",
    description:
      "Scientist engine learns from every interaction to improve results over time.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-midnight-blue/30" />

        {/* Enhanced ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-pro-500/15 rounded-full blur-[150px] animate-orb-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-pro-600/12 rounded-full blur-[130px] animate-orb-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-pro-400/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="tech-badge mb-8"
            >
              <Sparkles className="w-4 h-4 text-emerald-pro-500" />
              <span className="text-sm font-medium text-emerald-pro-500">
                14 Days to First Campaign
              </span>
              <Zap className="w-4 h-4 text-emerald-pro-500" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold text-slate-900 dark:text-white mb-8">
              How XGrowthOS{" "}
              <span className="headline-underline text-gradient block mt-2">
                Works
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed">
              A proven process powered by AI that transforms <span className="text-emerald-pro-600 font-semibold">cold outreach</span> into
              warm conversations and <span className="text-emerald-pro-500 font-semibold">qualified meetings</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo">
                <button className="cta-magnetic group">
                  Book a Demo
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/engines">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border-default dark:border-graphite hover:border-emerald-pro-600/50 hover:text-emerald-pro-600"
                >
                  Explore the Engines
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Process Steps */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-4">
              The 4-Step{" "}
              <span className="headline-underline text-gradient">
                Process
              </span>
            </h2>
            <p className="text-slate-700 dark:text-slate-400">
              From discovery to scale, here&apos;s how we build your outbound engine.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-24 left-[50%] w-[80%] -translate-x-1/2 h-0.5 bg-gradient-to-r from-emerald-pro-600 via-emerald-pro-500 to-emerald-pro-400 hidden lg:block" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-emerald-pro-600/10 border-2 border-emerald-pro-600 flex items-center justify-center mx-auto relative z-10 bg-white dark:bg-deep-space">
                      <step.icon className="h-7 w-7 text-emerald-pro-600" />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/50 hover:border-emerald-pro-600/30 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-emerald-pro-600 bg-emerald-pro-600/10 px-2 py-1 rounded">
                        Step {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-pro-400 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* The 11 Engines */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-4">
              Powered by{" "}
              <span className="headline-underline text-gradient">
                11 AI Engines
              </span>
            </h2>
            <p className="text-slate-700 dark:text-slate-400">
              Each engine handles a specialized part of your outreach, working together
              to maximize results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {engines.map((engine, index) => {
              const colorClasses: Record<
                string,
                { bg: string; border: string; text: string }
              > = {
                "emerald-pro-600": {
                  bg: "bg-emerald-pro-600/10",
                  border: "border-emerald-pro-600/30",
                  text: "text-emerald-pro-600",
                },
                "emerald-pro-500": {
                  bg: "bg-emerald-pro-500/10",
                  border: "border-emerald-pro-500/30",
                  text: "text-emerald-pro-500",
                },
                "emerald-pro-400": {
                  bg: "bg-emerald-pro-400/10",
                  border: "border-emerald-pro-400/30",
                  text: "text-emerald-pro-400",
                },
                "energy-orange": {
                  bg: "bg-energy-orange/10",
                  border: "border-energy-orange/30",
                  text: "text-energy-orange",
                },
              };
              const colors = colorClasses[engine.color] || colorClasses["emerald-pro-600"];

              return (
                <motion.div
                  key={engine.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/engines/${engine.name.toLowerCase()}`}
                    className="block p-5 rounded-xl border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/50 hover:border-emerald-pro-600/30 transition-colors text-center"
                  >
                    <div
                      className={`h-12 w-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mx-auto mb-3`}
                    >
                      <engine.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">{engine.codename}</p>
                    <h3 className="text-base font-sora font-semibold text-slate-900 dark:text-white mb-1">
                      {engine.name}
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-400">{engine.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/engines"
              className="inline-flex items-center gap-2 text-emerald-pro-600 hover:underline"
            >
              Learn more about our AI engines
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Results Stats */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-3xl border border-border-default dark:border-graphite bg-gradient-to-br from-midnight-blue/80 to-deep-space"
          >
            <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white text-center mb-8">
              Average Results Our Clients See
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-sora font-bold text-emerald-pro-600 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Why Different */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-4">
              Why We&apos;re{" "}
              <span className="headline-underline text-gradient">
                Different
              </span>
            </h2>
            <p className="text-slate-700 dark:text-slate-400">
              Traditional agencies rely on manual processes and guesswork. We use
              AI to deliver consistent, scalable results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="feature-grid-item flex items-start gap-4"
              >
                <div className="h-12 w-12 rounded-xl bg-emerald-pro-600/10 border border-emerald-pro-600/30 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-emerald-pro-600" />
                </div>
                <div>
                  <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="Ready to Transform Your Outreach?"
        description="Join the companies already scaling their pipeline with AI-powered cold email."
      />
    </>
  );
}
