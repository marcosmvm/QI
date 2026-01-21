import {
  Cloud,
  HeartPulse,
  Landmark,
  Factory,
  Monitor,
  GraduationCap,
  Briefcase,
  ShoppingCart,
  Building2,
  Plane,
  Cpu,
  Leaf,
  Megaphone,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface Industry {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  color: "electric-cyan" | "quantum-violet" | "neon-mint" | "energy-orange";
  stats: IndustryStat[];
  challenges: IndustryChallenge[];
  solutions: string[];
  targetTitles: string[];
}

export const industries: Industry[] = [
  {
    id: "saas",
    name: "SaaS",
    tagline: "Accelerate Your Growth Engine",
    shortDescription: "Drive demos, trials, and enterprise contracts for software companies at every stage.",
    longDescription: "SaaS companies need a predictable pipeline to hit aggressive growth targets. We've helped hundreds of software companies—from seed-stage startups to public companies—build scalable outbound engines that deliver qualified demos and trials.",
    icon: Cloud,
    color: "electric-cyan",
    stats: [
      { value: "200+", label: "SaaS Clients" },
      { value: "35%", label: "Avg Open Rate" },
      { value: "4.2%", label: "Avg Reply Rate" },
      { value: "3x", label: "Pipeline Growth" },
    ],
    challenges: [
      { title: "Long Sales Cycles", description: "Enterprise deals can take 6-12 months to close." },
      { title: "Multiple Stakeholders", description: "Need to engage technical, business, and executive buyers." },
      { title: "Crowded Market", description: "Standing out among hundreds of competing solutions." },
      { title: "Proving ROI", description: "Demonstrating clear value and business impact." },
    ],
    solutions: [
      "Multi-threaded outreach to engage entire buying committees",
      "Technical messaging that resonates with developers and IT teams",
      "ROI-focused content for business stakeholders",
      "Nurture sequences for long-cycle deals",
    ],
    targetTitles: ["CTO", "VP Engineering", "IT Director", "Head of Product", "CEO", "COO"],
  },
  {
    id: "healthcare",
    name: "HealthTech",
    tagline: "Navigate Complex Healthcare Sales",
    shortDescription: "Compliant outreach to healthcare providers, payers, and health tech buyers.",
    longDescription: "Healthcare sales require specialized knowledge of compliance requirements, buying committees, and industry-specific pain points. Our team has deep experience selling to hospitals, health systems, payers, and healthcare technology companies.",
    icon: HeartPulse,
    color: "neon-mint",
    stats: [
      { value: "50+", label: "Healthcare Clients" },
      { value: "HIPAA", label: "Compliant Processes" },
      { value: "28%", label: "Avg Open Rate" },
      { value: "6-12", label: "Month Cycles" },
    ],
    challenges: [
      { title: "Regulatory Compliance", description: "HIPAA and other regulations govern communication." },
      { title: "Complex Buying Process", description: "Multiple approvals from clinical and administrative leaders." },
      { title: "Risk-Averse Buyers", description: "Healthcare organizations move slowly and carefully." },
      { title: "Budget Constraints", description: "Tight margins and scrutinized spending." },
    ],
    solutions: [
      "HIPAA-compliant outreach processes",
      "Clinical value messaging for provider audiences",
      "ROI calculators tailored to healthcare economics",
      "Multi-stakeholder campaign coordination",
    ],
    targetTitles: ["CMO", "CIO", "VP Clinical Operations", "Director of IT", "Chief Nursing Officer"],
  },
  {
    id: "finance",
    name: "FinTech",
    tagline: "Reach Financial Decision-Makers",
    shortDescription: "Compliant outreach to banks, asset managers, fintech, and insurance companies.",
    longDescription: "Financial services buyers demand precision, compliance, and clear value. We help fintech companies, banks, and financial services providers reach CFOs, treasurers, and financial operations leaders with messaging that speaks their language.",
    icon: Landmark,
    color: "quantum-violet",
    stats: [
      { value: "75+", label: "Finance Clients" },
      { value: "SOC2", label: "Compliant" },
      { value: "32%", label: "Avg Open Rate" },
      { value: "$250K+", label: "Avg Deal Size" },
    ],
    challenges: [
      { title: "Heavy Regulation", description: "Strict compliance requirements for communications." },
      { title: "Security Concerns", description: "Intense scrutiny of any new vendor relationships." },
      { title: "Conservative Culture", description: "Traditional organizations slow to adopt new solutions." },
      { title: "High Stakes", description: "Financial decisions have significant impact." },
    ],
    solutions: [
      "Compliance-first messaging and processes",
      "Security and audit-focused content",
      "ROI and efficiency value propositions",
      "Executive-level relationship building",
    ],
    targetTitles: ["CFO", "Treasurer", "VP Finance", "Head of Operations", "Chief Risk Officer"],
  },
  {
    id: "martech",
    name: "MarTech",
    tagline: "Connect with Marketing Leaders",
    shortDescription: "Reach CMOs and marketing directors with data-driven messaging that demonstrates clear ROI.",
    longDescription: "Marketing technology buyers are sophisticated and data-driven. They evaluate solutions based on ROI, integration capabilities, and scalability. We help martech companies cut through the noise and reach marketing leaders with compelling value propositions.",
    icon: Megaphone,
    color: "quantum-violet",
    stats: [
      { value: "55+", label: "MarTech Clients" },
      { value: "ROI", label: "Focused Messaging" },
      { value: "36%", label: "Avg Open Rate" },
      { value: "CMO", label: "Level Access" },
    ],
    challenges: [
      { title: "Tool Overload", description: "Marketing teams already use dozens of tools." },
      { title: "Integration Needs", description: "Must work with existing marketing stack." },
      { title: "ROI Pressure", description: "Every tool must demonstrate clear business impact." },
      { title: "Fast Evaluation", description: "Marketers move quickly—or not at all." },
    ],
    solutions: [
      "ROI-focused messaging with clear metrics",
      "Integration capability highlights",
      "Case studies from similar marketing teams",
      "Quick-value demonstration approaches",
    ],
    targetTitles: ["CMO", "VP Marketing", "Director of Marketing Ops", "Head of Demand Gen", "Marketing Director"],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    tagline: "Engage Security Buyers",
    shortDescription: "Target CISOs and IT leaders with security-focused messaging that addresses threat landscapes.",
    longDescription: "Cybersecurity vendors face the challenge of reaching risk-averse buyers who are bombarded with vendor outreach. We help security companies cut through the noise and reach decision-makers with messaging that demonstrates expertise and addresses real security concerns.",
    icon: Shield,
    color: "energy-orange",
    stats: [
      { value: "45+", label: "Security Clients" },
      { value: "Enterprise", label: "Focus" },
      { value: "33%", label: "Avg Open Rate" },
      { value: "CISO", label: "Level Access" },
    ],
    challenges: [
      { title: "Vendor Fatigue", description: "Security leaders are overwhelmed with vendor outreach." },
      { title: "Trust Barrier", description: "Security purchases require deep trust and validation." },
      { title: "Technical Buyers", description: "Security teams evaluate solutions rigorously." },
      { title: "Compliance Requirements", description: "Must navigate complex procurement processes." },
    ],
    solutions: [
      "Thought leadership positioning",
      "Technical credibility content",
      "Compliance-focused messaging",
      "Executive relationship building",
    ],
    targetTitles: ["CISO", "VP Security", "Security Director", "Head of InfoSec", "CTO"],
  },
  {
    id: "hr-tech",
    name: "HR Tech",
    tagline: "Reach People Leaders",
    shortDescription: "Connect with CHROs and talent acquisition teams through campaigns focused on employee experience.",
    longDescription: "HR technology companies need to reach HR leaders who are focused on employee experience, talent acquisition, and workforce transformation. We help HR tech vendors connect with decision-makers during budget cycles and strategic planning windows.",
    icon: Users,
    color: "electric-cyan",
    stats: [
      { value: "35+", label: "HR Tech Clients" },
      { value: "CHRO", label: "Level Targeting" },
      { value: "29%", label: "Avg Open Rate" },
      { value: "Enterprise", label: "& SMB Coverage" },
    ],
    challenges: [
      { title: "Budget Timing", description: "HR budgets are set annually with specific windows." },
      { title: "Multiple Stakeholders", description: "HR, IT, and Finance all involved in decisions." },
      { title: "ROI Pressure", description: "Must demonstrate clear workforce impact." },
      { title: "Change Management", description: "HR tools require organizational buy-in." },
    ],
    solutions: [
      "Budget cycle timing optimization",
      "Multi-stakeholder engagement",
      "ROI and productivity messaging",
      "Change management support content",
    ],
    targetTitles: ["CHRO", "VP HR", "Head of People", "HR Director", "Chief People Officer"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "Connect with Industrial Leaders",
    shortDescription: "Reach operations, procurement, and engineering leaders in manufacturing.",
    longDescription: "Manufacturing companies are modernizing their operations with new technologies. We help industrial tech companies connect with plant managers, operations leaders, and procurement teams to drive adoption of Industry 4.0 solutions.",
    icon: Factory,
    color: "energy-orange",
    stats: [
      { value: "40+", label: "Manufacturing Clients" },
      { value: "25%", label: "Avg Open Rate" },
      { value: "Plant-Level", label: "Targeting" },
      { value: "F500", label: "Manufacturers Reached" },
    ],
    challenges: [
      { title: "Decentralized Buying", description: "Decisions made at plant or regional level." },
      { title: "Technical Buyers", description: "Engineers and operations experts evaluate solutions." },
      { title: "Proof Required", description: "Need to demonstrate results in similar environments." },
      { title: "Long Implementation", description: "Extended timeline from decision to deployment." },
    ],
    solutions: [
      "Plant-level and regional targeting strategies",
      "Technical content for engineering audiences",
      "Case studies from similar manufacturing environments",
      "Multi-site expansion strategies",
    ],
    targetTitles: ["VP Operations", "Plant Manager", "Director of Engineering", "Procurement Director"],
  },
  {
    id: "information-technology",
    name: "IT Services",
    tagline: "Grow Your IT Services Business",
    shortDescription: "Generate leads for IT consulting, managed services, and technology implementation.",
    longDescription: "IT services companies compete for the attention of technology leaders overwhelmed with vendor outreach. We help MSPs, IT consultants, and implementation partners stand out with value-focused messaging that addresses real business challenges.",
    icon: Monitor,
    color: "electric-cyan",
    stats: [
      { value: "100+", label: "IT Services Clients" },
      { value: "Technical", label: "Messaging Expertise" },
      { value: "30%", label: "Avg Open Rate" },
      { value: "MSP/VAR", label: "Specialization" },
    ],
    challenges: [
      { title: "Commoditization", description: "Many IT services appear interchangeable." },
      { title: "Vendor Fatigue", description: "IT leaders receive constant outreach." },
      { title: "Proving Expertise", description: "Need to demonstrate specialized knowledge." },
      { title: "Trust Building", description: "Services require ongoing relationship." },
    ],
    solutions: [
      "Differentiated positioning strategies",
      "Technical thought leadership content",
      "Case study-focused outreach",
      "Expertise demonstration through content",
    ],
    targetTitles: ["CTO", "IT Director", "VP Technology", "Head of Infrastructure", "CIO"],
  },
  {
    id: "education",
    name: "Education",
    tagline: "Reach K-12 and Higher Ed Leaders",
    shortDescription: "Connect with administrators, IT directors, and curriculum leaders in education.",
    longDescription: "EdTech companies face unique challenges reaching educators and administrators with limited time and budget pressures. We help education technology companies connect with decision-makers across K-12 districts and higher education institutions.",
    icon: GraduationCap,
    color: "quantum-violet",
    stats: [
      { value: "30+", label: "EdTech Clients" },
      { value: "K-12 & Higher Ed", label: "Coverage" },
      { value: "22%", label: "Avg Open Rate" },
      { value: "Seasonal", label: "Timing Optimization" },
    ],
    challenges: [
      { title: "Budget Cycles", description: "Annual budgeting with specific windows." },
      { title: "Committee Decisions", description: "Multiple stakeholders including teachers." },
      { title: "Pilot Requirements", description: "Often need to prove value in pilot programs." },
      { title: "Mission Focus", description: "Messaging must align with educational outcomes." },
    ],
    solutions: [
      "Timing campaigns to budget cycles",
      "Multi-stakeholder engagement strategies",
      "Pilot program facilitation",
      "Outcome-focused messaging",
    ],
    targetTitles: ["Superintendent", "Principal", "IT Director", "Curriculum Director", "Dean"],
  },
  {
    id: "professional-services",
    name: "Professional Services",
    tagline: "Grow Your Professional Practice",
    shortDescription: "Lead generation for law firms, accounting firms, and consulting practices.",
    longDescription: "Professional services firms often struggle with business development. We help law firms, accounting practices, and consulting firms build predictable pipelines of qualified prospects who need their specialized expertise.",
    icon: Briefcase,
    color: "neon-mint",
    stats: [
      { value: "60+", label: "Prof Services Clients" },
      { value: "Partner-Level", label: "Targeting" },
      { value: "26%", label: "Avg Open Rate" },
      { value: "Relationship", label: "Focused Approach" },
    ],
    challenges: [
      { title: "Relationship Business", description: "Services sold on trust and relationships." },
      { title: "Rainmaker Dependent", description: "Often reliant on individual partner networks." },
      { title: "Differentiation", description: "Hard to distinguish from competitors." },
      { title: "Timing", description: "Need to reach prospects when they need help." },
    ],
    solutions: [
      "Thought leadership positioning",
      "Relationship-building sequences",
      "Expertise demonstration campaigns",
      "Trigger-based outreach",
    ],
    targetTitles: ["General Counsel", "CFO", "CEO", "Managing Director", "VP Operations"],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    tagline: "Sell to Online Retailers",
    shortDescription: "Reach e-commerce brands, agencies, and platform operators.",
    longDescription: "E-commerce technology vendors need to reach brands, agencies, and platform operators who are overwhelmed with solutions. We help e-commerce tech companies stand out with ROI-focused messaging that demonstrates clear impact on revenue and operations.",
    icon: ShoppingCart,
    color: "electric-cyan",
    stats: [
      { value: "45+", label: "E-commerce Clients" },
      { value: "D2C & B2B", label: "Coverage" },
      { value: "34%", label: "Avg Open Rate" },
      { value: "ROI", label: "Focused Messaging" },
    ],
    challenges: [
      { title: "Tool Fatigue", description: "E-commerce operators use many tools already." },
      { title: "ROI Focus", description: "Everything measured against revenue impact." },
      { title: "Fast Decisions", description: "E-commerce moves quickly—or not at all." },
      { title: "Platform Complexity", description: "Many platforms and integrations to navigate." },
    ],
    solutions: [
      "Revenue-impact messaging",
      "Platform-specific targeting",
      "Quick-value propositions",
      "Case studies with clear metrics",
    ],
    targetTitles: ["E-commerce Director", "Head of Digital", "CMO", "VP Marketing", "Founder"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    tagline: "Connect with Property Professionals",
    shortDescription: "Reach brokers, property managers, and commercial real estate leaders.",
    longDescription: "Real estate technology companies need to reach property professionals who are often relationship-focused and technology-skeptical. We help proptech companies demonstrate value and build trust with real estate decision-makers.",
    icon: Building2,
    color: "quantum-violet",
    stats: [
      { value: "35+", label: "Real Estate Clients" },
      { value: "Commercial & Residential", label: "Coverage" },
      { value: "24%", label: "Avg Open Rate" },
      { value: "Local", label: "Market Targeting" },
    ],
    challenges: [
      { title: "Traditional Industry", description: "Slow to adopt new technology." },
      { title: "Relationship Driven", description: "Trust and reputation matter most." },
      { title: "Local Markets", description: "Real estate is inherently local." },
      { title: "Fragmented", description: "Many small operators to reach." },
    ],
    solutions: [
      "Trust-building sequences",
      "Local market segmentation",
      "Efficiency and ROI messaging",
      "Reference and case study focus",
    ],
    targetTitles: ["Broker", "Property Manager", "VP Operations", "Director of Leasing", "Owner"],
  },
  {
    id: "logistics",
    name: "Logistics & Transportation",
    tagline: "Move the Supply Chain Forward",
    shortDescription: "Reach logistics, freight, and supply chain decision-makers.",
    longDescription: "Supply chain and logistics companies are under pressure to modernize. We help logistics tech companies reach operations leaders who need solutions for visibility, efficiency, and resilience in their supply chains.",
    icon: Plane,
    color: "energy-orange",
    stats: [
      { value: "25+", label: "Logistics Clients" },
      { value: "Global", label: "Coverage" },
      { value: "27%", label: "Avg Open Rate" },
      { value: "Supply Chain", label: "Expertise" },
    ],
    challenges: [
      { title: "Operational Focus", description: "Leaders focused on daily operations." },
      { title: "Integration Needs", description: "Must work with existing systems." },
      { title: "Proof Required", description: "Need to see working examples." },
      { title: "Global Complexity", description: "International operations add complexity." },
    ],
    solutions: [
      "Operations-focused messaging",
      "Integration capability highlights",
      "Case studies with metrics",
      "Regional targeting strategies",
    ],
    targetTitles: ["VP Supply Chain", "Logistics Director", "Head of Operations", "COO"],
  },
  {
    id: "technology",
    name: "Technology",
    tagline: "Sell to Tech Companies",
    shortDescription: "Reach product, engineering, and technology leaders at tech companies.",
    longDescription: "Selling to technology companies requires speaking their language. We help B2B tech companies reach other tech companies with messaging that resonates with technical and product-focused buyers.",
    icon: Cpu,
    color: "electric-cyan",
    stats: [
      { value: "150+", label: "Tech Clients" },
      { value: "Technical", label: "Messaging" },
      { value: "38%", label: "Avg Open Rate" },
      { value: "Product-Led", label: "Approach" },
    ],
    challenges: [
      { title: "Technical Buyers", description: "Engineers and product leaders are discerning." },
      { title: "Self-Serve Expected", description: "Tech buyers want to try before buying." },
      { title: "Crowded Space", description: "Many solutions competing for attention." },
      { title: "Fast Evaluation", description: "Quick decisions if value is clear." },
    ],
    solutions: [
      "Developer-focused messaging",
      "Technical content and documentation",
      "Product-led outreach sequences",
      "Community and ecosystem engagement",
    ],
    targetTitles: ["CTO", "VP Engineering", "Head of Product", "Tech Lead", "DevOps Director"],
  },
  {
    id: "sustainability",
    name: "Sustainability & CleanTech",
    tagline: "Power the Green Transition",
    shortDescription: "Connect with sustainability leaders driving environmental initiatives.",
    longDescription: "CleanTech and sustainability companies are helping organizations reduce their environmental impact. We help these companies reach sustainability officers and operations leaders who are prioritizing environmental initiatives.",
    icon: Leaf,
    color: "neon-mint",
    stats: [
      { value: "20+", label: "CleanTech Clients" },
      { value: "ESG", label: "Focus" },
      { value: "30%", label: "Avg Open Rate" },
      { value: "C-Suite", label: "Access" },
    ],
    challenges: [
      { title: "Budget Justification", description: "ROI must be clear for sustainability spend." },
      { title: "Regulatory Drivers", description: "Often driven by compliance requirements." },
      { title: "Cross-Functional", description: "Touches operations, finance, and executive." },
      { title: "Emerging Space", description: "Roles and responsibilities still forming." },
    ],
    solutions: [
      "ROI and compliance messaging",
      "Multi-stakeholder campaigns",
      "Regulatory-focused content",
      "Case studies with impact metrics",
    ],
    targetTitles: ["Chief Sustainability Officer", "VP Operations", "CFO", "Facilities Director"],
  },
];

export function getIndustryById(id: string): Industry | undefined {
  return industries.find((industry) => industry.id === id);
}

// Featured industries shown on the main industries page
export const featuredIndustryIds = [
  "saas",
  "finance",
  "healthcare",
  "martech",
  "cybersecurity",
  "hr-tech",
];

export function getFeaturedIndustries(): Industry[] {
  return featuredIndustryIds
    .map((id) => industries.find((i) => i.id === id))
    .filter((i): i is Industry => i !== undefined);
}
