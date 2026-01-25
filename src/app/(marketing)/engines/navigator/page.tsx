import { EngineDetailPage } from "@/components/marketing/pages/EngineDetailPage";

export const metadata = {
  title: "The Navigator Engine | Self-Serve Client Portal | XGrowthOS",
  description: "Empowering clients with instant self-service capabilities. The Navigator Engine handles ICP updates, campaign controls, and report downloads on demand.",
};

export default function NavigatorPage() {
  return <EngineDetailPage engineId="navigator" />;
}
