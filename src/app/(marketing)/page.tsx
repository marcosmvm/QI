import {
  Hero,
  LogoBar,
  StatsBar,
  ValuePillars,
  ProcessSteps,
  EngineShowcase,
  Testimonials,
  FAQ,
  CTABanner,
} from "@/components/marketing/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoBar />
      <StatsBar />
      <ValuePillars />
      <ProcessSteps />
      <EngineShowcase />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
