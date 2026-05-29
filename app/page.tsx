import HeroSection from "@/components/sections/HeroSection";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ScrollRevealText from "@/components/sections/ScrollRevealText";
import ValueProposition from "@/components/sections/ValueProposition";
import ProcessSteps from "@/components/sections/ProcessSteps";
import StatsRow from "@/components/sections/StatsRow";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import FAQSection from "@/components/sections/FAQSection";
import CTAFooter from "@/components/sections/CTAFooter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <ScrollRevealText />
      <ValueProposition />
      <ProcessSteps />
      <StatsRow />
      <CaseStudyGrid />
      <FAQSection />
      <CTAFooter />
    </>
  );
}
