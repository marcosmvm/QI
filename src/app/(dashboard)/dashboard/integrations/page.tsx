import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Link2,
  Mail,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Settings,
  RefreshCw,
  Zap,
  Calendar,
  Database,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface MembershipWithOrg {
  organization_id: string;
  organizations: {
    id: string;
    instantly_api_key: string | null;
    google_sheet_id: string | null;
  } | null;
}

async function getUserOrganization() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: membership } = await supabase
    .from("organization_members")
    .select(`
      organization_id,
      organizations (
        id,
        instantly_api_key,
        google_sheet_id
      )
    `)
    .eq("user_id", user.id)
    .single();

  const typedMembership = membership as MembershipWithOrg | null;

  return {
    user,
    organization: typedMembership?.organizations || null,
    organizationId: typedMembership?.organization_id,
  };
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: "email" | "crm" | "calendar" | "data";
  connected: boolean;
  connectedAt?: string;
  status?: "healthy" | "warning" | "error";
  statusText?: string;
}

export default async function IntegrationsPage() {
  const { organization, organizationId } = await getUserOrganization();

  if (!organizationId) {
    redirect("/dashboard");
  }

  const integrations: Integration[] = [
    {
      id: "instantly",
      name: "Instantly",
      description: "Email sending infrastructure with warmup and rotation",
      icon: Mail,
      category: "email",
      connected: !!organization?.instantly_api_key,
      connectedAt: organization?.instantly_api_key ? "Connected" : undefined,
      status: organization?.instantly_api_key ? "healthy" : undefined,
      statusText: organization?.instantly_api_key
        ? "All systems operational"
        : undefined,
    },
    {
      id: "google-sheets",
      name: "Google Sheets",
      description: "Import and sync lead data from spreadsheets",
      icon: FileSpreadsheet,
      category: "data",
      connected: !!organization?.google_sheet_id,
      connectedAt: organization?.google_sheet_id ? "Connected" : undefined,
      status: organization?.google_sheet_id ? "healthy" : undefined,
      statusText: organization?.google_sheet_id
        ? "Last synced today"
        : undefined,
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Sync leads and opportunities with your CRM",
      icon: Database,
      category: "crm",
      connected: false,
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Two-way sync with HubSpot CRM",
      icon: Database,
      category: "crm",
      connected: false,
    },
    {
      id: "pipedrive",
      name: "Pipedrive",
      description: "Push qualified leads directly to Pipedrive",
      icon: Database,
      category: "crm",
      connected: false,
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Sync meetings and appointments",
      icon: Calendar,
      category: "calendar",
      connected: false,
    },
    {
      id: "outlook-calendar",
      name: "Outlook Calendar",
      description: "Microsoft calendar integration",
      icon: Calendar,
      category: "calendar",
      connected: false,
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect to 5,000+ apps via Zapier",
      icon: Zap,
      category: "data",
      connected: false,
    },
  ];

  const categories = [
    { id: "email", name: "Email", count: integrations.filter((i) => i.category === "email").length },
    { id: "crm", name: "CRM", count: integrations.filter((i) => i.category === "crm").length },
    { id: "calendar", name: "Calendar", count: integrations.filter((i) => i.category === "calendar").length },
    { id: "data", name: "Data & Automation", count: integrations.filter((i) => i.category === "data").length },
  ];

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="min-h-screen p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-steel mb-2">
          <Link
            href="/dashboard"
            className="hover:text-electric-cyan transition-colors"
          >
            Portal
          </Link>
          <span>/</span>
          <span className="text-electric-cyan">Integrations</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-sora font-bold text-white">
              Integrations
            </h1>
            <p className="text-steel mt-1">
              Connect your tools and automate your workflow
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-midnight-blue/30 border border-graphite/50 rounded-lg">
            <span className="text-sm text-steel">
              {connectedCount} of {integrations.length} connected
            </span>
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {categories.map((category) => {
          const categoryIntegrations = integrations.filter(
            (i) => i.category === category.id
          );
          const connectedInCategory = categoryIntegrations.filter(
            (i) => i.connected
          ).length;

          return (
            <div
              key={category.id}
              className="glass-premium p-4"
            >
              <p className="text-sm text-steel">{category.name}</p>
              <p className="text-lg font-sora font-bold text-white">
                {connectedInCategory}/{category.count}
              </p>
            </div>
          );
        })}
      </div>

      {/* Integrations Grid */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryIntegrations = integrations.filter(
            (i) => i.category === category.id
          );

          return (
            <div key={category.id}>
              <h2 className="text-lg font-sora font-semibold text-white mb-4">
                {category.name}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryIntegrations.map((integration) => (
                  <IntegrationCard
                    key={integration.id}
                    integration={integration}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="mt-12 glass-premium p-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center flex-shrink-0">
            <Link2 className="h-5 w-5 text-electric-cyan" />
          </div>
          <div>
            <h3 className="text-lg font-sora font-semibold text-white mb-1">
              Need a custom integration?
            </h3>
            <p className="text-steel mb-4">
              We can build custom integrations for your specific tech stack.
              Contact our team to discuss your requirements.
            </p>
            <Link
              href="/dashboard/support"
              className="inline-flex items-center gap-2 text-sm text-electric-cyan hover:underline"
            >
              Contact Support
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const Icon = integration.icon;

  return (
    <div
      className={`glass-premium p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover ${
        integration.connected
          ? "border-neon-mint/30"
          : "hover:border-electric-cyan/30"
      }`}
      style={{ transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-lg flex items-center justify-center ${
              integration.connected
                ? "bg-neon-mint/10 border border-neon-mint/30"
                : "bg-graphite/30 border border-graphite/50"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                integration.connected ? "text-neon-mint" : "text-steel"
              }`}
            />
          </div>
          <div>
            <h3 className="text-base font-medium text-white">
              {integration.name}
            </h3>
            {integration.connected && integration.status && (
              <div className="flex items-center gap-1 mt-0.5">
                {integration.status === "healthy" ? (
                  <CheckCircle className="h-3 w-3 text-neon-mint" />
                ) : (
                  <AlertCircle className="h-3 w-3 text-energy-orange" />
                )}
                <span
                  className={`text-xs ${
                    integration.status === "healthy"
                      ? "text-neon-mint"
                      : "text-energy-orange"
                  }`}
                >
                  {integration.statusText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-steel mb-4">{integration.description}</p>

      <div className="flex items-center gap-2">
        {integration.connected ? (
          <>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-silver border border-graphite rounded-lg hover:bg-midnight-blue/50 transition-colors">
              <Settings className="h-3.5 w-3.5" />
              Configure
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-steel border border-graphite rounded-lg hover:bg-midnight-blue/50 transition-colors">
              <RefreshCw className="h-3.5 w-3.5" />
              Sync
            </button>
          </>
        ) : (
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-electric-cyan border border-electric-cyan/30 rounded-lg hover:bg-electric-cyan/10 transition-colors">
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
