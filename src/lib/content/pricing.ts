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
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For startups testing outbound",
    price: "$3,500",
    priceSubtext: "/month",
    description: "Get your outbound engine started with core AI capabilities and dedicated support.",
    features: [
      { text: "Up to 5,000 emails/month", included: true },
      { text: "1 dedicated domain", included: true },
      { text: "Guardian Engine (deliverability)", included: true },
      { text: "Architect Engine (campaign design)", included: true },
      { text: "Basic ICP research", included: true },
      { text: "Weekly performance reports", included: true },
      { text: "Email support", included: true },
      { text: "Scientist Engine (optimization)", included: false },
      { text: "Hunter Engine (lead expansion)", included: false },
      { text: "Sentinel Engine (visitor intel)", included: false },
    ],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For scaling companies",
    price: "$7,500",
    priceSubtext: "/month",
    description: "Full AI engine suite with advanced optimization and higher volume capacity.",
    features: [
      { text: "Up to 25,000 emails/month", included: true },
      { text: "3 dedicated domains", included: true },
      { text: "All 5 AI Engines", included: true },
      { text: "Advanced ICP research", included: true },
      { text: "A/B testing optimization", included: true },
      { text: "CRM integration", included: true },
      { text: "Bi-weekly strategy calls", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "LinkedIn outreach", included: false },
      { text: "Custom integrations", included: false },
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large organizations",
    price: "Custom",
    priceSubtext: "pricing",
    description: "Unlimited scale with custom solutions, dedicated team, and enterprise support.",
    features: [
      { text: "Unlimited email volume", included: true },
      { text: "Unlimited domains", included: true },
      { text: "All 5 AI Engines", included: true },
      { text: "Multi-channel (email, LinkedIn, phone)", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated SDR team", included: true },
      { text: "Weekly strategy calls", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Custom reporting", included: true },
      { text: "SLA guarantees", included: true },
    ],
    cta: "Contact Sales",
  },
];

export const pricingFaqs = [
  {
    question: "What's included in the setup?",
    answer: "All plans include complete infrastructure setup: domain procurement, DNS configuration, email warming, and ICP research. There's no additional setup fee—everything is included in your monthly investment.",
  },
  {
    question: "How long is the contract?",
    answer: "We recommend a minimum 3-month commitment to see meaningful results. Month-to-month is available at a 20% premium. Annual contracts receive a 15% discount.",
  },
  {
    question: "What if I need to scale up mid-contract?",
    answer: "You can upgrade your plan at any time. We'll pro-rate the difference and adjust your capacity immediately.",
  },
  {
    question: "Do you guarantee results?",
    answer: "Yes. We offer a pilot program with guaranteed minimum meeting targets. If we don't hit the agreed-upon numbers, you don't pay for our services—only the infrastructure costs.",
  },
  {
    question: "What CRMs do you integrate with?",
    answer: "We integrate with Salesforce, HubSpot, Pipedrive, and most major CRMs. Growth and Enterprise plans include standard integrations; custom integrations are available for Enterprise.",
  },
  {
    question: "Can I pause my subscription?",
    answer: "Enterprise clients can pause for up to 2 months per year. Starter and Growth plans can pause with 30 days notice, though we recommend maintaining momentum for best results.",
  },
];
