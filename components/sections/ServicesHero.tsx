import FadeInView from "@/components/animations/FadeInView";
import AccentHighlight from "@/components/ui/AccentHighlight";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ServicesHero() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 px-6 text-center">
      <FadeInView>
        <SectionLabel className="mb-6">Services</SectionLabel>
      </FadeInView>

      <FadeInView delay={0.1}>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-text-primary leading-[1.5] max-w-3xl">
          From Trying AI to{" "}
          <AccentHighlight>Trusting</AccentHighlight> It.
        </h1>
      </FadeInView>

      <FadeInView delay={0.2} className="mt-8 max-w-xl">
        <p className="font-sans text-text-secondary text-lg leading-relaxed">
          A structured, three-phase engagement that takes you from opportunity
          discovery to full adoption — with measurable results at every step.
        </p>
      </FadeInView>
    </section>
  );
}
