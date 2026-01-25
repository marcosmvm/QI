"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Building2,
  Target,
  Mail,
  FileSpreadsheet,
  Rocket,
  Sparkles,
  Globe,
  Users,
  Zap,
  Shield,
  BarChart3,
  Clock,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const steps = [
  { id: 1, name: "Welcome", icon: Sparkles },
  { id: 2, name: "Company Profile", icon: Building2 },
  { id: 3, name: "Connect Inbox", icon: Mail },
  { id: 4, name: "Upload ICP", icon: FileSpreadsheet },
  { id: 5, name: "Launch", icon: Rocket },
];

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
  { label: "1-10 employees", value: "1-10" },
  { label: "11-50 employees", value: "11-50" },
  { label: "51-200 employees", value: "51-200" },
  { label: "201-500 employees", value: "201-500" },
  { label: "500+ employees", value: "500+" },
];

const targetMarkets = [
  "Small Business (SMB)",
  "Mid-Market",
  "Enterprise",
  "All Segments",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    instantly: "idle" | "connecting" | "connected" | "error";
    googleSheets: "idle" | "connecting" | "connected" | "error";
  }>({
    instantly: "idle",
    googleSheets: "idle",
  });

  const [formData, setFormData] = useState({
    // Step 2: Company Profile
    companyName: "",
    domain: "",
    industry: "",
    employeeCount: "",
    targetMarket: "",
    // Step 3: Connect Inbox
    instantlyApiKey: "",
    // Step 4: Upload ICP
    googleSheetId: "",
    icpDescription: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConnectInstantly = async () => {
    if (!formData.instantlyApiKey) return;

    setConnectionStatus((prev) => ({ ...prev, instantly: "connecting" }));

    // Simulate API connection test
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo, always succeed if key is provided
    setConnectionStatus((prev) => ({ ...prev, instantly: "connected" }));
  };

  const handleConnectGoogleSheets = async () => {
    if (!formData.googleSheetId) return;

    setConnectionStatus((prev) => ({ ...prev, googleSheets: "connecting" }));

    // Simulate API connection test
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setConnectionStatus((prev) => ({ ...prev, googleSheets: "connected" }));
  };

  const handleComplete = async () => {
    setIsSubmitting(true);

    // TODO: Call API to update organization with onboarding data
    // and set onboarding_completed = true
    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push("/dashboard");
  };

  const canProceed = (step: number): boolean => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return !!(formData.companyName && formData.industry && formData.employeeCount);
      case 3:
        return connectionStatus.instantly === "connected";
      case 4:
        return connectionStatus.googleSheets === "connected" || !!formData.icpDescription;
      default:
        return true;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-300 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">
            Portal
          </Link>
          <span>/</span>
          <span className="text-emerald-pro-600">Onboarding</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">
          Welcome to XGrowthOS
        </h1>
        <p className="text-slate-900 dark:text-slate-300 mt-1">
          Let&apos;s get your account set up and ready to launch campaigns
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                  currentStep === step.id
                    ? "bg-emerald-pro-600/10 border border-emerald-pro-600/30"
                    : currentStep > step.id
                    ? "bg-emerald-pro-400/10 border border-emerald-pro-400/30"
                    : "bg-bg-subtle border border-border"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    currentStep === step.id
                      ? "bg-emerald-pro-600 dark:bg-xgrowth-500 text-white dark:text-green-950"
                      : currentStep > step.id
                      ? "bg-emerald-pro-400 dark:bg-xgrowth-400 text-white dark:text-green-950"
                      : "bg-graphite text-slate-900 dark:text-slate-300"
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium hidden md:block",
                    currentStep === step.id
                      ? "text-emerald-pro-600"
                      : currentStep > step.id
                      ? "text-emerald-pro-400"
                      : "text-slate-900 dark:text-slate-300"
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 md:w-12 h-0.5 mx-2",
                    currentStep > step.id ? "bg-emerald-pro-400" : "bg-graphite"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step Content */}
      <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
        {/* Step 1: Welcome */}
        {currentStep === 1 && (
          <div className="glass-premium p-8">
            <div className="text-center mb-8">
              <div className="relative h-20 w-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-pro-600/20 animate-pulse" />
                <div className="absolute inset-2 rounded-full border border-emerald-pro-500/30" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-pro-600/20 to-emerald-pro-500/20 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-emerald-pro-600" />
                </div>
              </div>
              <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-3">
                Welcome to the Future of Outreach
              </h2>
              <p className="text-slate-900 dark:text-slate-300 max-w-lg mx-auto">
                You&apos;re about to unlock AI-powered cold email campaigns that deliver
                real results. Let&apos;s get you set up in just a few minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <FeatureCard
                icon={Target}
                title="Precision Targeting"
                description="AI finds your ideal customers"
              />
              <FeatureCard
                icon={Shield}
                title="Compliance First"
                description="Built-in deliverability protection"
              />
              <FeatureCard
                icon={BarChart3}
                title="Real-Time Analytics"
                description="Track every email, open, and reply"
              />
            </div>

            <div className="card-base rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-emerald-pro-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    This will only take about 5 minutes
                  </p>
                  <p className="text-xs text-slate-900 dark:text-slate-300 mt-1">
                    We&apos;ll guide you through connecting your email, uploading your
                    ideal customer profile, and reviewing your first campaign.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => setCurrentStep(2)} className="gap-2 px-8">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Company Profile */}
        {currentStep === 2 && (
          <div className="glass-premium p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30">
                <Building2 className="h-6 w-6 text-emerald-pro-600" />
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
                  Company Profile
                </h2>
                <p className="text-slate-900 dark:text-slate-300">Tell us about your business</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                  Company Name *
                </label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="w-full h-11 rounded-lg input-base px-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Company Website
                </label>
                <input
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="example.com"
                  className="w-full h-11 rounded-lg input-base px-4"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full h-11 rounded-lg input-base px-4"
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
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Company Size *
                  </label>
                  <select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleChange}
                    className="w-full h-11 rounded-lg input-base px-4"
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

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                  <Target className="inline h-4 w-4 mr-1" />
                  Target Market
                </label>
                <select
                  name="targetMarket"
                  value={formData.targetMarket}
                  onChange={handleChange}
                  className="w-full h-11 rounded-lg input-base px-4"
                >
                  <option value="">Select target market</option>
                  {targetMarkets.map((market) => (
                    <option key={market} value={market}>
                      {market}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceed(2)}
                  className="gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Connect Inbox */}
        {currentStep === 3 && (
          <div className="glass-premium p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-pro-500/10 border border-emerald-pro-500/30">
                <Mail className="h-6 w-6 text-emerald-pro-500" />
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
                  Connect Your Email
                </h2>
                <p className="text-slate-900 dark:text-slate-300">
                  Link your Instantly account for email delivery
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card-base rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-emerald-pro-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Why Instantly?
                    </p>
                    <p className="text-xs text-slate-900 dark:text-slate-300 mt-1">
                      Instantly provides enterprise-grade email infrastructure with
                      built-in warmup, rotation, and deliverability optimization.
                      Your API key connects our AI engines to your sending accounts.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                  Instantly API Key
                </label>
                <div className="flex gap-3">
                  <input
                    name="instantlyApiKey"
                    type="password"
                    value={formData.instantlyApiKey}
                    onChange={handleChange}
                    placeholder="Enter your Instantly API key"
                    className="flex-1 h-11 rounded-lg input-base px-4"
                    disabled={connectionStatus.instantly === "connected"}
                  />
                  <Button
                    onClick={handleConnectInstantly}
                    disabled={
                      !formData.instantlyApiKey ||
                      connectionStatus.instantly === "connecting" ||
                      connectionStatus.instantly === "connected"
                    }
                    variant={connectionStatus.instantly === "connected" ? "outline" : "default"}
                    className="min-w-[120px]"
                  >
                    {connectionStatus.instantly === "connecting" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : connectionStatus.instantly === "connected" ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-emerald-pro-400" />
                        Connected
                      </>
                    ) : (
                      "Connect"
                    )}
                  </Button>
                </div>
                {connectionStatus.instantly === "connected" && (
                  <p className="text-xs text-emerald-pro-400 mt-2 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Successfully connected to Instantly
                  </p>
                )}
                {connectionStatus.instantly === "error" && (
                  <p className="text-xs text-energy-orange mt-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Connection failed. Please check your API key.
                  </p>
                )}
              </div>

              <div className="bg-bg-subtle border border-border/30 rounded-lg p-4">
                <p className="text-sm text-slate-900 dark:text-slate-300">
                  Don&apos;t have an Instantly account?{" "}
                  <a
                    href="https://instantly.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-pro-600 hover:underline inline-flex items-center gap-1"
                  >
                    Sign up here
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(4)}
                  disabled={!canProceed(3)}
                  className="gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Upload ICP */}
        {currentStep === 4 && (
          <div className="glass-premium p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-pro-400/10 border border-emerald-pro-400/30">
                <FileSpreadsheet className="h-6 w-6 text-emerald-pro-400" />
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
                  Define Your Ideal Customer
                </h2>
                <p className="text-slate-900 dark:text-slate-300">
                  Help our AI understand who to target
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card-base rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-emerald-pro-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      What is an ICP?
                    </p>
                    <p className="text-xs text-slate-900 dark:text-slate-300 mt-1">
                      Your Ideal Customer Profile defines the companies and decision-makers
                      most likely to buy from you. This helps our AI Architect engine craft
                      highly targeted campaigns.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                  Google Sheet with Lead Data (Optional)
                </label>
                <div className="flex gap-3">
                  <input
                    name="googleSheetId"
                    value={formData.googleSheetId}
                    onChange={handleChange}
                    placeholder="Paste Google Sheet URL or ID"
                    className="flex-1 h-11 rounded-lg input-base px-4"
                    disabled={connectionStatus.googleSheets === "connected"}
                  />
                  <Button
                    onClick={handleConnectGoogleSheets}
                    disabled={
                      !formData.googleSheetId ||
                      connectionStatus.googleSheets === "connecting" ||
                      connectionStatus.googleSheets === "connected"
                    }
                    variant={connectionStatus.googleSheets === "connected" ? "outline" : "default"}
                    className="min-w-[120px]"
                  >
                    {connectionStatus.googleSheets === "connecting" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Linking...
                      </>
                    ) : connectionStatus.googleSheets === "connected" ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-emerald-pro-400" />
                        Linked
                      </>
                    ) : (
                      "Link Sheet"
                    )}
                  </Button>
                </div>
                {connectionStatus.googleSheets === "connected" && (
                  <p className="text-xs text-emerald-pro-400 mt-2 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Google Sheet linked successfully
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-light-bg-secondary dark:bg-midnight-blue/60 text-slate-900 dark:text-slate-300">OR</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                  Describe Your Ideal Customer
                </label>
                <textarea
                  name="icpDescription"
                  value={formData.icpDescription}
                  onChange={handleChange}
                  placeholder="E.g., VP of Sales at SaaS companies with 50-200 employees, based in the US, using Salesforce..."
                  rows={4}
                  className="w-full rounded-lg input-base px-4 py-3 resize-none"
                />
                <p className="text-xs text-slate-900 dark:text-slate-300 mt-2">
                  Include: job titles, industries, company sizes, locations, technologies used, pain points
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(5)}
                  disabled={!canProceed(4)}
                  className="gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Launch */}
        {currentStep === 5 && (
          <div className="glass-premium p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30">
                <Rocket className="h-6 w-6 text-emerald-pro-600" />
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
                  Ready to Launch
                </h2>
                <p className="text-slate-900 dark:text-slate-300">Review your setup and get started</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SummaryCard
                  icon={Building2}
                  title="Company"
                  items={[
                    { label: "Name", value: formData.companyName },
                    { label: "Industry", value: formData.industry },
                    { label: "Size", value: formData.employeeCount },
                  ]}
                />
                <SummaryCard
                  icon={Mail}
                  title="Email Connection"
                  items={[
                    {
                      label: "Instantly",
                      value: connectionStatus.instantly === "connected" ? "Connected" : "Not connected",
                      status: connectionStatus.instantly === "connected" ? "success" : "warning",
                    },
                  ]}
                />
              </div>

              <div className="bg-white dark:bg-deep-space/50 border border-emerald-pro-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-pro-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      What happens next?
                    </p>
                    <ul className="text-xs text-slate-900 dark:text-slate-300 mt-2 space-y-1">
                      <li>• Your account will be activated immediately</li>
                      <li>• Our Guardian engine will verify your domain health</li>
                      <li>• You can create your first campaign from the dashboard</li>
                      <li>• Our team is available via support if you need help</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setCurrentStep(4)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={isSubmitting}
                  className="gap-2 bg-gradient-to-r from-emerald-pro-600 to-cyan-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Completing Setup...
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" />
                      Complete Setup
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="card-base rounded-lg p-4 text-center">
      <div className="h-10 w-10 rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30 flex items-center justify-center mx-auto mb-3">
        <Icon className="h-5 w-5 text-emerald-pro-600" />
      </div>
      <p className="text-sm font-medium text-slate-900 dark:text-white">{title}</p>
      <p className="text-xs text-slate-900 dark:text-slate-300 mt-1">{description}</p>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: Array<{ label: string; value: string; status?: "success" | "warning" }>;
}) {
  return (
    <div className="card-base rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-emerald-pro-600" />
        <span className="text-sm font-medium text-slate-900 dark:text-white">{title}</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-slate-900 dark:text-slate-300">{item.label}</span>
            <span
              className={cn(
                "font-medium",
                item.status === "success"
                  ? "text-emerald-pro-400"
                  : item.status === "warning"
                  ? "text-energy-orange"
                  : "text-slate-900 dark:text-white"
              )}
            >
              {item.value || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
