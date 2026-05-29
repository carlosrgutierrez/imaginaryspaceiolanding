import FadeInView from "@/components/animations/FadeInView";
import SectionLabel from "@/components/ui/SectionLabel";
import AccentHighlight from "@/components/ui/AccentHighlight";
import StatsRow from "@/components/sections/StatsRow";
import { TEAM_INTRO } from "@/lib/constants";

export default function TeamHero() {
  return (
    <>
      <section className="min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center">
        <FadeInView>
          <SectionLabel className="mb-6">The Team</SectionLabel>
        </FadeInView>

        <FadeInView delay={0.1}>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-text-primary leading-[1.5] max-w-3xl">
            Your AI Transformation{" "}
            <AccentHighlight>Partner.</AccentHighlight>
          </h1>
        </FadeInView>

        <FadeInView delay={0.2} className="mt-8 max-w-2xl flex flex-col gap-5">
          {TEAM_INTRO.map((paragraph) => (
            <p
              key={paragraph}
              className="font-sans text-text-secondary text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </FadeInView>
      </section>

      <StatsRow />
    </>
  );
}
