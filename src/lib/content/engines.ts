import { Shield, Cpu, FlaskConical, Crosshair, Eye, FileText, Scale, Brain, Rocket, Activity, Compass, type LucideIcon } from "lucide-react";

export interface EngineFeature {
  title: string;
  description: string;
}

export interface EngineStat {
  value: string;
  label: string;
}

export type EngineCategory = "lead-gen" | "csm-automation";

export interface Engine {
  id: string;
  codename: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  color: "emerald-pro-600" | "emerald-pro-500" | "emerald-pro-400" | "energy-orange" | "blue-500" | "purple-500";
  category: EngineCategory;
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
    category: "lead-gen",
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
    category: "lead-gen",
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
    category: "lead-gen",
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
    category: "lead-gen",
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
    category: "lead-gen",
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
  // CSM Automation Suite Engines (I-N)
  {
    id: "informant",
    codename: "I",
    name: "The Informant",
    tagline: "Automated Performance Reporting",
    shortDescription: "AI-generated weekly reports with executive summaries, trend analysis, and branded dashboards delivered automatically every Sunday.",
    longDescription: "The Informant Engine eliminates manual reporting entirely. Every Sunday at 8 PM PT, it automatically pulls campaign metrics, generates AI-powered executive summaries via GPT-4o, and delivers branded HTML reports directly to clients—saving 30-45 minutes per client per week.",
    icon: FileText,
    color: "blue-500",
    category: "csm-automation",
    features: [
      {
        title: "Automated Weekly Reports",
        description: "Executive-ready reports delivered every Sunday at 8 PM PT without any manual work.",
      },
      {
        title: "AI-Generated Insights",
        description: "GPT-4o analyzes data and generates actionable recommendations automatically.",
      },
      {
        title: "Trend Analysis",
        description: "Week-over-week comparisons with automatic anomaly detection.",
      },
      {
        title: "Branded Dashboards",
        description: "Professional HTML emails with your metrics visualized clearly.",
      },
      {
        title: "Historical Logging",
        description: "All reports archived in Report_History for easy reference.",
      },
      {
        title: "Team Notifications",
        description: "Slack alerts to #client-reports when reports are delivered.",
      },
    ],
    stats: [
      { value: "0 min", label: "Manual Report Time" },
      { value: "Weekly", label: "Automatic Delivery" },
      { value: "100%", label: "Report Completion" },
      { value: "AI", label: "Powered Insights" },
    ],
    useCases: [
      "Eliminate manual report compilation",
      "Deliver consistent client communication",
      "Provide proactive transparency to build trust",
      "Free up CSM time for strategic work",
    ],
  },
  {
    id: "judge",
    codename: "J",
    name: "The Judge",
    tagline: "Issue Detection & Auto-Healing",
    shortDescription: "24/7 infrastructure monitoring with automatic issue detection and self-healing capabilities. Catches problems before clients notice them.",
    longDescription: "The Judge Engine transforms operations from reactive firefighting to proactive resolution. Running every 4 hours, it monitors inbox health, domain reputation, and campaign performance—automatically fixing common issues like inbox rotation and campaign pausing before clients are ever impacted.",
    icon: Scale,
    color: "purple-500",
    category: "csm-automation",
    features: [
      {
        title: "24/7 Monitoring",
        description: "Infrastructure health checked every 4 hours, anomaly detection running continuously.",
      },
      {
        title: "Auto-Fix Actions",
        description: "Automatically rotates flagged inboxes, pauses campaigns, and disables compromised domains.",
      },
      {
        title: "Proactive Alerts",
        description: "P1 critical issues to #alerts-critical, P2-P4 to #alerts-general with severity classification.",
      },
      {
        title: "Threshold Monitoring",
        description: "Deliverability <95%, bounce >2%, reply drop >15% all trigger automatic responses.",
      },
      {
        title: "Blacklist Detection",
        description: "Instant detection of domain blacklisting with remediation protocol.",
      },
      {
        title: "Client Notifications",
        description: "Proactive 'We detected and fixed this' messages to clients.",
      },
    ],
    stats: [
      { value: "4hr", label: "Check Frequency" },
      { value: "<15min", label: "Auto-Fix Time" },
      { value: "85%", label: "Issues Auto-Resolved" },
      { value: "24/7", label: "Monitoring" },
    ],
    useCases: [
      "Catch deliverability problems in hours, not days",
      "Transform client experience from reactive to proactive",
      "Demonstrate operational excellence to clients",
      "Reduce escalation volume through prevention",
    ],
  },
  {
    id: "keeper",
    codename: "K",
    name: "The Keeper",
    tagline: "AI-Powered Knowledge Brain",
    shortDescription: "Instant answers to operational questions via AI search across all knowledge sources. Eliminates knowledge silos and reduces team dependency.",
    longDescription: "The Keeper Engine centralizes institutional knowledge and provides instant answers. It searches across Knowledge_Base, SOPs, FAQ, and Troubleshooting guides, returning AI-generated responses with confidence levels—ensuring consistent, accurate information every time.",
    icon: Brain,
    color: "purple-500",
    category: "csm-automation",
    features: [
      {
        title: "Instant Answers",
        description: "Query via webhook or Slack /ask command and receive answers in seconds.",
      },
      {
        title: "Multi-Source Search",
        description: "Searches Knowledge_Base, SOPs, FAQ, and Troubleshooting guides simultaneously.",
      },
      {
        title: "Confidence Scoring",
        description: "High/Medium/Low confidence levels with source citations.",
      },
      {
        title: "Knowledge Gap Detection",
        description: "Low-confidence queries flagged to #knowledge-gaps for documentation improvement.",
      },
      {
        title: "Continuous Learning",
        description: "System improves as new documentation is added.",
      },
      {
        title: "Query Logging",
        description: "All queries logged for analysis and improvement.",
      },
    ],
    stats: [
      { value: "<1min", label: "Response Time" },
      { value: "95%", label: "Query Coverage" },
      { value: "24/7", label: "Availability" },
      { value: "15x", label: "Faster Than Manual" },
    ],
    useCases: [
      "Onboard new team members faster",
      "Provide consistent answers every time",
      "Reduce team interruptions for questions",
      "Scale knowledge without adding headcount",
    ],
  },
  {
    id: "launcher",
    codename: "L",
    name: "The Launcher",
    tagline: "Automated Client Onboarding",
    shortDescription: "Streamlined 14-day onboarding with automatic reminders, asset collection, and progress tracking. Every client gets a professional, consistent experience.",
    longDescription: "The Launcher Engine transforms chaotic manual onboarding into a streamlined automated process. It generates client IDs, creates Google Drive folders, sends branded welcome emails, and manages escalating reminders for asset collection—reducing onboarding time from 5-6 hours to 1-2 hours.",
    icon: Rocket,
    color: "blue-500",
    category: "csm-automation",
    features: [
      {
        title: "Automated Initialization",
        description: "Generates client ID, creates records, Drive folder, and welcome email automatically.",
      },
      {
        title: "Asset Collection",
        description: "Tracks 5 required assets with automatic validation on submission.",
      },
      {
        title: "Escalating Reminders",
        description: "24hr friendly, 48hr urgent, 72hr final reminders sent automatically.",
      },
      {
        title: "Progress Tracking",
        description: "Real-time visibility into onboarding status via Onboarding_Tracker.",
      },
      {
        title: "Team Notifications",
        description: "Slack alerts to #new-clients and #onboarding for visibility.",
      },
      {
        title: "14-Day Timeline",
        description: "Structured phases from welcome to launch with clear milestones.",
      },
    ],
    stats: [
      { value: "1-2hr", label: "Onboarding Time" },
      { value: "70%", label: "Time Saved" },
      { value: "14 days", label: "To Launch" },
      { value: "100%", label: "Consistency" },
    ],
    useCases: [
      "Deliver professional onboarding experience to every client",
      "Reduce manual onboarding work by 70%",
      "Ensure no onboarding steps are missed",
      "Scale client acquisition without proportional headcount",
    ],
  },
  {
    id: "monitor",
    codename: "M",
    name: "The Monitor",
    tagline: "Churn Risk Detection & Intervention",
    shortDescription: "Weekly health score analysis with AI-generated intervention playbooks. Protects revenue through early warning detection of at-risk accounts.",
    longDescription: "The Monitor Engine protects revenue through early warning detection. Every Monday, it analyzes behavioral and performance signals to calculate health scores (0-100), classify risk levels, and generate AI-powered intervention playbooks for at-risk accounts—enabling proactive outreach before issues escalate.",
    icon: Activity,
    color: "purple-500",
    category: "csm-automation",
    features: [
      {
        title: "Health Score Calculation",
        description: "0-100 score calculated weekly from weighted risk signals.",
      },
      {
        title: "Risk Classification",
        description: "Healthy (80-100), At Risk (50-79), Critical (<50) classifications.",
      },
      {
        title: "AI Intervention Playbooks",
        description: "GPT-4o generates specific action plans for at-risk accounts.",
      },
      {
        title: "Weighted Risk Signals",
        description: "Missed calls (25%), low replies (20%), negative sentiment (20%), engagement (15%), support (10%), renewal (10%).",
      },
      {
        title: "Leadership Visibility",
        description: "Weekly portfolio summary to #leadership with ARR at risk.",
      },
      {
        title: "Proactive Alerts",
        description: "Critical accounts alert to #alerts-critical, at-risk to #client-health.",
      },
    ],
    stats: [
      { value: "Weekly", label: "Health Analysis" },
      { value: "6", label: "Risk Signals" },
      { value: "AI", label: "Powered Playbooks" },
      { value: "Early", label: "Warning System" },
    ],
    useCases: [
      "Identify at-risk accounts before they churn",
      "Enable proactive intervention vs reactive firefighting",
      "Give leadership visibility into portfolio health",
      "Prioritize CSM time based on risk data",
    ],
  },
  {
    id: "navigator",
    codename: "N",
    name: "The Navigator",
    tagline: "Self-Serve Client Portal",
    shortDescription: "24/7 self-service portal for common client requests. Instant actions, review workflows, and full audit trails reduce admin overhead.",
    longDescription: "The Navigator Engine reduces administrative overhead by enabling clients to handle routine requests themselves. Instant actions (ICP updates, pause campaigns, download reports) execute immediately, while review actions route through CSM approval—all with full audit trails.",
    icon: Compass,
    color: "blue-500",
    category: "csm-automation",
    features: [
      {
        title: "Instant Actions",
        description: "Update ICP, pause/resume campaigns, download reports—executed immediately.",
      },
      {
        title: "Review Workflows",
        description: "Lead uploads, copy changes, and call scheduling route through CSM approval.",
      },
      {
        title: "24/7 Availability",
        description: "Clients can submit requests anytime, not just business hours.",
      },
      {
        title: "Status Tracking",
        description: "Real-time visibility into request status from submission to completion.",
      },
      {
        title: "Audit Trail",
        description: "Full logging of all requests and actions in Portal_Requests.",
      },
      {
        title: "Slack Integration",
        description: "Review items posted to #client-requests for CSM action.",
      },
    ],
    stats: [
      { value: "<5min", label: "Instant Actions" },
      { value: "24/7", label: "Availability" },
      { value: "85%", label: "Self-Served" },
      { value: "100%", label: "Audit Coverage" },
    ],
    useCases: [
      "Eliminate email ping-pong for simple requests",
      "Enable faster client turnaround times",
      "Protect CSM time for strategic work",
      "Provide clients control over their campaigns",
    ],
  },
];

// Helper functions
export const leadGenEngines = engines.filter(e => e.category === "lead-gen");
export const csmEngines = engines.filter(e => e.category === "csm-automation");

export function getEngineById(id: string): Engine | undefined {
  return engines.find((engine) => engine.id === id);
}

export function getEngineByCodename(codename: string): Engine | undefined {
  return engines.find((engine) => engine.codename === codename);
}
