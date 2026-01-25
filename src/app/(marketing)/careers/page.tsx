"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, Users, Zap } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";

const benefits = [
  "Competitive salary + equity",
  "Remote-first culture",
  "Unlimited PTO",
  "Health, dental, & vision",
  "Learning budget",
  "Latest tech equipment",
];

const openings = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "Account Executive",
    department: "Sales",
    location: "Los Angeles, CA / Remote",
    type: "Full-time",
  },
  {
    title: "SDR Manager",
    department: "Sales",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote (US)",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-pro-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-pro-600/15 rounded-full blur-[150px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="tech-badge mb-6">
              <Users className="w-4 h-4 text-emerald-pro-400" />
              <span className="text-sm font-medium text-emerald-pro-400">We&apos;re Hiring</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              Join the Team Building the{" "}
              <span className="text-gradient headline-underline">
                Future of Sales
              </span>
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
              We&apos;re looking for talented people who want to revolutionize B2B lead generation with AI.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Why Join Us */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                Why XGrowthOS?
              </h2>
              <p className="text-slate-700 dark:text-slate-200 mb-8 leading-relaxed">
                We&apos;re not just building another SaaS product—we&apos;re fundamentally changing how B2B companies grow. Join a team of passionate innovators working at the intersection of AI and sales.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-pro-600" />
                    <span className="text-slate-700 dark:text-slate-200 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl border border-emerald-pro-600/20 bg-gradient-to-br from-midnight-blue/50 to-deep-space/50"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-sora font-bold text-emerald-pro-600">5</p>
                  <p className="text-slate-700 dark:text-slate-400 text-sm">AI Engines</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-sora font-bold text-emerald-pro-500">LA</p>
                  <p className="text-slate-700 dark:text-slate-400 text-sm">Based</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-sora font-bold text-emerald-pro-400">2024</p>
                  <p className="text-slate-700 dark:text-slate-400 text-sm">Founded</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-sora font-bold text-energy-orange">Remote</p>
                  <p className="text-slate-700 dark:text-slate-400 text-sm">First</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Open Positions */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-slate-700 dark:text-slate-200">
              Find your next opportunity at XGrowthOS.
            </p>
          </motion.div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {openings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href="/contact" className="block group">
                  <div className="p-6 rounded-2xl border border-emerald-pro-600/20 bg-gradient-to-br from-midnight-blue/50 to-deep-space/50 hover:border-emerald-pro-600/40 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-sora font-semibold text-slate-900 dark:text-white group-hover:text-emerald-pro-600 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-slate-700 dark:text-slate-400 text-sm">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1 text-slate-700 dark:text-slate-400 text-sm">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-pro-600 group-hover:gap-3 transition-all">
                        Apply
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="Don't See the Right Role?"
        description="We're always looking for exceptional talent. Send us your resume and tell us how you can contribute."
        primaryCTA={{ text: "Send Your Resume", href: "/contact" }}
        secondaryCTA={{ text: "Learn About Us", href: "/about-us" }}
      />
    </>
  );
}
