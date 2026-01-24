"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";

export default function TermsOfUsePage() {
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
              <FileText className="w-4 h-4 text-emerald-pro-600" />
              <span className="text-sm font-medium text-emerald-pro-600">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-sora font-bold text-light-text dark:text-white mb-6">
              <span className="gradient-text-cyan-violet headline-underline">Terms of Use</span>
            </h1>
            <p className="text-light-text-secondary dark:text-silver">
              Last updated: January 2026
            </p>
          </motion.div>
        </Container>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      <SectionWrapper variant="default">
        <Container size="md">
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              By accessing or using XGrowthOS&apos; services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">2. Description of Services</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              XGrowthOS provides autonomous B2B lead generation services powered by five AI engines: The Guardian (compliance), The Architect (campaign design), The Scientist (optimization), The Hunter (lead expansion), and The Sentinel (visitor intelligence). Services include campaign development, compliance monitoring, lead qualification, CRM integration, and performance reporting.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">3. User Responsibilities</h2>
            <p className="text-light-text-secondary dark:text-silver mb-4">You agree to:</p>
            <ul className="text-light-text-secondary dark:text-silver mb-6 list-disc pl-6 space-y-2">
              <li>Provide accurate information for campaign targeting</li>
              <li>Use our services in compliance with all applicable laws</li>
              <li>Not use our services for spam or illegal purposes</li>
              <li>Maintain the confidentiality of your account credentials</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">4. Intellectual Property</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              All content, trademarks, and technology used in our services remain the property of XGrowthOS. You may not copy, modify, or distribute our proprietary materials without written consent.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">5. Payment Terms</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              Payment terms are specified in your service agreement. All fees are non-refundable except as expressly stated in your agreement or required by law.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              XGrowthOS is not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability shall not exceed the fees paid by you in the preceding 12 months.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">7. Termination</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              Either party may terminate services according to the terms of your service agreement. Upon termination, you will lose access to our platform and any data stored therein.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">8. Changes to Terms</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">9. Contact</h2>
            <p className="text-light-text-secondary dark:text-silver">
              For questions about these terms, contact us at legal@xgrowthos.com
            </p>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
