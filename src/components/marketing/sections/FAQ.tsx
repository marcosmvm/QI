"use client";

import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";

const faqs = [
  {
    question: "How is Quantum Insights different from other lead gen agencies?",
    answer: "We're AI-first. While others rely on manual processes, our 5 specialized AI engines work 24/7 to optimize every aspect of your outbound campaigns. This means higher deliverability, better personalization, and more meetings—all with full transparency into our process.",
  },
  {
    question: "What industries do you work with?",
    answer: "We specialize in B2B companies across SaaS, professional services, fintech, healthcare tech, manufacturing, and more. Our AI adapts to any industry's unique terminology and buying cycles.",
  },
  {
    question: "How long until I see results?",
    answer: "Most clients see their first qualified meetings within 2-3 weeks of campaign launch. However, we spend the first 1-2 weeks on proper setup, ICP research, and domain warming to ensure long-term success.",
  },
  {
    question: "Do you guarantee results?",
    answer: "Yes. We offer a pilot program with guaranteed minimum deliverables. If we don't hit the agreed-upon meeting targets, you don't pay for our services—only the infrastructure costs.",
  },
  {
    question: "What's included in your service?",
    answer: "Everything. ICP research, list building, email infrastructure setup, copywriting, campaign management, A/B testing, deliverability monitoring, and detailed reporting. We handle the entire outbound process end-to-end.",
  },
  {
    question: "How do you ensure emails don't go to spam?",
    answer: "Our Guardian Engine monitors domain health 24/7, manages sending volumes intelligently, rotates domains automatically, and keeps you compliant with all regulations. We maintain 95%+ deliverability rates across all campaigns.",
  },
  {
    question: "Can I see what emails are being sent on my behalf?",
    answer: "Absolutely. You have full visibility into every email, every response, and every metric through your client dashboard. We believe in complete transparency.",
  },
  {
    question: "What CRM integrations do you support?",
    answer: "We integrate with Salesforce, HubSpot, Pipedrive, and most major CRMs. Meetings and qualified leads flow directly into your existing workflow.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-deep-space">
      <Container size="md">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-electric-cyan to-quantum-violet bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-steel">
            Everything you need to know about working with Quantum Insights.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="group rounded-xl border border-graphite bg-midnight-blue/50 overflow-hidden data-[state=open]:border-electric-cyan/30 transition-colors"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-5 text-left">
                    <span className="text-white font-medium pr-4">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 text-electric-cyan shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-6 pb-5 text-steel leading-relaxed">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </Container>
    </section>
  );
}
