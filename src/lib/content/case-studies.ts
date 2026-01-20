export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  industryId: string;
  logo?: string;
  title: string;
  subtitle: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: CaseStudyMetric[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "techscale-saas",
    company: "TechScale",
    industry: "SaaS",
    industryId: "saas",
    title: "8x More Qualified Meetings in 90 Days",
    subtitle: "How a B2B SaaS company transformed their outbound engine",
    challenge: "TechScale was struggling to generate enough qualified meetings to hit their aggressive growth targets. Their in-house SDR team was burning out and deliverability issues plagued their email campaigns.",
    solution: "We implemented our full 5-engine approach: Guardian fixed their deliverability, Architect redesigned their campaigns, Scientist optimized messaging, Hunter expanded from successful replies, and Sentinel captured website visitors.",
    results: "Within 90 days, TechScale went from 2-3 meetings per month to 15-20 qualified opportunities. Their pipeline grew 8x and they closed their first 7-figure enterprise deal.",
    metrics: [
      { value: "8x", label: "More Meetings" },
      { value: "96%", label: "Deliverability" },
      { value: "4.2%", label: "Reply Rate" },
      { value: "$1.2M", label: "New Pipeline" },
    ],
    testimonial: {
      quote: "Quantum Insights transformed our outbound. We went from questioning if cold email worked to building a predictable pipeline machine.",
      author: "Sarah Chen",
      title: "VP of Sales, TechScale",
    },
    tags: ["SaaS", "Enterprise", "Cold Email", "Deliverability"],
  },
  {
    id: "dataflow-analytics",
    company: "DataFlow Analytics",
    industry: "Technology",
    industryId: "technology",
    title: "From Zero to 340% ROI in 6 Months",
    subtitle: "Building a scalable outbound engine from scratch",
    challenge: "DataFlow had no outbound motion. As a data analytics platform, they relied entirely on inbound and referrals, which wasn't enough to hit their Series B growth targets.",
    solution: "We built their entire outbound infrastructure from the ground up—domains, warming, ICP research, campaign design, and ongoing optimization. The Scientist Engine ran continuous experiments to find winning messages.",
    results: "DataFlow now generates 25% of their pipeline through outbound. The program delivered 340% ROI in the first 6 months and continues to scale.",
    metrics: [
      { value: "340%", label: "ROI" },
      { value: "25%", label: "Pipeline from Outbound" },
      { value: "18", label: "Meetings/Month" },
      { value: "45%", label: "Close Rate" },
    ],
    testimonial: {
      quote: "We went from zero outbound to 25% of our pipeline in 6 months. The ROI was obvious by month two.",
      author: "Michael Torres",
      title: "CEO, DataFlow Analytics",
    },
    tags: ["Technology", "Analytics", "New Program", "ROI"],
  },
  {
    id: "cloudnine-solutions",
    company: "CloudNine Solutions",
    industry: "IT Services",
    industryId: "information-technology",
    title: "50% Cost Reduction vs In-House SDRs",
    subtitle: "Replacing an underperforming SDR team with AI-powered outreach",
    challenge: "CloudNine's in-house SDR team was expensive and underperforming. High turnover, inconsistent messaging, and poor CRM hygiene meant their cost-per-meeting was unsustainable.",
    solution: "We replaced their 3-person SDR team with our outsourced SDR service plus AI engines. Our reps were fully trained on CloudNine's services within 2 weeks.",
    results: "CloudNine reduced their cost-per-meeting by 50% while increasing meeting volume by 40%. Quality improved as our experienced SDRs engaged better conversations.",
    metrics: [
      { value: "50%", label: "Cost Reduction" },
      { value: "40%", label: "More Meetings" },
      { value: "2 weeks", label: "Ramp Time" },
      { value: "35%", label: "Better Quality" },
    ],
    testimonial: {
      quote: "We're getting better results at half the cost. Should have made this switch years ago.",
      author: "Jennifer Park",
      title: "Head of Growth, CloudNine Solutions",
    },
    tags: ["IT Services", "Outsourced SDR", "Cost Savings"],
  },
  {
    id: "medtech-health",
    company: "MedTech Health",
    industry: "Healthcare",
    industryId: "healthcare",
    title: "Breaking Into Enterprise Healthcare",
    subtitle: "Winning Fortune 500 health system contracts",
    challenge: "MedTech had success with small clinics but couldn't break into large health systems. Their outreach wasn't reaching the right stakeholders, and their messaging didn't address enterprise concerns.",
    solution: "We implemented an ABM approach targeting the top 100 health systems. Multi-threaded campaigns reached clinical, IT, and administrative stakeholders simultaneously.",
    results: "MedTech landed their first 3 Fortune 500 health system contracts, each worth over $500K annually. Their enterprise pipeline grew to $15M.",
    metrics: [
      { value: "3", label: "F500 Contracts" },
      { value: "$15M", label: "Enterprise Pipeline" },
      { value: "500K+", label: "Avg Contract Value" },
      { value: "6 months", label: "Time to First Win" },
    ],
    testimonial: {
      quote: "We never thought we could compete for enterprise healthcare contracts. Quantum Insights made it possible.",
      author: "Dr. Robert Kim",
      title: "CEO, MedTech Health",
    },
    tags: ["Healthcare", "Enterprise", "ABM", "Multi-threading"],
  },
  {
    id: "fintech-startup",
    company: "PaymentPro",
    industry: "Financial Services",
    industryId: "finance",
    title: "Series A to Series B Pipeline Growth",
    subtitle: "Building the pipeline foundation for a $30M raise",
    challenge: "PaymentPro needed to show strong pipeline growth to close their Series B. With limited budget and a small team, they couldn't afford a full sales organization.",
    solution: "Our startup package gave them enterprise-level outbound at a price they could afford. We validated their ICP, tested messaging, and built a repeatable motion.",
    results: "PaymentPro 3x'd their pipeline in 4 months, giving them the metrics to close a $30M Series B. They continue to scale the program post-raise.",
    metrics: [
      { value: "3x", label: "Pipeline Growth" },
      { value: "$30M", label: "Series B Raised" },
      { value: "4 months", label: "Time to Results" },
      { value: "60%", label: "Cost Savings" },
    ],
    testimonial: {
      quote: "The pipeline numbers we built with Quantum Insights were crucial to closing our Series B.",
      author: "Amanda Liu",
      title: "Founder & CEO, PaymentPro",
    },
    tags: ["Fintech", "Startup", "Fundraising", "Growth"],
  },
  {
    id: "manufacturer-corp",
    company: "IndustrialTech",
    industry: "Manufacturing",
    industryId: "manufacturing",
    title: "Reaching Plant Managers at Scale",
    subtitle: "Decentralized targeting for industrial technology",
    challenge: "IndustrialTech's solution was deployed at the plant level, but buying decisions were decentralized across thousands of facilities. They couldn't scale one-to-one outreach.",
    solution: "We built targeted lists by plant location and industry segment, then ran personalized campaigns that referenced specific operational challenges.",
    results: "IndustrialTech now generates 20+ qualified demos per month across their target plants. They've expanded from 3 to 15 active pilot programs.",
    metrics: [
      { value: "20+", label: "Demos/Month" },
      { value: "15", label: "Active Pilots" },
      { value: "5x", label: "Pilot Expansion" },
      { value: "12%", label: "Pilot-to-Close" },
    ],
    testimonial: {
      quote: "Finally found a way to reach plant managers without flying to every facility. Game changer for our sales process.",
      author: "Tom Henderson",
      title: "VP Sales, IndustrialTech",
    },
    tags: ["Manufacturing", "Decentralized", "Plant-Level", "Pilots"],
  },
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === id);
}

export function getCaseStudiesByIndustry(industryId: string): CaseStudy[] {
  return caseStudies.filter((study) => study.industryId === industryId);
}
