import {
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Search,
  Users,
  Zap,
  Shield,
  Cpu,
  FlaskConical,
  Target,
  Eye,
  Building2,
  Briefcase,
  FileText,
  Scale,
  Brain,
  Rocket,
  Activity,
  Compass,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface NavDropdown {
  sections: NavSection[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
  };
}

export type NavLink = {
  label: string;
  href: string;
  dropdown?: never;
} | {
  label: string;
  href?: never;
  dropdown: NavDropdown;
};

// Simplified navigation per UX audit recommendations
export const mainNavigation: NavLink[] = [
  {
    label: "How It Works",
    href: "/how-it-works",
  },
  {
    label: "Engines",
    dropdown: {
      sections: [
        {
          title: "Lead Generation Engines",
          items: [
            { label: "The Guardian", href: "/engines/guardian", icon: Shield, description: "Compliance & Domain Health" },
            { label: "The Architect", href: "/engines/architect", icon: Cpu, description: "AI Campaign Design" },
            { label: "The Scientist", href: "/engines/scientist", icon: FlaskConical, description: "Campaign Optimization" },
            { label: "The Hunter", href: "/engines/hunter", icon: Target, description: "Reply-Based Lead Expansion" },
            { label: "The Sentinel", href: "/engines/sentinel", icon: Eye, description: "Website Visitor Intelligence" },
          ],
        },
        {
          title: "CSM Automation Suite",
          items: [
            { label: "The Informant", href: "/engines/informant", icon: FileText, description: "Automated Reporting" },
            { label: "The Judge", href: "/engines/judge", icon: Scale, description: "Issue Detection & Auto-Fix" },
            { label: "The Keeper", href: "/engines/keeper", icon: Brain, description: "AI Knowledge Brain" },
            { label: "The Launcher", href: "/engines/launcher", icon: Rocket, description: "Automated Onboarding" },
            { label: "The Monitor", href: "/engines/monitor", icon: Activity, description: "Churn Risk Detection" },
            { label: "The Navigator", href: "/engines/navigator", icon: Compass, description: "Self-Serve Client Portal" },
          ],
        },
      ],
      featured: {
        title: "See All Engines",
        description: "Learn how our 5 AI engines work together",
        href: "/engines",
      },
    },
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "About",
    href: "/about-us",
  },
];

// Simplified footer navigation per UX audit
export const footerNavigation = {
  product: {
    title: "Product",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "AI Engines", href: "/engines" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  engines: {
    title: "AI Engines",
    links: [
      { label: "The Guardian", href: "/engines/guardian" },
      { label: "The Architect", href: "/engines/architect" },
      { label: "The Scientist", href: "/engines/scientist" },
      { label: "The Hunter", href: "/engines/hunter" },
      { label: "The Sentinel", href: "/engines/sentinel" },
      { label: "The Informant", href: "/engines/informant" },
      { label: "The Judge", href: "/engines/judge" },
      { label: "The Keeper", href: "/engines/keeper" },
      { label: "The Launcher", href: "/engines/launcher" },
      { label: "The Monitor", href: "/engines/monitor" },
      { label: "The Navigator", href: "/engines/navigator" },
    ],
  },
  industries: {
    title: "Industries",
    links: [
      { label: "B2B SaaS", href: "/industries/saas" },
      { label: "B2B Tech", href: "/industries/information-technology" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Finance", href: "/industries/finance" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/legal/terms-of-use" },
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
    ],
  },
};

export const contactInfo = {
  email: "support@xgrowthos.com",
  phone: "+1 (323) 555-0147",
  address: "Los Angeles, CA",
  website: "xgrowthos.com",
};
