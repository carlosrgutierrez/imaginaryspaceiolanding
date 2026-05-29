import FadeInView from "@/components/animations/FadeInView";
import AccentHighlight from "@/components/ui/AccentHighlight";

interface HeroSectionProps {
  headline?: React.ReactNode;
  subtitle?: string;
}

export default function HeroSection({
  headline,
  subtitle,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-20 pb-12 px-6 text-center">
      <FadeInView>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-text-primary leading-[1.5] max-w-4xl">
          {headline ?? (
            <>
              We don&apos;t just talk AI.
              <br />
              We <AccentHighlight>deliver</AccentHighlight> it.
            </>
          )}
        </h1>
      </FadeInView>

      <FadeInView delay={0.2} className="mt-8 max-w-lg">
        <p className="font-sans text-text-secondary text-lg leading-relaxed">
          {subtitle ??
            "Enterprise AI consulting that moves from strategy to production — without the pilot purgatory."}
        </p>
      </FadeInView>
    </section>
  );
}
