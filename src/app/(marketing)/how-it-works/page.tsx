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
    title: "Discovery Call",
    description:
      "We start with a 30-minute conversation to understand your ideal customer profile, value proposition, and growth goals.",
    details: [
      "Define your target market",
      "Understand your unique value",
      "Set success metrics",
    ],
  },
  {
    step: 2,
    icon: Sparkles,
    title: "AI Campaign Design",
    description:
      "Our AI Architect engine crafts personalized email sequences tailored to your specific audience and messaging.",
    details: [
      "AI-generated subject lines",
      "Personalized copy at scale",
      "Multi-touch sequences",
    ],
  },
  {
    step: 3,
    icon: TrendingUp,
    title: "Launch & Monitor",
    description:
      "Our Scientist engine continuously monitors performance and optimizes campaigns in real-time.",
    details: [
      "24/7 performance tracking",
      "A/B testing automation",
      "Deliverability optimization",
    ],
  },
  {
    step: 4,
    icon: Rocket,
    title: "Scale Results",
    description:
      "As we identify winning strategies, we expand into new segments and scale your pipeline predictably.",
    details: [
      "Double down on what works",
      "Expand to new markets",
      "Predictable growth",
    ],
  },
];

const engines = [
  {
    name: "Guardian",
    codename: "Engine A",
    icon: Shield,
    description: "Compliance & domain health verification",
    color: "electric-cyan",
  },
  {
    name: "Architect",
    codename: "Engine B",
    icon: Sparkles,
    description: "AI-powered campaign design",
    color: "quantum-violet",
  },
  {
    name: "Scientist",
    codename: "Engine C",
    icon: BarChart3,
    description: "Campaign monitoring & optimization",
    color: "neon-mint",
  },
  {
    name: "Hunter",
    codename: "Engine G",
    icon: Target,
    description: "Reply-based lead expansion",
    color: "energy-orange",
  },
  {
    name: "Sentinel",
    codename: "Engine H",
    icon: Users,
    description: "Website visitor intelligence",
    color: "electric-cyan",
  },
];

const stats = [
  { value: "3.5%+", label: "Avg Reply Rate" },
  { value: "92%", label: "Deliverability" },
  { value: "45%", label: "Open Rate" },
  { value: "60+", label: "Meetings/Month" },
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
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-quantum-violet/10 rounded-full blur-[100px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-violet/10 border border-quantum-violet/30 mb-6">
              <Sparkles className="w-4 h-4 text-quantum-violet" />
              <span className="text-sm font-medium text-quantum-violet">
                The Quantum Approach
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              How{" "}
              <span className="gradient-text-cyan-violet">
                Quantum Insights
              </span>{" "}
              Works
            </h1>

            <p className="text-xl text-steel max-w-2xl mx-auto mb-8">
              A proven process powered by AI that transforms cold outreach into
              warm conversations and qualified meetings.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo">
                <Button
                  size="lg"
                  className="bg-electric-cyan hover:bg-electric-cyan/90 text-deep-space font-semibold gap-2"
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/engines">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-graphite hover:border-electric-cyan/50 hover:text-electric-cyan"
                >
                  Explore the Engines
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Process Steps */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
              The 4-Step{" "}
              <span className="gradient-text-cyan-violet">
                Process
              </span>
            </h2>
            <p className="text-steel">
              From discovery to scale, here&apos;s how we build your outbound engine.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-24 left-[50%] w-[80%] -translate-x-1/2 h-0.5 bg-gradient-to-r from-electric-cyan via-quantum-violet to-neon-mint hidden lg:block" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-electric-cyan/10 border-2 border-electric-cyan flex items-center justify-center mx-auto relative z-10 bg-deep-space">
                      <step.icon className="h-7 w-7 text-electric-cyan" />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-graphite bg-midnight-blue/50 hover:border-electric-cyan/30 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-electric-cyan bg-electric-cyan/10 px-2 py-1 rounded">
                        Step {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-sora font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-steel mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-silver"
                        >
                          <CheckCircle className="h-4 w-4 text-neon-mint flex-shrink-0" />
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

      {/* The 5 Engines */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
              Powered by{" "}
              <span className="gradient-text-cyan-violet">
                5 AI Engines
              </span>
            </h2>
            <p className="text-steel">
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
                "electric-cyan": {
                  bg: "bg-electric-cyan/10",
                  border: "border-electric-cyan/30",
                  text: "text-electric-cyan",
                },
                "quantum-violet": {
                  bg: "bg-quantum-violet/10",
                  border: "border-quantum-violet/30",
                  text: "text-quantum-violet",
                },
                "neon-mint": {
                  bg: "bg-neon-mint/10",
                  border: "border-neon-mint/30",
                  text: "text-neon-mint",
                },
                "energy-orange": {
                  bg: "bg-energy-orange/10",
                  border: "border-energy-orange/30",
                  text: "text-energy-orange",
                },
              };
              const colors = colorClasses[engine.color] || colorClasses["electric-cyan"];

              return (
                <motion.div
                  key={engine.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/engines/${engine.name.toLowerCase()}`}
                    className="block p-5 rounded-xl border border-graphite bg-midnight-blue/50 hover:border-electric-cyan/30 transition-colors text-center"
                  >
                    <div
                      className={`h-12 w-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mx-auto mb-3`}
                    >
                      <engine.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <p className="text-xs text-steel mb-1">{engine.codename}</p>
                    <h3 className="text-base font-sora font-semibold text-white mb-1">
                      {engine.name}
                    </h3>
                    <p className="text-xs text-steel">{engine.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/engines"
              className="inline-flex items-center gap-2 text-electric-cyan hover:underline"
            >
              Learn more about our AI engines
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      {/* Results Stats */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl border border-graphite bg-gradient-to-br from-midnight-blue/80 to-deep-space"
          >
            <h2 className="text-2xl font-sora font-bold text-white text-center mb-8">
              Average Results Our Clients See
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-sora font-bold text-electric-cyan mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-steel">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Why Different */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
              Why We&apos;re{" "}
              <span className="gradient-text-cyan-violet">
                Different
              </span>
            </h2>
            <p className="text-steel">
              Traditional agencies rely on manual processes and guesswork. We use
              AI to deliver consistent, scalable results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl border border-graphite bg-midnight-blue/50"
              >
                <div className="h-12 w-12 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-electric-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-sora font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-steel">{item.description}</p>
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
