"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Award, Lightbulb, Building2, Sparkles } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success by your success. Every campaign is designed with clear, measurable outcomes.",
    color: "cyan",
  },
  {
    icon: Lightbulb,
    title: "AI Innovation",
    description: "We continuously push the boundaries of what's possible with AI-powered lead generation.",
    color: "violet",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We're not just a vendor—we're an extension of your team, invested in your growth.",
    color: "mint",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "From deliverability to personalization, we hold ourselves to the highest standards.",
    color: "orange",
  },
];

// Company stats from XG-DOC-026
const stats = [
  { value: "5", label: "AI Engines" },
  { value: "90", label: "Day Pilot Program" },
  { value: "LA", label: "Based in Los Angeles" },
  { value: "CSUN", label: "Entrepreneurship" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-midnight-blue/30" />

        {/* Enhanced ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-pro-500/15 rounded-full blur-[180px] animate-orb-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-pro-600/10 rounded-full blur-[150px] animate-orb-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-pro-400/5 rounded-full blur-[200px]" />

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
              className="tech-badge mb-10"
            >
              <Building2 className="w-4 h-4 text-emerald-pro-500" />
              <span className="text-sm font-medium text-emerald-pro-500">About XGrowthOS</span>
              <Sparkles className="w-4 h-4 text-emerald-pro-500" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold text-slate-900 dark:text-white mb-8">
              We&apos;re Building the Future of{" "}
              <span className="headline-underline text-gradient block mt-2">
                B2B Outbound
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-700/90 dark:text-slate-200/90 max-w-3xl mx-auto leading-relaxed">
              XGrowthOS was founded with a simple mission: make <span className="text-emerald-pro-600 font-semibold">AI-powered lead generation</span> accessible to every B2B company.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats - Enhanced */}
      <div className="relative py-16 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(0,212,255,0.08) 0%, rgba(123,97,255,0.08) 50%, rgba(0,255,178,0.08) 100%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Top and bottom borders */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-pro-600/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-pro-500/30 to-transparent" />

        <Container className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="stat-display"
              >
                <p className="stat-number text-4xl md:text-5xl">
                  {stat.value}
                </p>
                <p className="text-slate-700 dark:text-slate-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* Story Section - Enhanced */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-10 text-center">
              Our <span className="headline-underline text-gradient">Story</span>
            </h2>
            <div className="prose prose-lg prose-invert max-w-none space-y-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-700/90 dark:text-slate-200/90 leading-relaxed text-lg"
              >
                XGrowthOS was founded by <span className="text-emerald-pro-600 font-semibold">Marcos Matthews</span> in Los Angeles, CA. After observing that SDRs spend 65% of their time NOT selling—instead on prospecting, data entry, and admin—he knew there had to be a better way.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-700/90 dark:text-slate-200/90 leading-relaxed text-lg"
              >
                The reality is clear: traditional cold outreach is broken. B2B companies pay <span className="text-energy-orange">$120K+ annually per SDR</span> while seeing only 5.1% average cold email reply rates. The result? Inconsistent pipeline, burnout, and turnover.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-slate-700/90 dark:text-slate-200/90 leading-relaxed text-lg"
              >
                XGrowthOS is the solution: an <span className="text-emerald-pro-500 font-semibold">autonomous B2B lead generation platform</span> powered by five AI engines that work 24/7. We&apos;re not just another agency—we&apos;re building an autonomous growth operating system that continuously learns and improves.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-slate-700/90 dark:text-slate-200/90 leading-relaxed text-lg"
              >
                Our mission is to make <span className="text-emerald-pro-400 font-semibold">enterprise-grade sales automation</span> accessible to every B2B company. Join our Founding Partner program and experience the future of autonomous lead generation.
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Values Section - Enhanced */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              Our <span className="headline-underline text-gradient">Values</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700/90 dark:text-slate-200/90 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="feature-grid-item group"
              >
                {/* Accent line based on color */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                  value.color === 'cyan' ? 'bg-emerald-pro-600' :
                  value.color === 'violet' ? 'bg-emerald-pro-500' :
                  value.color === 'mint' ? 'bg-emerald-pro-400' :
                  'bg-energy-orange'
                }`} />

                <div className={`icon-container-animated ${value.color} mb-6`}>
                  <value.icon className={`h-6 w-6 ${
                    value.color === 'cyan' ? 'text-emerald-pro-600' :
                    value.color === 'violet' ? 'text-emerald-pro-500' :
                    value.color === 'mint' ? 'text-emerald-pro-400' :
                    'text-energy-orange'
                  }`} />
                </div>
                <h3 className={`text-xl lg:text-2xl font-sora font-semibold text-slate-900 dark:text-white mb-3 group-hover:${
                  value.color === 'cyan' ? 'text-emerald-pro-600' :
                  value.color === 'violet' ? 'text-emerald-pro-500' :
                  value.color === 'mint' ? 'text-emerald-pro-400' :
                  'text-energy-orange'
                } transition-colors`}>
                  {value.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Team CTA - Enhanced */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="holographic-card p-10 lg:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="icon-container-animated violet mx-auto mb-8"
            >
              <Users className="h-8 w-8 text-emerald-pro-500" />
            </motion.div>
            <h3 className="text-2xl lg:text-3xl font-sora font-bold text-slate-900 dark:text-white mb-4">
              Join Our Team
            </h3>
            <p className="text-slate-700 dark:text-slate-200 text-lg mb-8 max-w-md mx-auto">
              We&apos;re always looking for talented people who share our passion for innovation and results.
            </p>
            <Link href="/careers">
              <button className="cta-magnetic">
                View Open Positions
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </motion.div>
        </Container>
      </SectionWrapper>

      <CTABanner />
    </>
  );
}
