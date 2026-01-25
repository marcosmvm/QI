"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Zap, CircuitBoard } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { engines, getEngineById } from "@/lib/content/engines";

interface EngineDetailPageProps {
  engineId: string;
}

const colorClasses = {
  "emerald-pro-600": {
    bg: "bg-emerald-pro-600/10",
    border: "border-emerald-pro-600/30",
    text: "text-emerald-pro-600",
    gradient: "from-emerald-pro-600 to-cyan-dark",
    glow: "shadow-[0_0_60px_rgba(0,212,255,0.3)]",
    iconBg: "cyan",
  },
  "emerald-pro-500": {
    bg: "bg-emerald-pro-500/10",
    border: "border-emerald-pro-500/30",
    text: "text-emerald-pro-500",
    gradient: "from-emerald-pro-500 to-purple-600",
    glow: "shadow-[0_0_60px_rgba(123,97,255,0.3)]",
    iconBg: "violet",
  },
  "emerald-pro-400": {
    bg: "bg-emerald-pro-400/10",
    border: "border-emerald-pro-400/30",
    text: "text-emerald-pro-400",
    gradient: "from-emerald-pro-400 to-emerald-500",
    glow: "shadow-[0_0_60px_rgba(0,255,178,0.3)]",
    iconBg: "mint",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    text: "text-energy-orange",
    gradient: "from-energy-orange to-orange-600",
    glow: "shadow-[0_0_60px_rgba(255,107,53,0.3)]",
    iconBg: "orange",
  },
  "blue-500": {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
    gradient: "from-blue-500 to-blue-600",
    glow: "shadow-[0_0_60px_rgba(59,130,246,0.3)]",
    iconBg: "blue",
  },
  "purple-500": {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-500",
    gradient: "from-purple-500 to-purple-600",
    glow: "shadow-[0_0_60px_rgba(168,85,247,0.3)]",
    iconBg: "purple",
  },
};

export function EngineDetailPage({ engineId }: EngineDetailPageProps) {
  const engine = getEngineById(engineId);

  if (!engine) {
    return <div>Engine not found</div>;
  }

  const currentIndex = engines.findIndex((e) => e.id === engineId);
  const prevEngine = currentIndex > 0 ? { id: engines[currentIndex - 1].id, name: engines[currentIndex - 1].name } : null;
  const nextEngine = currentIndex < engines.length - 1 ? { id: engines[currentIndex + 1].id, name: engines[currentIndex + 1].name } : null;

  const colors = colorClasses[engine.color];
  const Icon = engine.icon;

  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-midnight-blue/30" />

        {/* Enhanced ambient orbs */}
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] ${colors.bg} rounded-full blur-[150px] animate-orb-float`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] ${colors.bg} rounded-full blur-[130px] animate-orb-float-reverse opacity-60`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-pro-500/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <Link
              href="/engines"
              className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Engines
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tech Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="tech-badge mb-8"
              >
                <Icon className={`w-4 h-4 ${colors.text}`} />
                <span className={`text-sm font-medium ${colors.text}`}>Engine {engine.codename}</span>
                <CircuitBoard className={`w-4 h-4 ${colors.text}`} />
              </motion.div>

              <div className="flex items-center gap-4 mb-6">
                <div className={`icon-container-animated ${colors.iconBg}`}>
                  <Icon className={`h-10 w-10 ${colors.text}`} />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-slate-900 dark:text-white">
                    <span className={`headline-underline ${colors.text}`}>
                      {engine.name}
                    </span>
                  </h1>
                </div>
              </div>

              <p className={`text-xl md:text-2xl ${colors.text} font-medium mb-4`}>
                {engine.tagline}
              </p>

              <p className="text-lg md:text-xl text-slate-700/90 dark:text-slate-200/90 mb-10 leading-relaxed">
                {engine.longDescription}
              </p>

              <Link href="/contact">
                <button className="cta-magnetic group">
                  See It in Action
                  <Zap className="h-5 w-5 group-hover:animate-pulse" />
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-4">
                {engine.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`holographic-card p-6 rounded-2xl text-center`}
                  >
                    <p className={`text-4xl font-sora font-bold ${colors.text}`}>
                      {stat.value}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Features Section - Enhanced */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              Key{" "}
              <span className={`headline-underline ${colors.text}`}>Features</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed">
              Everything {engine.name} does to <span className={colors.text}>optimize</span> your outbound campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {engine.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="feature-grid-item group"
              >
                {/* Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                  colors.iconBg === 'cyan' ? 'bg-emerald-pro-600' :
                  colors.iconBg === 'violet' ? 'bg-emerald-pro-500' :
                  colors.iconBg === 'mint' ? 'bg-emerald-pro-400' : 'bg-energy-orange'
                }`} />

                <h3 className={`text-lg font-sora font-semibold text-slate-900 dark:text-white mb-2 group-hover:${colors.text} transition-colors`}>
                  {feature.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Use Cases Section - Enhanced */}
      <SectionWrapper variant="dark">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                Perfect{" "}
                <span className={`headline-underline ${colors.text}`}>For</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-8 leading-relaxed">
                {engine.name} is ideal for teams who need to:
              </p>

              <ul className="space-y-4">
                {engine.useCases.map((useCase, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3 group"
                  >
                    <CheckCircle className={`h-6 w-6 ${colors.text} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                    <span className="text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white/90 transition-colors">{useCase}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="holographic-card p-8 rounded-3xl"
            >
              <div className={`icon-container-animated ${colors.iconBg} mb-6`}>
                <Icon className={`h-12 w-12 ${colors.text}`} />
              </div>
              <h3 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-4">
                Ready to deploy {engine.name}?
              </h3>
              <p className="text-slate-700 dark:text-slate-200 mb-6 leading-relaxed">
                Our team will set up and configure {engine.name} specifically for your use case. See results in <span className={colors.text}>weeks, not months</span>.
              </p>
              <Link href="/contact">
                <button className="cta-magnetic group w-full justify-center">
                  Get Started
                  <Zap className="h-5 w-5 group-hover:animate-pulse" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Navigation Between Engines - Enhanced */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            {prevEngine ? (
              <Link
                href={`/engines/${prevEngine.id}`}
                className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group p-4 rounded-xl hover:bg-light-bg-secondary dark:bg-midnight-blue/30"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>
                  <span className="text-sm block text-slate-500 dark:text-slate-400/70">Previous</span>
                  <span className="font-semibold">{prevEngine.name}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/engines"
              className="text-emerald-pro-600 hover:text-cyan-light transition-colors font-medium px-6 py-3 rounded-xl border border-emerald-pro-600/20 hover:border-emerald-pro-600/40 hover:bg-emerald-pro-600/5"
            >
              View All Engines
            </Link>

            {nextEngine ? (
              <Link
                href={`/engines/${nextEngine.id}`}
                className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group text-right p-4 rounded-xl hover:bg-light-bg-secondary dark:bg-midnight-blue/30"
              >
                <span>
                  <span className="text-sm block text-slate-500 dark:text-slate-400/70">Next</span>
                  <span className="font-semibold">{nextEngine.name}</span>
                </span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        </Container>
      </SectionWrapper>

      <CTABanner />
    </>
  );
}
