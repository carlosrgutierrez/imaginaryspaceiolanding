import type { Metadata } from "next";
import TeamHero from "@/components/sections/TeamHero";
import LeadershipCards from "@/components/sections/LeadershipCards";
import TeamGrid from "@/components/sections/TeamGrid";
import CTAFooter from "@/components/sections/CTAFooter";

import { SEO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Team",
  description: SEO.teamDescription,
  openGraph: {
    title: "Team",
    description: SEO.teamDescription,
  },
};

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <LeadershipCards />
      <TeamGrid />
      <CTAFooter />
    </>
  );
}
