"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/layout/Container";

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export function CTABanner({
  title = "Ready to Transform Your Outbound?",
  description = "Book a strategy call with our team to see how XGrowthOS can fill your pipeline with qualified meetings.",
  primaryCTA = { text: "Book a Strategy Call", href: "/contact" },
  secondaryCTA = { text: "View Pricing", href: "/pricing" },
}: CTABannerProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Enhanced Ambient Orbs - More Prominent */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.25) 0%, rgba(0, 212, 255, 0) 70%)' }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(123, 97, 255, 0.25) 0%, rgba(123, 97, 255, 0) 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(0, 255, 178, 0.1) 0%, rgba(0, 255, 178, 0) 70%)' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Glass Panel Background - Enhanced */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-blue/50 via-midnight-blue/30 to-midnight-blue/50 backdrop-blur-sm" />

      {/* Border Lines - Enhanced with Animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.5) 20%, rgba(123, 97, 255, 0.5) 50%, rgba(0, 212, 255, 0.5) 80%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(123, 97, 255, 0.5) 20%, rgba(0, 212, 255, 0.5) 50%, rgba(123, 97, 255, 0.5) 80%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-pro-600 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: '50%',
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon - Enhanced */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
            className="icon-container-animated mx-auto mb-10"
          >
            <Calendar className="w-8 h-8 text-emerald-pro-600" />
          </motion.div>

          {/* Headline - Enhanced */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sora font-bold text-light-text dark:text-white mb-8"
          >
            {title}
          </motion.h2>

          {/* Description - Enhanced */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-silver/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* CTAs - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link href={primaryCTA.href}>
              <button className="cta-magnetic group">
                {primaryCTA.text}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href={secondaryCTA.href}>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-pro-600/30 hover:border-emerald-pro-600/60 text-light-text dark:text-white hover:text-emerald-pro-600 bg-emerald-pro-600/5 hover:bg-emerald-pro-600/10 px-8 py-6 text-lg transition-all backdrop-blur-sm"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {secondaryCTA.text}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
