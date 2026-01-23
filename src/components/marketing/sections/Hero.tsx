"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Target, Brain, Radar, Rocket, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/layout/Container";
import { useState } from "react";

// Capability-focused stats (not inflated metrics)
const heroStats = [
  { value: "5", label: "AI Engines", icon: Brain },
  { value: "24/7", label: "Automation", icon: Zap },
  { value: "99%", label: "Inbox Rate Target", icon: Shield },
  { value: "48h", label: "ICP to Inbox", icon: Target },
];

// Value propositions
const valueProps = [
  "Your closers close, not prospect",
  "Domain reputation protected",
  "Performance-based pricing",
];

export function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API call - in production, connect to email service
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="hero-enhanced relative min-h-[100vh] flex items-center overflow-hidden pt-20">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/30 to-midnight-blue/50" />

      {/* Hero-specific ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[200px] bg-[radial-gradient(circle,rgba(0,212,255,0.08)_0%,transparent_60%)]" />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-electric-cyan/20 rounded-lg"
          animate={{ rotate: 360, y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 border border-quantum-violet/20 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 border border-neon-mint/20"
          style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
          animate={{ rotate: 180, y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Founding Partner Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-violet/10 border border-quantum-violet/30 mb-8"
          >
            <Rocket className="w-4 h-4 text-quantum-violet" />
            <span className="text-sm font-medium text-quantum-violet">Now Accepting Founding Partners</span>
          </motion.div>

          {/* Main Headline - Updated per audit */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sora font-bold text-white leading-[1.1] mb-8">
              <span className="block">Book 3x More Meetings.</span>
              <span className="headline-underline gradient-text-cyan-violet block mt-2">
                Zero Spam Folders.
              </span>
            </h1>
          </motion.div>

          {/* Enhanced Subheadline - Updated per audit */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-silver/90 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Our <span className="text-electric-cyan font-semibold">5 proprietary AI engines</span> handle compliance, personalization, and optimization—so your cold emails actually get read.
          </motion.p>

          {/* Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {valueProps.map((prop, i) => (
              <div key={i} className="flex items-center gap-2 text-silver">
                <CheckCircle className="h-4 w-4 text-neon-mint" />
                <span className="text-sm">{prop}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons - Updated hierarchy per audit */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-8"
          >
            <Link href="/contact">
              <button className="cta-magnetic group">
                Book a Free Consultation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="border-electric-cyan/30 hover:border-electric-cyan/60 text-white hover:text-electric-cyan bg-electric-cyan/5 hover:bg-electric-cyan/10 px-8 py-6 text-lg transition-all backdrop-blur-sm"
              >
                See How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Lead Capture Form - New per audit recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md mx-auto mb-16"
          >
            {!isSubmitted ? (
              <form onSubmit={handleLeadCapture} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for a free guide"
                  className="flex-1 px-4 py-3 rounded-lg bg-midnight-blue/60 border border-graphite/50 text-white placeholder:text-steel focus:outline-none focus:border-electric-cyan/50 text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 bg-quantum-violet hover:bg-quantum-violet/80 text-white font-medium rounded-lg transition-colors text-sm whitespace-nowrap disabled:opacity-50"
                >
                  {isSubmitting ? "..." : "Get Guide"}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-neon-mint">
                <CheckCircle className="h-5 w-5" />
                <span>Check your inbox for the B2B Cold Email Playbook!</span>
              </div>
            )}
            <p className="text-steel text-xs mt-2">Get our free B2B Cold Email Playbook. No spam, unsubscribe anytime.</p>
          </motion.div>

          {/* Hero Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16"
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="stat-display group"
              >
                <stat.icon className="w-6 h-6 text-electric-cyan mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="stat-number text-2xl md:text-3xl">{stat.value}</div>
                <div className="text-steel text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators - Replaced fake logos with text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="pt-8 border-t border-electric-cyan/10"
          >
            <p className="text-steel text-sm mb-4">Built for B2B companies in</p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {["SaaS", "B2B Tech", "Healthcare", "Finance", "Professional Services"].map((industry) => (
                <motion.span
                  key={industry}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-2 text-sm text-steel bg-midnight-blue/40 rounded-lg border border-graphite/30"
                >
                  {industry}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-space to-transparent pointer-events-none" />
    </section>
  );
}
