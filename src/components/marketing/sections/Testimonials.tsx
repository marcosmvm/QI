"use client";

import { motion } from "framer-motion";
import { Quote, Rocket, Target, Shield, Award, MapPin, GraduationCap } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import Link from "next/link";

// Founder mission statement instead of fake testimonials
const founderMission = {
  quote: "I built XGrowthOS because I was tired of seeing B2B companies waste their best sales reps on cold outreach. Your closers should be closing, not prospecting. Our 11 AI engines do the heavy lifting so your team can focus on what they do best—building relationships and closing deals.",
  author: "Marcos Matthews",
  title: "Founder & CEO",
  location: "Los Angeles, CA",
  credential: "CSUN Entrepreneurship",
};

const commitments = [
  { icon: Shield, title: "Deliverability First", description: "99%+ inbox placement or we fix it, free" },
  { icon: Target, title: "Quality Over Quantity", description: "Qualified meetings, not just email volume" },
  { icon: Award, title: "Skin in the Game", description: "Performance-based pricing model" },
];

export function Testimonials() {
  return (
    <section className="py-24 relative bg-white dark:bg-slate-900/50">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 dark:via-slate-900/50 to-transparent" />

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-figtree dark:font-sora font-bold text-slate-900 dark:text-white mb-6">
            Meet the{" "}
            <span className="text-gradient">
              Founder
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Built by someone who understands your pipeline challenges.
          </p>
        </motion.div>

        {/* Founder Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-sm">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm">
                <Quote className="h-6 w-6 text-emerald-600 dark:text-green-400" />
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-slate-900 dark:text-white font-medium leading-relaxed mb-8 mt-4">
                &ldquo;{founderMission.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-sky-500 flex items-center justify-center text-white font-bold text-xl">
                    MM
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-lg">{founderMission.author}</p>
                    <p className="text-emerald-600 dark:text-green-400 text-sm font-medium">{founderMission.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-slate-500 dark:text-slate-400 text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {founderMission.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {founderMission.credential}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Our Commitments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <h3 className="text-center text-lg font-semibold text-slate-900 dark:text-white mb-8">Our Commitment to You</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {commitments.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-emerald-300 dark:hover:border-green-500/30 transition-colors text-center shadow-sm"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-emerald-100 dark:bg-green-500/10 border border-emerald-200 dark:border-green-500/20">
                      <item.icon className="h-6 w-6 text-emerald-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Founding Partner CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-green-500/10 border border-emerald-200 dark:border-green-500/30 text-emerald-700 dark:text-green-400 text-sm font-medium mb-4">
              <Rocket className="h-4 w-4" />
              Limited Founding Partner Spots Available
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              Join our founding partner program and lock in exclusive rates while helping shape the future of B2B outreach automation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-500 text-white font-semibold hover:from-emerald-700 hover:to-sky-600 hover:shadow-glow-green hover:-translate-y-0.5 transition-all"
            >
              Become a Founding Partner
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
