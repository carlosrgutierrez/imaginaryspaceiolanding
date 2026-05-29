import { Suspense } from "react";
import type { Metadata } from "next";
import ServicesHero from "@/components/sections/ServicesHero";
import ServiceTabs from "@/components/sections/ServiceTabs";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import CTAFooter from "@/components/sections/CTAFooter";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From Trying AI to Trusting It. Our Identify → Develop → Adopt methodology takes you from opportunity discovery to full adoption with measurable results at every step.",
  openGraph: {
    title: "Services — From Trying AI to Trusting It",
    description:
      "A structured three-phase engagement. Identify the highest-value opportunities, build bespoke solutions, and drive real adoption.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <Suspense fallback={null}>
        <ServiceTabs />
      </Suspense>
      <CaseStudyGrid />
      <CTAFooter />
    </>
  );
}
