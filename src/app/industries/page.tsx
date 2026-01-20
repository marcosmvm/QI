"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { industries } from "@/lib/content/industries";

// Color assignments for industry icons
const iconColors = [
  "bg-electric-cyan/20 text-electric-cyan",
  "bg-emerald-500/20 text-emerald-400",
  "bg-quantum-violet/20 text-quantum-violet",
  "bg-amber-500/20 text-amber-400",
  "bg-rose-500/20 text-rose-400",
  "bg-sky-500/20 text-sky-400",
  "bg-orange-500/20 text-orange-400",
  "bg-indigo-500/20 text-indigo-400",
  "bg-teal-500/20 text-teal-400",
  "bg-pink-500/20 text-pink-400",
  "bg-lime-500/20 text-lime-400",
  "bg-purple-500/20 text-purple-400",
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Section - Dark Theme */}
      <section className="relative py-32 lg:py-40 overflow-hidden bg-deep-space">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />

        {/* Subtle glow effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-electric-cyan/5 rounded-full blur-[150px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Industry Expertise Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8"
            >
              <Briefcase className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Industry Expertise</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sora font-bold text-white mb-6 leading-tight">
              Lead Generation for{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-quantum-violet bg-clip-text text-transparent">
                Every Industry
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-steel max-w-2xl mx-auto mb-10">
              Specialized strategies and messaging for your specific market. We&apos;ve
              helped companies across 12+ industries build predictable pipelines.
            </p>

            {/* CTA Button */}
            <Link href="#industries">
              <Button
                size="lg"
                className="bg-electric-cyan hover:bg-electric-cyan/90 text-deep-space font-semibold px-8 py-6 text-base"
              >
                Find Your Industry
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Industries Grid - Dark Theme */}
      <section id="industries" className="py-20 lg:py-28 bg-deep-space">
        {/* Divider line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-graphite to-transparent mb-20" />

        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const colorClass = iconColors[index % iconColors.length];
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/industries/${industry.id}`} className="block group h-full">
                    <div className="relative h-full p-6 rounded-2xl border border-graphite bg-midnight-blue/50 hover:border-electric-cyan/30 hover:bg-midnight-blue/80 transition-all duration-300">
                      {/* Colored Icon Container */}
                      <div className={`inline-flex p-3 rounded-xl ${colorClass} mb-5`}>
                        <Icon className="h-6 w-6" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-sora font-semibold text-white mb-2 group-hover:text-electric-cyan transition-colors">
                        {industry.name}
                      </h3>

                      {/* Description */}
                      <p className="text-steel text-sm leading-relaxed">
                        {industry.shortDescription}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Don't See Your Industry?"
        description="We've worked with companies across dozens of verticals. Let's discuss how we can help your specific market."
      />
    </>
  );
}
