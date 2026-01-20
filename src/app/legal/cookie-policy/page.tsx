"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";

export default function CookiePolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-sora font-bold text-white mb-6">
              Cookie Policy
            </h1>
            <p className="text-silver">
              Last updated: January 2024
            </p>
          </motion.div>
        </Container>
      </section>

      <SectionWrapper variant="default">
        <Container size="md">
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-2xl font-sora font-bold text-white mb-4">What Are Cookies</h2>
            <p className="text-silver mb-6">
              Cookies are small text files stored on your device when you visit our website. They help us provide a better experience and understand how you use our services.
            </p>

            <h2 className="text-2xl font-sora font-bold text-white mb-4">Types of Cookies We Use</h2>

            <h3 className="text-xl font-sora font-semibold text-white mb-3">Essential Cookies</h3>
            <p className="text-silver mb-4">
              Required for the website to function. These cannot be disabled.
            </p>

            <h3 className="text-xl font-sora font-semibold text-white mb-3">Analytics Cookies</h3>
            <p className="text-silver mb-4">
              Help us understand how visitors interact with our website through tools like Google Analytics.
            </p>

            <h3 className="text-xl font-sora font-semibold text-white mb-3">Marketing Cookies</h3>
            <p className="text-silver mb-6">
              Used to deliver relevant advertisements and track campaign performance.
            </p>

            <h2 className="text-2xl font-sora font-bold text-white mb-4">Managing Cookies</h2>
            <p className="text-silver mb-6">
              You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
            </p>

            <h2 className="text-2xl font-sora font-bold text-white mb-4">Third-Party Cookies</h2>
            <p className="text-silver mb-6">
              We use services from third parties that may set their own cookies. These include analytics providers and advertising partners.
            </p>

            <h2 className="text-2xl font-sora font-bold text-white mb-4">Contact</h2>
            <p className="text-silver">
              For questions about our cookie practices, contact privacy@quantuminsights.ai
            </p>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
