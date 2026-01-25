"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Loader2,
  Mail,
  Building2,
  Phone,
  Star,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { Button } from "@/components/ui/button";

const whatToExpect = [
  {
    icon: Clock,
    title: "30-Minute Call",
    description: "A focused conversation about your outreach goals and challenges.",
  },
  {
    icon: Users,
    title: "Custom Strategy",
    description: "We'll outline a tailored approach for your target market.",
  },
  {
    icon: BarChart3,
    title: "ROI Projection",
    description: "See projected results based on your specific situation.",
  },
  {
    icon: Zap,
    title: "Live Platform Tour",
    description: "Experience our AI engines in action with real examples.",
  },
];

const testimonials = [
  {
    quote: "The demo call was incredibly valuable. They understood our challenges and showed exactly how they could help.",
    author: "Michael Chen",
    role: "VP Sales, TechCorp",
  },
  {
    quote: "No pressure, just genuine insights into how AI-powered outreach could transform our pipeline.",
    author: "Sarah Johnson",
    role: "CMO, GrowthLabs",
  },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export default function BookDemoPage() {
  const [step, setStep] = useState<"form" | "calendar" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    teamSize: "",
    currentVolume: "",
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("calendar");
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    // TODO: Replace with actual booking API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep("success");
  };

  // Generate next 14 days for calendar
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-white dark:bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-pro-600/10 rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-pro-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-pro-600/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="tech-badge mb-8 inline-flex">
              <Calendar className="w-4 h-4 text-emerald-pro-600" />
              <span className="text-sm font-medium text-emerald-pro-600">
                Free Strategy Session
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              Book a{" "}
              <span className="headline-underline text-gradient">
                Demo
              </span>
            </h1>

            <p className="text-xl text-slate-700 dark:text-slate-400">
              See how AI-powered cold outreach can transform your sales pipeline.
              No commitment, no pressure—just valuable insights.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Main Content */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                  What to Expect
                </h2>
                <div className="space-y-4">
                  {whatToExpect.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-emerald-pro-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/50"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-emerald-pro-400 fill-emerald-pro-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-200 italic mb-3">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-slate-700 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-pro-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-400">No spam, ever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-pro-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-400">Free consultation</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form/Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3"
            >
              <div className="p-8 rounded-3xl border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/50">
                {step === "form" && (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          First Name *
                        </label>
                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          required
                          className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white placeholder:text-slate-700 dark:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          Last Name *
                        </label>
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Smith"
                          required
                          className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white placeholder:text-slate-700 dark:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
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
                        className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white placeholder:text-slate-700 dark:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          <Building2 className="inline h-4 w-4 mr-1" />
                          Company *
                        </label>
                        <input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          required
                          className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white placeholder:text-slate-700 dark:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          <Phone className="inline h-4 w-4 mr-1" />
                          Phone
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white placeholder:text-slate-700 dark:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          Sales Team Size
                        </label>
                        <select
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                        >
                          <option value="">Select team size</option>
                          <option value="1-5">1-5 reps</option>
                          <option value="6-20">6-20 reps</option>
                          <option value="21-50">21-50 reps</option>
                          <option value="50+">50+ reps</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          Current Outreach Volume
                        </label>
                        <select
                          name="currentVolume"
                          value={formData.currentVolume}
                          onChange={handleChange}
                          className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                        >
                          <option value="">Select volume</option>
                          <option value="none">Not doing outbound yet</option>
                          <option value="1-1000">1 - 1,000/month</option>
                          <option value="1000-5000">1,000 - 5,000/month</option>
                          <option value="5000+">5,000+/month</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                        Anything else we should know?
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your goals or specific challenges..."
                        rows={3}
                        className="w-full rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-700 dark:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={
                        !formData.firstName ||
                        !formData.lastName ||
                        !formData.email ||
                        !formData.company
                      }
                      className="cta-magnetic w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Select Time
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}

                {step === "calendar" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
                        Select a Date & Time
                      </h3>
                      <button
                        onClick={() => setStep("form")}
                        className="text-sm text-emerald-pro-600 hover:underline"
                      >
                        Back
                      </button>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {availableDates.map((date, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            selectedDate?.toDateString() === date.toDateString()
                              ? "border-emerald-pro-600/50 bg-emerald-pro-600/10 text-slate-900 dark:text-white"
                              : "border-border-default dark:border-graphite bg-white dark:bg-deep-space/50 text-slate-700 dark:text-slate-400 hover:border-emerald-pro-600/30"
                          }`}
                        >
                          <p className="text-xs">
                            {date.toLocaleDateString("en-US", { weekday: "short" })}
                          </p>
                          <p className="text-lg font-medium">{date.getDate()}</p>
                          <p className="text-xs">
                            {date.toLocaleDateString("en-US", { month: "short" })}
                          </p>
                        </button>
                      ))}
                    </div>

                    {selectedDate && (
                      <div>
                        <p className="text-sm text-slate-700 dark:text-slate-400 mb-3">
                          Available times for{" "}
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-2 rounded-lg border text-sm transition-colors ${
                                selectedTime === time
                                  ? "border-emerald-pro-600/50 bg-emerald-pro-600/10 text-slate-900 dark:text-white"
                                  : "border-border-default dark:border-graphite bg-white dark:bg-deep-space/50 text-slate-700 dark:text-slate-400 hover:border-emerald-pro-600/30"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleBooking}
                      disabled={!selectedDate || !selectedTime || isSubmitting}
                      className="cta-magnetic w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Confirming...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4" />
                          Confirm Booking
                        </>
                      )}
                    </button>
                  </div>
                )}

                {step === "success" && (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-emerald-pro-400/10 border border-emerald-pro-400/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-emerald-pro-400" />
                    </div>
                    <h3 className="text-xl font-sora font-semibold text-slate-900 dark:text-white mb-2">
                      You&apos;re All Set!
                    </h3>
                    <p className="text-slate-700 dark:text-slate-400 mb-4">
                      We&apos;ve sent a calendar invite to {formData.email}.
                    </p>
                    <div className="p-4 bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-lg mb-6">
                      <p className="text-sm text-slate-700 dark:text-slate-200">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at {selectedTime}
                      </p>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-400">
                      Questions before the call?{" "}
                      <a
                        href="mailto:hello@xgrowthos.com"
                        className="text-emerald-pro-600 hover:underline"
                      >
                        Email us
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
