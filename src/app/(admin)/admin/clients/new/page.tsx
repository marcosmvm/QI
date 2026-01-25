"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Globe,
  Users,
  Mail,
  DollarSign,
  FileText,
  Loader2,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Manufacturing",
  "Professional Services",
  "Real Estate",
  "Education",
  "Media & Entertainment",
  "Other",
];

const employeeRanges = [
  { label: "1-10", value: "1-10" },
  { label: "11-50", value: "11-50" },
  { label: "51-200", value: "51-200" },
  { label: "201-500", value: "201-500" },
  { label: "500+", value: "500+" },
];

const planTypes = [
  { value: "pilot", label: "Pilot", fee: 0 },
  { value: "starter", label: "Starter", fee: 997 },
  { value: "growth", label: "Growth", fee: 2497 },
  { value: "scale", label: "Scale", fee: 4997 },
  { value: "enterprise", label: "Enterprise", fee: null },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function NewClientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    industry: "",
    employeeCount: "",
    contactEmail: "",
    planType: "pilot",
    monthlyFee: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Auto-fill monthly fee when plan is selected
      if (name === "planType") {
        const plan = planTypes.find((p) => p.value === value);
        if (plan && plan.fee !== null) {
          newData.monthlyFee = plan.fee.toString();
        } else if (plan && plan.fee === null) {
          newData.monthlyFee = "";
        }
      }

      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual API call
    // - Create organization
    // - Create subscription
    // - Send welcome email
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Redirect after brief delay
    setTimeout(() => {
      router.push("/admin/clients");
    }, 2000);
  };

  const isValid =
    formData.name &&
    formData.industry &&
    formData.contactEmail &&
    formData.planType;

  if (isSubmitted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-emerald-pro-400/10 border border-emerald-pro-400/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-pro-400" />
          </div>
          <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white mb-2">
            Client Created Successfully
          </h2>
          <p className="text-slate-900 dark:text-slate-200">Redirecting to clients list...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Back link */}
      <motion.div variants={itemVariants}>
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 text-slate-900 dark:text-slate-200 hover:text-emerald-pro-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-slate-900 dark:text-slate-200 mb-1">Admin / Clients / <span className="text-emerald-pro-500">New</span></p>
          <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Add New Client</h1>
          <p className="text-slate-900 dark:text-slate-200 mt-1">
            Create a new client organization and subscription
          </p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="space-y-6">
          {/* Company Information */}
          <div className="glass-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-emerald-pro-600" />
              </div>
              <div>
                <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
                  Company Information
                </h2>
                <p className="text-sm text-slate-900 dark:text-slate-200">Basic client details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2">
                  Company Name *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                  className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-200 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Domain
                </label>
                <input
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="example.com"
                  className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-200 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2">
                    <Briefcase className="inline h-4 w-4 mr-1" />
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Employee Count
                  </label>
                  <select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleChange}
                    className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                  >
                    <option value="">Select size</option>
                    {employeeRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="glass-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-pro-500/10 border border-emerald-pro-500/30 flex items-center justify-center">
                <Mail className="h-5 w-5 text-emerald-pro-500" />
              </div>
              <div>
                <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="text-sm text-slate-900 dark:text-slate-200">Primary contact details</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2">
                Primary Contact Email *
              </label>
              <input
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="contact@example.com"
                required
                className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-200 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
              />
              <p className="text-xs text-slate-900 dark:text-slate-200 mt-2">
                An invitation will be sent to this email address
              </p>
            </div>
          </div>

          {/* Subscription */}
          <div className="glass-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-pro-400/10 border border-emerald-pro-400/30 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-emerald-pro-400" />
              </div>
              <div>
                <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
                  Subscription
                </h2>
                <p className="text-sm text-slate-900 dark:text-slate-200">Plan and billing details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2">
                  Plan Type *
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {planTypes.map((plan) => (
                    <button
                      key={plan.value}
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "planType", value: plan.value },
                        } as React.ChangeEvent<HTMLSelectElement>)
                      }
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        formData.planType === plan.value
                          ? "border-emerald-pro-600/50 bg-emerald-pro-600/10 text-slate-900 dark:text-white"
                          : "border-border-default dark:border-graphite bg-white dark:bg-deep-space/50 text-slate-900 dark:text-slate-200 hover:border-emerald-pro-600/30"
                      }`}
                    >
                      <p className="text-sm font-medium">{plan.label}</p>
                      {plan.fee !== null ? (
                        <p className="text-xs mt-1">${plan.fee}/mo</p>
                      ) : (
                        <p className="text-xs mt-1">Custom</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2">
                  Monthly Fee
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 dark:text-slate-200">
                    $
                  </span>
                  <input
                    name="monthlyFee"
                    type="number"
                    value={formData.monthlyFee}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space pl-8 pr-4 text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-200 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                  />
                </div>
                <p className="text-xs text-slate-900 dark:text-slate-200 mt-2">
                  Override the default plan price if needed
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="glass-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-energy-orange/10 border border-energy-orange/30 flex items-center justify-center">
                <FileText className="h-5 w-5 text-energy-orange" />
              </div>
              <div>
                <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
                  Internal Notes
                </h2>
                <p className="text-sm text-slate-900 dark:text-slate-200">
                  Additional information (not visible to client)
                </p>
              </div>
            </div>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any relevant notes about this client..."
              rows={4}
              className="w-full rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-200 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <Link
              href="/admin/clients"
              className="px-4 py-2 border border-border-default dark:border-graphite text-slate-900 dark:text-slate-200 rounded-lg hover:bg-light-bg-secondary dark:bg-midnight-blue/30 transition-colors"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Building2 className="h-4 w-4" />
                  Create Client
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
