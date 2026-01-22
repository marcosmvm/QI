"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Award, Lightbulb } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success by your success. Every campaign is designed with clear, measurable outcomes.",
  },
  {
    icon: Lightbulb,
    title: "AI Innovation",
    description: "We continuously push the boundaries of what's possible with AI-powered lead generation.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We're not just a vendor—we're an extension of your team, invested in your growth.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "From deliverability to personalization, we hold ourselves to the highest standards.",
  },
];

const stats = [
  { value: "200+", label: "Clients Served" },
  { value: "50M+", label: "Emails Delivered" },
  { value: "95%", label: "Avg Deliverability" },
  { value: "2024", label: "Founded" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-quantum-violet/20 rounded-full blur-[120px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              We&apos;re Building the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
                B2B Outbound
              </span>
            </h1>
            <p className="text-xl text-silver max-w-2xl mx-auto">
              Quantum Insights was founded with a simple mission: make AI-powered lead generation accessible to every B2B company.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats */}
      <div className="bg-gradient-to-r from-electric-cyan/10 via-quantum-violet/10 to-neon-mint/10 py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-sora font-bold text-electric-cyan">
                  {stat.value}
                </p>
                <p className="text-steel mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* Story Section */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-silver leading-relaxed mb-6">
                Quantum Insights was born from frustration. Our founder, Marcos Matthews, spent years watching B2B companies struggle with cold outreach—either doing it poorly themselves or paying agencies that delivered inconsistent results.
              </p>
              <p className="text-silver leading-relaxed mb-6">
                The problem wasn&apos;t effort—it was the approach. Traditional outbound relied on volume over quality, generic messaging, and outdated tools. Companies were burning through domains, annoying prospects, and seeing diminishing returns.
              </p>
              <p className="text-silver leading-relaxed mb-6">
                We built Quantum Insights to prove there&apos;s a better way. By combining cutting-edge AI with deep expertise in deliverability, personalization, and sales psychology, we&apos;ve created a system that actually works—consistently, at scale.
              </p>
              <p className="text-silver leading-relaxed">
                Today, our 5 AI engines power lead generation for hundreds of B2B companies across every industry. We&apos;re not just another agency—we&apos;re the infrastructure for modern outbound sales.
              </p>
            </div>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Values Section */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-silver max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-electric-cyan/20 bg-gradient-to-br from-midnight-blue/50 to-deep-space/50"
              >
                <div className="inline-flex p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/20 mb-4">
                  <value.icon className="h-6 w-6 text-electric-cyan" />
                </div>
                <h3 className="text-xl font-sora font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-silver">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Team CTA */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 rounded-3xl border border-electric-cyan/20 bg-gradient-to-br from-midnight-blue/50 to-deep-space/50"
          >
            <h3 className="text-2xl font-sora font-bold text-white mb-4">
              Join Our Team
            </h3>
            <p className="text-silver mb-6 max-w-md mx-auto">
              We&apos;re always looking for talented people who share our passion for innovation and results.
            </p>
            <Link href="/careers">
              <Button className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </SectionWrapper>

      <CTABanner />
    </>
  );
}
