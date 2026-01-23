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
          title: "Our 5 AI Engines",
          items: [
            { label: "The Guardian", href: "/engines/guardian", icon: Shield, description: "Compliance & Domain Health" },
            { label: "The Architect", href: "/engines/architect", icon: Cpu, description: "AI Campaign Design" },
            { label: "The Scientist", href: "/engines/scientist", icon: FlaskConical, description: "Campaign Optimization" },
            { label: "The Hunter", href: "/engines/hunter", icon: Target, description: "Reply-Based Lead Expansion" },
            { label: "The Sentinel", href: "/engines/sentinel", icon: Eye, description: "Website Visitor Intelligence" },
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
  email: "sales@xgrowthos.com",
  phone: "+1 (323) 555-0147",
  address: "Los Angeles, CA",
};
