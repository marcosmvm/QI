"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Campaign Details", icon: Target },
  { id: 2, name: "AI Generation", icon: Sparkles },
  { id: 3, name: "Review & Launch", icon: CheckCircle },
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
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
    setCurrentStep(3);
  };

  const handleLaunch = async () => {
    // TODO: Create campaign via API
    router.push("/dashboard/campaigns");
  };

  return (
    <div className="min-h-screen">
      <Header title="Create Campaign" subtitle="AI-powered campaign builder" />

      <div className="p-6">
        {/* Back link */}
        <Link
          href="/dashboard/campaigns"
          className="inline-flex items-center gap-2 text-steel hover:text-white transition-colors mb-6"
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
                      ? "bg-electric-cyan/10 border border-electric-cyan/30"
                      : currentStep > step.id
                      ? "bg-neon-mint/10 border border-neon-mint/30"
                      : "bg-midnight-blue/50 border border-graphite"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      currentStep === step.id
                        ? "bg-electric-cyan text-deep-space"
                        : currentStep > step.id
                        ? "bg-neon-mint text-deep-space"
                        : "bg-graphite text-steel"
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
                        ? "text-electric-cyan"
                        : currentStep > step.id
                        ? "text-neon-mint"
                        : "text-steel"
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-12 h-0.5 mx-2",
                      currentStep > step.id ? "bg-neon-mint" : "bg-graphite"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="max-w-3xl mx-auto">
          {currentStep === 1 && (
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-electric-cyan/10 border border-electric-cyan/30">
                  <Target className="h-6 w-6 text-electric-cyan" />
                </div>
                <div>
                  <h2 className="text-xl font-sora font-semibold text-white">
                    Campaign Details
                  </h2>
                  <p className="text-steel">
                    Tell us about your target audience and goals
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-silver mb-2">
                    Campaign Name
                  </label>
                  <input
                    name="campaignName"
                    value={formData.campaignName}
                    onChange={handleChange}
                    placeholder="e.g., Q1 Enterprise Outreach"
                    className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-silver mb-2">
                      <Building className="inline h-4 w-4 mr-1" />
                      Target Industry
                    </label>
                    <select
                      name="targetIndustry"
                      value={formData.targetIndustry}
                      onChange={handleChange}
                      className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
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
                    <label className="block text-sm font-medium text-silver mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Target Role
                    </label>
                    <input
                      name="targetRole"
                      value={formData.targetRole}
                      onChange={handleChange}
                      placeholder="e.g., VP of Sales, CRO"
                      className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-silver mb-2">
                    <Zap className="inline h-4 w-4 mr-1" />
                    Value Proposition
                  </label>
                  <textarea
                    name="valueProposition"
                    value={formData.valueProposition}
                    onChange={handleChange}
                    placeholder="What unique value do you offer? What problem do you solve?"
                    rows={3}
                    className="w-full rounded-lg border border-graphite bg-deep-space px-4 py-3 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-silver mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Call to Action
                  </label>
                  <input
                    name="callToAction"
                    value={formData.callToAction}
                    onChange={handleChange}
                    placeholder="e.g., Would you be open to a quick 15-minute call?"
                    className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
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
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-quantum-violet/10 border border-quantum-violet/30">
                  <Sparkles className="h-6 w-6 text-quantum-violet" />
                </div>
                <div>
                  <h2 className="text-xl font-sora font-semibold text-white">
                    AI Architect Engine
                  </h2>
                  <p className="text-steel">
                    Let AI generate your email sequences
                  </p>
                </div>
              </div>

              <div className="text-center py-12">
                {isGenerating ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-full border-4 border-quantum-violet/20" />
                        <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-quantum-violet border-t-transparent animate-spin" />
                        <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-quantum-violet" />
                      </div>
                    </div>
                    <p className="text-lg font-medium text-white">
                      AI Architect is crafting your campaign...
                    </p>
                    <p className="text-steel">
                      Analyzing your inputs and generating personalized email sequences
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-graphite bg-deep-space/50 p-6 text-left">
                      <h3 className="font-medium text-white mb-4">Campaign Summary</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-steel">Campaign Name</p>
                          <p className="text-white">{formData.campaignName}</p>
                        </div>
                        <div>
                          <p className="text-steel">Target Industry</p>
                          <p className="text-white">{formData.targetIndustry}</p>
                        </div>
                        <div>
                          <p className="text-steel">Target Role</p>
                          <p className="text-white">{formData.targetRole}</p>
                        </div>
                        <div>
                          <p className="text-steel">Value Proposition</p>
                          <p className="text-white truncate">{formData.valueProposition}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-steel">
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

              <div className="flex justify-between pt-4 border-t border-graphite">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && generatedContent && (
            <div className="space-y-6">
              <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neon-mint/10 border border-neon-mint/30">
                    <CheckCircle className="h-6 w-6 text-neon-mint" />
                  </div>
                  <div>
                    <h2 className="text-xl font-sora font-semibold text-white">
                      Review & Launch
                    </h2>
                    <p className="text-steel">
                      Review your AI-generated email sequences
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {generatedContent.sequences.map((seq) => (
                    <div
                      key={seq.step}
                      className="rounded-lg border border-graphite bg-deep-space/50 p-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-cyan/10 text-electric-cyan font-mono font-bold">
                          {seq.step}
                        </div>
                        <div>
                          <p className="font-medium text-white">{seq.subject}</p>
                          <p className="text-sm text-steel">
                            {seq.delay === 0 ? "Sent immediately" : `Sent after ${seq.delay} days`}
                          </p>
                        </div>
                      </div>
                      <div className="pl-11">
                        <pre className="text-sm text-silver whitespace-pre-wrap font-sans">
                          {seq.body}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
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
        </div>
      </div>
    </div>
  );
}
