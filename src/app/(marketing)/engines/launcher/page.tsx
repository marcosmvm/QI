import { EngineDetailPage } from "@/components/marketing/pages/EngineDetailPage";

export const metadata = {
  title: "The Launcher Engine | Automated Onboarding | XGrowthOS",
  description: "Streamlined client onboarding with automated welcome emails, asset collection, and progress tracking. The Launcher Engine gets campaigns live faster.",
};

export default function LauncherPage() {
  return <EngineDetailPage engineId="launcher" />;
}
