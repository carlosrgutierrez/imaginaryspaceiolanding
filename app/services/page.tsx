import { Suspense } from "react";
import type { Metadata } from "next";
import ServicesHero from "@/components/sections/ServicesHero";
import ServiceTabs from "@/components/sections/ServiceTabs";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import CTAFooter from "@/components/sections/CTAFooter";

import { SEO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: SEO.servicesDescription,
  openGraph: {
    title: "Services",
    description: SEO.servicesDescription,
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
