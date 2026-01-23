import {
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Search,
  Target,
  Shield,
  Settings,
  Users,
  Building2,
  Briefcase,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  color: "emerald-pro-600" | "emerald-pro-500" | "emerald-pro-400" | "energy-orange";
  features: ServiceFeature[];
  stats: ServiceStat[];
  process: ServiceProcess[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    id: "appointment-setting",
    name: "Appointment Setting",
    tagline: "Fill Your Calendar with Qualified Meetings",
    shortDescription: "We book meetings with decision-makers who are ready to buy. No tire-kickers, just qualified opportunities.",
    longDescription: "Our appointment setting service combines AI-powered research, multi-channel outreach, and human qualification to deliver sales-ready meetings directly to your calendar. We handle everything from prospecting to scheduling, so your sales team can focus on closing.",
    icon: Calendar,
    color: "emerald-pro-600",
    features: [
      { title: "AI-Powered Prospecting", description: "Find ideal buyers using advanced firmographic and intent data." },
      { title: "Multi-Channel Outreach", description: "Coordinated campaigns across email, LinkedIn, and phone." },
      { title: "Human Qualification", description: "Every meeting is vetted to ensure it meets your criteria." },
      { title: "Calendar Integration", description: "Meetings booked directly into your team's calendars." },
      { title: "CRM Sync", description: "All lead data flows seamlessly into your existing systems." },
      { title: "Performance Tracking", description: "Real-time dashboards show pipeline impact." },
    ],
    stats: [
      { value: "15-20", label: "Meetings/Month (Avg)" },
      { value: "95%", label: "Show Rate" },
      { value: "30%", label: "Close Rate (Avg)" },
      { value: "3x", label: "Pipeline Growth" },
    ],
    process: [
      { step: 1, title: "ICP Definition", description: "We analyze your best customers to define your ideal buyer profile." },
      { step: 2, title: "List Building", description: "AI-powered research identifies thousands of matching prospects." },
      { step: 3, title: "Campaign Launch", description: "Multi-channel sequences engage prospects with personalized messaging." },
      { step: 4, title: "Qualification", description: "Interested prospects are vetted against your criteria." },
      { step: 5, title: "Meeting Delivery", description: "Qualified meetings appear directly on your calendar." },
    ],
    benefits: [
      "Predictable pipeline generation",
      "More time selling, less time prospecting",
      "Higher quality conversations",
      "Faster revenue growth",
    ],
    faqs: [
      { question: "How many meetings can I expect?", answer: "Most clients see 15-20 qualified meetings per month after the initial ramp-up period." },
      { question: "What's your show rate?", answer: "Our average show rate is 95% because we use confirmation sequences and proper qualification." },
      { question: "How do you define a qualified meeting?", answer: "We work with you to establish clear criteria based on title, company size, budget, and timing." },
    ],
  },
  {
    id: "cold-email-services",
    name: "Cold Email Outreach",
    tagline: "AI-Powered Email Campaigns That Convert",
    shortDescription: "Reach your ideal buyers with personalized email sequences that feel human but scale infinitely.",
    longDescription: "Our cold email service leverages all 5 AI engines to deliver highly personalized, compliant email campaigns that land in the inbox and generate responses. From infrastructure setup to copy optimization, we handle everything.",
    icon: Mail,
    color: "emerald-pro-500",
    features: [
      { title: "Infrastructure Setup", description: "Multiple sending domains, proper authentication, and warming." },
      { title: "AI Copywriting", description: "Personalized emails that resonate with each prospect." },
      { title: "Deliverability Focus", description: "Guardian Engine ensures 95%+ inbox placement." },
      { title: "A/B Testing", description: "Scientist Engine continuously optimizes messaging." },
      { title: "Reply Management", description: "Intelligent categorization and response handling." },
      { title: "Compliance Built-in", description: "DNC checking, unsubscribe handling, and more." },
    ],
    stats: [
      { value: "95%+", label: "Deliverability" },
      { value: "35%+", label: "Open Rate" },
      { value: "3.5%", label: "Reply Rate" },
      { value: "50K+", label: "Emails/Month" },
    ],
    process: [
      { step: 1, title: "Infrastructure Setup", description: "Domains, mailboxes, and authentication configured properly." },
      { step: 2, title: "Audience Research", description: "Deep analysis of your ICP and best customers." },
      { step: 3, title: "Campaign Design", description: "Architect Engine crafts personalized sequences." },
      { step: 4, title: "Launch & Monitor", description: "Guardian ensures deliverability while campaigns run." },
      { step: 5, title: "Optimize & Scale", description: "Scientist Engine improves performance over time." },
    ],
    benefits: [
      "Reach thousands of prospects efficiently",
      "Personalization at scale",
      "Protected sender reputation",
      "Continuous improvement",
    ],
    faqs: [
      { question: "Will my emails go to spam?", answer: "Our Guardian Engine maintains 95%+ deliverability through proper infrastructure, warming, and monitoring." },
      { question: "How personalized are the emails?", answer: "Every email includes multiple personalization points based on the prospect's role, company, and behavior." },
      { question: "What volume can you handle?", answer: "We can scale from thousands to hundreds of thousands of emails per month." },
    ],
  },
  {
    id: "cold-calling-services",
    name: "Cold Calling",
    tagline: "Book 30% More Appointments with Strategic Calling",
    shortDescription: "Professional SDRs make targeted calls that complement your digital outreach and boost conversion rates.",
    longDescription: "Cold calling remains one of the most effective ways to reach decision-makers. Our trained SDRs use data-driven scripts and strategic timing to connect with prospects who've engaged with your digital campaigns, dramatically increasing conversion rates.",
    icon: Phone,
    color: "emerald-pro-400",
    features: [
      { title: "Trained SDRs", description: "Professional callers who understand B2B sales." },
      { title: "Data-Driven Scripts", description: "Messaging optimized through continuous testing." },
      { title: "Multi-Touch Integration", description: "Calls coordinated with email and LinkedIn." },
      { title: "Call Recording", description: "Full transparency into every conversation." },
      { title: "CRM Logging", description: "All activities synced to your system." },
      { title: "Performance Analytics", description: "Detailed metrics on connect and conversion rates." },
    ],
    stats: [
      { value: "30%", label: "More Appointments" },
      { value: "15%", label: "Connect Rate" },
      { value: "500+", label: "Calls/Day Capacity" },
      { value: "2x", label: "Response Rate Lift" },
    ],
    process: [
      { step: 1, title: "Script Development", description: "Custom scripts based on your value prop and ICP." },
      { step: 2, title: "SDR Training", description: "Callers learn your product and objection handling." },
      { step: 3, title: "List Prioritization", description: "Focus on prospects showing engagement signals." },
      { step: 4, title: "Calling Campaigns", description: "Strategic outreach at optimal times." },
      { step: 5, title: "Meeting Handoff", description: "Qualified meetings transferred to your team." },
    ],
    benefits: [
      "Higher overall conversion rates",
      "Multi-channel reinforcement",
      "Real-time prospect feedback",
      "Faster deal velocity",
    ],
    faqs: [
      { question: "Who makes the calls?", answer: "Our team of trained SDRs with B2B sales experience." },
      { question: "How do you prioritize who to call?", answer: "We focus on prospects showing engagement signals from email or web visits." },
      { question: "Can I listen to the calls?", answer: "Yes, all calls are recorded and available for review." },
    ],
  },
  {
    id: "linkedin-lead-generation-services",
    name: "LinkedIn Lead Generation",
    tagline: "Expand Your Reach on the World's B2B Network",
    shortDescription: "Strategic LinkedIn outreach that builds relationships and generates opportunities without damaging your brand.",
    longDescription: "LinkedIn is where B2B buyers live. Our LinkedIn service uses careful, compliant outreach to connect with decision-makers, build relationships, and generate qualified opportunities—all while protecting your professional reputation.",
    icon: Linkedin,
    color: "emerald-pro-600",
    features: [
      { title: "Profile Optimization", description: "Transform your profile into a conversion machine." },
      { title: "Targeted Outreach", description: "Connect with ideal buyers using advanced filters." },
      { title: "Message Sequencing", description: "Multi-touch campaigns that nurture relationships." },
      { title: "Content Strategy", description: "Posts that establish thought leadership." },
      { title: "Sales Navigator Integration", description: "Leverage LinkedIn's best prospecting tools." },
      { title: "Brand Protection", description: "Careful volume management to avoid restrictions." },
    ],
    stats: [
      { value: "40%", label: "Accept Rate" },
      { value: "25%", label: "Reply Rate" },
      { value: "1000+", label: "New Connections/Month" },
      { value: "3x", label: "Profile Views" },
    ],
    process: [
      { step: 1, title: "Profile Audit", description: "Optimize your LinkedIn presence for conversions." },
      { step: 2, title: "Audience Building", description: "Identify and segment ideal prospects." },
      { step: 3, title: "Connection Campaigns", description: "Strategic outreach to grow your network." },
      { step: 4, title: "Relationship Nurturing", description: "Multi-touch sequences build trust." },
      { step: 5, title: "Opportunity Handoff", description: "Warm leads delivered to your inbox." },
    ],
    benefits: [
      "Access to key decision-makers",
      "Relationship-first approach",
      "Thought leadership positioning",
      "Sustainable network growth",
    ],
    faqs: [
      { question: "Will this get my account restricted?", answer: "No. We use conservative volume limits and best practices to protect your account." },
      { question: "Do I need Sales Navigator?", answer: "It helps but isn't required. We can work with a standard LinkedIn account." },
      { question: "How many connections can I expect?", answer: "Typically 1,000+ new targeted connections per month." },
    ],
  },
  {
    id: "lead-research",
    name: "Lead Research",
    tagline: "Hand-Picked, Verified Prospect Lists",
    shortDescription: "Custom-built prospect lists with verified contact data and deep company insights.",
    longDescription: "Quality lists are the foundation of successful outreach. Our research team combines AI-powered tools with human verification to build highly targeted prospect lists that include verified emails, direct dials, and detailed company insights.",
    icon: Search,
    color: "emerald-pro-500",
    features: [
      { title: "Custom ICP Matching", description: "Prospects matched to your exact criteria." },
      { title: "Email Verification", description: "Every email tested for deliverability." },
      { title: "Direct Dial Discovery", description: "Phone numbers for key decision-makers." },
      { title: "Company Intelligence", description: "Firmographic and technographic data included." },
      { title: "Intent Signals", description: "Identify prospects showing buying behavior." },
      { title: "Continuous Updates", description: "Lists refreshed to maintain accuracy." },
    ],
    stats: [
      { value: "95%+", label: "Email Accuracy" },
      { value: "70%", label: "Direct Dial Rate" },
      { value: "50+", label: "Data Points/Contact" },
      { value: "24hr", label: "Delivery Time" },
    ],
    process: [
      { step: 1, title: "Criteria Definition", description: "Define your ideal buyer profile in detail." },
      { step: 2, title: "AI Prospecting", description: "Initial list built using multiple data sources." },
      { step: 3, title: "Human Verification", description: "Each contact manually verified." },
      { step: 4, title: "Enrichment", description: "Additional data points appended." },
      { step: 5, title: "Delivery", description: "Clean list delivered in your preferred format." },
    ],
    benefits: [
      "Higher deliverability rates",
      "Better connect rates",
      "More relevant conversations",
      "Time savings for your team",
    ],
    faqs: [
      { question: "How accurate are the emails?", answer: "We guarantee 95%+ accuracy with full refund for bounces above threshold." },
      { question: "What data sources do you use?", answer: "We combine multiple premium data providers with our own verification systems." },
      { question: "How quickly can you deliver?", answer: "Standard lists are delivered within 24-48 hours." },
    ],
  },
  {
    id: "account-based-marketing-services",
    name: "Account-Based Marketing",
    tagline: "Target Your Dream Accounts with Precision",
    shortDescription: "Coordinated campaigns that engage entire buying committees at your most valuable target accounts.",
    longDescription: "ABM focuses your resources on the accounts that matter most. We orchestrate multi-channel campaigns that reach multiple stakeholders within target accounts, building consensus and accelerating complex B2B deals.",
    icon: Target,
    color: "energy-orange",
    features: [
      { title: "Account Selection", description: "Data-driven identification of highest-value targets." },
      { title: "Contact Mapping", description: "Full buying committee identification." },
      { title: "Personalized Content", description: "Account-specific messaging and assets." },
      { title: "Multi-Threading", description: "Engage multiple stakeholders simultaneously." },
      { title: "Intent Monitoring", description: "Track account-level engagement signals." },
      { title: "Sales Alignment", description: "Coordinated handoffs to your sales team." },
    ],
    stats: [
      { value: "5x", label: "Deal Size Increase" },
      { value: "70%", label: "Account Engagement" },
      { value: "3+", label: "Contacts/Account" },
      { value: "40%", label: "Faster Close" },
    ],
    process: [
      { step: 1, title: "Account Selection", description: "Identify and prioritize target accounts." },
      { step: 2, title: "Committee Mapping", description: "Research all relevant stakeholders." },
      { step: 3, title: "Content Creation", description: "Develop account-specific messaging." },
      { step: 4, title: "Orchestrated Outreach", description: "Coordinated multi-channel campaigns." },
      { step: 5, title: "Sales Handoff", description: "Warm introductions to your sales team." },
    ],
    benefits: [
      "Larger deal sizes",
      "Shorter sales cycles",
      "Stronger relationships",
      "Better resource allocation",
    ],
    faqs: [
      { question: "How many accounts should we target?", answer: "We typically recommend starting with 50-100 high-value accounts." },
      { question: "How do you personalize for each account?", answer: "We research each account and create customized messaging based on their specific situation." },
      { question: "How does this integrate with sales?", answer: "We work closely with your sales team to ensure seamless handoffs and feedback loops." },
    ],
  },
  {
    id: "deliverability-consulting",
    name: "Deliverability Consulting",
    tagline: "Get Out of Spam and Stay There",
    shortDescription: "Expert guidance to fix deliverability issues and maintain healthy sender reputation.",
    longDescription: "Email deliverability problems can destroy your outbound efforts. Our deliverability experts diagnose issues, implement fixes, and provide ongoing monitoring to ensure your emails consistently reach the inbox.",
    icon: Shield,
    color: "emerald-pro-600",
    features: [
      { title: "Full Audit", description: "Comprehensive analysis of your email infrastructure." },
      { title: "Authentication Setup", description: "SPF, DKIM, DMARC properly configured." },
      { title: "Domain Strategy", description: "Optimal sending domain architecture." },
      { title: "Warming Protocols", description: "Safe ramp-up for new domains." },
      { title: "Blacklist Management", description: "Monitoring and remediation services." },
      { title: "Ongoing Monitoring", description: "24/7 alerts for deliverability issues." },
    ],
    stats: [
      { value: "95%+", label: "Inbox Rate" },
      { value: "<2%", label: "Bounce Rate" },
      { value: "100+", label: "Blacklists Monitored" },
      { value: "24/7", label: "Monitoring" },
    ],
    process: [
      { step: 1, title: "Infrastructure Audit", description: "Analyze current setup and identify issues." },
      { step: 2, title: "Authentication Fix", description: "Correct SPF, DKIM, and DMARC records." },
      { step: 3, title: "Reputation Repair", description: "Address blacklisting and spam issues." },
      { step: 4, title: "Best Practices", description: "Implement sending volume controls." },
      { step: 5, title: "Ongoing Monitoring", description: "Continuous oversight to maintain health." },
    ],
    benefits: [
      "Higher inbox placement",
      "Better campaign performance",
      "Protected brand reputation",
      "Peace of mind",
    ],
    faqs: [
      { question: "How long does it take to fix deliverability?", answer: "Simple fixes can show results in days. Complex issues may take 2-4 weeks." },
      { question: "Can you help if we're blacklisted?", answer: "Yes, we have experience with delisting from all major blacklists." },
      { question: "Do you provide ongoing support?", answer: "Yes, we offer ongoing monitoring and maintenance plans." },
    ],
  },
  {
    id: "crm-consulting-services",
    name: "CRM Consulting",
    tagline: "Optimize Your Sales Operations",
    shortDescription: "CRM setup, integration, and optimization to maximize your sales team's efficiency.",
    longDescription: "Your CRM should accelerate your sales process, not slow it down. We help configure, integrate, and optimize your CRM to ensure clean data, efficient workflows, and accurate reporting.",
    icon: Settings,
    color: "emerald-pro-500",
    features: [
      { title: "CRM Setup", description: "New implementation or migration services." },
      { title: "Integration", description: "Connect your CRM to key tools and data sources." },
      { title: "Workflow Automation", description: "Automate repetitive tasks and processes." },
      { title: "Data Cleanup", description: "Dedupe, enrich, and standardize your data." },
      { title: "Reporting Dashboards", description: "Custom reports for sales visibility." },
      { title: "Training", description: "Ensure your team maximizes the platform." },
    ],
    stats: [
      { value: "50%", label: "Time Saved" },
      { value: "95%+", label: "Data Accuracy" },
      { value: "2x", label: "Rep Productivity" },
      { value: "100+", label: "Integrations" },
    ],
    process: [
      { step: 1, title: "Discovery", description: "Understand your current setup and goals." },
      { step: 2, title: "Architecture", description: "Design optimal data model and workflows." },
      { step: 3, title: "Implementation", description: "Configure and customize your CRM." },
      { step: 4, title: "Integration", description: "Connect to your other tools." },
      { step: 5, title: "Training", description: "Ensure team adoption and proficiency." },
    ],
    benefits: [
      "Cleaner data",
      "Faster sales cycles",
      "Better forecasting",
      "Higher adoption",
    ],
    faqs: [
      { question: "Which CRMs do you work with?", answer: "We specialize in Salesforce, HubSpot, and Pipedrive." },
      { question: "Can you migrate from our current CRM?", answer: "Yes, we handle full data migration with validation." },
      { question: "Do you provide ongoing support?", answer: "Yes, we offer maintenance and admin-as-a-service plans." },
    ],
  },
  {
    id: "outsourced-sdr-services",
    name: "Outsourced SDR",
    tagline: "A Full Sales Development Team On-Demand",
    shortDescription: "Experienced SDRs dedicated to your business, managed and trained by our team.",
    longDescription: "Building an in-house SDR team is expensive and time-consuming. Our outsourced SDR service provides experienced, trained sales development reps who work as an extension of your team—without the hiring headaches.",
    icon: Users,
    color: "emerald-pro-400",
    features: [
      { title: "Dedicated SDRs", description: "Full-time reps focused on your business." },
      { title: "Management Included", description: "We handle hiring, training, and oversight." },
      { title: "Custom Playbooks", description: "Sales processes tailored to your product." },
      { title: "Tech Stack Provided", description: "All tools and software included." },
      { title: "Performance Tracking", description: "Full visibility into activity and results." },
      { title: "Flexible Scaling", description: "Add or reduce capacity as needed." },
    ],
    stats: [
      { value: "50%", label: "Cost Savings" },
      { value: "2 weeks", label: "Ramp Time" },
      { value: "100+", label: "Activities/Day" },
      { value: "15-20", label: "Meetings/Month" },
    ],
    process: [
      { step: 1, title: "Discovery", description: "Understand your product, market, and goals." },
      { step: 2, title: "Team Assembly", description: "Select and assign dedicated SDRs." },
      { step: 3, title: "Training", description: "Deep product and process training." },
      { step: 4, title: "Launch", description: "Begin prospecting and outreach." },
      { step: 5, title: "Optimize", description: "Continuous improvement based on results." },
    ],
    benefits: [
      "Faster time-to-pipeline",
      "Lower cost than in-house",
      "No hiring or training burden",
      "Flexible capacity",
    ],
    faqs: [
      { question: "How many SDRs do I need?", answer: "It depends on your target pipeline. Most clients start with 1-2 dedicated SDRs." },
      { question: "How quickly can they ramp up?", answer: "Our SDRs are typically fully productive within 2 weeks." },
      { question: "Can they use our existing tools?", answer: "Yes, they can work within your existing tech stack." },
    ],
  },
  {
    id: "enterprise-lead-generation",
    name: "Enterprise Lead Generation",
    tagline: "Navigate Complex Enterprise Sales Cycles",
    shortDescription: "Specialized strategies for landing large enterprise accounts with long sales cycles.",
    longDescription: "Enterprise deals require a different approach. We combine account-based strategies, multi-threading, and patient nurturing to help you break into Fortune 500 companies and close seven-figure deals.",
    icon: Building2,
    color: "emerald-pro-600",
    features: [
      { title: "Strategic Account Planning", description: "Detailed plans for each target enterprise." },
      { title: "Executive Targeting", description: "Reach C-suite and VP-level decision-makers." },
      { title: "Multi-Threading", description: "Engage multiple stakeholders simultaneously." },
      { title: "Content Development", description: "Enterprise-grade thought leadership." },
      { title: "Event Support", description: "Conference and event lead gen." },
      { title: "Long-Cycle Nurturing", description: "Patient engagement over extended timelines." },
    ],
    stats: [
      { value: "$500K+", label: "Avg Deal Size" },
      { value: "40%", label: "Enterprise Win Rate" },
      { value: "5+", label: "Contacts/Account" },
      { value: "F500", label: "Clients Won" },
    ],
    process: [
      { step: 1, title: "Account Tiering", description: "Identify and prioritize enterprise targets." },
      { step: 2, title: "Stakeholder Mapping", description: "Research entire buying committees." },
      { step: 3, title: "Multi-Touch Campaigns", description: "Coordinated outreach across channels." },
      { step: 4, title: "Executive Engagement", description: "Direct access to decision-makers." },
      { step: 5, title: "Deal Support", description: "Continued assistance through the sales cycle." },
    ],
    benefits: [
      "Access to largest accounts",
      "Higher deal values",
      "Stronger competitive positioning",
      "Long-term relationships",
    ],
    faqs: [
      { question: "What size companies do you target?", answer: "We focus on companies with 1,000+ employees and $100M+ revenue." },
      { question: "How long does enterprise sales take?", answer: "Enterprise cycles typically run 6-12 months. We plan accordingly." },
      { question: "Can you help with RFP responses?", answer: "Yes, we can support the full enterprise sales process." },
    ],
  },
  {
    id: "smb-lead-generation",
    name: "SMB Lead Generation",
    tagline: "High-Volume Lead Gen for the Mid-Market",
    shortDescription: "Efficient, scalable campaigns for companies targeting small and medium businesses.",
    longDescription: "SMB sales require volume and efficiency. Our SMB lead generation service uses automation and AI to reach large numbers of prospects quickly while maintaining personalization and quality.",
    icon: Briefcase,
    color: "emerald-pro-500",
    features: [
      { title: "High-Volume Outreach", description: "Reach thousands of SMB prospects efficiently." },
      { title: "Automated Sequences", description: "Scalable campaigns with personal touch." },
      { title: "Quick Qualification", description: "Fast identification of ready-to-buy leads." },
      { title: "Self-Service Options", description: "Support for product-led growth models." },
      { title: "Trial Conversions", description: "Nurturing for freemium products." },
      { title: "Rapid Iteration", description: "Quick testing and optimization cycles." },
    ],
    stats: [
      { value: "100K+", label: "Prospects/Month" },
      { value: "7 days", label: "Avg Sales Cycle" },
      { value: "20%", label: "Conv Rate" },
      { value: "3x", label: "Pipeline" },
    ],
    process: [
      { step: 1, title: "Segment Definition", description: "Identify SMB segments with best fit." },
      { step: 2, title: "List Building", description: "Build large, targeted prospect lists." },
      { step: 3, title: "Campaign Launch", description: "High-volume automated outreach." },
      { step: 4, title: "Lead Scoring", description: "Identify hottest leads quickly." },
      { step: 5, title: "Handoff", description: "Deliver qualified leads to your team." },
    ],
    benefits: [
      "Predictable lead flow",
      "Lower cost per lead",
      "Faster sales cycles",
      "Scalable growth",
    ],
    faqs: [
      { question: "What company sizes do you target?", answer: "Typically 10-500 employees, depending on your ICP." },
      { question: "How personalized are SMB campaigns?", answer: "We balance personalization with efficiency using AI and templates." },
      { question: "Can you support product trials?", answer: "Yes, we have nurture sequences designed for freemium conversion." },
    ],
  },
  {
    id: "startup-lead-generation",
    name: "Startup Lead Generation",
    tagline: "Accelerate Your Go-to-Market",
    shortDescription: "Cost-effective lead generation designed for early-stage companies with big ambitions.",
    longDescription: "Startups need leads but often lack the budget for enterprise services. Our startup package delivers the same AI-powered lead generation at a price point that works for early-stage companies, helping you prove product-market fit faster.",
    icon: Rocket,
    color: "energy-orange",
    features: [
      { title: "Startup Pricing", description: "Packages designed for early-stage budgets." },
      { title: "Quick Launch", description: "Get campaigns running in days, not weeks." },
      { title: "ICP Validation", description: "Test and refine your target market." },
      { title: "Messaging Testing", description: "Find the value prop that resonates." },
      { title: "Founder Support", description: "Direct access to our team." },
      { title: "Investor Updates", description: "Metrics formatted for fundraising." },
    ],
    stats: [
      { value: "2 weeks", label: "Time to Launch" },
      { value: "10-15", label: "Meetings/Month" },
      { value: "60%", label: "Cost Savings" },
      { value: "100+", label: "Startups Served" },
    ],
    process: [
      { step: 1, title: "Quick Discovery", description: "Rapid understanding of your product and market." },
      { step: 2, title: "ICP Hypothesis", description: "Define initial target segments to test." },
      { step: 3, title: "MVP Campaigns", description: "Launch lean campaigns quickly." },
      { step: 4, title: "Data Collection", description: "Gather market feedback and signals." },
      { step: 5, title: "Iterate", description: "Refine based on results." },
    ],
    benefits: [
      "Faster product-market fit",
      "Capital-efficient growth",
      "Data for fundraising",
      "Focus on building product",
    ],
    faqs: [
      { question: "What stage startups do you work with?", answer: "Pre-seed through Series A, though we've helped companies at all stages." },
      { question: "What if we don't know our ICP yet?", answer: "That's fine—we help you test and refine your target market." },
      { question: "Do you offer equity arrangements?", answer: "In select cases, we consider equity components. Let's discuss." },
    ],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
