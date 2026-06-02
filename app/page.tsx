import HeroSection from "@/components/sections/HeroSection";
import ScrollRevealText from "@/components/sections/ScrollRevealText";
import ProcessSteps from "@/components/sections/ProcessSteps";
import StatsRow from "@/components/sections/StatsRow";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import FAQSection from "@/components/sections/FAQSection";
import CTAFooter from "@/components/sections/CTAFooter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScrollRevealText />
      <ProcessSteps />
      <CaseStudyGrid />
      <StatsRow />
      <FAQSection />
      <CTAFooter />
    </>
  );
}
