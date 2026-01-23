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
    codename: "A",
    name: "The Guardian",
    tagline: "Compliance & Domain Health",
    shortDescription: "24/7 monitoring ensures maximum deliverability. Protects your sender reputation with intelligent domain rotation and health scoring.",
    longDescription: "The Guardian Engine is your first line of defense against deliverability issues. Using advanced monitoring and predictive analytics, it ensures your emails consistently reach the inbox by maintaining optimal domain health, managing sending reputation, and automatically adjusting to keep you compliant with all regulations.",
    icon: Shield,
    color: "emerald-pro-600",
    features: [
      {
        title: "Domain Health Scoring",
        description: "Real-time scoring (0-100) of your sending domains with automated alerts when issues arise.",
      },
      {
        title: "Intelligent Domain Rotation",
        description: "Automatically rotates sending domains based on warmth levels and engagement patterns.",
      },
      {
        title: "DNC Compliance",
        description: "Instant verification against Do-Not-Contact lists before any email is sent.",
      },
      {
        title: "Blacklist Monitoring",
        description: "24/7 monitoring across 100+ blacklists with automated remediation workflows.",
      },
      {
        title: "SPF/DKIM/DMARC Management",
        description: "Ensures all authentication records are properly configured and maintained.",
      },
      {
        title: "Sending Volume Control",
        description: "AI-managed sending limits that optimize for deliverability, not just speed.",
      },
    ],
    stats: [
      { value: "95%+", label: "Avg Deliverability" },
      { value: "< 2%", label: "Bounce Rate" },
      { value: "24/7", label: "Monitoring" },
      { value: "100+", label: "Blacklists Checked" },
    ],
    useCases: [
      "Protect sender reputation during high-volume campaigns",
      "Recover from deliverability issues quickly",
      "Maintain compliance across multiple regions",
      "Scale outreach without hurting domain health",
    ],
  },
  {
    id: "architect",
    codename: "B",
    name: "The Architect",
    tagline: "AI Campaign Design",
    shortDescription: "Transforms your value proposition into high-converting email sequences tailored to each prospect segment.",
    longDescription: "The Architect Engine uses advanced AI to design campaigns that resonate. It analyzes your ICP, studies successful patterns, and crafts personalized sequences that speak directly to each prospect's pain points. From subject lines to call-to-action, every element is optimized for engagement.",
    icon: Cpu,
    color: "emerald-pro-500",
    features: [
      {
        title: "ICP Analysis",
        description: "Deep analysis of your ideal customer profile to inform messaging strategy.",
      },
      {
        title: "Personalized Sequences",
        description: "AI-generated email sequences tailored to each prospect segment.",
      },
      {
        title: "Subject Line Optimization",
        description: "Data-driven subject line creation with A/B testing built in.",
      },
      {
        title: "Value Proposition Mapping",
        description: "Maps your unique value to specific prospect pain points.",
      },
      {
        title: "Multi-Touch Campaigns",
        description: "Designs coordinated sequences across email, LinkedIn, and phone.",
      },
      {
        title: "Template Library",
        description: "Access to proven templates refined across millions of sends.",
      },
    ],
    stats: [
      { value: "3x", label: "Higher Open Rates" },
      { value: "50K+", label: "Templates Tested" },
      { value: "< 1min", label: "Campaign Generation" },
      { value: "12+", label: "Personalization Points" },
    ],
    useCases: [
      "Launch new product campaigns quickly",
      "Test messaging across different segments",
      "Scale personalization without manual effort",
      "Improve response rates on existing campaigns",
    ],
  },
  {
    id: "scientist",
    codename: "C",
    name: "The Scientist",
    tagline: "Campaign Optimization",
    shortDescription: "Continuously analyzes engagement data to optimize send times, subject lines, and messaging for peak performance.",
    longDescription: "The Scientist Engine never stops learning. It monitors every open, click, and reply across all your campaigns, identifying patterns that humans would miss. Using machine learning, it continuously refines timing, messaging, and targeting to maximize your results.",
    icon: FlaskConical,
    color: "emerald-pro-400",
    features: [
      {
        title: "A/B Testing Engine",
        description: "Automated testing of subject lines, content, and CTAs with statistical significance.",
      },
      {
        title: "Send Time Optimization",
        description: "AI determines the perfect send time for each individual prospect.",
      },
      {
        title: "Engagement Analysis",
        description: "Deep analytics on what's working and why across all campaigns.",
      },
      {
        title: "Predictive Scoring",
        description: "Predicts which prospects are most likely to convert.",
      },
      {
        title: "Anomaly Detection",
        description: "Automatically flags unusual patterns that need attention.",
      },
      {
        title: "Performance Forecasting",
        description: "Projects campaign results before you launch.",
      },
    ],
    stats: [
      { value: "40%", label: "Improvement in 90 Days" },
      { value: "1M+", label: "Data Points Analyzed Daily" },
      { value: "Real-time", label: "Optimization" },
      { value: "95%", label: "Prediction Accuracy" },
    ],
    useCases: [
      "Maximize ROI on existing campaigns",
      "Identify top-performing segments",
      "Reduce wasted effort on low-intent leads",
      "Scale what works across new campaigns",
    ],
  },
  {
    id: "hunter",
    codename: "G",
    name: "The Hunter",
    tagline: "Reply-Based Lead Expansion",
    shortDescription: "Identifies similar prospects when someone engages, automatically expanding your reach to likely-to-convert contacts.",
    longDescription: "The Hunter Engine capitalizes on momentum. When a prospect engages positively, Hunter immediately identifies similar contacts who are likely to be equally interested. This creates a snowball effect, turning single wins into multiple opportunities.",
    icon: Crosshair,
    color: "energy-orange",
    features: [
      {
        title: "Lookalike Modeling",
        description: "Finds prospects similar to your best responders across multiple dimensions.",
      },
      {
        title: "Company Mapping",
        description: "Identifies other decision-makers within responding accounts.",
      },
      {
        title: "Intent Signal Tracking",
        description: "Monitors buyer intent signals to prioritize outreach.",
      },
      {
        title: "Automated List Building",
        description: "Continuously builds fresh lists based on engagement patterns.",
      },
      {
        title: "Timing Intelligence",
        description: "Strikes when similar companies show buying signals.",
      },
      {
        title: "Multi-Threading",
        description: "Expands within accounts to reach multiple stakeholders.",
      },
    ],
    stats: [
      { value: "2x", label: "Lead Volume" },
      { value: "85%", label: "Similarity Accuracy" },
      { value: "Auto", label: "List Building" },
      { value: "< 24hr", label: "Response Time" },
    ],
    useCases: [
      "Expand successful campaigns into new accounts",
      "Multi-thread into engaged companies",
      "Find more prospects like your best customers",
      "Capitalize on market momentum",
    ],
  },
  {
    id: "sentinel",
    codename: "H",
    name: "The Sentinel",
    tagline: "Website Visitor Intelligence",
    shortDescription: "Deanonymizes website visitors and triggers personalized outreach to warm leads already exploring your solution.",
    longDescription: "The Sentinel Engine turns anonymous website traffic into qualified opportunities. When a potential buyer visits your site, Sentinel identifies them, enriches their profile, and triggers personalized outreach—reaching them while your solution is top of mind.",
    icon: Eye,
    color: "emerald-pro-500",
    features: [
      {
        title: "Visitor Identification",
        description: "Deanonymizes up to 30% of your website traffic.",
      },
      {
        title: "Company Recognition",
        description: "Identifies the companies browsing your site in real-time.",
      },
      {
        title: "Page-Level Intent",
        description: "Tracks which pages visitors view to understand their interests.",
      },
      {
        title: "Automated Triggers",
        description: "Launches personalized sequences based on visitor behavior.",
      },
      {
        title: "CRM Integration",
        description: "Syncs visitor data directly to your existing workflows.",
      },
      {
        title: "Alert System",
        description: "Notifies sales when high-value prospects are on-site.",
      },
    ],
    stats: [
      { value: "30%", label: "Traffic Identified" },
      { value: "Real-time", label: "Alerts" },
      { value: "5x", label: "Warmer Leads" },
      { value: "100+", label: "Data Points Captured" },
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
