"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StatusBadge, ProgressRing } from "@/components/dashboard";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Target,
  Mail,
  CheckCircle,
  Loader2,
  Building,
  Users,
  MessageSquare,
  Zap,
  Upload,
  FileSpreadsheet,
  Database,
  Search,
  Filter,
  AlertCircle,
  Info,
  Cpu,
} from "lucide-react";
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
  { id: 1, name: "Campaign Details", icon: Target },
  { id: 2, name: "Select Leads", icon: Users },
  { id: 3, name: "AI Generation", icon: Sparkles },
  { id: 4, name: "Review & Launch", icon: CheckCircle },
];

// Mock lead lists for selection
const mockLeadLists = [
  { id: "1", name: "Enterprise Tech Leaders", count: 2450, industry: "Technology", lastUpdated: "2 days ago" },
  { id: "2", name: "SaaS Decision Makers", count: 1820, industry: "SaaS", lastUpdated: "1 week ago" },
  { id: "3", name: "Healthcare IT Directors", count: 956, industry: "Healthcare", lastUpdated: "3 days ago" },
  { id: "4", name: "Fintech CFOs", count: 412, industry: "Finance", lastUpdated: "5 days ago" },
  { id: "5", name: "E-commerce Managers", count: 1245, industry: "E-commerce", lastUpdated: "1 day ago" },
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLeadLists, setSelectedLeadLists] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<{
    sequences: Array<{ step: number; subject: string; body: string; delay: number }>;
  } | null>(null);

  const [formData, setFormData] = useState({
    campaignName: "",
    targetIndustry: "",
    targetRole: "",
    valueProposition: "",
    callToAction: "",
  });

  const totalSelectedLeads = mockLeadLists
    .filter((list) => selectedLeadLists.includes(list.id))
    .reduce((sum, list) => sum + list.count, 0);

  const toggleLeadList = (listId: string) => {
    setSelectedLeadLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);

    // TODO: Replace with actual n8n webhook call to Architect engine
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setGeneratedContent({
      sequences: [
        {
          step: 1,
          subject: `Quick question about ${formData.targetIndustry} growth`,
          body: `Hi {{firstName}},\n\nI noticed {{company}} has been making waves in the ${formData.targetIndustry} space. ${formData.valueProposition}\n\n${formData.callToAction}\n\nBest,\n{{senderName}}`,
          delay: 0,
        },
        {
          step: 2,
          subject: "Following up on my last email",
          body: `Hi {{firstName}},\n\nJust wanted to make sure my previous email didn't get lost in the shuffle. I'd love to share how we've helped other ${formData.targetRole}s like yourself.\n\nWould you be open to a quick 15-minute call this week?\n\nBest,\n{{senderName}}`,
          delay: 3,
        },
        {
          step: 3,
          subject: "One last thing...",
          body: `Hi {{firstName}},\n\nI'll keep this brief - I know you're busy. If now isn't the right time, I completely understand.\n\nBut if you're curious about how we've helped companies like {{company}} achieve better results, I'd be happy to share some quick insights.\n\nEither way, wishing you continued success!\n\nBest,\n{{senderName}}`,
          delay: 5,
        },
      ],
    });

    setIsGenerating(false);
    setCurrentStep(4);
  };

  const handleLaunch = async () => {
    // TODO: Create campaign via API
    router.push("/dashboard/campaigns");
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
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <Link href="/dashboard/campaigns" className="hover:text-emerald-pro-600 transition-colors">Campaigns</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">New</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">AI-powered campaign builder</h1>
        <p className="text-slate-900 dark:text-slate-300 mt-1">Build intelligent outreach sequences with AI Architect</p>
      </motion.div>

      <div>
        {/* Back link */}
        <Link
          href="/dashboard/campaigns"
          className="inline-flex items-center gap-2 text-slate-900 dark:text-slate-300 hover:text-emerald-pro-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to campaigns
        </Link>

        {/* Progress steps */}
        <div className="mb-8">
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
                      "text-sm font-medium",
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
                      "w-12 h-0.5 mx-2",
                      currentStep > step.id ? "bg-emerald-pro-400" : "bg-graphite"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
          {currentStep === 1 && (
            <div className="glass-premium p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30">
                  <Target className="h-6 w-6 text-emerald-pro-600" />
                </div>
                <div>
                  <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
                    Campaign Details
                  </h2>
                  <p className="text-slate-900 dark:text-slate-300">
                    Tell us about your target audience and goals
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                    Campaign Name
                  </label>
                  <input
                    name="campaignName"
                    value={formData.campaignName}
                    onChange={handleChange}
                    placeholder="e.g., Q1 Enterprise Outreach"
                    className="w-full h-11 rounded-lg input-base px-4"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                      <Building className="inline h-4 w-4 mr-1" />
                      Target Industry
                    </label>
                    <select
                      name="targetIndustry"
                      value={formData.targetIndustry}
                      onChange={handleChange}
                      className="w-full h-11 rounded-lg input-base px-4"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Professional Services">Professional Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Target Role
                    </label>
                    <input
                      name="targetRole"
                      value={formData.targetRole}
                      onChange={handleChange}
                      placeholder="e.g., VP of Sales, CRO"
                      className="w-full h-11 rounded-lg input-base px-4"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                    <Zap className="inline h-4 w-4 mr-1" />
                    Value Proposition
                  </label>
                  <textarea
                    name="valueProposition"
                    value={formData.valueProposition}
                    onChange={handleChange}
                    placeholder="What unique value do you offer? What problem do you solve?"
                    rows={3}
                    className="w-full rounded-lg input-base px-4 py-3 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Call to Action
                  </label>
                  <input
                    name="callToAction"
                    value={formData.callToAction}
                    onChange={handleChange}
                    placeholder="e.g., Would you be open to a quick 15-minute call?"
                    className="w-full h-11 rounded-lg input-base px-4"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={
                      !formData.campaignName ||
                      !formData.targetIndustry ||
                      !formData.targetRole ||
                      !formData.valueProposition
                    }
                    className="gap-2"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="glass-premium p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-pro-400/10 border border-emerald-pro-400/30">
                  <Users className="h-6 w-6 text-emerald-pro-400" />
                </div>
                <div>
                  <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
                    Select Lead Lists
                  </h2>
                  <p className="text-slate-900 dark:text-slate-300">
                    Choose which leads to include in this campaign
                  </p>
                </div>
              </div>

              {/* Lead source options */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button className="p-4 rounded-lg border border-emerald-pro-600/30 bg-emerald-pro-600/10 text-center">
                  <Database className="h-6 w-6 text-emerald-pro-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Existing Lists</p>
                  <p className="text-xs text-slate-900 dark:text-slate-300">Select from saved lists</p>
                </button>
                <button className="p-4 rounded-lg card-base text-center hover:border-emerald-pro-600/30 transition-colors">
                  <Upload className="h-6 w-6 text-slate-900 dark:text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-300">Upload CSV</p>
                  <p className="text-xs text-slate-900 dark:text-slate-300">Import new contacts</p>
                </button>
                <button className="p-4 rounded-lg card-base text-center hover:border-emerald-pro-600/30 transition-colors">
                  <Search className="h-6 w-6 text-slate-900 dark:text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-300">Build List</p>
                  <p className="text-xs text-slate-900 dark:text-slate-300">Create from filters</p>
                </button>
              </div>

              {/* Lead list selection */}
              <div className="space-y-3 mb-6">
                {mockLeadLists.map((list) => (
                  <div
                    key={list.id}
                    onClick={() => toggleLeadList(list.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all",
                      selectedLeadLists.includes(list.id)
                        ? "border-emerald-pro-600/50 bg-emerald-pro-600/10"
                        : "border-border-default dark:border-graphite bg-white dark:bg-deep-space/50 hover:border-emerald-pro-600/30"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-5 w-5 rounded border-2 flex items-center justify-center transition-colors",
                          selectedLeadLists.includes(list.id)
                            ? "border-emerald-pro-600 bg-emerald-pro-600"
                            : "border-border-default dark:border-graphite"
                        )}
                      >
                        {selectedLeadLists.includes(list.id) && (
                          <CheckCircle className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{list.name}</p>
                        <div className="flex items-center gap-3 text-sm text-slate-900 dark:text-slate-300">
                          <span>{list.industry}</span>
                          <span>•</span>
                          <span>Updated {list.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{list.count.toLocaleString()}</p>
                      <p className="text-xs text-slate-900 dark:text-slate-300">contacts</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="rounded-lg card-base p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Info className="h-5 w-5 text-emerald-pro-600" />
                    <span className="text-slate-900 dark:text-slate-300">
                      {selectedLeadLists.length} list{selectedLeadLists.length !== 1 ? "s" : ""} selected
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalSelectedLeads.toLocaleString()}</span>
                    <span className="text-slate-900 dark:text-slate-300 ml-2">total contacts</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={selectedLeadLists.length === 0}
                  className="gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="glass-premium p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-pro-500/10 border border-emerald-pro-500/30">
                  <Sparkles className="h-6 w-6 text-emerald-pro-500" />
                </div>
                <div>
                  <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
                    AI Architect Engine
                  </h2>
                  <p className="text-slate-900 dark:text-slate-300">
                    Let AI generate your email sequences
                  </p>
                </div>
              </div>

              <div className="text-center py-12">
                {isGenerating ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-full border-4 border-emerald-pro-500/20" />
                        <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-emerald-pro-500 border-t-transparent animate-spin" />
                        <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-emerald-pro-500" />
                      </div>
                    </div>
                    <p className="text-lg font-medium text-slate-900 dark:text-white">
                      AI Architect is crafting your campaign...
                    </p>
                    <p className="text-slate-900 dark:text-slate-300">
                      Analyzing your inputs and generating personalized email sequences
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-lg card-base p-6 text-left">
                      <h3 className="font-medium text-slate-900 dark:text-white mb-4">Campaign Summary</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-900 dark:text-slate-300">Campaign Name</p>
                          <p className="text-slate-900 dark:text-white">{formData.campaignName}</p>
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-slate-300">Target Industry</p>
                          <p className="text-slate-900 dark:text-white">{formData.targetIndustry}</p>
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-slate-300">Target Role</p>
                          <p className="text-slate-900 dark:text-white">{formData.targetRole}</p>
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-slate-300">Value Proposition</p>
                          <p className="text-slate-900 dark:text-white truncate">{formData.valueProposition}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-900 dark:text-slate-300">
                      Click the button below to generate AI-powered email sequences
                      tailored to your campaign goals.
                    </p>

                    <Button onClick={handleGenerateContent} variant="secondary" className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Generate with AI Architect
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && generatedContent && (
            <div className="space-y-6">
              <div className="glass-premium p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-pro-400/10 border border-emerald-pro-400/30">
                    <CheckCircle className="h-6 w-6 text-emerald-pro-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
                      Review & Launch
                    </h2>
                    <p className="text-slate-900 dark:text-slate-300">
                      Review your AI-generated email sequences
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {generatedContent.sequences.map((seq) => (
                    <div
                      key={seq.step}
                      className="rounded-lg card-base p-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-pro-600/10 text-emerald-pro-600 font-mono font-bold">
                          {seq.step}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{seq.subject}</p>
                          <p className="text-sm text-slate-900 dark:text-slate-300">
                            {seq.delay === 0 ? "Sent immediately" : `Sent after ${seq.delay} days`}
                          </p>
                        </div>
                      </div>
                      <div className="pl-11">
                        <pre className="text-sm text-slate-900 dark:text-slate-300 whitespace-pre-wrap font-sans">
                          {seq.body}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline">Save as Draft</Button>
                  <Button onClick={handleLaunch} className="gap-2">
                    <Zap className="h-4 w-4" />
                    Launch Campaign
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
