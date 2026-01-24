"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-4 h-4 text-emerald-pro-600" />
              <span className="text-sm font-medium text-emerald-pro-600">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-sora font-bold text-light-text dark:text-white mb-6">
              <span className="gradient-text-cyan-violet headline-underline">Privacy Policy</span>
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
            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">1. Information We Collect</h2>
            <p className="text-light-text-secondary dark:text-silver mb-4">We collect information in several ways:</p>
            <ul className="text-light-text-secondary dark:text-silver mb-6 list-disc pl-6 space-y-2">
              <li><strong>Information you provide:</strong> Name, email, company, phone number when you contact us or use our services</li>
              <li><strong>Usage data:</strong> How you interact with our website and services</li>
              <li><strong>Campaign data:</strong> Information about prospects and campaign performance</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-light-text-secondary dark:text-silver mb-4">We use your information to:</p>
            <ul className="text-light-text-secondary dark:text-silver mb-6 list-disc pl-6 space-y-2">
              <li>Provide and improve our services</li>
              <li>Communicate with you about your account</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">3. Data Sharing</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              We do not sell your personal information. We may share data with service providers who help us operate our business, and when required by law.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">4. Data Security</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              We implement industry-standard security measures to protect your data, including encryption, access controls, and regular security audits.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">5. Your Rights</h2>
            <p className="text-light-text-secondary dark:text-silver mb-4">You have the right to:</p>
            <ul className="text-light-text-secondary dark:text-silver mb-6 list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">6. Cookies</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              We use cookies and similar technologies to improve your experience. See our Cookie Policy for more details.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">7. GDPR Compliance (EU)</h2>
            <p className="text-light-text-secondary dark:text-silver mb-4">For EU prospects and data subjects, we:</p>
            <ul className="text-light-text-secondary dark:text-silver mb-6 list-disc pl-6 space-y-2">
              <li>Verify legitimate interest basis for processing</li>
              <li>Include unsubscribe options in all emails</li>
              <li>Honor data subject requests within 72 hours</li>
              <li>Provide Data Processing Agreements upon request</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">8. CCPA Compliance (California)</h2>
            <p className="text-light-text-secondary dark:text-silver mb-4">For California residents, we:</p>
            <ul className="text-light-text-secondary dark:text-silver mb-6 list-disc pl-6 space-y-2">
              <li>Act as a &quot;service provider&quot; under CCPA</li>
              <li>Do not sell personal information</li>
              <li>Honor opt-out requests promptly</li>
              <li>Provide required disclosures about data collection</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">9. International Transfers</h2>
            <p className="text-light-text-secondary dark:text-silver mb-6">
              Your data may be transferred to and processed in the United States. We ensure appropriate safeguards are in place for such transfers, including Standard Contractual Clauses where required.
            </p>

            <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">10. Contact Us</h2>
            <p className="text-light-text-secondary dark:text-silver">
              For privacy-related inquiries, contact us at privacy@xgrowthos.com or support@xgrowthos.com
            </p>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
