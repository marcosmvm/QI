"use client";

import { motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";

export default function CookiePolicyPage() {
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
              <Cookie className="w-4 h-4 text-emerald-pro-600" />
              <span className="text-sm font-medium text-emerald-pro-600">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              <span className="text-gradient headline-underline">Cookie Policy</span>
            </h1>
            <p className="text-slate-700 dark:text-slate-200">
              Last updated: January 2024
            </p>
          </motion.div>
        </Container>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      <SectionWrapper variant="default">
        <Container size="md">
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-4">What Are Cookies</h2>
            <p className="text-slate-700 dark:text-slate-200 mb-6">
              Cookies are small text files stored on your device when you visit our website. They help us provide a better experience and understand how you use our services.
            </p>

            <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-4">Types of Cookies We Use</h2>

            <h3 className="text-xl font-sora font-semibold text-slate-900 dark:text-white mb-3">Essential Cookies</h3>
            <p className="text-slate-700 dark:text-slate-200 mb-4">
              Required for the website to function. These cannot be disabled.
            </p>

            <h3 className="text-xl font-sora font-semibold text-slate-900 dark:text-white mb-3">Analytics Cookies</h3>
            <p className="text-slate-700 dark:text-slate-200 mb-4">
              Help us understand how visitors interact with our website through tools like Google Analytics.
            </p>

            <h3 className="text-xl font-sora font-semibold text-slate-900 dark:text-white mb-3">Marketing Cookies</h3>
            <p className="text-slate-700 dark:text-slate-200 mb-6">
              Used to deliver relevant advertisements and track campaign performance.
            </p>

            <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-4">Managing Cookies</h2>
            <p className="text-slate-700 dark:text-slate-200 mb-6">
              You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
            </p>

            <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-4">Third-Party Cookies</h2>
            <p className="text-slate-700 dark:text-slate-200 mb-6">
              We use services from third parties that may set their own cookies. These include analytics providers and advertising partners.
            </p>

            <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-4">Contact</h2>
            <p className="text-slate-700 dark:text-slate-200">
              For questions about our cookie practices, contact privacy@xgrowthos.com
            </p>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
