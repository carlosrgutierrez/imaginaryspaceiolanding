import type { Metadata } from "next";
import TeamHero from "@/components/sections/TeamHero";
import LeadershipCards from "@/components/sections/LeadershipCards";
import TeamGrid from "@/components/sections/TeamGrid";
import CTAFooter from "@/components/sections/CTAFooter";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the senior AI engineers, product designers, and operators who make up Imaginary Space. Small team, senior talent — no outsourcing, no juniors.",
  openGraph: {
    title: "Team — Your AI Transformation Partner",
    description:
      "A small, senior team who have built and shipped AI products used by millions. When you work with Imaginary Space, you work directly with the people who deliver.",
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
