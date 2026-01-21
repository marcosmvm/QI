import { cn } from "@/lib/utils";
import {
  User,
  Globe,
  Key,
  Mail,
  Users,
  Send,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Circle,
} from "lucide-react";

interface OnboardingStep {
  id: string;
  label: string;
  completed: boolean;
  icon: typeof User;
}

interface OnboardingProgressProps {
  steps: {
    profileComplete: boolean;
    domainVerified: boolean;
    apiKeysConfigured: boolean;
    firstCampaignCreated: boolean;
    firstLeadsImported: boolean;
    firstEmailSent: boolean;
    firstReplyReceived: boolean;
    firstMeetingBooked: boolean;
  };
  className?: string;
}

const stepConfig: { id: keyof OnboardingProgressProps["steps"]; label: string; icon: typeof User }[] = [
  { id: "profileComplete", label: "Profile Complete", icon: User },
  { id: "domainVerified", label: "Domain Verified", icon: Globe },
  { id: "apiKeysConfigured", label: "API Keys Set", icon: Key },
  { id: "firstCampaignCreated", label: "Campaign Created", icon: Mail },
  { id: "firstLeadsImported", label: "Leads Imported", icon: Users },
  { id: "firstEmailSent", label: "First Email Sent", icon: Send },
  { id: "firstReplyReceived", label: "First Reply", icon: MessageSquare },
  { id: "firstMeetingBooked", label: "Meeting Booked", icon: Calendar },
];

export function OnboardingProgress({
  steps,
  className,
}: OnboardingProgressProps) {
  const completedCount = Object.values(steps).filter(Boolean).length;
  const totalSteps = stepConfig.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className={cn("rounded-xl border border-graphite/50 bg-midnight-blue/30 p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-sora font-semibold text-white">
          Onboarding Progress
        </h3>
        <span className="text-sm font-medium text-electric-cyan">
          {completedCount}/{totalSteps} Complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-deep-space/50 mb-6">
        <div
          className="h-full rounded-full bg-gradient-to-r from-electric-cyan to-quantum-violet transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stepConfig.map((step) => {
          const isCompleted = steps[step.id];
          const StepIcon = step.icon;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-2 rounded-lg p-2 transition-colors",
                isCompleted
                  ? "bg-neon-mint/10"
                  : "bg-deep-space/30"
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-neon-mint flex-shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-steel flex-shrink-0" />
              )}
              <span
                className={cn(
                  "text-xs font-medium truncate",
                  isCompleted ? "text-neon-mint" : "text-steel"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Compact version for client list
export function OnboardingProgressBar({
  completedSteps,
  totalSteps = 8,
  className,
}: {
  completedSteps: number;
  totalSteps?: number;
  className?: string;
}) {
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1.5 w-16 rounded-full bg-deep-space/50">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            progressPercent === 100
              ? "bg-neon-mint"
              : progressPercent >= 50
              ? "bg-electric-cyan"
              : "bg-steel"
          )}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <span className="text-xs text-steel">
        {completedSteps}/{totalSteps}
      </span>
    </div>
  );
}
