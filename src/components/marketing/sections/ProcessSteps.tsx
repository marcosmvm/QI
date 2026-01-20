"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Send, MessageSquare, CalendarCheck } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & ICP Definition",
    description: "We analyze your best customers to create a precise Ideal Customer Profile, then build targeted lists using AI-powered research.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Campaign Architecture",
    description: "Our Architect Engine crafts personalized multi-channel sequences that resonate with your target audience.",
  },
  {
    number: "03",
    icon: Send,
    title: "Compliant Outreach",
    description: "Guardian Engine ensures maximum deliverability while our systems send thousands of personalized emails daily.",
  },
  {
    number: "04",
    icon: MessageSquare,
    title: "Intelligent Follow-up",
    description: "Scientist Engine optimizes timing and messaging based on engagement data, while Hunter expands successful leads.",
  },
  {
    number: "05",
    icon: CalendarCheck,
    title: "Meeting Delivery",
    description: "Qualified prospects are handed off directly to your calendar, ready for your sales team to close.",
  },
];

export function ProcessSteps() {
  return (
    <SectionWrapper variant="dark">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 mb-6">
            How It{" "}
            <span className="text-electric-cyan">
              Works
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Our proven 5-step process transforms cold outreach into a predictable meeting machine.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 md:gap-8"
              >
                {/* Step Number */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                    <step.icon className="h-7 w-7 text-electric-cyan" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-electric-cyan font-mono text-sm">{step.number}</span>
                    <h3 className="text-xl md:text-2xl font-sora font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
