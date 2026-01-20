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

export const mainNavigation: NavLink[] = [
  {
    label: "Services & Solutions",
    dropdown: {
      sections: [
        {
          title: "Lead Generation",
          items: [
            {
              label: "Appointment Setting",
              href: "/appointment-setting",
              description: "Secure meetings with decision-makers",
              icon: Calendar,
            },
            {
              label: "Cold Email Outreach",
              href: "/cold-email-services",
              description: "AI-powered email campaigns that convert",
              icon: Mail,
            },
            {
              label: "Cold Calling",
              href: "/cold-calling-services",
              description: "Book 30% more appointments",
              icon: Phone,
            },
            {
              label: "LinkedIn Lead Generation",
              href: "/linkedin-lead-generation-services",
              description: "Expand reach on LinkedIn",
              icon: Linkedin,
            },
            {
              label: "Lead Research",
              href: "/lead-research",
              description: "Hand-picked, verified prospect lists",
              icon: Search,
            },
          ],
        },
        {
          title: "Other Services",
          items: [
            {
              label: "Account-Based Marketing",
              href: "/account-based-marketing-services",
            },
            {
              label: "Deliverability Consulting",
              href: "/deliverability-consulting",
            },
            {
              label: "CRM Consulting",
              href: "/crm-consulting-services",
            },
            {
              label: "Outsourced SDR",
              href: "/outsourced-sdr-services",
            },
          ],
        },
        {
          title: "By Company Size",
          items: [
            {
              label: "Enterprise",
              href: "/enterprise-lead-generation",
              icon: Building2,
            },
            {
              label: "SMB",
              href: "/smb-lead-generation",
              icon: Briefcase,
            },
            {
              label: "Startup",
              href: "/startup-lead-generation",
              icon: Zap,
            },
          ],
        },
      ],
      featured: {
        title: "Our AI Engines",
        description: "Discover how our 5 AI engines work together to deliver results",
        href: "/engines",
      },
    },
  },
  {
    label: "Industries",
    href: "/industries",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
  },
  {
    label: "About",
    dropdown: {
      sections: [
        {
          title: "Company",
          items: [
            { label: "About Us", href: "/about-us" },
            { label: "Awards", href: "/awards" },
            { label: "Testimonials", href: "/testimonials" },
            { label: "Careers", href: "/careers", badge: "Hiring" },
          ],
        },
        {
          title: "Learn",
          items: [
            { label: "Blog", href: "/blog" },
            { label: "Resources", href: "/resources" },
            { label: "Webinars", href: "/webinars" },
            { label: "Podcasts", href: "/podcasts" },
          ],
        },
        {
          title: "AI Engines",
          items: [
            { label: "The Guardian", href: "/engines/guardian", icon: Shield },
            { label: "The Architect", href: "/engines/architect", icon: Cpu },
            { label: "The Scientist", href: "/engines/scientist", icon: FlaskConical },
            { label: "The Hunter", href: "/engines/hunter", icon: Target },
            { label: "The Sentinel", href: "/engines/sentinel", icon: Eye },
          ],
        },
      ],
    },
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

export const footerNavigation = {
  services: {
    title: "Services",
    links: [
      { label: "Appointment Setting", href: "/appointment-setting" },
      { label: "Cold Email Outreach", href: "/cold-email-services" },
      { label: "Cold Calling", href: "/cold-calling-services" },
      { label: "LinkedIn Lead Gen", href: "/linkedin-lead-generation-services" },
      { label: "Lead Research", href: "/lead-research" },
      { label: "Account-Based Marketing", href: "/account-based-marketing-services" },
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
      { label: "SaaS", href: "/industries/saas" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Finance", href: "/industries/finance" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "IT Services", href: "/industries/information-technology" },
      { label: "View All", href: "/industries" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Awards", href: "/awards" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Webinars", href: "/webinars" },
      { label: "Podcasts", href: "/podcasts" },
      { label: "ROI Calculator", href: "/roi-calculator" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/legal/terms-of-use" },
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
      { label: "Accessibility", href: "/legal/accessibility-statement" },
    ],
  },
};

export const contactInfo = {
  email: "sales@quantuminsights.ai",
  phone: "+1 (323) 555-0147",
  address: "Los Angeles, CA",
};
