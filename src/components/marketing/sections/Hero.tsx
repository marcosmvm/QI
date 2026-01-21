"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/layout/Container";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-deep-space">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-cyan/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-quantum-violet/8 rounded-full blur-[120px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-electric-cyan" />
            <span className="text-sm font-medium text-electric-cyan">AI-Powered Lead Generation</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-sora font-bold text-white leading-tight mb-6"
          >
            Book More Meetings{" "}
            <span className="bg-gradient-to-r from-electric-cyan to-quantum-violet bg-clip-text text-transparent">
              On Autopilot
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-silver/80 max-w-2xl mx-auto mb-10"
          >
            Our 5 AI engines work 24/7 to find, engage, and convert your ideal prospects into qualified sales meetings.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-electric-cyan hover:bg-electric-cyan/90 text-deep-space font-semibold px-8 py-6 text-lg shadow-lg shadow-electric-cyan/20 hover:shadow-electric-cyan/30 transition-all"
              >
                Book a Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button
                variant="outline"
                size="lg"
                className="border-graphite hover:border-electric-cyan/50 text-white hover:text-electric-cyan bg-transparent hover:bg-electric-cyan/5 px-8 py-6 text-lg transition-all"
              >
                <Play className="mr-2 h-5 w-5" />
                See Case Studies
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-graphite"
          >
            <p className="text-steel text-sm mb-6">Trusted by innovative B2B companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-30">
              {/* Placeholder for client logos */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 bg-steel rounded" />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
