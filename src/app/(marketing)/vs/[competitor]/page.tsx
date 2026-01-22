"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  ArrowLeft,
  Scale,
  Zap,
  Shield,
  BarChart3,
  Users,
  Clock,
} from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";

interface CompetitorData {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  founded: string;
  headquarters: string;
  approach: string;
  features: {
    name: string;
    quantum: boolean;
    competitor: boolean;
  }[];
  advantages: {
    title: string;
    description: string;
  }[];
  pricingNote: string;
}

const competitorData: Record<string, CompetitorData> = {
  belkins: {
    name: "Belkins",
    slug: "belkins",
    tagline: "B2B Appointment Setting",
    description:
      "Belkins is a B2B appointment setting agency that uses human SDRs for outreach campaigns.",
    founded: "2017",
    headquarters: "Delaware, USA",
    approach: "Manual outreach with human SDR teams",
    features: [
      { name: "AI-powered personalization", quantum: true, competitor: false },
      { name: "Real-time campaign optimization", quantum: true, competitor: false },
      { name: "24/7 monitoring", quantum: true, competitor: false },
      { name: "Transparent pricing", quantum: true, competitor: false },
      { name: "No long-term contracts", quantum: true, competitor: false },
      { name: "Dedicated account manager", quantum: true, competitor: true },
      { name: "Multi-channel outreach", quantum: true, competitor: true },
      { name: "Lead list building", quantum: true, competitor: true },
    ],
    advantages: [
      {
        title: "Speed to Launch",
        description:
          "Our AI Architect can build and launch campaigns in days, not weeks. Belkins typically requires 2-4 weeks for campaign setup.",
      },
      {
        title: "Scalability",
        description:
          "AI handles personalization at any scale. Human SDRs have natural throughput limits that increase costs linearly.",
      },
      {
        title: "Consistency",
        description:
          "Our Scientist engine optimizes 24/7 without human variability. Quality doesn't depend on individual SDR performance.",
      },
    ],
    pricingNote:
      "Belkins typically charges $3,000-$10,000/month with 3-6 month minimums. Quantum Insights offers flexible monthly plans starting at $997.",
  },
  cience: {
    name: "CIENCE",
    slug: "cience",
    tagline: "SDR-as-a-Service",
    description:
      "CIENCE provides outsourced SDR teams and data solutions for B2B sales development.",
    founded: "2015",
    headquarters: "Denver, USA",
    approach: "Offshore SDR teams with proprietary data",
    features: [
      { name: "AI-powered personalization", quantum: true, competitor: false },
      { name: "Real-time campaign optimization", quantum: true, competitor: false },
      { name: "Full transparency & reporting", quantum: true, competitor: false },
      { name: "No long-term contracts", quantum: true, competitor: false },
      { name: "Dedicated human SDRs", quantum: false, competitor: true },
      { name: "Proprietary data platform", quantum: true, competitor: true },
      { name: "Multi-channel outreach", quantum: true, competitor: true },
      { name: "CRM integration", quantum: true, competitor: true },
    ],
    advantages: [
      {
        title: "Cost Efficiency",
        description:
          "AI scales without adding headcount. CIENCE charges per SDR, making scaling expensive.",
      },
      {
        title: "Data Quality",
        description:
          "Our Hunter engine validates and enriches leads in real-time. No stale data or manual verification needed.",
      },
      {
        title: "Optimization Speed",
        description:
          "Scientist engine adjusts campaigns instantly based on performance. Human teams have longer feedback loops.",
      },
    ],
    pricingNote:
      "CIENCE typically charges $5,000-$15,000/month per SDR. Quantum Insights delivers comparable output at a fraction of the cost.",
  },
  saleshive: {
    name: "SalesHive",
    slug: "saleshive",
    tagline: "Outsourced Sales Development",
    description:
      "SalesHive provides outsourced SDR services focused on appointment setting and lead generation.",
    founded: "2018",
    headquarters: "Austin, USA",
    approach: "US-based SDR teams with technology support",
    features: [
      { name: "AI-powered campaigns", quantum: true, competitor: false },
      { name: "Continuous optimization", quantum: true, competitor: false },
      { name: "Compliance automation", quantum: true, competitor: false },
      { name: "Transparent reporting", quantum: true, competitor: true },
      { name: "Flexible contracts", quantum: true, competitor: true },
      { name: "US-based team", quantum: true, competitor: true },
      { name: "Multi-channel approach", quantum: true, competitor: true },
      { name: "Dedicated support", quantum: true, competitor: true },
    ],
    advantages: [
      {
        title: "Technology-First",
        description:
          "Five specialized AI engines vs general sales tools. Purpose-built for cold outreach optimization.",
      },
      {
        title: "Predictable Pricing",
        description:
          "Fixed monthly plans regardless of volume. No surprises or hidden fees.",
      },
      {
        title: "Faster Results",
        description:
          "AI campaigns launch faster and optimize continuously without waiting for human analysis.",
      },
    ],
    pricingNote:
      "SalesHive charges per appointment or monthly retainer. Quantum Insights offers all-inclusive monthly plans.",
  },
  "martal-group": {
    name: "Martal Group",
    slug: "martal-group",
    tagline: "Lead Generation Agency",
    description:
      "Martal Group is a B2B lead generation agency specializing in outbound sales for tech companies.",
    founded: "2009",
    headquarters: "Canada",
    approach: "Account-based marketing with human teams",
    features: [
      { name: "AI campaign generation", quantum: true, competitor: false },
      { name: "Real-time optimization", quantum: true, competitor: false },
      { name: "Domain health monitoring", quantum: true, competitor: false },
      { name: "ABM approach", quantum: true, competitor: true },
      { name: "Tech industry focus", quantum: true, competitor: true },
      { name: "Dedicated strategist", quantum: true, competitor: true },
      { name: "CRM integration", quantum: true, competitor: true },
      { name: "Performance tracking", quantum: true, competitor: true },
    ],
    advantages: [
      {
        title: "Personalization at Scale",
        description:
          "AI Architect creates unique messages for each prospect. Manual approaches can't match this level of personalization.",
      },
      {
        title: "Compliance Built-In",
        description:
          "Guardian engine ensures deliverability before campaigns launch. Prevents reputation damage.",
      },
      {
        title: "Modern Approach",
        description:
          "AI-native platform vs adapted traditional methods. Built for today's inbox landscape.",
      },
    ],
    pricingNote:
      "Martal Group typically requires 6-12 month commitments. Quantum Insights offers month-to-month flexibility.",
  },
  leadgen: {
    name: "LeadGen.com",
    slug: "leadgen",
    tagline: "B2B Lead Generation Platform",
    description:
      "LeadGen.com provides lead generation software and services for B2B companies.",
    founded: "2015",
    headquarters: "USA",
    approach: "Software platform with optional managed services",
    features: [
      { name: "Done-for-you service", quantum: true, competitor: false },
      { name: "AI optimization engine", quantum: true, competitor: false },
      { name: "Dedicated support", quantum: true, competitor: false },
      { name: "Lead database access", quantum: true, competitor: true },
      { name: "Email automation", quantum: true, competitor: true },
      { name: "Analytics dashboard", quantum: true, competitor: true },
      { name: "CRM sync", quantum: true, competitor: true },
      { name: "Template library", quantum: true, competitor: true },
    ],
    advantages: [
      {
        title: "Full Service vs DIY",
        description:
          "We handle everything from strategy to execution. LeadGen requires you to build and manage campaigns.",
      },
      {
        title: "AI Intelligence",
        description:
          "Five specialized AI engines vs basic automation. Deeper optimization and better results.",
      },
      {
        title: "Expert Guidance",
        description:
          "Strategic consultation included. Not just software access—a true partnership.",
      },
    ],
    pricingNote:
      "LeadGen.com offers software tiers. Quantum Insights provides full-service campaigns with guaranteed support.",
  },
  callbox: {
    name: "Callbox",
    slug: "callbox",
    tagline: "Multi-Channel B2B Lead Generation",
    description:
      "Callbox provides multi-channel B2B lead generation including telemarketing, email, and social.",
    founded: "2004",
    headquarters: "Los Angeles, USA",
    approach: "Call center with multi-channel support",
    features: [
      { name: "AI-powered email campaigns", quantum: true, competitor: false },
      { name: "Real-time optimization", quantum: true, competitor: false },
      { name: "Modern tech stack", quantum: true, competitor: false },
      { name: "Phone outreach", quantum: false, competitor: true },
      { name: "Multi-channel approach", quantum: true, competitor: true },
      { name: "Global reach", quantum: true, competitor: true },
      { name: "Lead qualification", quantum: true, competitor: true },
      { name: "CRM integration", quantum: true, competitor: true },
    ],
    advantages: [
      {
        title: "Quality Over Quantity",
        description:
          "AI targets the right prospects with personalized messages. Less spray-and-pray, more precision.",
      },
      {
        title: "Modern Approach",
        description:
          "Email-first strategy for today's buyers who prefer async communication. Phone can be added strategically.",
      },
      {
        title: "Transparent Pricing",
        description:
          "Clear monthly plans vs complex per-lead or per-call pricing models.",
      },
    ],
    pricingNote:
      "Callbox uses pay-per-lead or retainer models. Quantum Insights offers predictable monthly pricing.",
  },
};

interface PageProps {
  params: Promise<{ competitor: string }>;
}

export default function CompetitorComparisonPage({ params }: PageProps) {
  const { competitor: slug } = use(params);
  const data = competitorData[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-quantum-violet/10 rounded-full blur-[100px]" />

        <Container className="relative z-10">
          <Link
            href="/vs"
            className="inline-flex items-center gap-2 text-steel hover:text-electric-cyan transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All Comparisons
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-violet/10 border border-quantum-violet/30 mb-6">
              <Scale className="w-4 h-4 text-quantum-violet" />
              <span className="text-sm font-medium text-quantum-violet">
                Side-by-Side Comparison
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-sora font-bold text-white mb-6">
              Quantum Insights vs{" "}
              <span className="gradient-text-cyan-violet">
                {data.name}
              </span>
            </h1>

            <p className="text-xl text-steel mb-8">{data.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-steel">
              <span>Founded: {data.founded}</span>
              <span>•</span>
              <span>{data.headquarters}</span>
              <span>•</span>
              <span>{data.approach}</span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Feature Comparison Table */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-sora font-bold text-white mb-4">
              Feature Comparison
            </h2>
          </motion.div>

          <div className="rounded-2xl border border-graphite overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-midnight-blue">
                  <th className="px-6 py-4 text-left text-sm font-medium text-steel">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-electric-cyan">
                    Quantum Insights
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-steel">
                    {data.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.features.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={`border-t border-graphite ${
                      index % 2 === 0 ? "bg-deep-space/50" : "bg-midnight-blue/30"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-silver">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.quantum ? (
                        <Check className="h-5 w-5 text-neon-mint mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-steel mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.competitor ? (
                        <Check className="h-5 w-5 text-steel mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-steel/50 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </SectionWrapper>

      {/* Key Advantages */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-sora font-bold text-white mb-4">
              Why Choose{" "}
              <span className="gradient-text-cyan-violet">
                Quantum Insights
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {data.advantages.map((advantage, index) => {
              const icons = [Zap, Shield, BarChart3];
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-graphite bg-midnight-blue/50"
                >
                  <div className="h-12 w-12 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-electric-cyan" />
                  </div>
                  <h3 className="text-lg font-sora font-semibold text-white mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-steel">{advantage.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      {/* Pricing Note */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl border border-electric-cyan/30 bg-gradient-to-br from-electric-cyan/10 to-quantum-violet/10"
          >
            <h3 className="text-xl font-sora font-bold text-white mb-4">
              Pricing Comparison
            </h3>
            <p className="text-steel mb-6">{data.pricingNote}</p>
            <Link href="/pricing">
              <Button className="bg-electric-cyan hover:bg-electric-cyan/90 text-deep-space font-semibold gap-2">
                View Our Pricing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title={`Ready to Switch from ${data.name}?`}
        description="Book a demo to see the Quantum Insights difference firsthand."
      />
    </>
  );
}
