import Link from "next/link";
import FadeInView from "@/components/animations/FadeInView";
import Button from "@/components/ui/Button";
import { VALUE_PROPOSITION } from "@/lib/constants";

export default function ValueProposition() {
  return (
    <section className="py-[7.5rem] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <FadeInView>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-[1.5] mb-8">
              {VALUE_PROPOSITION.headline}
            </h2>
          </FadeInView>

          <FadeInView delay={0.1}>
            <div className="flex flex-col gap-4 mb-10">
              {VALUE_PROPOSITION.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-sans text-text-secondary text-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
            <Link href="/work-with-us">
              <Button variant="outline" size="lg">
                Start the Conversation &rarr;
              </Button>
            </Link>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
