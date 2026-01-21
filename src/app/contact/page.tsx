"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Calendar, ArrowRight } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-quantum-violet/10 rounded-full blur-[100px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 mb-6">
              <Calendar className="w-4 h-4 text-electric-cyan" />
              <span className="text-sm font-medium text-electric-cyan">Let&apos;s Talk</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              Start Your{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-quantum-violet bg-clip-text text-transparent">
                Growth Journey
              </span>
            </h1>

            <p className="text-xl text-steel max-w-2xl mx-auto">
              Book a strategy call with our team to discuss how we can help fill your pipeline with qualified meetings.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-sora font-bold text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-steel mb-8">
                Have questions? Want to learn more about how we can help your business grow? Reach out and we&apos;ll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30">
                    <Mail className="h-5 w-5 text-electric-cyan" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-electric-cyan hover:text-cyan-light transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30">
                    <Phone className="h-5 w-5 text-electric-cyan" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-electric-cyan hover:text-cyan-light transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30">
                    <MapPin className="h-5 w-5 text-electric-cyan" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-steel">{contactInfo.address}</p>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="mt-12 p-6 rounded-2xl border border-graphite bg-midnight-blue/50">
                <h3 className="text-lg font-sora font-semibold text-white mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3 text-steel text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-electric-cyan flex-shrink-0 mt-0.5" />
                    30-minute discovery call
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-electric-cyan flex-shrink-0 mt-0.5" />
                    Discussion of your goals and target market
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-electric-cyan flex-shrink-0 mt-0.5" />
                    Custom recommendation for your business
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-electric-cyan flex-shrink-0 mt-0.5" />
                    No pressure, no hard sell
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="p-8 rounded-3xl border border-graphite bg-midnight-blue">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 mb-6">
                      <Send className="h-8 w-8 text-electric-cyan" />
                    </div>
                    <h3 className="text-2xl font-sora font-bold text-white mb-4">
                      Thanks for reaching out!
                    </h3>
                    <p className="text-steel max-w-md mx-auto">
                      We&apos;ve received your message and will get back to you within 24 hours. In the meantime, feel free to explore our case studies.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formState.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-deep-space border border-graphite text-white placeholder-steel focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all outline-none"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formState.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-deep-space border border-graphite text-white placeholder-steel focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all outline-none"
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-deep-space border border-graphite text-white placeholder-steel focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all outline-none"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formState.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-deep-space border border-graphite text-white placeholder-steel focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all outline-none"
                          placeholder="Acme Inc."
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-deep-space border border-graphite text-white placeholder-steel focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all outline-none"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="source" className="block text-sm font-medium text-white mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        id="source"
                        name="source"
                        value={formState.source}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-deep-space border border-graphite text-white focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all outline-none"
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
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        Tell us about your goals
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-deep-space border border-graphite text-white placeholder-steel focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all outline-none resize-none"
                        placeholder="What are you looking to achieve with outbound lead generation?"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-electric-cyan hover:bg-electric-cyan/90 text-deep-space font-semibold py-6 disabled:opacity-50"
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

                    <p className="text-center text-steel text-sm">
                      By submitting this form, you agree to our{" "}
                      <a href="/legal/privacy-policy" className="text-electric-cyan hover:underline">
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
