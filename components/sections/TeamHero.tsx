import FadeInView from "@/components/animations/FadeInView";
import StatsRow from "@/components/sections/StatsRow";
import { TEAM_HERO, TEAM_INTRO } from "@/lib/constants";

export default function TeamHero() {
  return (
    <>
      <section className="flex min-h-[55vh] flex-col items-center justify-center px-6 pb-12 pt-28 text-center sm:min-h-[60vh] sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <FadeInView className="w-full max-w-5xl">
          <h1 className="font-serif text-[2.75rem] leading-[1.12] sm:text-6xl lg:text-7xl lg:leading-[1.1]">
            <span className="text-h1-gradient block lg:whitespace-nowrap">
              {TEAM_HERO.titleLine1}
            </span>
            <span className="text-h1-gradient mt-2 block sm:mt-3">
              {TEAM_HERO.titleLine2}
            </span>
          </h1>
        </FadeInView>

        <FadeInView
          delay={0.12}
          className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-6 sm:mt-12 sm:gap-8 lg:max-w-[52rem]"
        >
          {TEAM_INTRO.map((paragraph) => (
            <p
              key={paragraph}
              className="font-sans text-base leading-[1.75] text-text-secondary sm:text-lg"
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
