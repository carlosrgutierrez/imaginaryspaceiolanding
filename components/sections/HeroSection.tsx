import FadeInView from "@/components/animations/FadeInView";
import HeroClientLogos from "@/components/sections/HeroClientLogos";
import {
  HERO_CLIENTS,
  HERO_CLIENTS_EYEBROW,
  HERO_HEADLINE,
  HERO_SUBTITLE,
} from "@/lib/constants";

interface HeroSectionProps {
  subtitle?: string;
}

export default function HeroSection({ subtitle }: HeroSectionProps) {
  return (
    <section className="hero-bg relative flex min-h-svh flex-col px-6 pt-[4.5rem] lg:px-10">
      {/* Headline + subtitle — centered in the space above the logo bar */}
      <div className="relative z-[1] mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center pb-[min(10vh,5rem)] pt-4 text-center sm:pt-6">
        <FadeInView className="w-full max-w-[55.5rem] lg:max-w-none">
          <h1 className="text-h1-gradient font-serif font-medium text-[clamp(2rem,5vw,2.5rem)] leading-[1.1] tracking-[-0.005em] pb-[7px] text-center sm:text-[clamp(2.25rem,4vw,3rem)] lg:text-[4rem]">
            {HERO_HEADLINE}
          </h1>
        </FadeInView>

        <FadeInView delay={0.15} className="mt-7 w-full max-w-[50rem] sm:mt-8">
          <p className="font-serif text-[1.25rem] font-light leading-[1.6] text-text-secondary/85">
            {subtitle ?? HERO_SUBTITLE}
          </p>
        </FadeInView>
      </div>

      {/* Logo bar — bottom of first screen, Morningside-style */}
      <FadeInView
        delay={0.3}
        className="relative z-[1] mx-auto flex w-full max-w-[1400px] shrink-0 flex-col items-center pb-10 sm:pb-12 lg:pb-14"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-text-muted/80">
          {HERO_CLIENTS_EYEBROW}
        </p>

        <div className="mt-6 w-full sm:mt-8">
          <HeroClientLogos clients={HERO_CLIENTS} />
        </div>
      </FadeInView>
    </section>
  );
}
