import { Shield, Cpu, FlaskConical, Crosshair, Eye, type LucideIcon } from "lucide-react";

export interface EngineFeature {
  title: string;
  description: string;
}

export interface EngineStat {
  value: string;
  label: string;
}

export interface Engine {
  id: string;
  codename: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  color: "emerald-pro-600" | "emerald-pro-500" | "emerald-pro-400" | "energy-orange";
  features: EngineFeature[];
  stats: EngineStat[];
  useCases: string[];
}

export const engines: Engine[] = [
  {
    id: "guardian",
    codename: "C+D",
    name: "The Guardian",
    tagline: "Compliance & Domain Health",
    shortDescription: "DNC verification, domain reputation monitoring, and deliverability protection. Ensures your emails land in the inbox, not spam.",
    longDescription: "The Guardian Engine is your first line of defense against deliverability issues. It handles DNC (Do-Not-Contact) verification, domain reputation monitoring, SPF/DKIM/DMARC verification, blacklist monitoring, and deliverability protection—all working autonomously 24/7.",
    icon: Shield,
    color: "emerald-pro-600",
    features: [
      {
        title: "DNC Verification",
        description: "Instant verification against Do-Not-Contact lists before any email is sent. >99% pass rate.",
      },
      {
        title: "Domain Health Scoring",
        description: "Real-time scoring (0-100) of your sending domains with automated alerts when issues arise.",
      },
      {
        title: "SPF/DKIM/DMARC Verification",
        description: "Ensures all authentication records are properly configured with 100% DMARC alignment.",
      },
      {
        title: "Blacklist Monitoring",
        description: "Daily monitoring across 100+ blacklists with 4-hour remediation protocol.",
      },
      {
        title: "Spam Complaint Tracking",
        description: "Real-time monitoring with <0.05% threshold to protect domain reputation.",
      },
      {
        title: "Volume Pacing",
        description: "50 emails/domain/day max with Gmail/Yahoo 2024-2025 compliance.",
      },
    ],
    stats: [
      { value: "95%+", label: "Inbox Placement" },
      { value: "<1%", label: "Bounce Rate Target" },
      { value: "Daily", label: "Blacklist Checks" },
      { value: "100%", label: "DMARC Alignment" },
    ],
    useCases: [
      "Protect sender reputation during high-volume campaigns",
      "Recover from deliverability issues quickly",
      "Maintain compliance across multiple regions (GDPR, CCPA, CAN-SPAM)",
      "Scale outreach without hurting domain health",
    ],
  },
  {
    id: "architect",
    codename: "B",
    name: "The Architect",
    tagline: "AI-Powered Campaign Design",
    shortDescription: "Multi-agent copywriting system with subject line optimization, personalization at scale, and Master Library integration.",
    longDescription: "The Architect Engine uses a multi-agent AI copywriting system to design campaigns that resonate. It integrates with our Master Library of proven templates, optimizes subject lines based on hook analysis research, and enables personalization at scale with continuous learning from results.",
    icon: Cpu,
    color: "emerald-pro-500",
    features: [
      {
        title: "Multi-Agent Copywriting",
        description: "AI-powered system that writes, reviews, and optimizes email copy automatically.",
      },
      {
        title: "Subject Line Optimization",
        description: "Data-driven creation using hook types: timeline (10% reply rate), numbers (6.9%), social proof (5.7%).",
      },
      {
        title: "Personalization at Scale",
        description: "First name +10-15% open rate, company name +5-10%, numbers/statistics +8-12%.",
      },
      {
        title: "Master Library Integration",
        description: ">70% utilization of proven templates refined across millions of sends.",
      },
      {
        title: "ICP-Driven Messaging",
        description: "Deep analysis of your ideal customer profile to inform messaging strategy.",
      },
      {
        title: "Continuous Learning",
        description: "System learns from your results to improve future campaigns.",
      },
    ],
    stats: [
      { value: "<30min", label: "Copy Generation" },
      { value: ">70%", label: "Template Utilization" },
      { value: ">90%", label: "Personalization Coverage" },
      { value: ">60%", label: "A/B Test Win Rate" },
    ],
    useCases: [
      "Launch new product campaigns in under 30 minutes",
      "Test messaging across different segments with A/B testing",
      "Scale personalization without manual effort",
      "Improve response rates on existing campaigns",
    ],
  },
  {
    id: "scientist",
    codename: "A+F",
    name: "The Scientist",
    tagline: "Campaign Optimization",
    shortDescription: "Monday/Wednesday optimization cycles with A/B testing automation, performance alerts, and pattern recognition.",
    longDescription: "The Scientist Engine runs continuous optimization on Monday and Wednesday cycles. It automates A/B testing with 95%+ statistical significance before declaring winners, monitors performance in real-time, and sends alerts for P1/P2 issues within 4 hours.",
    icon: FlaskConical,
    color: "emerald-pro-400",
    features: [
      {
        title: "Mon/Wed Optimization Cycles",
        description: "Twice-weekly optimization runs to continuously improve campaign performance.",
      },
      {
        title: "A/B Testing Automation",
        description: ">95% statistical significance before declaring winners on subject lines and content.",
      },
      {
        title: "Send Time Optimization",
        description: "Tuesday/Wednesday 9-11 AM local for +15%/+12% lift vs average.",
      },
      {
        title: "Performance Alerts",
        description: "<4 hour response time for P1/P2 issues with automated flagging.",
      },
      {
        title: "Pattern Recognition",
        description: "Identifies what's working across campaigns to scale success.",
      },
      {
        title: "Dashboard Updates",
        description: "Real-time metrics with weekly reports every Monday 9 AM PT.",
      },
    ],
    stats: [
      { value: "2/week", label: "Optimization Cycles" },
      { value: ">95%", label: "Statistical Significance" },
      { value: ">10%", label: "Monthly Improvement" },
      { value: "<4hr", label: "Alert Response" },
    ],
    useCases: [
      "Maximize ROI on existing campaigns",
      "Identify top-performing subject lines and hooks",
      "Reduce reply rate issues within 30 days",
      "Scale what works across new campaigns",
    ],
  },
  {
    id: "hunter",
    codename: "G",
    name: "The Hunter",
    tagline: "Reply-Based Lead Expansion",
    shortDescription: "Identifies colleagues from positive replies and finds lookalike companies. 25-50 new leads per positive reply.",
    longDescription: "The Hunter Engine capitalizes on momentum. When a prospect replies positively, Hunter immediately identifies 25-50 similar contacts at the same company and lookalike companies—all within 24 hours. Expansion campaigns achieve >6% reply rates.",
    icon: Crosshair,
    color: "energy-orange",
    features: [
      {
        title: "Colleague Identification",
        description: "Finds 25-50 new leads from colleagues when someone replies positively.",
      },
      {
        title: "Lookalike Companies",
        description: ">80% accuracy matching to original ICP for expanded targeting.",
      },
      {
        title: "Automatic Expansion",
        description: "Expands your pipeline automatically within 24 hours of positive reply.",
      },
      {
        title: "Multi-Threading",
        description: "Reaches multiple stakeholders within engaged accounts.",
      },
      {
        title: "Intent Signal Tracking",
        description: "Monitors buyer intent signals to prioritize outreach timing.",
      },
      {
        title: "ICP Matching",
        description: "Ensures all expanded leads match your ideal customer profile.",
      },
    ],
    stats: [
      { value: "25-50", label: "Leads per Reply" },
      { value: ">80%", label: "Lookalike Accuracy" },
      { value: ">6%", label: "Expansion Reply Rate" },
      { value: "<24hr", label: "Time to Expansion" },
    ],
    useCases: [
      "Expand successful campaigns into new accounts",
      "Multi-thread into engaged companies",
      "Find colleagues of positive responders",
      "Capitalize on market momentum with lookalike targeting",
    ],
  },
  {
    id: "sentinel",
    codename: "H",
    name: "The Sentinel",
    tagline: "Website Visitor Intelligence",
    shortDescription: "Identifies anonymous website visitors, scores intent signals, and finds 8-15 decision-makers at visiting companies.",
    longDescription: "The Sentinel Engine identifies anonymous website visitors, scores their intent signals with >75% accuracy, and finds 8-15 decision-maker contacts at each identified company—all within 1 hour of their visit.",
    icon: Eye,
    color: "emerald-pro-500",
    features: [
      {
        title: "Visitor Identification",
        description: "Identifies 15-25% of anonymous website traffic in real-time.",
      },
      {
        title: "Intent Scoring",
        description: ">75% accuracy in identifying qualified vs total visitors.",
      },
      {
        title: "Decision-Maker Finder",
        description: "Finds 8-15 contacts per identified visiting company.",
      },
      {
        title: "Page-Level Tracking",
        description: "Tracks which pages visitors view to understand their interests.",
      },
      {
        title: "Automated Triggers",
        description: "Launches personalized sequences based on visitor behavior.",
      },
      {
        title: "<1hr Integration",
        description: "From visit to lead in under 1 hour with CRM sync.",
      },
    ],
    stats: [
      { value: "15-25%", label: "Visitor ID Rate" },
      { value: "8-15", label: "Contacts per Visitor" },
      { value: ">75%", label: "Intent Accuracy" },
      { value: "<1hr", label: "Integration Latency" },
    ],
    useCases: [
      "Convert website visitors to meetings",
      "Prioritize outreach to engaged prospects",
      "Personalize follow-up based on browsing behavior",
      "Alert sales to hot leads in real-time",
    ],
  },
];

export function getEngineById(id: string): Engine | undefined {
  return engines.find((engine) => engine.id === id);
}

export function getEngineByCodename(codename: string): Engine | undefined {
  return engines.find((engine) => engine.codename === codename);
}
