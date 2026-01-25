"use client";

import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";

const faqs = [
  {
    question: "What is XGrowthOS?",
    answer: "XGrowthOS is an autonomous B2B lead generation platform powered by five specialized AI engines. We handle end-to-end cold email outreach to book qualified meetings with your ideal customers, operating 24/7 with continuous optimization.",
  },
  {
    question: "How is XGrowthOS different from other agencies?",
    answer: "Traditional agencies use manual processes with reactive optimization and generic templates. XGrowthOS features five AI engines working autonomously with proactive Mon/Wed optimization cycles, a self-learning Master Library, real-time compliance protection, automatic lead expansion from positive replies, and website visitor intelligence.",
  },
  {
    question: "How long until my campaigns launch?",
    answer: "Typical timeline: Days 1-3 for discovery questionnaire and kickoff call, Days 4-7 for campaign copy development, Days 7-10 for domain warmup and copy approval, Days 10-14 for first campaigns to launch. First meetings are typically booked in weeks 3-4.",
  },
  {
    question: "What results can I expect?",
    answer: "Our targets vs industry benchmarks: 40%+ open rate (vs 27.7% industry avg), 8%+ reply rate (vs 5.1% avg), 2%+ meeting book rate (vs 1% avg). Typical pilot results include 10-30 qualified meetings per 90-day pilot with positive ROI within 60-90 days.",
  },
  {
    question: "What's included in the monthly fee?",
    answer: "The $2,000/month retainer includes unlimited campaign management, all five AI engines active, dedicated sending infrastructure, daily monitoring and optimization, weekly performance reports, bi-weekly strategy calls, real-time Slack/Telegram support, and dashboard access.",
  },
  {
    question: "How does the performance bonus work?",
    answer: "$250 per qualified meeting (Founding Partners), billed weekly. A qualified meeting must match your ICP, be confirmed and attended, and involve a decision-maker or influencer.",
  },
  {
    question: "How do you ensure deliverability?",
    answer: "We use dedicated sending domains (not shared), proper warmup protocols (2-4 weeks), SPF/DKIM/DMARC authentication, real-time bounce monitoring, spam complaint tracking (<0.1% threshold), daily blacklist monitoring, volume pacing (50 emails/domain/day max), and Gmail/Yahoo 2024-2025 compliance.",
  },
  {
    question: "What if we're not happy with results?",
    answer: "Performance Guarantee: If reply rate stays below 3% for 30+ consecutive days despite optimization efforts, you can request a strategy pivot, terminate with 15 days notice, or receive a pro-rated refund of unused retainer.",
  },
  {
    question: "What CRM integrations do you support?",
    answer: "We integrate with Salesforce, HubSpot, Pipedrive, Zoho CRM, Close.io, Monday.com CRM, and custom integrations are available.",
  },
  {
    question: "Is XGrowthOS GDPR/CCPA compliant?",
    answer: "Yes. For EU prospects, we verify legitimate interest basis, include unsubscribe in all emails, and honor data subject requests within 72 hours. For California prospects, we act as a 'service provider' under CCPA, don't sell personal information, and honor opt-out requests.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function FAQ() {
  return (
    <section className="py-24 relative">
      <Container size="md">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked{" "}
            <span className="text-gradient">
              Questions
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-200">
            Everything you need to know about working with XGrowthOS.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Accordion.Item
                  value={`item-${index}`}
                  className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden data-[state=open]:border-emerald-300 dark:data-[state=open]:border-green-500/30 data-[state=open]:shadow-sm hover:border-emerald-200 dark:hover:border-slate-600 transition-all duration-300"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-5 text-left">
                      <span className="text-slate-900 dark:text-white font-medium pr-4 group-hover:text-emerald-600 dark:group-hover:text-green-400 transition-colors">{faq.question}</span>
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 dark:bg-green-500/10 border border-emerald-200 dark:border-green-500/20 flex items-center justify-center group-data-[state=open]:bg-emerald-200 dark:group-data-[state=open]:bg-green-500/20 transition-all duration-300">
                        <ChevronDown className="h-4 w-4 text-emerald-600 dark:text-green-400 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-6 pb-5 text-slate-600 dark:text-slate-200 leading-relaxed">
                      {faq.answer}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>
      </Container>
    </section>
  );
}
