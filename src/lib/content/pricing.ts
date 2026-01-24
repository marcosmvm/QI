export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSubtext: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
  onboardingFee?: string;
  meetingBonus?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "founding-partner",
    name: "Founding Partner",
    tagline: "Invite-only exclusive pricing",
    price: "$2,000",
    priceSubtext: "/month",
    onboardingFee: "$2,500",
    meetingBonus: "$250",
    description: "Lock in founding partner rates forever. All 5 AI engines, full service, preferred pricing.",
    features: [
      { text: "All 5 AI Engines active", included: true },
      { text: "3 dedicated sending domains", included: true },
      { text: "4,500 emails/month capacity", included: true },
      { text: "Guardian Engine (compliance)", included: true },
      { text: "Architect Engine (AI campaigns)", included: true },
      { text: "Scientist Engine (optimization)", included: true },
      { text: "Hunter Engine (lead expansion)", included: true },
      { text: "Sentinel Engine (visitor intel)", included: true },
      { text: "Bi-weekly strategy calls", included: true },
      { text: "Weekly performance reports", included: true },
      { text: "Real-time dashboard access", included: true },
      { text: "Slack/Telegram support", included: true },
      { text: "CRM integration", included: true },
    ],
    cta: "Apply for Founding Partner",
    popular: true,
  },
  {
    id: "official-client",
    name: "Official Client",
    tagline: "Standard pricing for all clients",
    price: "$4,000",
    priceSubtext: "/month",
    onboardingFee: "$5,000",
    meetingBonus: "$350",
    description: "Full XGrowthOS platform access with enhanced support and higher capacity.",
    features: [
      { text: "All 5 AI Engines active", included: true },
      { text: "5 dedicated sending domains", included: true },
      { text: "7,500 emails/month capacity", included: true },
      { text: "Guardian Engine (compliance)", included: true },
      { text: "Architect Engine (AI campaigns)", included: true },
      { text: "Scientist Engine (optimization)", included: true },
      { text: "Hunter Engine (lead expansion)", included: true },
      { text: "Sentinel Engine (visitor intel)", included: true },
      { text: "Weekly strategy calls", included: true },
      { text: "Weekly performance reports", included: true },
      { text: "Real-time dashboard access", included: true },
      { text: "Priority Slack/Telegram support", included: true },
      { text: "CRM integration", included: true },
      { text: "Dedicated Success Manager", included: true },
    ],
    cta: "Get Started",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For high-volume organizations",
    price: "$7,500",
    priceSubtext: "/month",
    onboardingFee: "$10,000",
    meetingBonus: "$500",
    description: "Maximum scale with custom solutions, dedicated team, and enterprise-grade support.",
    features: [
      { text: "All 5 AI Engines active", included: true },
      { text: "10+ dedicated sending domains", included: true },
      { text: "15,000+ emails/month capacity", included: true },
      { text: "All standard features", included: true },
      { text: "Multi-channel outreach", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated account team", included: true },
      { text: "Weekly strategy calls", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Custom reporting", included: true },
      { text: "SLA guarantees", included: true },
      { text: "White-label options available", included: true },
    ],
    cta: "Contact Sales",
  },
];

export const pricingFaqs = [
  {
    question: "What's the Founding Partner program?",
    answer: "Founding Partners are our earliest clients who lock in exclusive pricing forever. You pay $2,000/month + $250/meeting instead of standard rates. This pricing is grandfathered as long as you remain an active client.",
  },
  {
    question: "How does the per-meeting bonus work?",
    answer: "You pay a performance bonus for each qualified meeting we book. A qualified meeting is one where the prospect matches your ICP, the meeting is confirmed and attended, and involves a decision-maker or influencer. This aligns our incentives with your success.",
  },
  {
    question: "What's included in the onboarding fee?",
    answer: "The one-time onboarding fee covers: 60-minute discovery call, ICP definition and targeting, custom campaign development, domain procurement and configuration, DNS setup (SPF/DKIM/DMARC), domain warmup, CRM integration, and dashboard setup.",
  },
  {
    question: "How long is the pilot period?",
    answer: "We recommend a 90-day pilot to see meaningful results. This gives enough time for domain warmup, campaign optimization, and measurable meeting generation. After the pilot, we move to month-to-month billing with 30-day termination notice.",
  },
  {
    question: "What if results aren't meeting expectations?",
    answer: "We offer a performance guarantee: if reply rate stays below 3% for 30 consecutive days despite our optimization efforts, you can terminate with 15 days notice and receive a pro-rated refund of unused retainer.",
  },
  {
    question: "What CRMs do you integrate with?",
    answer: "We integrate with Salesforce, HubSpot, Pipedrive, Zoho CRM, Close.io, and most major CRMs. All leads are automatically synced with campaign source tracking for proper attribution.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept ACH bank transfer (preferred), credit card (3% processing fee applies), and wire transfer for international clients. Payment terms are Net 15, with a 2% discount for payment within 7 days.",
  },
  {
    question: "Can I pause my campaigns?",
    answer: "Yes, you can pause for up to 30 days. During pause, your retainer is reduced by 50% to maintain your domains and warmup. Resume with 7 days notice. This preserves your sender reputation.",
  },
];

export const pricingComparison = {
  title: "Cost Comparison: XGrowthOS vs. Alternatives",
  items: [
    {
      name: "In-House SDR",
      cost: "$120,000+/year",
      notes: "Salary, benefits, tools, management overhead",
      meetingsPerMonth: "8-12",
      costPerMeeting: "$800-1,250",
    },
    {
      name: "Traditional Agency",
      cost: "$5,000-10,000/month",
      notes: "Manual processes, limited optimization",
      meetingsPerMonth: "5-10",
      costPerMeeting: "$500-2,000",
    },
    {
      name: "XGrowthOS (Founding Partner)",
      cost: "$2,000/month + $250/meeting",
      notes: "Autonomous AI, continuous optimization",
      meetingsPerMonth: "10-30",
      costPerMeeting: "$300-450",
      highlight: true,
    },
  ],
};

export const industryBenchmarks = {
  source: "Belkins 2024 Study (16.5M emails analyzed)",
  metrics: [
    { name: "Open Rate", industry: "27.7%", xgrowthTarget: "40%+" },
    { name: "Reply Rate", industry: "5.1%", xgrowthTarget: "8%+" },
    { name: "Positive Reply Rate", industry: "42%", xgrowthTarget: "60%+" },
    { name: "Meeting Conversion", industry: "1%", xgrowthTarget: "2%+" },
  ],
};
