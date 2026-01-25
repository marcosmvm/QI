"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Calendar, ArrowRight, Zap } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/lib/content/navigation";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    source: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-midnight-blue/30" />

        {/* Enhanced ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-pro-600/15 rounded-full blur-[150px] animate-orb-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-pro-500/12 rounded-full blur-[130px] animate-orb-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-pro-400/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="tech-badge mb-8"
            >
              <Calendar className="w-4 h-4 text-emerald-pro-600" />
              <span className="text-sm font-medium text-emerald-pro-600">Let&apos;s Talk</span>
              <Zap className="w-4 h-4 text-emerald-pro-600" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold text-light-text dark:text-white mb-8">
              Start Your{" "}
              <span className="headline-underline gradient-text-cyan-violet block mt-2">
                Growth Journey
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-light-text-secondary/90 dark:text-silver/90 max-w-3xl mx-auto leading-relaxed">
              Book a strategy call with our team to discuss how we can help fill your pipeline with <span className="text-emerald-pro-600 font-semibold">qualified meetings</span>.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Contact Section */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-light-text-muted dark:text-steel mb-8">
                Have questions? Want to learn more about how we can help your business grow? Reach out and we&apos;ll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="icon-container-animated cyan">
                    <Mail className="h-5 w-5 text-emerald-pro-600" />
                  </div>
                  <div>
                    <p className="text-light-text dark:text-white font-medium">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-emerald-pro-600 hover:text-cyan-light transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="icon-container-animated violet">
                    <Phone className="h-5 w-5 text-emerald-pro-500" />
                  </div>
                  <div>
                    <p className="text-light-text dark:text-white font-medium">Phone</p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-emerald-pro-500 hover:text-violet-light transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="icon-container-animated mint">
                    <MapPin className="h-5 w-5 text-emerald-pro-400" />
                  </div>
                  <div>
                    <p className="text-light-text dark:text-white font-medium">Location</p>
                    <p className="text-light-text-muted dark:text-steel">{contactInfo.address}</p>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="mt-12 feature-grid-item">
                <h3 className="text-lg font-sora font-semibold text-light-text dark:text-white mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3 text-light-text-muted dark:text-steel text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-emerald-pro-600 flex-shrink-0 mt-0.5" />
                    60-minute discovery call within 3 business days
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-emerald-pro-500 flex-shrink-0 mt-0.5" />
                    ICP definition and targeting strategy discussion
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-emerald-pro-400 flex-shrink-0 mt-0.5" />
                    Overview of all 11 AI engines and how they work
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-energy-orange flex-shrink-0 mt-0.5" />
                    Founding Partner pricing (locked for life)
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3"
            >
              <div className="p-8 rounded-3xl border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-pro-600/10 border border-emerald-pro-600/30 mb-6">
                      <Send className="h-8 w-8 text-emerald-pro-600" />
                    </div>
                    <h3 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-4">
                      Thanks for reaching out!
                    </h3>
                    <p className="text-light-text-muted dark:text-steel max-w-md mx-auto">
                      We&apos;ve received your message and will get back to you within 24 hours. In the meantime, feel free to explore our case studies.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-light-text dark:text-white mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formState.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-deep-space border border-border-default dark:border-graphite text-light-text dark:text-white placeholder-steel focus:border-emerald-pro-600 focus:ring-1 focus:ring-emerald-pro-600 transition-all outline-none"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-light-text dark:text-white mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formState.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-deep-space border border-border-default dark:border-graphite text-light-text dark:text-white placeholder-steel focus:border-emerald-pro-600 focus:ring-1 focus:ring-emerald-pro-600 transition-all outline-none"
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-white mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-deep-space border border-border-default dark:border-graphite text-light-text dark:text-white placeholder-steel focus:border-emerald-pro-600 focus:ring-1 focus:ring-emerald-pro-600 transition-all outline-none"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-light-text dark:text-white mb-2">
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formState.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-deep-space border border-border-default dark:border-graphite text-light-text dark:text-white placeholder-steel focus:border-emerald-pro-600 focus:ring-1 focus:ring-emerald-pro-600 transition-all outline-none"
                          placeholder="Acme Inc."
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-light-text dark:text-white mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-deep-space border border-border-default dark:border-graphite text-light-text dark:text-white placeholder-steel focus:border-emerald-pro-600 focus:ring-1 focus:ring-emerald-pro-600 transition-all outline-none"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="source" className="block text-sm font-medium text-light-text dark:text-white mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        id="source"
                        name="source"
                        value={formState.source}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-deep-space border border-border-default dark:border-graphite text-light-text dark:text-white focus:border-emerald-pro-600 focus:ring-1 focus:ring-emerald-pro-600 transition-all outline-none"
                      >
                        <option value="">Select an option</option>
                        <option value="google">Google Search</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="referral">Referral</option>
                        <option value="cold_email">Cold Email (yes, we practice what we preach)</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-light-text dark:text-white mb-2">
                        Tell us about your goals
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-deep-space border border-border-default dark:border-graphite text-light-text dark:text-white placeholder-steel focus:border-emerald-pro-600 focus:ring-1 focus:ring-emerald-pro-600 transition-all outline-none resize-none"
                        placeholder="What are you looking to achieve with outbound lead generation?"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-pro-600 dark:bg-xgrowth-500 hover:bg-emerald-pro-600/90 dark:hover:bg-xgrowth-400 text-white dark:text-green-950 font-semibold py-6 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Book Your Strategy Call
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-light-text-muted dark:text-steel text-sm">
                      By submitting this form, you agree to our{" "}
                      <a href="/legal/privacy-policy" className="text-emerald-pro-600 hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
