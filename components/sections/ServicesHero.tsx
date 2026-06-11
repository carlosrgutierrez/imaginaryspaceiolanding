import FadeInView from "@/components/animations/FadeInView";
import { SERVICES_HERO } from "@/lib/constants";

export default function ServicesHero() {
  return (
    <section className="flex min-h-[72vh] flex-col items-center justify-center px-6 pb-14 pt-[5.5rem] text-center sm:min-h-[76vh] sm:pb-16 sm:pt-28 lg:min-h-[78vh] lg:pb-20">
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl lg:px-8">
        <FadeInView>
          <h1 className="font-serif text-[2.35rem] leading-[1.12] text-text-primary sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.1] xl:text-[4.5rem]">
            {SERVICES_HERO.titleLead}{" "}
            <span className="text-accent-grad">{SERVICES_HERO.titleAccent}</span>
          </h1>
        </FadeInView>

        <FadeInView delay={0.1} className="mt-8 sm:mt-10">
          <p className="mx-auto max-w-3xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg md:text-xl">
            {SERVICES_HERO.subtitle}
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
