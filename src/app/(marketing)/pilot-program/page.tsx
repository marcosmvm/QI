"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Rocket,
  Shield,
  BarChart3,
  Users,
  Zap,
  Clock,
  Star,
  CheckCircle,
  Loader2,
  Mail,
  Building2,
  Globe,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { Button } from "@/components/ui/button";

const pilotBenefits = [
  {
    icon: Zap,
    title: "Reduced Investment",
    description:
      "Start with a lower monthly commitment while you evaluate our platform and results.",
  },
  {
    icon: Shield,
    title: "Priority Support",
    description:
      "Dedicated onboarding specialist and direct Slack channel access during your pilot.",
  },
  {
    icon: BarChart3,
    title: "Full Analytics Access",
    description:
      "Complete visibility into campaign performance, deliverability, and lead quality metrics.",
  },
  {
    icon: Users,
    title: "Strategic Guidance",
    description:
      "Weekly optimization calls with our team to maximize your pilot results.",
  },
];

const pilotSteps = [
  {
    step: 1,
    title: "Apply",
    description: "Fill out the application form with your company details and goals.",
  },
  {
    step: 2,
    title: "Discovery Call",
    description: "30-minute call to understand your ICP, value proposition, and success criteria.",
  },
  {
    step: 3,
    title: "Campaign Launch",
    description: "We build and launch your first AI-powered campaign within 5 business days.",
  },
  {
    step: 4,
    title: "Optimize & Decide",
    description: "Review results together and decide if full partnership is right for you.",
  },
];

const pilotRequirements = [
  "B2B company with a defined target market",
  "Minimum $5,000 average deal size",
  "Ready to dedicate resources to follow up on leads",
  "Clear value proposition for your target audience",
  "Willingness to provide feedback during the pilot",
];

const pilotFaqs = [
  {
    question: "How long is the pilot program?",
    answer:
      "The standard pilot runs for 60 days, giving us enough time to build momentum and generate meaningful results. Most clients see qualified leads within the first 2-3 weeks.",
  },
  {
    question: "What's included in the pilot?",
    answer:
      "You'll receive one full campaign with up to 5,000 emails, access to all 5 AI engines, weekly optimization calls, and a dedicated Slack channel. We also provide detailed analytics and a performance review at the end.",
  },
  {
    question: "What happens after the pilot?",
    answer:
      "If you're happy with results, you can transition to a full subscription plan. We'll apply any pilot fees as a credit toward your first month. If it's not the right fit, there's no obligation to continue.",
  },
  {
    question: "How is the pilot different from regular plans?",
    answer:
      "The pilot is designed for evaluation with reduced investment and more hands-on support. You get the same powerful technology, but with more frequent check-ins and a focus on proving ROI before committing long-term.",
  },
  {
    question: "Can I upgrade during the pilot?",
    answer:
      "Absolutely! If you're seeing great results and want to scale up, we can transition you to a full plan at any time. Many clients upgrade before the pilot ends.",
  },
];

export default function PilotProgramPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    monthlyVolume: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-mint/10 rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-quantum-violet/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="tech-badge mb-8 inline-flex">
              <Rocket className="w-4 h-4 text-neon-mint" />
              <span className="text-sm font-medium text-neon-mint">
                Limited Spots Available
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              Experience the Future of{" "}
              <span className="headline-underline gradient-text-cyan-violet">
                Cold Outreach
              </span>
            </h1>

            <p className="text-xl text-steel max-w-2xl mx-auto mb-8">
              Join our 60-day pilot program and see firsthand how AI-powered campaigns
              can transform your pipeline. Limited spots available each month.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#apply">
                <button className="cta-magnetic">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-electric-cyan/30 hover:border-electric-cyan/60 text-white hover:text-electric-cyan bg-electric-cyan/5 hover:bg-electric-cyan/10 px-8 py-6 text-lg transition-all backdrop-blur-sm"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Benefits Section */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
              What You Get in the{" "}
              <span className="headline-underline gradient-text-cyan-violet">
                Pilot Program
              </span>
            </h2>
            <p className="text-steel">
              Everything you need to evaluate our platform and generate real results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pilotBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl border border-graphite bg-midnight-blue/50 hover:border-electric-cyan/30 transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-electric-cyan" />
                </div>
                <h3 className="text-lg font-sora font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-steel text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper variant="dark" id="how-it-works">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
              How the Pilot{" "}
              <span className="headline-underline gradient-text-cyan-violet">
                Works
              </span>
            </h2>
            <p className="text-steel">
              A simple, transparent process to evaluate our platform.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {pilotSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="h-14 w-14 rounded-full bg-electric-cyan/10 border-2 border-electric-cyan flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-sora font-bold text-electric-cyan">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-sora font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-steel text-sm">{step.description}</p>
                  </div>
                  {index < pilotSteps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-gradient-to-r from-electric-cyan to-transparent -translate-x-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Requirements */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-3xl border border-graphite bg-midnight-blue/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-quantum-violet/10 border border-quantum-violet/30 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-quantum-violet" />
              </div>
              <h2 className="text-2xl font-sora font-bold text-white">
                Who Qualifies?
              </h2>
            </div>

            <p className="text-steel mb-6">
              The pilot program is designed for B2B companies ready to scale their
              outbound efforts. Here&apos;s what we look for:
            </p>

            <ul className="space-y-3">
              {pilotRequirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-neon-mint flex-shrink-0 mt-0.5" />
                  <span className="text-silver">{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Application Form */}
      <SectionWrapper variant="dark" id="apply">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
              Apply for the{" "}
              <span className="headline-underline gradient-text-cyan-violet">
                Pilot Program
              </span>
            </h2>
            <p className="text-steel">
              Fill out the form below and we&apos;ll be in touch within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-3xl border border-graphite bg-midnight-blue/50"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-neon-mint/10 border border-neon-mint/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-neon-mint" />
                </div>
                <h3 className="text-xl font-sora font-semibold text-white mb-2">
                  Application Received!
                </h3>
                <p className="text-steel max-w-md mx-auto">
                  Thanks for your interest in the pilot program. Our team will review
                  your application and reach out within 24 hours to schedule a
                  discovery call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-silver mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-silver mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Work Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-silver mb-2">
                      <Building2 className="inline h-4 w-4 mr-1" />
                      Company Name *
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      required
                      className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-silver mb-2">
                      <Globe className="inline h-4 w-4 mr-1" />
                      Website
                    </label>
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                      className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-silver mb-2">
                    Current Monthly Email Volume
                  </label>
                  <select
                    name="monthlyVolume"
                    value={formData.monthlyVolume}
                    onChange={handleChange}
                    className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                  >
                    <option value="">Select volume</option>
                    <option value="0">Not currently doing outbound</option>
                    <option value="1-1000">1 - 1,000 emails/month</option>
                    <option value="1000-5000">1,000 - 5,000 emails/month</option>
                    <option value="5000-10000">5,000 - 10,000 emails/month</option>
                    <option value="10000+">10,000+ emails/month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-silver mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Tell us about your goals
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What are you hoping to achieve with outbound? Who is your ideal customer?"
                    rows={4}
                    className="w-full rounded-lg border border-graphite bg-deep-space px-4 py-3 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.company}
                  className="cta-magnetic w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
              Pilot Program{" "}
              <span className="headline-underline gradient-text-cyan-violet">
                FAQ
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Accordion.Root type="single" collapsible className="space-y-4">
              {pilotFaqs.map((faq, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className="group rounded-xl border border-graphite bg-midnight-blue/50 overflow-hidden data-[state=open]:border-electric-cyan/30 transition-colors"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-5 text-left">
                      <span className="text-white font-medium pr-4">
                        {faq.question}
                      </span>
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
      </SectionWrapper>

      {/* Social Proof */}
      <SectionWrapper variant="dark">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center p-8 rounded-3xl border border-graphite bg-midnight-blue/50"
          >
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-neon-mint fill-neon-mint"
                />
              ))}
            </div>
            <blockquote className="text-xl text-white font-medium mb-4">
              &ldquo;The pilot program gave us the confidence to invest in
              XGrowthOS. We generated 47 qualified leads in the first
              month alone.&rdquo;
            </blockquote>
            <p className="text-steel">
              — Sarah Chen, VP of Sales at TechFlow Inc.
            </p>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-midnight-blue to-deep-space" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-cyan/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-quantum-violet/10 rounded-full blur-[150px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <Clock className="h-12 w-12 text-electric-cyan mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
              Limited Spots Available
            </h2>
            <p className="text-steel mb-8">
              We only accept a limited number of pilot clients each month to ensure
              everyone gets the attention they deserve. Apply now to secure your spot.
            </p>
            <Link href="#apply">
              <button className="cta-magnetic">
                Apply for Pilot Program
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
